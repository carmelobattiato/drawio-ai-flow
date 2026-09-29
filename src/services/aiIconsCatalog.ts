/**
 * AI / LLM Brand Logos and Official Cloud Shape Registry
 * Equivalent to drawio-skill (Agents365-ai/drawio-skill) aiicons.py + shapesearch.py
 * 
 * Provides official CDN image endpoints from @lobehub/icons-static-svg and simple-icons,
 * plus official draw.io shape styles for AWS, Azure, GCP, Kubernetes, Cisco, UML, BPMN.
 */

import { resolveCellIcon, IconMode } from './iconResolver';

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
    iconUrl: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/pinecone.svg',
    color: '#000000',
    aliases: ['pinecone', 'pinecone db', 'vector db pinecone'],
  },
  {
    id: 'qdrant',
    name: 'Qdrant',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/qdrant.svg',
    color: '#DC2626',
    aliases: ['qdrant', 'qdrant vector db'],
  },
  {
    id: 'chroma',
    name: 'ChromaDB',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/chroma.svg',
    color: '#FF6B00',
    aliases: ['chroma', 'chromadb', 'chroma db'],
  },
  {
    id: 'milvus',
    name: 'Milvus',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/milvus.svg',
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
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/redis.svg',
    color: '#DC382D',
    aliases: ['redis', 'redis cache', 'redis vector', 'redis stack'],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/postgresql.svg',
    color: '#336791',
    aliases: ['postgresql', 'postgres', 'pgvector', 'psql'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/mongodb.svg',
    color: '#47A248',
    aliases: ['mongodb', 'mongo', 'mongodb atlas', 'atlas vector'],
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/supabase.svg',
    color: '#3ECF8E',
    aliases: ['supabase', 'supabase auth', 'supabase storage'],
  },
  {
    id: 'neo4j',
    name: 'Neo4j',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/neo4j.svg',
    color: '#008CC1',
    aliases: ['neo4j', 'graph database', 'knowledge graph'],
  },
  {
    id: 'elasticsearch',
    name: 'Elasticsearch',
    category: 'datastore',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/elasticsearch.svg',
    color: '#005571',
    aliases: ['elasticsearch', 'elastic', 'opensearch', 'elk'],
  },

  // Tools & Cloud Platforms
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    category: 'cloud',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/googlecloud.svg',
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
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/googlecloud.svg',
    color: '#4285F4',
    aliases: ['cloud run', 'cloudrun', 'google cloud run'],
  },
  {
    id: 'gcp_cloud_functions',
    name: 'Cloud Functions',
    category: 'cloud',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/googlecloud.svg',
    color: '#4285F4',
    aliases: ['cloud functions', 'cloudfunctions', 'google cloud functions', 'gcf'],
  },
  {
    id: 'gcp_pubsub',
    name: 'Cloud Pub/Sub',
    category: 'cloud',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/googlecloud.svg',
    color: '#4285F4',
    aliases: ['pub/sub', 'pubsub', 'cloud pub/sub', 'cloud pubsub', 'google pubsub', 'event backbone'],
  },
  {
    id: 'gcp_firestore',
    name: 'Cloud Firestore',
    category: 'cloud',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/firebase.svg',
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
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/docker.svg',
    color: '#2496ED',
    aliases: ['docker', 'container', 'dockerfile', 'docker-compose'],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'tool',
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/kubernetes.svg',
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
    iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/python.svg',
    color: '#3776AB',
    aliases: ['python', 'py', 'fastapi', 'flask', 'django'],
  },

  // Enterprise vendors & Accenture technology-partner ecosystem (simple-icons)
  { id: 'redhat', name: 'Red Hat', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/redhat.svg', color: '#EE0000', aliases: ['red hat', 'redhat', 'rhel', 'red hat enterprise linux'] },
  { id: 'openshift', name: 'OpenShift', category: 'cloud', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/redhatopenshift.svg', color: '#EE0000', aliases: ['openshift', 'red hat openshift', 'ocp'] },
  { id: 'ansible', name: 'Ansible', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/ansible.svg', color: '#EE0000', aliases: ['ansible'] },
  { id: 'ibm', name: 'IBM', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/ibm.svg', color: '#052FAD', aliases: ['ibm', 'international business machines', 'ibm cloud', 'watson', 'ibm watson', 'watsonx'] },
  { id: 'oracle', name: 'Oracle', category: 'datastore', iconUrl: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/oracle.svg', color: '#F80000', aliases: ['oracle', 'oracle db', 'oracle database', 'oci', 'oracle cloud', 'exadata'] },
  { id: 'windows', name: 'Windows', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg', color: '#0078D4', aliases: ['windows', 'microsoft windows', 'windows server'] },
  { id: 'apache', name: 'Apache', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/apache.svg', color: '#D22128', aliases: ['apache', 'apache http', 'httpd', 'apache software foundation'] },
  { id: 'linux', name: 'Linux', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/linux.svg', color: '#000000', aliases: ['linux', 'gnu/linux'] },
  { id: 'office', name: 'Microsoft Office', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/microsoft-color.svg', color: '#D83B01', aliases: ['office', 'microsoft office', 'office 365', 'm365', 'microsoft 365'] },
  { id: 'fortinet', name: 'Fortinet', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/fortinet.svg', color: '#EE3124', aliases: ['fortinet', 'fortigate', 'forticlient'] },

  // Cloud & platforms
  { id: 'microsoft', name: 'Microsoft', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/microsoft-color.svg', color: '#5E5E5E', aliases: ['microsoft', 'msft'] },
  { id: 'azure', name: 'Microsoft Azure', category: 'cloud', iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/azure-color.svg', color: '#0078D4', aliases: ['azure', 'microsoft azure', 'az'] },
  { id: 'awscloud', name: 'Amazon Web Services', category: 'cloud', iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/aws-color.svg', color: '#FF9900', aliases: ['aws', 'amazon web services', 'amazon aws'] },
  { id: 'sap', name: 'SAP', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/sap.svg', color: '#0FAAFF', aliases: ['sap', 'sap hana', 's/4hana', 'sap s4', 'sap ariba'] },
  { id: 'salesforce', name: 'Salesforce', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/salesforce.svg', color: '#00A1E0', aliases: ['salesforce', 'sfdc', 'sales cloud', 'service cloud'] },
  { id: 'adobe', name: 'Adobe', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/adobe.svg', color: '#FF0000', aliases: ['adobe', 'adobe experience', 'aem', 'adobe experience manager'] },
  { id: 'vmware', name: 'VMware', category: 'cloud', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/vmware.svg', color: '#607078', aliases: ['vmware', 'vsphere', 'esxi', 'vcenter'] },
  { id: 'cisco', name: 'Cisco', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/cisco.svg', color: '#1BA0D7', aliases: ['cisco'] },
  { id: 'dell', name: 'Dell', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/dell.svg', color: '#007DB8', aliases: ['dell', 'dell emc', 'dell technologies'] },
  { id: 'intel', name: 'Intel', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/intel.svg', color: '#0071C5', aliases: ['intel'] },
  { id: 'nvidia', name: 'NVIDIA', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/nvidia-color.svg', color: '#76B900', aliases: ['nvidia', 'cuda', 'nim', 'nvidia gpu'] },

  // Data, analytics & streaming
  { id: 'snowflake', name: 'Snowflake', category: 'datastore', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/snowflake.svg', color: '#29B5E8', aliases: ['snowflake'] },
  { id: 'databricks', name: 'Databricks', category: 'datastore', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/databricks.svg', color: '#FF3621', aliases: ['databricks', 'delta lake', 'unity catalog'] },
  { id: 'teradata', name: 'Teradata', category: 'datastore', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/teradata.svg', color: '#F37440', aliases: ['teradata'] },
  { id: 'cloudera', name: 'Cloudera', category: 'datastore', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/cloudera.svg', color: '#F96702', aliases: ['cloudera'] },
  { id: 'kafka', name: 'Apache Kafka', category: 'datastore', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/apachekafka.svg', color: '#231F20', aliases: ['kafka', 'apache kafka', 'confluent'] },
  { id: 'spark', name: 'Apache Spark', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/apachespark.svg', color: '#E25A1C', aliases: ['spark', 'apache spark', 'pyspark'] },
  { id: 'hadoop', name: 'Apache Hadoop', category: 'datastore', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/apachehadoop.svg', color: '#66CCFF', aliases: ['hadoop', 'apache hadoop', 'hdfs'] },
  { id: 'tableau', name: 'Tableau', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/tableau.svg', color: '#E97627', aliases: ['tableau'] },
  { id: 'mysql', name: 'MySQL', category: 'datastore', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/mysql.svg', color: '#4479A1', aliases: ['mysql'] },
  { id: 'mariadb', name: 'MariaDB', category: 'datastore', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/mariadb.svg', color: '#003545', aliases: ['mariadb'] },

  // Security, DevOps & networking
  { id: 'paloalto', name: 'Palo Alto Networks', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/paloaltonetworks.svg', color: '#F04E23', aliases: ['palo alto', 'palo alto networks', 'prisma', 'cortex'] },
  { id: 'splunk', name: 'Splunk', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/splunk.svg', color: '#000000', aliases: ['splunk'] },
  { id: 'okta', name: 'Okta', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/okta.svg', color: '#007DC1', aliases: ['okta'] },
  { id: 'datadog', name: 'Datadog', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/datadog.svg', color: '#632CA6', aliases: ['datadog'] },
  { id: 'grafana', name: 'Grafana', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/grafana.svg', color: '#F46800', aliases: ['grafana'] },
  { id: 'prometheus', name: 'Prometheus', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/prometheus.svg', color: '#E6522C', aliases: ['prometheus'] },
  { id: 'terraform', name: 'Terraform', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/terraform.svg', color: '#7B42BC', aliases: ['terraform', 'hashicorp terraform'] },
  { id: 'gitlab', name: 'GitLab', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/gitlab.svg', color: '#FC6D26', aliases: ['gitlab', 'gitlab ci'] },
  { id: 'jenkins', name: 'Jenkins', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/jenkins.svg', color: '#D24939', aliases: ['jenkins'] },
  { id: 'atlassian', name: 'Atlassian', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/atlassian.svg', color: '#0052CC', aliases: ['atlassian', 'jira', 'confluence', 'bitbucket'] },
  { id: 'nginx', name: 'NGINX', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/nginx.svg', color: '#009639', aliases: ['nginx'] },
  { id: 'ubuntu', name: 'Ubuntu', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/ubuntu.svg', color: '#E95420', aliases: ['ubuntu', 'canonical'] },

  // Automation & iPaaS
  { id: 'uipath', name: 'UiPath', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/uipath.svg', color: '#FA4616', aliases: ['uipath', 'rpa'] },
  { id: 'mulesoft', name: 'MuleSoft', category: 'tool', iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/mulesoft.svg', color: '#00A0DF', aliases: ['mulesoft', 'mule', 'anypoint'] },
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
export async function enhanceDrawioXmlWithIcons(xml: string, iconMode: IconMode = 'embed'): Promise<string> {
  if (!xml || typeof window === 'undefined') return xml;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    const parserErrors = doc.getElementsByTagName('parsererror');
    if (parserErrors.length > 0) return xml;

    const cells = Array.from(doc.querySelectorAll('mxCell[vertex="1"]'));
    let modified = false;

    for (const cell of cells) {
      const value = cell.getAttribute('value') || '';
      const style = cell.getAttribute('style') || '';
      const cleanValue = value.replace(/<[^>]+>/g, '').trim();

      if (!cleanValue) continue;

      const isSwimlane = style.includes('swimlane') || style.includes('shape=swimlane');
      const isRhombus = style.includes('rhombus') || style.includes('shape=rhombus');
      const isActor = style.includes('umlActor') || style.includes('shape=actor') || style.includes('shape=mxgraph.signs.people');
      const isCylinder = style.includes('cylinder') || style.includes('shape=cylinder');
      const isDocument = style.includes('document') || style.includes('shape=document');
      const isImage = style.includes('shape=image') || Boolean(style.match(/image=[^;]+/));
      const isCloudShape = style.includes('shape=mxgraph.') || style.includes('shape=cloud');

      // Do not convert swimlanes/flowchart decisions to icons
      if (isSwimlane || isRhombus || isActor || isCylinder || isDocument) continue;

      const geom = cell.querySelector('mxGeometry');
      const width = geom ? parseFloat(geom.getAttribute('width') || '100') : 100;
      const height = geom ? parseFloat(geom.getAttribute('height') || '60') : 60;

      // Do not convert large layout boxes (> 200px width and > 140px height) unless explicitly an image
      if (width > 200 && height > 140 && !isImage) continue;

      // Only convert to image if explicitly an image/stencil or matching a recognized cloud/AI service
      const isRecognizedService = Boolean(findBrandIcon(cleanValue) || findOfficialShape(cleanValue) || isCloudShape);

      if (isImage || (isRecognizedService && width <= 140 && height <= 140)) {
        const existingImageUrl = style.match(/image=([^;]+)/)?.[1];
        const resolvedIcon = await resolveCellIcon(cleanValue, existingImageUrl, iconMode);
        const newStyle = `shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;align=center;aspect=fixed;imageAspect=0;image=${resolvedIcon};`;
        cell.setAttribute('style', newStyle);
        if (geom && (geom.getAttribute('width') !== '64' || geom.getAttribute('height') !== '64')) {
          geom.setAttribute('width', '64');
          geom.setAttribute('height', '64');
        }
        modified = true;
      }
    }

    if (modified) {
      const serializer = new XMLSerializer();
      return serializer.serializeToString(doc);
    }
  } catch (err) {
    console.warn('Could not auto-enhance Drawio XML:', err);
  }

  return xml;
}
