import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { DocumentUploader } from './components/DocumentUploader';
import { SettingsModal } from './components/SettingsModal';
import { XmlCodeEditor } from './components/XmlCodeEditor';
import { TemplateGallery } from './components/TemplateGallery';
import { ApiConfig, ChatMessage, ExtractedDocument, DiagramData, OutputFormatPreference, ImageAttachment, AiProvider } from './types';
import { DEFAULT_API_CONFIG, generateDiagramResponse } from './services/openai';
import { extractDrawioXml } from './services/drawioParser';
import { enhanceDrawioXmlWithIcons } from './services/aiIconsCatalog';
import { TemplateItem } from './services/templates';

const STORAGE_KEY_CONFIG = 'drawio_ai_api_config';

export default function App() {
  // Load configuration from localStorage or default
  const [apiConfig, setApiConfig] = useState<ApiConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.provider === 'openai') {
          parsed.provider = 'custom_ai';
        }
        return {
          ...DEFAULT_API_CONFIG,
          ...parsed,
        };
      }
    } catch (e) {
      console.warn('Failed to load api config from storage');
    }
    return DEFAULT_API_CONFIG;
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      role: 'assistant',
      content: `👋 Ciao! Sono il tuo assistente specializzato nella **creazione e modifica di diagrammi Draw.io professionali** in **Light Mode**.

✨ **Cosa puoi fare**:
1. **Generare diagrammi via Chat**: chiedi qualsiasi diagramma (Microservizi Cloud AWS/Azure/GCP, Flowchart, Sequenza, ERD, Swimlane).
2. **Caricare file .drawio esistenti**: clicca su **Carica .drawio** in alto o nella barra per aprirlo e chiedere all'AI di applicare modifiche mirate.
3. **Incollare Immagini o Screenshot (Ctrl+V)**: incolla direttamente uno schema o screenshot per farlo analizzare e convertire in formato Draw.io modificabile.
4. **Importare Documenti**: carica file **Word (.docx)**, **PowerPoint (.pptx)**, **PDF** o **Excel (.xlsx, .csv)** per estrarre automaticamente i processi in Markdown.

Incolla un'immagine, carica un file .drawio o scrivi una richiesta per iniziare!`,
      timestamp: Date.now(),
    }
  ]);

  const [currentDiagram, setCurrentDiagram] = useState<DiagramData | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState<boolean>(false);
  const [isXmlEditorOpen, setIsXmlEditorOpen] = useState<boolean>(false);
  const [activeXmlToEdit, setActiveXmlToEdit] = useState<string>('');

  // Persist API configuration
  const handleSaveConfig = (newConfig: ApiConfig) => {
    setApiConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(newConfig));
    } catch (e) {
      console.error('Failed to save config:', e);
    }
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#6366f1', '#a855f7', '#38bdf8', '#10b981'],
      });
    } catch (e) {
      // ignore
    }
  };

  // Direct load of Draw.io XML onto canvas & chat
  const handleDirectLoadDrawio = (xml: string, title: string = 'Diagramma Caricato') => {
    const extractedXml = extractDrawioXml(xml) || xml;
    const newDiagram: DiagramData = {
      id: `diag_uploaded_${Date.now()}`,
      title,
      type: 'flowchart',
      xml: extractedXml,
      summary: `Diagramma "${title}" caricato con successo nel canvas.`,
      timestamp: Date.now(),
    };

    setCurrentDiagram(newDiagram);
    setIsUploadOpen(false);

    const loadMsg: ChatMessage = {
      id: `bot_load_${Date.now()}`,
      role: 'assistant',
      content: `Ho caricato il diagramma Draw.io **${title}** sul canvas interattivo in Light Mode!\n\n💡 **Cosa puoi fare ora:**\n- Chiedimi qualsiasi modifica (es. *"Aggiungi una coda SQS per i messaggi di scarto"*, *"Converti il layout in orizzontale"*, *"Aggiungi il componente Auth Service"*).\n- Esplora il canvas con pan e zoom.\n- Esporta in **PNG HD** o scarica il file **.drawio** aggiornato.`,
      timestamp: Date.now(),
      diagram: newDiagram,
    };

    setMessages(prev => [...prev, loadMsg]);
    triggerConfetti();
  };

  // Main message sender & LLM caller
  const handleSendMessage = async (
    text: string, 
    docContext?: ExtractedDocument,
    imageAttachment?: ImageAttachment
  ) => {
    const userMsgId = `user_${Date.now()}`;
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: text,
      timestamp: Date.now(),
      document: docContext,
      image: imageAttachment,
    };

    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setIsGenerating(true);

    try {
      // Collect image attachments if present
      const imagesToPass: ImageAttachment[] = [];
      if (imageAttachment) {
        imagesToPass.push(imageAttachment);
      }
      if (docContext && docContext.imageUrl) {
        imagesToPass.push({
          id: docContext.id,
          name: docContext.name,
          dataUrl: docContext.imageUrl,
          mimeType: 'image/png',
          size: docContext.size,
        });
      }

      // If document is a drawio file, we can also set it as current diagram or pass directly
      const xmlContext = docContext?.drawioXml || currentDiagram?.xml;

      // Call AI model
      const aiResponseText = await generateDiagramResponse({
        config: apiConfig,
        messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
        currentDiagramXml: xmlContext,
        documentContext: docContext,
        images: imagesToPass.length > 0 ? imagesToPass : undefined,
      });

      // Extract XML if present
      const extractedXml = extractDrawioXml(aiResponseText);
      let newDiagramData: DiagramData | undefined;

      if (extractedXml) {
        const enhancedXml = enhanceDrawioXmlWithIcons(extractedXml);
        newDiagramData = {
          id: `diag_${Date.now()}`,
          title: docContext ? `Workflow: ${docContext.name}` : (currentDiagram ? `${currentDiagram.title} (Modificato)` : 'Diagramma Generato'),
          type: 'flowchart',
          xml: enhancedXml,
          summary: aiResponseText.replace(/```[\s\S]*?```/g, '').trim(),
          timestamp: Date.now(),
        };
        setCurrentDiagram(newDiagramData);
        triggerConfetti();
      }

      // Clean message text by removing the raw XML block from user chat text if diagram viewer is shown
      let cleanContent = aiResponseText;
      if (extractedXml) {
        cleanContent = aiResponseText.replace(/```(?:xml|drawio)?[\s\S]*?```/i, '').trim();
        if (!cleanContent) {
          cleanContent = 'Ecco il diagramma Draw.io elaborato con successo in Light Mode. Puoi esplorarlo sul canvas, modificarlo ulteriormente o esportarlo in PNG / .drawio:';
        }
      }

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        role: 'assistant',
        content: cleanContent,
        timestamp: Date.now(),
        diagram: newDiagramData,
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Error generating diagram:', err);
      const errorMsg: ChatMessage = {
        id: `bot_err_${Date.now()}`,
        role: 'assistant',
        content: `⚠️ Si è verificato un errore durante la generazione: **${err?.message || 'Errore imprevisto'}**.\n\nAssicurati di aver impostato una chiave API valida o seleziona un altro modello Google Gemini dal menu a tendina.`,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Document Upload & Markdown extraction
  const handleDocumentProcessed = (
    doc: ExtractedDocument, 
    workflowGoal?: string, 
    formatPref: OutputFormatPreference = 'visual_and_drawio'
  ) => {
    setIsUploadOpen(false);

    if (doc.type === 'drawio' && doc.drawioXml && (!workflowGoal || workflowGoal.includes('Ottimizzalo'))) {
      handleDirectLoadDrawio(doc.drawioXml, doc.name);
      return;
    }

    let promptText = '';
    if (doc.type === 'drawio') {
      promptText = workflowGoal || `Ho caricato il file Draw.io "${doc.name}". Applica le ottimizzazioni necessarie e restituisci l'XML aggiornato in Light Mode.`;
    } else if (doc.type === 'image') {
      promptText = workflowGoal || `Ho allegato l'immagine "${doc.name}". Analizza tutti gli elementi visuali e convertili in un diagramma Draw.io XML completo in Light Mode.`;
    } else {
      promptText = `Ho caricato il documento "${doc.name}" convertito in Markdown.
${workflowGoal ? `Obiettivo Workflow: ${workflowGoal}` : 'Analizza il contenuto ed estrai il workflow principale.'}

Preferenza output: ${formatPref === 'only_drawio' ? 'Solo file .drawio' : 'Anteprima visuale PNG + file .drawio'}.

Genera la struttura XML completa di Draw.io (mxGraphModel) compatibile al 100% con diagrams.net in Light Mode pulito.`;
    }

    handleSendMessage(promptText, doc);
  };

  // Handle Template selection
  const handleSelectTemplate = (template: TemplateItem) => {
    const newDiagram: DiagramData = {
      id: `diag_template_${Date.now()}`,
      title: template.title,
      type: 'flowchart',
      xml: template.xml,
      summary: template.description,
      timestamp: Date.now(),
    };

    setCurrentDiagram(newDiagram);

    const templateMsg: ChatMessage = {
      id: `bot_tmpl_${Date.now()}`,
      role: 'assistant',
      content: `Ho caricato il template **${template.title}** (${template.category}).\n\n${template.description}\n\nPuoi modificarlo con richieste in chat, ispezionare il canvas interattivo o esportare il PNG e il file .drawio.`,
      timestamp: Date.now(),
      diagram: newDiagram,
    };

    setMessages(prev => [...prev, templateMsg]);
    triggerConfetti();
  };

  // Quick modify from canvas actions
  const handleQuickModify = (instruction: string) => {
    if (!currentDiagram) return;
    const prompt = `${instruction}. Aggiorna il diagramma Draw.io mantenendo la struttura coerente e restituendo l'XML completo modificato in Light Mode.`;
    handleSendMessage(prompt);
  };

  // Direct XML Code Edit
  const handleOpenXmlEditor = (xmlToEdit?: string) => {
    const targetXml = xmlToEdit || currentDiagram?.xml || '';
    setActiveXmlToEdit(targetXml);
    setIsXmlEditorOpen(true);
  };

  const handleApplyXmlEdit = (updatedXml: string) => {
    const updated: DiagramData = currentDiagram ? {
      ...currentDiagram,
      xml: updatedXml,
      timestamp: Date.now(),
    } : {
      id: `diag_edit_${Date.now()}`,
      title: 'Diagramma Modificato',
      type: 'flowchart',
      xml: updatedXml,
      summary: 'XML aggiornato manualmente.',
      timestamp: Date.now(),
    };

    setCurrentDiagram(updated);

    // Add notification to chat
    setMessages(prev => [
      ...prev,
      {
        id: `sys_edit_${Date.now()}`,
        role: 'assistant',
        content: 'Le modifiche manuali all\'XML di Draw.io sono state applicate con successo al visualizzatore.',
        timestamp: Date.now(),
        diagram: updated,
      }
    ]);
  };

  // Reset / New Diagram Session (without blocked window.confirm in iframe)
  const handleNewDiagram = () => {
    console.log('[App] handleNewDiagram executed - resetting session');
    setCurrentDiagram(null);
    setActiveXmlToEdit('');
    setMessages([
      {
        id: `msg_new_${Date.now()}`,
        role: 'assistant',
        content: `✨ **Nuova sessione avviata!**

Puoi:
1. **Descrivere un nuovo diagramma** nella chat in basso.
2. **Caricare un file .drawio esistente** per visualizzarlo o modificarlo con l'AI.
3. **Incollare un'immagine o screenshot (Ctrl+V)** per ricrearne lo schema.
4. **Scegliere un template pronto** cliccando sul pulsante **Template** in alto.`,
        timestamp: Date.now(),
      }
    ]);
  };

  // Handle direct model switch from combobox
  const handleModelChange = (modelId: string, provider: AiProvider) => {
    const updated: ApiConfig = {
      ...apiConfig,
      provider,
      model: modelId,
      ...(provider === 'gemini' ? { geminiModel: modelId } : {}),
      ...(provider === 'custom_ai' ? { customAiModel: modelId } : {}),
    };
    handleSaveConfig(updated);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100/80 font-sans text-slate-900">
      {/* Top Navbar */}
      <Header
        apiConfig={apiConfig}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        onNewDiagram={handleNewDiagram}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative flex flex-col">
        <ChatInterface
          messages={messages}
          isGenerating={isGenerating}
          apiConfig={apiConfig}
          onSendMessage={handleSendMessage}
          onOpenUpload={() => setIsUploadOpen(true)}
          onDirectLoadDrawio={handleDirectLoadDrawio}
          onEditXml={handleOpenXmlEditor}
          onQuickModify={handleQuickModify}
          onModelChange={handleModelChange}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Floating Upload Document Modal / Backdrop */}
        {isUploadOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
            <div className="w-full max-w-3xl">
              <DocumentUploader
                onDocumentProcessed={handleDocumentProcessed}
                onDirectLoadDrawio={handleDirectLoadDrawio}
                onCancel={() => setIsUploadOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Settings Modal */}
        <SettingsModal
          config={apiConfig}
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onSave={handleSaveConfig}
        />

        {/* Template Gallery Modal */}
        <TemplateGallery
          isOpen={isTemplatesOpen}
          onClose={() => setIsTemplatesOpen(false)}
          onSelectTemplate={handleSelectTemplate}
        />

        {/* XML Code Editor Modal */}
        <XmlCodeEditor
          xml={activeXmlToEdit}
          isOpen={isXmlEditorOpen}
          onClose={() => setIsXmlEditorOpen(false)}
          onApply={handleApplyXmlEdit}
        />
      </main>
    </div>
  );
}
