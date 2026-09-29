# Changelog

Tutte le modifiche rilevanti a questo progetto sono documentate in questo file.
Il formato si ispira a [Keep a Changelog](https://keepachangelog.com/it/1.1.0/);
il versioning è MAJOR.MINOR.

## [Unreleased]

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
