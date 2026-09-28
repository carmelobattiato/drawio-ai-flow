export interface TemplateItem {
  id: string;
  title: string;
  category: string;
  description: string;
  xml: string;
}

export const DIAGRAM_TEMPLATES: TemplateItem[] = [
  {
    id: 'arch_llm_multiprovider',
    title: 'Multi-Provider LLM & AI Agents Architecture',
    category: 'AI / LLM Architecture',
    description: 'Architettura multi-modello AI con loghi ufficiali OpenAI, Anthropic, Gemini, Mistral, Cohere, DeepSeek, Qwen, Ollama, LangChain, LlamaIndex e HuggingFace.',
    xml: `<mxfile host="app.diagrams.net" agent="DrawIO-AI-Studio" version="24.0.0" type="device">
  <diagram id="diag_llm_multi" name="Multi-Provider LLM Architecture">
    <mxGraphModel dx="1400" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="900" background="#ffffff">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Title Banner -->
        <mxCell id="banner_title" value="Multi-Provider LLM Architecture — Brand Logos" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#f8fafc;strokeColor=#cbd5e1;strokeWidth=1.5;fontColor=#1e293b;fontStyle=1;fontSize=18;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="380" y="30" width="460" height="50" as="geometry"/>
        </mxCell>

        <!-- Client UI -->
        <mxCell id="node_chat_ui" value="Chat UI / Client" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#eff6ff;strokeColor=#2563eb;strokeWidth=2;fontColor=#1e3a8a;fontStyle=1;fontSize=13;" vertex="1" parent="1">
          <mxGeometry x="60" y="270" width="140" height="70" as="geometry"/>
        </mxCell>

        <!-- LangChain Core -->
        <mxCell id="logo_langchain" value="LangChain" style="shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;align=center;aspect=fixed;imageAspect=0;image=https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/langchain-color.svg;fontStyle=1;fontSize=12;fontColor=#0f172a;" vertex="1" parent="1">
          <mxGeometry x="270" y="265" width="80" height="80" as="geometry"/>
        </mxCell>

        <!-- LlamaIndex -->
        <mxCell id="logo_llamaindex" value="LlamaIndex" style="shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;align=center;aspect=fixed;imageAspect=0;image=https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/llamaindex-color.svg;fontStyle=1;fontSize=12;fontColor=#0f172a;" vertex="1" parent="1">
          <mxGeometry x="210" y="440" width="70" height="70" as="geometry"/>
        </mxCell>

        <!-- HuggingFace -->
        <mxCell id="logo_huggingface" value="HuggingFace" style="shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;align=center;aspect=fixed;imageAspect=0;image=https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/huggingface-color.svg;fontStyle=1;fontSize=12;fontColor=#0f172a;" vertex="1" parent="1">
          <mxGeometry x="340" y="440" width="70" height="70" as="geometry"/>
        </mxCell>

        <!-- LLM Providers Container -->
        <mxCell id="box_llm_providers" value="LLM Providers (Frontier &amp; Open Weights)" style="swimlane;whiteSpace=wrap;html=1;startSize=28;fillColor=#faf5ff;strokeColor=#a855f7;strokeWidth=1.5;fontColor=#6b21a8;fontStyle=1;fontSize=13;dashed=1;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="500" y="150" width="560" height="380" as="geometry"/>
        </mxCell>

        <!-- Row 1 Logos -->
        <mxCell id="logo_openai" value="OpenAI" style="shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;align=center;aspect=fixed;imageAspect=0;image=https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/openai.svg;fontStyle=1;fontSize=11;" vertex="1" parent="box_llm_providers">
          <mxGeometry x="35" y="60" width="64" height="64" as="geometry"/>
        </mxCell>

        <mxCell id="logo_anthropic" value="Anthropic" style="shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;align=center;aspect=fixed;imageAspect=0;image=https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/anthropic.svg;fontStyle=1;fontSize=11;" vertex="1" parent="box_llm_providers">
          <mxGeometry x="170" y="60" width="64" height="64" as="geometry"/>
        </mxCell>

        <mxCell id="logo_gemini" value="Gemini" style="shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;align=center;aspect=fixed;imageAspect=0;image=https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/gemini-color.svg;fontStyle=1;fontSize=11;" vertex="1" parent="box_llm_providers">
          <mxGeometry x="305" y="60" width="64" height="64" as="geometry"/>
        </mxCell>

        <mxCell id="logo_mistral" value="Mistral" style="shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;align=center;aspect=fixed;imageAspect=0;image=https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/mistral-color.svg;fontStyle=1;fontSize=11;" vertex="1" parent="box_llm_providers">
          <mxGeometry x="440" y="60" width="64" height="64" as="geometry"/>
        </mxCell>

        <!-- Row 2 Logos -->
        <mxCell id="logo_cohere" value="Cohere" style="shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;align=center;aspect=fixed;imageAspect=0;image=https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/cohere-color.svg;fontStyle=1;fontSize=11;" vertex="1" parent="box_llm_providers">
          <mxGeometry x="35" y="210" width="64" height="64" as="geometry"/>
        </mxCell>

        <mxCell id="logo_deepseek" value="DeepSeek" style="shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;align=center;aspect=fixed;imageAspect=0;image=https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/deepseek-color.svg;fontStyle=1;fontSize=11;" vertex="1" parent="box_llm_providers">
          <mxGeometry x="170" y="210" width="64" height="64" as="geometry"/>
        </mxCell>

        <mxCell id="logo_qwen" value="Qwen" style="shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;align=center;aspect=fixed;imageAspect=0;image=https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/qwen-color.svg;fontStyle=1;fontSize=11;" vertex="1" parent="box_llm_providers">
          <mxGeometry x="305" y="210" width="64" height="64" as="geometry"/>
        </mxCell>

        <mxCell id="logo_ollama" value="Ollama" style="shape=image;html=1;verticalLabelPosition=bottom;labelBackgroundColor=default;verticalAlign=top;align=center;aspect=fixed;imageAspect=0;image=https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/ollama.svg;fontStyle=1;fontSize=11;" vertex="1" parent="box_llm_providers">
          <mxGeometry x="440" y="210" width="64" height="64" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        <mxCell id="edge_ui_langchain" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;strokeWidth=2;" edge="1" parent="1" source="node_chat_ui" target="logo_langchain">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge_lc_llama" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7050e0;strokeWidth=2;" edge="1" parent="1" source="logo_langchain" target="logo_llamaindex">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge_lc_hf" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#eab308;strokeWidth=2;" edge="1" parent="1" source="logo_langchain" target="logo_huggingface">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge_lc_providers" value="API Invocation" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333ea;strokeWidth=2;fontColor=#6b21a8;fontStyle=1;" edge="1" parent="1" source="logo_langchain" target="box_llm_providers">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`
  },
  {
    id: 'arch_aws_serverless_shapes',
    title: 'Serverless AWS Web App (Official Cloud Shapes)',
    category: 'Cloud Architecture',
    description: 'Architettura serverless su AWS con forme e stencil ufficiali Draw.io (Route 53, CloudFront, API Gateway, Cognito, Lambda, DynamoDB, S3, RDS).',
    xml: `<mxfile host="app.diagrams.net" agent="DrawIO-AI-Studio" version="24.0.0" type="device">
  <diagram id="diag_aws_serverless" name="Serverless Web App on AWS">
    <mxGraphModel dx="1400" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="900" background="#ffffff">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Tier 1: Client -->
        <mxCell id="tier_client" value="Client" style="swimlane;whiteSpace=wrap;html=1;startSize=24;fillColor=#f8fafc;strokeColor=#94a3b8;strokeWidth=1.5;fontColor=#475569;fontStyle=2;fontSize=12;dashed=1;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="50" y="80" width="180" height="520" as="geometry"/>
        </mxCell>
        <mxCell id="shape_users" value="Users" style="shape=mxgraph.signs.people.users;fillColor=#64748b;strokeColor=none;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;fontStyle=1;" vertex="1" parent="tier_client">
          <mxGeometry x="50" y="220" width="80" height="80" as="geometry"/>
        </mxCell>

        <!-- Tier 2: Edge / DNS -->
        <mxCell id="tier_edge" value="Edge / DNS" style="swimlane;whiteSpace=wrap;html=1;startSize=24;fillColor=#f8fafc;strokeColor=#94a3b8;strokeWidth=1.5;fontColor=#475569;fontStyle=2;fontSize=12;dashed=1;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="270" y="80" width="180" height="520" as="geometry"/>
        </mxCell>
        <mxCell id="shape_r53" value="Route 53" style="shape=mxgraph.aws4.route_53;fillColor=#8C4FFF;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;fontStyle=1;" vertex="1" parent="tier_edge">
          <mxGeometry x="55" y="60" width="70" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="shape_cloudfront" value="CloudFront" style="shape=mxgraph.aws4.cloudfront;fillColor=#8C4FFF;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;fontStyle=1;" vertex="1" parent="tier_edge">
          <mxGeometry x="55" y="370" width="70" height="70" as="geometry"/>
        </mxCell>

        <!-- Tier 3: API -->
        <mxCell id="tier_api" value="API" style="swimlane;whiteSpace=wrap;html=1;startSize=24;fillColor=#f8fafc;strokeColor=#94a3b8;strokeWidth=1.5;fontColor=#475569;fontStyle=2;fontSize=12;dashed=1;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="490" y="80" width="180" height="520" as="geometry"/>
        </mxCell>
        <mxCell id="shape_apigw" value="API Gateway" style="shape=mxgraph.aws4.api_gateway;fillColor=#E7157B;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;fontStyle=1;" vertex="1" parent="tier_api">
          <mxGeometry x="55" y="60" width="70" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="shape_cognito" value="Cognito" style="shape=mxgraph.aws4.cognito;fillColor=#E7157B;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;fontStyle=1;" vertex="1" parent="tier_api">
          <mxGeometry x="55" y="370" width="70" height="70" as="geometry"/>
        </mxCell>

        <!-- Tier 4: Compute -->
        <mxCell id="tier_compute" value="Compute" style="swimlane;whiteSpace=wrap;html=1;startSize=24;fillColor=#f8fafc;strokeColor=#94a3b8;strokeWidth=1.5;fontColor=#475569;fontStyle=2;fontSize=12;dashed=1;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="710" y="80" width="180" height="520" as="geometry"/>
        </mxCell>
        <mxCell id="shape_lambda_auth" value="Auth Fn" style="shape=mxgraph.aws4.lambda;fillColor=#ED7100;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;fontStyle=1;" vertex="1" parent="tier_compute">
          <mxGeometry x="55" y="60" width="70" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="shape_lambda_api" value="API Fn" style="shape=mxgraph.aws4.lambda;fillColor=#ED7100;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;fontStyle=1;" vertex="1" parent="tier_compute">
          <mxGeometry x="55" y="370" width="70" height="70" as="geometry"/>
        </mxCell>

        <!-- Tier 5: Data -->
        <mxCell id="tier_data" value="Data" style="swimlane;whiteSpace=wrap;html=1;startSize=24;fillColor=#f8fafc;strokeColor=#94a3b8;strokeWidth=1.5;fontColor=#475569;fontStyle=2;fontSize=12;dashed=1;rounded=1;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="930" y="80" width="180" height="520" as="geometry"/>
        </mxCell>
        <mxCell id="shape_dynamodb" value="DynamoDB" style="shape=mxgraph.aws4.dynamodb;fillColor=#3B48CC;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;fontStyle=1;" vertex="1" parent="tier_data">
          <mxGeometry x="55" y="60" width="70" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="shape_s3" value="S3 Bucket" style="shape=mxgraph.aws4.s3;fillColor=#7AA116;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;fontStyle=1;" vertex="1" parent="tier_data">
          <mxGeometry x="55" y="215" width="70" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="shape_rds" value="RDS" style="shape=mxgraph.aws4.rds;fillColor=#3B48CC;strokeColor=none;outlineConnect=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;aspect=fixed;fontStyle=1;" vertex="1" parent="tier_data">
          <mxGeometry x="55" y="370" width="70" height="70" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        <mxCell id="edge_users_r53" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748b;strokeWidth=1.5;" edge="1" parent="1" source="shape_users" target="shape_r53">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_users_cf" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748b;strokeWidth=1.5;" edge="1" parent="1" source="shape_users" target="shape_cloudfront">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_cf_cognito" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748b;strokeWidth=1.5;" edge="1" parent="1" source="shape_cloudfront" target="shape_cognito">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_apigw_auth" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748b;strokeWidth=1.5;" edge="1" parent="1" source="shape_apigw" target="shape_lambda_auth">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_auth_cognito" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748b;strokeWidth=1.5;" edge="1" parent="1" source="shape_lambda_auth" target="shape_cognito">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_cognito_apifn" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748b;strokeWidth=1.5;" edge="1" parent="1" source="shape_cognito" target="shape_lambda_api">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_apifn_dynamo" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748b;strokeWidth=1.5;" edge="1" parent="1" source="shape_lambda_api" target="shape_dynamodb">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_apifn_s3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748b;strokeWidth=1.5;" edge="1" parent="1" source="shape_lambda_api" target="shape_s3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_apifn_rds" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748b;strokeWidth=1.5;" edge="1" parent="1" source="shape_lambda_api" target="shape_rds">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`
  },
  {
    id: 'flowchart_ecommerce',
    title: 'E-Commerce Checkout Workflow',
    category: 'Flowchart',
    description: 'Flusso completo carrello, calcolo tasse, gateway di pagamento 3D-Secure, invio fattura e notifiche magazzino in Light Mode.',
    xml: `<mxfile host="app.diagrams.net" agent="DrawIO-AI-Studio" version="24.0.0" type="device">
  <diagram id="diag_ecommerce" name="Checkout Workflow">
    <mxGraphModel dx="1400" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" background="#ffffff">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Start Node -->
        <mxCell id="node_start" value="Avvio Carrello Utente" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#eff6ff;strokeColor=#2563eb;strokeWidth=2;fontColor=#1e3a8a;fontStyle=1;fontSize=13;" vertex="1" parent="1">
          <mxGeometry x="380" y="40" width="180" height="50" as="geometry"/>
        </mxCell>
        
        <!-- Validate Inventory -->
        <mxCell id="node_check_stock" value="Verifica Disponibilità Stock Magazzino" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#4f46e5;strokeWidth=1.5;fontColor=#0f172a;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="370" y="130" width="200" height="60" as="geometry"/>
        </mxCell>
        
        <!-- Decision Stock -->
        <mxCell id="node_stock_decision" value="Prodotti Disponibili?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#eef2ff;strokeColor=#6366f1;strokeWidth=2;fontColor=#312e81;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="390" y="230" width="160" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Out of stock notice -->
        <mxCell id="node_out_stock" value="Notifica Esaurito e Proponi Backorder" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#fef2f2;strokeColor=#dc2626;strokeWidth=1.5;fontColor=#991b1b;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="660" y="240" width="180" height="60" as="geometry"/>
        </mxCell>

        <!-- Payment Gateway -->
        <mxCell id="node_payment" value="Elaborazione Pagamento Stripe / 3D-Secure" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#4f46e5;strokeWidth=1.5;fontColor=#0f172a;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="365" y="360" width="210" height="60" as="geometry"/>
        </mxCell>

        <!-- Decision Payment -->
        <mxCell id="node_pay_decision" value="Transazione Approvata?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#eef2ff;strokeColor=#6366f1;strokeWidth=2;fontColor=#312e81;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="385" y="470" width="170" height="80" as="geometry"/>
        </mxCell>

        <!-- Retry Payment -->
        <mxCell id="node_pay_fail" value="Notifica Errore Pagamento / Richiedi Altra Carta" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#fef2f2;strokeColor=#dc2626;strokeWidth=1.5;fontColor=#991b1b;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="100" y="480" width="200" height="60" as="geometry"/>
        </mxCell>

        <!-- Save DB -->
        <mxCell id="node_db_order" value="Database Ordini &amp; Transazioni (PostgreSQL)" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#f0fdf4;strokeColor=#16a34a;strokeWidth=2;fontColor=#14532d;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="370" y="600" width="200" height="70" as="geometry"/>
        </mxCell>

        <!-- Send Notifications -->
        <mxCell id="node_notifications" value="Invio Email Conferma &amp; Webhook Magazzino ERP" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#faf5ff;strokeColor=#9333ea;strokeWidth=1.5;fontColor=#581c87;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="360" y="720" width="220" height="60" as="geometry"/>
        </mxCell>

        <!-- End Node -->
        <mxCell id="node_end" value="Ordine Completato con Successo" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#ecfdf5;strokeColor=#059669;strokeWidth=2;fontColor=#065f46;fontStyle=1;fontSize=13;" vertex="1" parent="1">
          <mxGeometry x="375" y="830" width="190" height="50" as="geometry"/>
        </mxCell>

        <!-- Edges -->
        <mxCell id="edge_1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;strokeWidth=2;" edge="1" parent="1" source="node_start" target="node_check_stock">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;strokeWidth=2;" edge="1" parent="1" source="node_check_stock" target="node_stock_decision">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_3" value="Sì" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16a34a;strokeWidth=2;fontColor=#15803d;" edge="1" parent="1" source="node_stock_decision" target="node_payment">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_4" value="No" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#dc2626;strokeWidth=2;fontColor=#b91c1c;" edge="1" parent="1" source="node_stock_decision" target="node_out_stock">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;strokeWidth=2;" edge="1" parent="1" source="node_payment" target="node_pay_decision">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_6" value="Approvato" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16a34a;strokeWidth=2;fontColor=#15803d;" edge="1" parent="1" source="node_pay_decision" target="node_db_order">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_7" value="Rifiutato" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#dc2626;strokeWidth=2;fontColor=#b91c1c;" edge="1" parent="1" source="node_pay_decision" target="node_pay_fail">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_8" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;strokeWidth=2;" edge="1" parent="1" source="node_db_order" target="node_notifications">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_9" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;" edge="1" parent="1" source="node_notifications" target="node_end">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`
  },
  {
    id: 'arch_microservices',
    title: 'Cloud Architecture Microservices',
    category: 'Architecture',
    description: 'Architettura cloud scalabile con API Gateway, Auth JWT, Cache Redis, Coda Kafka e Database in Light Mode.',
    xml: `<mxfile host="app.diagrams.net" agent="DrawIO-AI-Studio" version="24.0.0" type="device">
  <diagram id="diag_cloud_arch" name="Microservices Architecture">
    <mxGraphModel dx="1400" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="900" background="#ffffff">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Client Box -->
        <mxCell id="box_clients" value="Clients &amp; Edge" style="swimlane;whiteSpace=wrap;html=1;startSize=26;fillColor=#f8fafc;strokeColor=#0284c7;strokeWidth=1.5;fontColor=#0369a1;fontStyle=1;fontSize=12;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="40" y="80" width="180" height="340" as="geometry"/>
        </mxCell>
        <mxCell id="client_web" value="Web App (React/Vite)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#0284c7;strokeWidth=1.5;fontColor=#0f172a;fontSize=12;" vertex="1" parent="box_clients">
          <mxGeometry x="20" y="50" width="140" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="client_mobile" value="Mobile iOS/Android" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#0284c7;strokeWidth=1.5;fontColor=#0f172a;fontSize=12;" vertex="1" parent="box_clients">
          <mxGeometry x="20" y="140" width="140" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="client_3p" value="Partner API Clients" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#0284c7;strokeWidth=1.5;fontColor=#0f172a;fontSize=12;" vertex="1" parent="box_clients">
          <mxGeometry x="20" y="230" width="140" height="50" as="geometry"/>
        </mxCell>

        <!-- Gateway -->
        <mxCell id="node_gateway" value="API Gateway / Cloudflare Reverse Proxy &amp; WAF" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#eef2ff;strokeColor=#6366f1;strokeWidth=2;fontColor=#312e81;fontStyle=1;fontSize=13;" vertex="1" parent="1">
          <mxGeometry x="280" y="180" width="160" height="140" as="geometry"/>
        </mxCell>

        <!-- Services cluster -->
        <mxCell id="box_backend" value="Kubernetes Cluster / Microservices VPC" style="swimlane;whiteSpace=wrap;html=1;startSize=26;fillColor=#f8fafc;strokeColor=#6366f1;strokeWidth=1.5;fontColor=#4f46e5;fontStyle=1;fontSize=12;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="500" y="40" width="460" height="420" as="geometry"/>
        </mxCell>
        <mxCell id="srv_auth" value="Auth &amp; IAM Service (OAuth2 / JWT)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#4f46e5;strokeWidth=1.5;fontColor=#0f172a;fontSize=12;" vertex="1" parent="box_backend">
          <mxGeometry x="30" y="50" width="180" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="srv_orders" value="Order Processing Engine" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#4f46e5;strokeWidth=1.5;fontColor=#0f172a;fontSize=12;" vertex="1" parent="box_backend">
          <mxGeometry x="30" y="140" width="180" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="srv_inventory" value="Inventory &amp; Catalog API" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#4f46e5;strokeWidth=1.5;fontColor=#0f172a;fontSize=12;" vertex="1" parent="box_backend">
          <mxGeometry x="30" y="230" width="180" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="srv_events" value="Event Bus (Apache Kafka / RabbitMQ)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#faf5ff;strokeColor=#9333ea;strokeWidth=1.5;fontColor=#581c87;fontSize=12;" vertex="1" parent="box_backend">
          <mxGeometry x="30" y="320" width="390" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="srv_redis" value="Redis In-Memory Cache" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#fef2f2;strokeColor=#dc2626;strokeWidth=1.5;fontColor=#991b1b;fontSize=12;" vertex="1" parent="box_backend">
          <mxGeometry x="250" y="100" width="170" height="50" as="geometry"/>
        </mxCell>

        <!-- Storage cluster -->
        <mxCell id="box_storage" value="Data Layer &amp; Persistence" style="swimlane;whiteSpace=wrap;html=1;startSize=26;fillColor=#f8fafc;strokeColor=#16a34a;strokeWidth=1.5;fontColor=#15803d;fontStyle=1;fontSize=12;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="1020" y="80" width="220" height="340" as="geometry"/>
        </mxCell>
        <mxCell id="db_main" value="PostgreSQL Primary &amp; Replica" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#f0fdf4;strokeColor=#16a34a;strokeWidth=2;fontColor=#14532d;fontSize=12;" vertex="1" parent="box_storage">
          <mxGeometry x="25" y="60" width="170" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="db_mongo" value="Document DB / ElasticSearch" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#f0fdf4;strokeColor=#16a34a;strokeWidth=2;fontColor=#14532d;fontSize=12;" vertex="1" parent="box_storage">
          <mxGeometry x="25" y="180" width="170" height="70" as="geometry"/>
        </mxCell>

        <!-- Edges -->
        <mxCell id="edge_c1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284c7;strokeWidth=2;" edge="1" parent="1" source="client_web" target="node_gateway">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_c2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284c7;strokeWidth=2;" edge="1" parent="1" source="client_mobile" target="node_gateway">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_gw_auth" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#6366f1;strokeWidth=2;" edge="1" parent="1" source="node_gateway" target="srv_auth">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_gw_orders" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#6366f1;strokeWidth=2;" edge="1" parent="1" source="node_gateway" target="srv_orders">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_orders_db" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16a34a;strokeWidth=2;" edge="1" parent="1" source="srv_orders" target="db_main">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_inv_db" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16a34a;strokeWidth=2;" edge="1" parent="1" source="srv_inventory" target="db_mongo">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`
  },
  {
    id: 'swimlane_hiring',
    title: 'Cross-Functional HR Hiring Swimlane',
    category: 'Swimlane',
    description: 'Diagramma Swimlane a corsie per processo assunzione: Candidato, HR Recruiter, Hiring Manager e Finance in Light Mode.',
    xml: `<mxfile host="app.diagrams.net" agent="DrawIO-AI-Studio" version="24.0.0" type="device">
  <diagram id="diag_swimlane_hr" name="Hiring Process">
    <mxGraphModel dx="1400" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="900" background="#ffffff">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Lane 1: Candidate -->
        <mxCell id="lane_cand" value="Candidato" style="swimlane;horizontal=0;whiteSpace=wrap;html=1;startSize=30;fillColor=#f8fafc;strokeColor=#0284c7;strokeWidth=1.5;fontColor=#0369a1;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="1120" height="150" as="geometry"/>
        </mxCell>
        <mxCell id="c_apply" value="Invio CV &amp; Portfolio" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#0284c7;strokeWidth=1.5;fontColor=#0f172a;" vertex="1" parent="lane_cand">
          <mxGeometry x="70" y="45" width="150" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="c_interview" value="Svolgimento Colloquio Tecnico" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#0284c7;strokeWidth=1.5;fontColor=#0f172a;" vertex="1" parent="lane_cand">
          <mxGeometry x="500" y="45" width="160" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="c_offer" value="Accettazione Proposta &amp; Firma" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#ecfdf5;strokeColor=#059669;strokeWidth=2;fontColor=#065f46;fontStyle=1;" vertex="1" parent="lane_cand">
          <mxGeometry x="910" y="45" width="170" height="60" as="geometry"/>
        </mxCell>

        <!-- Lane 2: Recruiter HR -->
        <mxCell id="lane_hr" value="HR Recruiter" style="swimlane;horizontal=0;whiteSpace=wrap;html=1;startSize=30;fillColor=#f8fafc;strokeColor=#6366f1;strokeWidth=1.5;fontColor=#4f46e5;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="40" y="190" width="1120" height="150" as="geometry"/>
        </mxCell>
        <mxCell id="hr_screen" value="Screening Preliminare &amp; Call Conoscitiva" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#4f46e5;strokeWidth=1.5;fontColor=#0f172a;" vertex="1" parent="lane_hr">
          <mxGeometry x="270" y="45" width="180" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="hr_contract" value="Generazione Contratto di Lavoro" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#4f46e5;strokeWidth=1.5;fontColor=#0f172a;" vertex="1" parent="lane_hr">
          <mxGeometry x="720" y="45" width="160" height="60" as="geometry"/>
        </mxCell>

        <!-- Lane 3: Tech Lead -->
        <mxCell id="lane_tech" value="Hiring Manager" style="swimlane;horizontal=0;whiteSpace=wrap;html=1;startSize=30;fillColor=#f8fafc;strokeColor=#9333ea;strokeWidth=1.5;fontColor=#6b21a8;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="40" y="340" width="1120" height="150" as="geometry"/>
        </mxCell>
        <mxCell id="tech_eval" value="Valutazione Competenze &amp; Feedback" style="rhombus;whiteSpace=wrap;html=1;fillColor=#eef2ff;strokeColor=#6366f1;strokeWidth=2;fontColor=#312e81;" vertex="1" parent="lane_tech">
          <mxGeometry x="500" y="35" width="160" height="80" as="geometry"/>
        </mxCell>

        <!-- Edges -->
        <mxCell id="edge_h1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#475569;strokeWidth=2;" edge="1" parent="1" source="c_apply" target="hr_screen">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_h2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#475569;strokeWidth=2;" edge="1" parent="1" source="hr_screen" target="c_interview">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_h3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#475569;strokeWidth=2;" edge="1" parent="1" source="c_interview" target="tech_eval">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_h4" value="Approvato" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16a34a;strokeWidth=2;fontColor=#15803d;" edge="1" parent="1" source="tech_eval" target="hr_contract">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_h5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#059669;strokeWidth=2;" edge="1" parent="1" source="hr_contract" target="c_offer">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`
  },
  {
    id: 'aws_microservices_horizontal',
    title: 'AWS Microservices Architecture (Horizontal)',
    category: 'Cloud Architecture',
    description: 'Architettura orizzontale su AWS con Route 53, WAF, ALB, EKS, Istio Mesh, Kafka MSK, SQS, RDS, DynamoDB, ElastiCache, CloudWatch e X-Ray in Light Mode.',
    xml: `<mxfile host="app.diagrams.net" agent="DrawIO-AI-Studio" version="24.0.0" type="device">
  <diagram id="diag_aws_microservices" name="AWS Microservices Architecture">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="2200" pageHeight="1100" background="#ffffff">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- 1. INGRESS & EDGE ZONE -->
        <mxCell id="box_edge" value="1. Ingress &amp; Edge Layer" style="swimlane;whiteSpace=wrap;html=1;startSize=26;fillColor=#f8fafc;strokeColor=#0284c7;strokeWidth=1.5;fontColor=#0369a1;fontStyle=1;fontSize=12;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="30" y="40" width="220" height="720" as="geometry"/>
        </mxCell>
        <mxCell id="user_clients" value="Client Web &amp; Mobile" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#eff6ff;strokeColor=#0284c7;strokeWidth=2;fontColor=#0f172a;fontSize=12;" vertex="1" parent="box_edge">
          <mxGeometry x="85" y="60" width="50" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="aws_route53" value="Amazon Route 53 (DNS / Latency Routing)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#0284c7;strokeWidth=1.5;fontColor=#0f172a;fontSize=12;" vertex="1" parent="box_edge">
          <mxGeometry x="20" y="220" width="180" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="aws_waf" value="AWS WAF &amp; Shield (DDoS &amp; Bot Protection)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#eef2ff;strokeColor=#6366f1;strokeWidth=2;fontColor=#312e81;fontSize=12;" vertex="1" parent="box_edge">
          <mxGeometry x="20" y="360" width="180" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="aws_alb" value="AWS Application Load Balancer (ALB)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#4f46e5;strokeWidth=2;fontColor=#0f172a;fontSize=12;fontStyle=1;" vertex="1" parent="box_edge">
          <mxGeometry x="20" y="500" width="180" height="65" as="geometry"/>
        </mxCell>

        <!-- 2. VPC CONTAINER -->
        <mxCell id="box_vpc" value="AWS VPC (10.0.0.0/16)" style="swimlane;whiteSpace=wrap;html=1;startSize=28;fillColor=#f8fafc;strokeColor=#64748b;strokeWidth=2;fontColor=#334155;fontStyle=1;fontSize=13;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="290" y="40" width="1280" height="720" as="geometry"/>
        </mxCell>

        <!-- PRIVATE SUBNET: COMPUTE LAYER -->
        <mxCell id="subnet_compute" value="Private Subnet - EKS Compute &amp; Mesh Layer" style="swimlane;whiteSpace=wrap;html=1;startSize=24;fillColor=#ffffff;strokeColor=#6366f1;strokeWidth=1.5;fontColor=#4f46e5;fontStyle=1;fontSize=12;dashed=1;" vertex="1" parent="box_vpc">
          <mxGeometry x="30" y="45" width="460" height="645" as="geometry"/>
        </mxCell>
        <mxCell id="eks_ingress" value="Nginx Ingress Controller (EKS)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#4f46e5;strokeWidth=2;fontColor=#0f172a;fontSize=12;fontStyle=1;" vertex="1" parent="subnet_compute">
          <mxGeometry x="30" y="45" width="400" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="srv_auth" value="Auth Microservice (JWT / IAM)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#4f46e5;strokeWidth=1.5;fontColor=#0f172a;fontSize=12;" vertex="1" parent="subnet_compute">
          <mxGeometry x="30" y="140" width="180" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="srv_catalog" value="Catalog Microservice (REST / gRPC)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#4f46e5;strokeWidth=1.5;fontColor=#0f172a;fontSize=12;" vertex="1" parent="subnet_compute">
          <mxGeometry x="250" y="140" width="180" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="srv_order" value="Order Microservice (Saga Orchestrator)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#4f46e5;strokeWidth=1.5;fontColor=#0f172a;fontSize=12;" vertex="1" parent="subnet_compute">
          <mxGeometry x="30" y="270" width="180" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="worker_async" value="Async Background Worker (Batch Job)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#faf5ff;strokeColor=#9333ea;strokeWidth=1.5;fontColor=#581c87;fontSize=12;" vertex="1" parent="subnet_compute">
          <mxGeometry x="250" y="270" width="180" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="istio_mesh" value="Istio Service Mesh (mTLS &amp; Traffic Mirroring)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#eef2ff;strokeColor=#6366f1;strokeWidth=1.5;fontColor=#3730a3;fontSize=11;dashed=1;" vertex="1" parent="subnet_compute">
          <mxGeometry x="30" y="380" width="400" height="45" as="geometry"/>
        </mxCell>

        <!-- 3. MESSAGING & ASYNC LAYER -->
        <mxCell id="subnet_msg" value="3. Event Streaming &amp; Queues" style="swimlane;whiteSpace=wrap;html=1;startSize=24;fillColor=#ffffff;strokeColor=#9333ea;strokeWidth=1.5;fontColor=#7e22ce;fontStyle=1;fontSize=12;dashed=1;" vertex="1" parent="box_vpc">
          <mxGeometry x="520" y="45" width="310" height="645" as="geometry"/>
        </mxCell>
        <mxCell id="msg_kafka" value="Amazon Managed Streaming for Apache Kafka (Amazon MSK)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#faf5ff;strokeColor=#9333ea;strokeWidth=2;fontColor=#581c87;fontSize=12;fontStyle=1;" vertex="1" parent="subnet_msg">
          <mxGeometry x="25" y="110" width="260" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="msg_sqs_dlq" value="Amazon SQS Dead Letter Queue (DLQ)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#fef2f2;strokeColor=#dc2626;strokeWidth=1.5;fontColor=#991b1b;fontSize=12;" vertex="1" parent="subnet_msg">
          <mxGeometry x="25" y="270" width="260" height="65" as="geometry"/>
        </mxCell>

        <!-- 4. DATA LAYER (ISOLATED SUBNET) -->
        <mxCell id="subnet_data" value="4. Isolated DB Subnet (Persistence)" style="swimlane;whiteSpace=wrap;html=1;startSize=24;fillColor=#ffffff;strokeColor=#16a34a;strokeWidth=1.5;fontColor=#15803d;fontStyle=1;fontSize=12;dashed=1;" vertex="1" parent="box_vpc">
          <mxGeometry x="860" y="45" width="380" height="645" as="geometry"/>
        </mxCell>
        <mxCell id="db_rds" value="Amazon RDS PostgreSQL (Multi-AZ Standby)" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#f0fdf4;strokeColor=#16a34a;strokeWidth=2;fontColor=#14532d;fontSize=12;fontStyle=1;" vertex="1" parent="subnet_data">
          <mxGeometry x="30" y="60" width="320" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="db_dynamo" value="Amazon DynamoDB (Serverless Key-Value)" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#f0fdf4;strokeColor=#16a34a;strokeWidth=2;fontColor=#14532d;fontSize=12;fontStyle=1;" vertex="1" parent="subnet_data">
          <mxGeometry x="30" y="200" width="320" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="db_redis" value="Amazon ElastiCache (Redis Cluster Caching)" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#ecfdf5;strokeColor=#059669;strokeWidth=2;fontColor=#065f46;fontSize=12;fontStyle=1;" vertex="1" parent="subnet_data">
          <mxGeometry x="30" y="340" width="320" height="75" as="geometry"/>
        </mxCell>

        <!-- 5. OBSERVABILITY & SECURITY BANNER -->
        <mxCell id="box_obs" value="5. Cross-Cutting Observability &amp; Security Layer" style="swimlane;whiteSpace=wrap;html=1;startSize=24;fillColor=#fefce8;strokeColor=#ca8a04;strokeWidth=1.5;fontColor=#854d0e;fontStyle=1;fontSize=12;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="30" y="790" width="1540" height="150" as="geometry"/>
        </mxCell>
        <mxCell id="obs_cw" value="Amazon CloudWatch (Logs &amp; Metrics Alarms)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#ca8a04;strokeWidth=1.5;fontColor=#713f12;fontSize=12;" vertex="1" parent="box_obs">
          <mxGeometry x="80" y="55" width="360" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="obs_xray" value="AWS X-Ray (Distributed Tracing &amp; Map)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#ca8a04;strokeWidth=1.5;fontColor=#713f12;fontSize=12;" vertex="1" parent="box_obs">
          <mxGeometry x="580" y="55" width="360" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="sec_secrets" value="AWS Secrets Manager &amp; KMS Key Rotation" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#ffffff;strokeColor=#ca8a04;strokeWidth=1.5;fontColor=#713f12;fontSize=12;" vertex="1" parent="box_obs">
          <mxGeometry x="1080" y="55" width="360" height="55" as="geometry"/>
        </mxCell>

        <!-- CONNECTING EDGES (Horizontal Workflow) -->
        <mxCell id="edge_c_r53" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284c7;strokeWidth=2;" edge="1" parent="1" source="user_clients" target="aws_route53">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_r53_waf" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284c7;strokeWidth=2;" edge="1" parent="1" source="aws_route53" target="aws_waf">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_waf_alb" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#6366f1;strokeWidth=2;" edge="1" parent="1" source="aws_waf" target="aws_alb">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_alb_eks" value="HTTPS" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#4f46e5;strokeWidth=2;fontColor=#4338ca;" edge="1" parent="1" source="aws_alb" target="eks_ingress">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_ing_auth" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#4f46e5;strokeWidth=2;" edge="1" parent="1" source="eks_ingress" target="srv_auth">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_ing_cat" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#4f46e5;strokeWidth=2;" edge="1" parent="1" source="eks_ingress" target="srv_catalog">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_ing_ord" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#4f46e5;strokeWidth=2;" edge="1" parent="1" source="eks_ingress" target="srv_order">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_ord_kafka" value="Event Emit" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333ea;strokeWidth=2;fontColor=#7e22ce;" edge="1" parent="1" source="srv_order" target="msg_kafka">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_kafka_worker" value="Consume" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333ea;strokeWidth=2;fontColor=#7e22ce;" edge="1" parent="1" source="msg_kafka" target="worker_async">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_worker_dlq" value="On Failure" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#dc2626;strokeWidth=2;fontColor=#b91c1c;" edge="1" parent="1" source="worker_async" target="msg_sqs_dlq">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_ord_rds" value="Read/Write" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16a34a;strokeWidth=2;fontColor=#15803d;" edge="1" parent="1" source="srv_order" target="db_rds">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_cat_dynamo" value="KV Lookup" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16a34a;strokeWidth=2;fontColor=#15803d;" edge="1" parent="1" source="srv_catalog" target="db_dynamo">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_auth_redis" value="Token Cache" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;fontColor=#047857;" edge="1" parent="1" source="srv_auth" target="db_redis">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`
  }
];
