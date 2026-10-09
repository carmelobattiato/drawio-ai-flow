# Changelog

Tutte le modifiche rilevanti a questo progetto sono documentate in questo file.
Il formato si ispira a [Keep a Changelog](https://keepachangelog.com/it/1.1.0/);
il versioning è MAJOR.MINOR.

## [Unreleased]

---

## [0.4] — 2026-09-29

### Aggiunto
- Menu interattivo in `setup_and_run.sh` quando la porta è già occupata all'avvio: **1)** ferma il processo precedente e riavvia sulla stessa porta, **2)** scegli una nuova porta (validata 1-65535), **3)** annulla. Il controllo si ripete finché la porta scelta non è libera.

### Corretto
- `server.ts` ignorava l'argomento `--port` e partiva sempre sulla porta 8090: l'avvio su una porta alternativa risultava vuoto. Ora `resolvePort()` legge `--port`/`-p`/`--port=` da `argv`, poi la variabile d'ambiente `PORT`, infine il default 8090. Lo script esporta anche `PORT` come ulteriore fallback.

---

## [0.5] — 2026-10-09

### Aggiunto
- Streaming delle risposte LLM (SSE) sia per Google Gemini che per Custom AI: il testo appare progressivamente invece di comparire tutto insieme a fine generazione.
- Timer live durante la generazione (visibile nell'indicatore "Generazione in corso") e durata finale mostrata su ogni messaggio dell'assistente.
- Sistema di **patch strutturata** per le modifiche di un diagramma già generato: invece di riscrivere l'intero XML, il modello può restituire un elenco compatto di operazioni (`update`/`add`/`delete` per id), applicate deterministicamente dal client. Fallback automatico a rigenerazione XML completa se la patch non è applicabile, con notifica a scomparsa.
- Posizionamento automatico anti-sovrapposizione: quando una patch aggiunge un nodo a un container già popolato, il codice (non il modello) sceglie una posizione libera e allarga il container se necessario.
- Riuso delle icone già risolte tra una modifica e l'altra dello stesso diagramma (stesso id + stessa etichetta): nessuna ri-valutazione/ri-fetch per i nodi non toccati dalla richiesta.
- Nuova convenzione di prompt per etichette a due righe (`&#10;` invece di `<br><span>`), più robusta e priva di problemi di escaping XML.

### Cambiato
- Risoluzione delle icone ufficiali ora in parallelo (`Promise.all`) invece che in sequenza: tempo di attesa potenzialmente da N×5s a ~5s totali su diagrammi con molte icone.
- Rimossa la catena di fallback su più modelli Gemini in caso di errore: ora un solo tentativo sul modello scelto, con messaggio di errore esplicito (nome modello + causa) così l'utente può cambiarlo manualmente senza attese inutili.

### Corretto
- Etichette con testo HTML visibile letteralmente (es. `<br><span style="...">`) causate da doppio escaping delle entità XML da parte del modello: ora decodificate correttamente.
- Icone che cambiavano aspetto (badge ↔ logo ufficiale) tra una modifica e l'altra dello stesso diagramma anche su nodi non toccati dalla richiesta.

---

## [0.3] — 2026-09-29

### Aggiunto
- Catalogo icone ufficiali esteso ai vendor enterprise dell'ecosistema partner: Red Hat, OpenShift, IBM, Oracle, MongoDB, Windows, Apache, Linux, Microsoft Office, Fortinet, Microsoft, Azure, AWS, SAP, Salesforce, Adobe, VMware, Cisco, Dell, Intel, NVIDIA, Snowflake, Databricks, Teradata, Cloudera, Kafka, Spark, Hadoop, Elasticsearch, Tableau, MySQL, MariaDB, Palo Alto, Splunk, Okta, Datadog, Grafana, Prometheus, Terraform, Ansible, GitLab, Jenkins, Atlassian, NGINX, Ubuntu, UiPath, MuleSoft. Loghi da `simple-icons`, `@lobehub/icons`, `gilbarbara/logos` e `devicon` (tutti via jsdelivr). Il system prompt cita i nuovi vendor.

### Corretto
- Corretti gli URL di parecchie icone pre-esistenti che puntavano a slug lobehub inesistenti (es. `docker-color`, `kubernetes-color`, `postgresql-color`, `redis-color`, `firebase-color`, `python-color`, GCP Run/Functions/Pub-Sub) e rendevano icone rotte; ora usano sorgenti ufficiali verificate.

---

## [0.2] — 2026-09-29

### Aggiunto
- Toggle "Logo ufficiali" nelle impostazioni: modalità **Incorpora** (SVG in base64/data URI nel diagramma, funziona offline, file più pesante) o **URL** (link CDN, file leggero, richiede internet). Nuovo campo `iconMode` in `ApiConfig`, default `embed`.
- Controllo di validità sulle icone prima del rilascio (`isValidDrawioImage`): un'icona ufficiale irraggiungibile (404/timeout/non-SVG) o malformata viene sostituita da un badge custom generato, così non compaiono mai icone rotte.
- Versione applicazione mostrata nell'header, letta da `package.json`.

### Cambiato
- Le icone dei provider ora usano i **logo ufficiali** (`@lobehub/icons-static-svg` e `simple-icons` via CDN), come la skill di riferimento, invece delle approssimazioni disegnate a mano. Il badge custom con le iniziali è usato solo come fallback quando il logo ufficiale non è disponibile.

### Corretto
- Icone rese come "immagine rotta" in draw.io: i data URI usavano la forma `data:image/svg+xml;base64,...` il cui `;` veniva interpretato come separatore di proprietà dello stile draw.io, troncando il valore. Ora si usa la forma URL-encoded `data:image/svg+xml,<encoded>` senza `;`, valida sia in draw.io sia nel browser.

---

## [0.1] — 2026-09-29

- Primo commit — inizializzazione del progetto drawio-ai-flow

---
