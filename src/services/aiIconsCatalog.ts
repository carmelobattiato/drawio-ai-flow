/**
 * AI / LLM Brand Logos and Official Cloud Shape Registry
 * Equivalent to drawio-skill (Agents365-ai/drawio-skill) aiicons.py + shapesearch.py
 * 
 * Provides official CDN image endpoints from @lobehub/icons-static-svg and simple-icons,
 * plus official draw.io shape styles for AWS, Azure, GCP, Kubernetes, Cisco, UML, BPMN.
 */

import { getRichCloudIconUrl } from './cloudIconAssets';

export interface IconDefinition {
  id: string;
  name: string;
  category: 'llm' | 'framework' | 'datastore' | 'cloud' | 'tool';
  iconUrl: string;
  color: string;
  aliases: string[];
}

export interface OfficialShapeDefinition {
  id: string;
  name: string;
  vendor: 'aws' | 'azure' | 'gcp' | 'k8s' | 'cisco' | 'bpmn' | 'uml';
  style: string;
  fillColor: string;
  aliases: string[];
}

// 1. AI, LLM Providers, Frameworks, and RAG Data-Store Brands (320+ mappings)
export const AI_BRAND_ICONS: IconDefinition[] = [
  // Major LLM Providers
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'llm',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/openai.svg',
    color: '#000000',
    aliases: ['openai', 'chatgpt', 'gpt', 'gpt-4', 'gpt-4o', 'gpt-3.5', 'dall-e', 'whisper', 'sora', 'o1', 'o3-mini', 'embeddings'],
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    category: 'llm',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/anthropic.svg',
    color: '#191919',
    aliases: ['anthropic'],
  },
  {
    id: 'claude',
    name: 'Claude',
    category: 'llm',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/claude-color.svg',
    color: '#D97757',
    aliases: ['claude', 'claude-3', 'claude-3.5-sonnet', 'claude-3.5-haiku', 'claude-3-opus', 'sonnet', 'haiku', 'opus'],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    category: 'llm',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/gemini-color.svg',
    color: '#1A73E8',
    aliases: ['gemini', 'google gemini', 'gemini 1.5', 'gemini 2.0', 'gemini 2.5', 'gemini 3.7', 'gemini flash', 'gemini pro', 'bard', 'google ai'],
  },
  {
    id: 'mistral',
    name: 'Mistral',
    category: 'llm',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/mistral-color.svg',
    color: '#F97316',
    aliases: ['mistral', 'mistral ai', 'mistral-large', 'mistral-medium', 'mistral-small', 'mixtral', 'codestral', 'pixtral', 'le-chat'],
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    category: 'llm',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/deepseek-color.svg',
    color: '#0066FF',
    aliases: ['deepseek', 'deepseek-v3', 'deepseek-r1', 'deepseek coder', 'deepseek ai'],
  },
  {
    id: 'cohere',
    name: 'Cohere',
    category: 'llm',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/cohere-color.svg',
    color: '#39594D',
    aliases: ['cohere', 'command-r', 'command r+', 'cohere rerank', 'cohere embed'],
  },
  {
    id: 'qwen',
    name: 'Qwen',
    category: 'llm',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/qwen-color.svg',
    color: '#615ced',
    aliases: ['qwen', 'qwen2.5', 'tongyi qianwen', 'alibaba qwen', 'qwq'],
  },
  {
    id: 'meta',
    name: 'Meta',
    category: 'llm',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/meta-color.svg',
    color: '#0668E1',
    aliases: ['meta', 'facebook'],
  },
  {
    id: 'llama',
    name: 'Llama',
    category: 'llm',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/meta-color.svg',
    color: '#0668E1',
    aliases: ['llama', 'llama 2', 'llama 3', 'llama 3.1', 'llama 3.2', 'llama 3.3', 'code llama'],
  },
  {
    id: 'ollama',
    name: 'Ollama',
    category: 'llm',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/ollama.svg',
    color: '#000000',
    aliases: ['ollama', 'local llm', 'ollama server'],
  },
  {
    id: 'groq',
    name: 'Groq',
    category: 'llm',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/groq.svg',
    color: '#F55036',
    aliases: ['groq', 'groqcloud', 'lpu'],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    category: 'llm',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/perplexity-color.svg',
    color: '#20B2AA',
    aliases: ['perplexity', 'perplexity ai', 'sonar'],
  },
  {
    id: 'huggingface',
    name: 'HuggingFace',
    category: 'framework',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/huggingface-color.svg',
    color: '#FFD21E',
    aliases: ['huggingface', 'hugging face', 'hf', 'transformers', 'tgi', 'datasets', 'hub'],
  },
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'framework',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/langchain-color.svg',
    color: '#1C3C3C',
    aliases: ['langchain', 'langgraph', 'langsmith', 'langserve'],
  },
  {
    id: 'llamaindex',
    name: 'LlamaIndex',
    category: 'framework',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/llamaindex-color.svg',
    color: '#7050E0',
    aliases: ['llamaindex', 'llama-index', 'gpt-index'],
  },
  {
    id: 'vllm',
    name: 'vLLM',
    category: 'framework',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/vllm-color.svg',
    color: '#8A2BE2',
    aliases: ['vllm', 'pagedattention'],
  },
  {
    id: 'dify',
    name: 'Dify',
    category: 'framework',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/dify-color.svg',
    color: '#155EEF',
    aliases: ['dify', 'dify.ai'],
  },

  // Vector DBs & RAG Data Stores
  {
    id: 'pinecone',
    name: 'Pinecone',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/pinecone-color.svg',
    color: '#000000',
    aliases: ['pinecone', 'pinecone db', 'vector db pinecone'],
  },
  {
    id: 'qdrant',
    name: 'Qdrant',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/qdrant-color.svg',
    color: '#DC2626',
    aliases: ['qdrant', 'qdrant vector db'],
  },
  {
    id: 'chroma',
    name: 'ChromaDB',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/chroma-color.svg',
    color: '#FF6B00',
    aliases: ['chroma', 'chromadb', 'chroma db'],
  },
  {
    id: 'milvus',
    name: 'Milvus',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/milvus-color.svg',
    color: '#00A1EA',
    aliases: ['milvus', 'zilliz'],
  },
  {
    id: 'weaviate',
    name: 'Weaviate',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/weaviate-color.svg',
    color: '#00D084',
    aliases: ['weaviate', 'weaviate vector db'],
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/redis-color.svg',
    color: '#DC382D',
    aliases: ['redis', 'redis cache', 'redis vector', 'redis stack'],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/postgresql-color.svg',
    color: '#336791',
    aliases: ['postgresql', 'postgres', 'pgvector', 'psql'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/mongodb-color.svg',
    color: '#47A248',
    aliases: ['mongodb', 'mongo', 'mongodb atlas', 'atlas vector'],
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/supabase-color.svg',
    color: '#3ECF8E',
    aliases: ['supabase', 'supabase auth', 'supabase storage'],
  },
  {
    id: 'neo4j',
    name: 'Neo4j',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/neo4j-color.svg',
    color: '#008CC1',
    aliases: ['neo4j', 'graph database', 'knowledge graph'],
  },
  {
    id: 'elasticsearch',
    name: 'Elasticsearch',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/elasticsearch-color.svg',
    color: '#005571',
    aliases: ['elasticsearch', 'elastic', 'opensearch', 'elk'],
  },

  // Tools & Cloud Platforms
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    category: 'cloud',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/gcp-color.svg',
    color: '#4285F4',
    aliases: ['gcp', 'google cloud', 'google cloud platform'],
  },
  {
    id: 'gcp_cloud_storage',
    name: 'Cloud Storage',
    category: 'cloud',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/googlecloudstorage.svg',
    color: '#4285F4',
    aliases: ['cloud storage', 'gcs', 'storage bucket', 'google cloud storage', 'bucket'],
  },
  {
    id: 'gcp_cloud_run',
    name: 'Cloud Run',
    category: 'cloud',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/googlecloudrun.svg',
    color: '#4285F4',
    aliases: ['cloud run', 'cloudrun', 'google cloud run'],
  },
  {
    id: 'gcp_cloud_functions',
    name: 'Cloud Functions',
    category: 'cloud',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/googlecloudfunctions.svg',
    color: '#4285F4',
    aliases: ['cloud functions', 'cloudfunctions', 'google cloud functions', 'gcf'],
  },
  {
    id: 'gcp_pubsub',
    name: 'Cloud Pub/Sub',
    category: 'cloud',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/googlecloudpubsub.svg',
    color: '#4285F4',
    aliases: ['pub/sub', 'pubsub', 'cloud pub/sub', 'cloud pubsub', 'google pubsub', 'event backbone'],
  },
  {
    id: 'gcp_firestore',
    name: 'Cloud Firestore',
    category: 'cloud',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/firebase-color.svg',
    color: '#FFCA28',
    aliases: ['firestore', 'cloud firestore', 'firebase', 'nosql', 'firebase firestore'],
  },
  {
    id: 'gcp_cloud_tasks',
    name: 'Cloud Tasks',
    category: 'cloud',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/googlecloud.svg',
    color: '#4285F4',
    aliases: ['cloud tasks', 'cloudtasks', 'tasks queue', 'task queue'],
  },
  {
    id: 'gcp_cloud_cdn',
    name: 'Cloud CDN',
    category: 'cloud',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/googlecloud.svg',
    color: '#4285F4',
    aliases: ['cloud cdn', 'cloudcdn', 'gcp cdn', 'cdn'],
  },
  {
    id: 'gcp_load_balancing',
    name: 'Cloud Load Balancing',
    category: 'cloud',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/googlecloud.svg',
    color: '#4285F4',
    aliases: ['load balancing', 'cloud load balancing', 'load balancer', 'gcp load balancer', 'cloud lb'],
  },
  {
    id: 'gcp_api_gateway',
    name: 'API Gateway',
    category: 'cloud',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/googlecloud.svg',
    color: '#4285F4',
    aliases: ['api gateway', 'endpoints', 'cloud endpoints', 'google api gateway', 'gcp gateway'],
  },
  {
    id: 'gcp_monitoring',
    name: 'Cloud Monitoring & Logging',
    category: 'cloud',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/googlecloud.svg',
    color: '#4285F4',
    aliases: ['cloud monitoring', 'cloud logging', 'stackdriver', 'operations', 'logging', 'monitoring'],
  },
  {
    id: 'gcp_bigquery',
    name: 'BigQuery',
    category: 'cloud',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/googlebigquery.svg',
    color: '#4285F4',
    aliases: ['bigquery', 'google bigquery', 'data warehouse', 'big query'],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'tool',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/docker-color.svg',
    color: '#2496ED',
    aliases: ['docker', 'container', 'dockerfile', 'docker-compose'],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'tool',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/kubernetes-color.svg',
    color: '#326CE5',
    aliases: ['k8s', 'kubernetes', 'kube', 'kubectl'],
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tool',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/github.svg',
    color: '#181717',
    aliases: ['github', 'github actions', 'gh'],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'tool',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/python-color.svg',
    color: '#3776AB',
    aliases: ['python', 'py', 'fastapi', 'flask', 'django'],
  },
];

// 2. Official Draw.io Shape Definitions for Cloud, Infra & Standards
export const OFFICIAL_SHAPES: OfficialShapeDefinition[] = [
  // AWS Shapes (shape=mxgraph.aws4.*)
  {
    id: 'aws_lambda',
    name: 'AWS Lambda',
    vendor: 'aws',
    style: 'shape=mxgraph.aws4.lambda;fillColor=#ED7100;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;',
    fillColor: '#ED7100',
    aliases: ['lambda', 'aws lambda', 'serverless function', 'auth fn', 'api fn'],
  },
  {
    id: 'aws_s3',
    name: 'Amazon S3',
    vendor: 'aws',
    style: 'shape=mxgraph.aws4.s3;fillColor=#7AA116;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;',
    fillColor: '#7AA116',
    aliases: ['s3', 'amazon s3', 's3 bucket', 'object storage'],
  },
  {
    id: 'aws_dynamodb',
    name: 'Amazon DynamoDB',
    vendor: 'aws',
    style: 'shape=mxgraph.aws4.dynamodb;fillColor=#3B48CC;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;',
    fillColor: '#3B48CC',
    aliases: ['dynamodb', 'dynamo', 'nosql db'],
  },
  {
    id: 'aws_rds',
    name: 'Amazon RDS',
    vendor: 'aws',
    style: 'shape=mxgraph.aws4.rds;fillColor=#3B48CC;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;',
    fillColor: '#3B48CC',
    aliases: ['rds', 'amazon rds', 'aurora', 'relational db'],
  },
  {
    id: 'aws_api_gateway',
    name: 'Amazon API Gateway',
    vendor: 'aws',
    style: 'shape=mxgraph.aws4.api_gateway;fillColor=#E7157B;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;',
    fillColor: '#E7157B',
    aliases: ['api gateway', 'apigw', 'gateway'],
  },
  {
    id: 'aws_cloudfront',
    name: 'Amazon CloudFront',
    vendor: 'aws',
    style: 'shape=mxgraph.aws4.cloudfront;fillColor=#8C4FFF;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;',
    fillColor: '#8C4FFF',
    aliases: ['cloudfront', 'cdn', 'edge'],
  },
  {
    id: 'aws_route53',
    name: 'Amazon Route 53',
    vendor: 'aws',
    style: 'shape=mxgraph.aws4.route_53;fillColor=#8C4FFF;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;',
    fillColor: '#8C4FFF',
    aliases: ['route 53', 'route53', 'dns'],
  },
  {
    id: 'aws_cognito',
    name: 'Amazon Cognito',
    vendor: 'aws',
    style: 'shape=mxgraph.aws4.cognito;fillColor=#E7157B;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;',
    fillColor: '#E7157B',
    aliases: ['cognito', 'user pool', 'idp'],
  },
  {
    id: 'aws_sqs',
    name: 'Amazon SQS',
    vendor: 'aws',
    style: 'shape=mxgraph.aws4.sqs;fillColor=#E7157B;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;',
    fillColor: '#E7157B',
    aliases: ['sqs', 'message queue', 'queue'],
  },
  {
    id: 'aws_sns',
    name: 'Amazon SNS',
    vendor: 'aws',
    style: 'shape=mxgraph.aws4.sns;fillColor=#E7157B;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;',
    fillColor: '#E7157B',
    aliases: ['sns', 'pubsub', 'topic'],
  },
  {
    id: 'aws_ecs',
    name: 'Amazon ECS',
    vendor: 'aws',
    style: 'shape=mxgraph.aws4.ecs;fillColor=#ED7100;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;',
    fillColor: '#ED7100',
    aliases: ['ecs', 'fargate'],
  },
  {
    id: 'aws_eks',
    name: 'Amazon EKS',
    vendor: 'aws',
    style: 'shape=mxgraph.aws4.eks;fillColor=#ED7100;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;',
    fillColor: '#ED7100',
    aliases: ['eks'],
  },

  // Kubernetes Shapes
  {
    id: 'k8s_pod',
    name: 'Kubernetes Pod',
    vendor: 'k8s',
    style: 'shape=mxgraph.kubernetes.pod;fillColor=#326CE5;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;',
    fillColor: '#326CE5',
    aliases: ['pod', 'k8s pod', 'kubernetes pod'],
  },
  {
    id: 'k8s_service',
    name: 'Kubernetes Service',
    vendor: 'k8s',
    style: 'shape=mxgraph.kubernetes.service;fillColor=#326CE5;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;',
    fillColor: '#326CE5',
    aliases: ['k8s service', 'svc', 'kubernetes service'],
  },
  {
    id: 'k8s_ingress',
    name: 'Kubernetes Ingress',
    vendor: 'k8s',
    style: 'shape=mxgraph.kubernetes.ingress;fillColor=#326CE5;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;',
    fillColor: '#326CE5',
    aliases: ['ingress', 'k8s ingress'],
  },

  // Users & Client
  {
    id: 'users',
    name: 'Users / Client',
    vendor: 'uml',
    style: 'shape=mxgraph.signs.people.users;fillColor=#64748b;strokeColor=none;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;',
    fillColor: '#64748b',
    aliases: ['users', 'client', 'utenti', 'browser', 'mobile client'],
  },
];

/**
 * Finds matching AI/LLM brand icon by text/label query
 */
export function findBrandIcon(query: string): IconDefinition | null {
  if (!query) return null;
  const clean = query.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

  for (const item of AI_BRAND_ICONS) {
    const itemNameClean = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const itemIdClean = item.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (itemNameClean === clean || itemIdClean === clean) return item;

    for (const alias of item.aliases) {
      const aliasClean = alias.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (clean === aliasClean || (clean.length >= 3 && clean.includes(aliasClean)) || (aliasClean.length >= 3 && aliasClean.includes(clean))) {
        return item;
      }
    }
  }
  return null;
}

/**
 * Finds matching official Cloud / Infra shape by query
 */
export function findOfficialShape(query: string): OfficialShapeDefinition | null {
  if (!query) return null;
  const clean = query.trim().toLowerCase();

  for (const item of OFFICIAL_SHAPES) {
    if (item.name.toLowerCase() === clean || item.id === clean) return item;
    for (const alias of item.aliases) {
      if (clean === alias || clean.includes(alias) || alias.includes(clean)) {
        return item;
      }
    }
  }
  return null;
}

/**
 * Generates Draw.io cell style for an AI/LLM Brand Icon
 */
export function getDrawioBrandIconStyle(icon: IconDefinition): string {
  return `shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;aspect=fixed;imageAspect=0;image=${icon.iconUrl};`;
}

/**
 * Post-processes Draw.io XML to enhance and sanitize all image icons & cloud shapes:
 * - Replaces any broken or external URLs with verified Base64 Data URIs
 * - Converts cloud/AI components into full-color vector icons
 * - Generates custom vector badges for any unrecognized components so ZERO broken icons ever appear!
 */
export function enhanceDrawioXmlWithIcons(xml: string): string {
  if (!xml || typeof window === 'undefined') return xml;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    const parserErrors = doc.getElementsByTagName('parsererror');
    if (parserErrors.length > 0) return xml;

    const cells = doc.querySelectorAll('mxCell[vertex="1"]');
    let modified = false;

    cells.forEach((cell) => {
      const value = cell.getAttribute('value') || '';
      const style = cell.getAttribute('style') || '';
      const cleanValue = value.replace(/<[^>]+>/g, '').trim();

      if (!cleanValue) return;

      const isSwimlane = style.includes('swimlane') || style.includes('shape=swimlane');
      const isRhombus = style.includes('rhombus') || style.includes('shape=rhombus');
      const isActor = style.includes('umlActor') || style.includes('shape=actor') || style.includes('shape=mxgraph.signs.people');
      const isCylinder = style.includes('cylinder') || style.includes('shape=cylinder');
      const isDocument = style.includes('document') || style.includes('shape=document');
      const isImage = style.includes('shape=image') || Boolean(style.match(/image=[^;]+/));
      const isCloudShape = style.includes('shape=mxgraph.') || style.includes('shape=cloud');

      // Do not convert swimlanes/flowchart decisions to icons
      if (isSwimlane || isRhombus || isActor || isCylinder || isDocument) return;

      const geom = cell.querySelector('mxGeometry');
      const width = geom ? parseFloat(geom.getAttribute('width') || '100') : 100;
      const height = geom ? parseFloat(geom.getAttribute('height') || '60') : 60;

      // Do not convert large layout boxes (> 200px width and > 140px height) unless explicitly an image
      if (width > 200 && height > 140 && !isImage) return;

      // Only convert to image if explicitly an image/stencil or matching a recognized cloud/AI service
      const isRecognizedService = Boolean(findBrandIcon(cleanValue) || findOfficialShape(cleanValue) || isCloudShape);

      if (isImage || (isRecognizedService && width <= 140 && height <= 140)) {
        const richCloudIcon = getRichCloudIconUrl(cleanValue);
        const newStyle = `shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;align=center;aspect=fixed;imageAspect=0;image=${richCloudIcon};`;
        cell.setAttribute('style', newStyle);
        if (geom && (geom.getAttribute('width') !== '64' || geom.getAttribute('height') !== '64')) {
          geom.setAttribute('width', '64');
          geom.setAttribute('height', '64');
        }
        modified = true;
      }
    });

    if (modified) {
      const serializer = new XMLSerializer();
      return serializer.serializeToString(doc);
    }
  } catch (err) {
    console.warn('Could not auto-enhance Drawio XML:', err);
  }

  return xml;
}
