import { Layout } from "@/components/layout/Layout";
import { AlertTriangle, Copy, Check, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const jiraResponses = [
  {
    id: 1,
    title: "Initial Acknowledgment",
    category: "Opening",
    content: {
      es: "Hola [Nombre],\n\nGracias por tu solicitud. He revisado tu caso y estoy trabajando en ello. Te mantendré informado sobre el progreso.\n\nSaludos,\n[Tu nombre]",
      en: "Hi [Name],\n\nThank you for your request. I have reviewed your case and am working on it. I will keep you informed of progress.\n\nRegards,\n[Your name]",
      pt: "Olá [Nome],\n\nObrigado pela sua solicitação. Analisei seu caso e estou trabalhando nele. Vou mantê-lo informado sobre o progresso.\n\nAtenciosamente,\n[Seu nome]",
    },
  },
  {
    id: 2,
    title: "Pending Information",
    category: "Follow-up",
    content: {
      es: "Hola [Nombre],\n\nPara continuar con tu solicitud, necesito la siguiente información:\n\n- [Item 1]\n- [Item 2]\n\nUna vez recibida, procesaré tu caso inmediatamente.\n\nSaludos,\n[Tu nombre]",
      en: "Hi [Name],\n\nTo proceed with your request, I need the following information:\n\n- [Item 1]\n- [Item 2]\n\nOnce received, I will process your case immediately.\n\nRegards,\n[Your name]",
      pt: "Olá [Nome],\n\nPara prosseguir com sua solicitação, preciso das seguintes informações:\n\n- [Item 1]\n- [Item 2]\n\nAssim que recebidas, processarei seu caso imediatamente.\n\nAtenciosamente,\n[Seu nome]",
    },
  },
  {
    id: 3,
    title: "Resolution Complete",
    category: "Closing",
    content: {
      es: "Hola [Nombre],\n\nTu solicitud ha sido completada exitosamente. Los cambios están ahora activos en el sistema.\n\nSi tienes alguna pregunta adicional, no dudes en responder a este ticket.\n\nSaludos,\n[Tu nombre]",
      en: "Hi [Name],\n\nYour request has been successfully completed. The changes are now active in the system.\n\nIf you have any additional questions, please don't hesitate to reply to this ticket.\n\nRegards,\n[Your name]",
      pt: "Olá [Nome],\n\nSua solicitação foi concluída com sucesso. As alterações estão agora ativas no sistema.\n\nSe você tiver alguma dúvida adicional, não hesite em responder a este ticket.\n\nAtenciosamente,\n[Seu nome]",
    },
  },
];

type Language = "es" | "en" | "pt";

const languageLabels: Record<Language, string> = {
  es: "🇪🇸 Spanish",
  en: "🇬🇧 English",
  pt: "🇧🇷 Portuguese",
};

const JiraResponses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLang, setSelectedLang] = useState<Language>("en");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredResponses = jiraResponses.filter(
    (response) =>
      response.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      response.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = async (id: number, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({ title: "Copied!", description: "Response copied to clipboard" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-warning-light p-3 rounded-full">
            <AlertTriangle className="h-6 w-6 text-warning" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">JIRA Responses</h1>
            <p className="text-muted-foreground">Standard responses for JIRA ticket management</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search responses..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-card focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value as Language)}
            className="px-4 py-2 rounded-lg border border-input bg-card focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {Object.entries(languageLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Responses Grid */}
      <div className="grid gap-4">
        {filteredResponses.map((response) => (
          <div
            key={response.id}
            className="bg-card rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow animate-fade-in"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">{response.title}</h3>
                <span className="text-sm text-muted-foreground">{response.category}</span>
              </div>
              <button
                onClick={() => handleCopy(response.id, response.content[selectedLang])}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  copiedId === response.id
                    ? "bg-success-light text-success"
                    : "bg-info hover:bg-info/90 text-primary-foreground"
                )}
              >
                {copiedId === response.id ? (
                  <>
                    <Check className="h-4 w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy
                  </>
                )}
              </button>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-foreground whitespace-pre-wrap font-sans text-sm">
                {response.content[selectedLang]}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default JiraResponses;
