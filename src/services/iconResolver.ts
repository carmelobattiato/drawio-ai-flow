/**
 * Official brand-icon resolver.
 * Resolves a diagram cell to its OFFICIAL logo (lobehub / simple-icons via CDN),
 * embedding it as base64 or keeping the remote URL depending on mode.
 * Falls back to a generated custom badge ONLY when the official icon is
 * unreachable (404/timeout/non-SVG) or no official mapping exists.
 */
import { findBrandIcon, findOfficialShape } from './aiIconsCatalog';
import { generateCustomComponentBadge, svgToDataUri } from './cloudIconAssets';

export type IconMode = 'embed' | 'url';

const _ALLOWED_HOSTS = ['cdn.jsdelivr.net', 'cdn.simpleicons.org', 'unpkg.com'];

// Cache: official URL -> embedded base64 data URI, or null when unreachable
const _fetchCache = new Map<string, string | null>();

/**
 * Sanity check before an icon value is written into a draw.io `image=` style.
 * A style is "key=value;key=value", so the value must not contain ';' (it would be
 * truncated and render as a broken image). Data URIs must decode to an <svg>.
 */
function isValidDrawioImage(value: string): boolean {
  if (!value || value.includes(';')) return false;
  if (value.startsWith('data:image/svg+xml,')) {
    try {
      return decodeURIComponent(value.slice('data:image/svg+xml,'.length))
        .trimStart()
        .startsWith('<svg');
    } catch {
      return false;
    }
  }
  return /^https?:\/\//.test(value);
}

function isOfficialIconUrl(url: string | undefined | null): url is string {
  if (!url) return false;
  try {
    const host = new URL(url).hostname;
    return _ALLOWED_HOSTS.some(h => host === h || host.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

/**
 * Fetches an official SVG and returns it as a base64 data URI.
 * Returns null when unreachable, non-OK, or the body is not an SVG.
 */
async function fetchIconAsDataUri(url: string): Promise<string | null> {
  if (_fetchCache.has(url)) return _fetchCache.get(url)!;

  let result: string | null = null;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);

    if (res.ok) {
      let svg = (await res.text()).trim();
      if (svg.startsWith('<svg') || svg.startsWith('<?xml')) {
        // Normalize em-based sizing (lobehub icons use width="1em") to a fixed box
        svg = svg
          .replace(/width="1em"/gi, 'width="64"')
          .replace(/height="1em"/gi, 'height="64"');
        result = svgToDataUri(svg);
      }
    }
  } catch {
    result = null;
  }

  _fetchCache.set(url, result);
  return result;
}

/**
 * Resolves the `image=` value for an icon cell.
 * @param label      cell text label (brand name)
 * @param existingImageUrl the image URL already present on the cell, if any
 * @param mode       'embed' -> base64 inline, 'url' -> remote CDN URL
 * @returns a string suitable for the drawio `image=` field
 */
export async function resolveCellIcon(
  label: string,
  existingImageUrl: string | undefined,
  mode: IconMode
): Promise<string> {
  const candidate = await resolveIconCandidate(label, existingImageUrl, mode);
  // Final gate: never release an icon that would break the draw.io style parser.
  if (isValidDrawioImage(candidate)) return candidate;
  const badge = generateCustomComponentBadge(label);
  return isValidDrawioImage(badge) ? badge : generateCustomComponentBadge('AI');
}

async function resolveIconCandidate(
  label: string,
  existingImageUrl: string | undefined,
  mode: IconMode
): Promise<string> {
  // 1. Determine the authoritative official URL
  let officialUrl: string | null = null;
  if (isOfficialIconUrl(existingImageUrl)) {
    officialUrl = existingImageUrl;
  } else {
    const brand = findBrandIcon(label);
    if (brand && isOfficialIconUrl(brand.iconUrl)) {
      officialUrl = brand.iconUrl;
    }
  }

  // No official brand mapping -> legitimate custom badge (also covers native
  // stencil shapes handled elsewhere).
  if (!officialUrl) {
    if (findOfficialShape(label)) {
      // Native drawio stencil recognized: leave any existing image untouched.
      return existingImageUrl || generateCustomComponentBadge(label);
    }
    return generateCustomComponentBadge(label);
  }

  // 2. URL mode: keep the remote URL only if it is actually reachable,
  //    otherwise fall back to a custom badge (no broken box).
  if (mode === 'url') {
    const embedded = await fetchIconAsDataUri(officialUrl);
    return embedded === null ? generateCustomComponentBadge(label) : officialUrl;
  }

  // 3. Embed mode: inline the official SVG, badge on failure.
  const embedded = await fetchIconAsDataUri(officialUrl);
  return embedded === null ? generateCustomComponentBadge(label) : embedded;
}
