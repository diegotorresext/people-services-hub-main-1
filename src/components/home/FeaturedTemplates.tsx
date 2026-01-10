import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type Language = "es" | "en" | "pt";
type Length = "short" | "long";

interface TemplateContent {
  short: string;
  long: string;
}

interface Template {
  title: string;
  tags: { label: string; variant: "info" | "success" }[];
  content: Record<Language, TemplateContent>;
  whenToUse: string[];
  relatedTemplates: { label: string; to: string }[];
}

const sampleTemplate: Template = {
  title: "Standard Answer",
  tags: [
    { label: "EC-SF", variant: "info" },
    { label: "New Hire", variant: "success" },
  ],
  content: {
    es: {
      short: `Buenos días/Buenas tardes [Nombre del Colaborador],

Gracias por contactarte con People Services. Hemos recibido tu solicitud y la estamos procesando.

📋 Información:
- Tipo: [Descripción de la solicitud]
- Número de caso: [Número de Ticket]
- Tiempo estimado: [X] días hábiles

Te notificaremos cuando completemos el proceso.

Saludos cordiales,
[Nombre del Especialista]
People Services`,
      long: `Buenos días/Buenas tardes [Nombre del Colaborador],

Gracias por contactarte con People Services. Hemos recibido tu solicitud y entendemos la importancia de resolver esto para ti de manera oportuna.

📋 Información importante:
- Tipo: [Descripción de la solicitud] en EC-SF
- Número de caso: [Número de Ticket]
- Asignado a: [Nombre del Especialista]
- Estado actual: En proceso
- Tiempo estimado: [X] días hábiles (hasta el [fecha estimada])

📌 Próximos pasos:
1. Validaremos la información en nuestros sistemas (1-2 días hábiles)
2. Si necesitamos información adicional, te contactaremos vía [correo/teléfono]
3. Te notificaremos tan pronto completemos el proceso

⏰ ¿Qué puedes hacer mientras tanto?
- Mantén tu correo actualizado para recibir notificaciones
- Consulta el estado en cualquier momento citando tu número de caso: [Número]

💡 ¿Necesitas ayuda adicional?
Si tienes preguntas sobre el proceso o necesitas actualizar información relacionada con tu solicitud, contáctanos:
[Información de contacto]

📊 Tu opinión es importante:
Una vez resolvamos tu solicitud, te invitaremos a completar una breve encuesta (2 minutos) para ayudarnos a mejorar nuestro servicio.

Estamos comprometidos en brindarte la mejor experiencia posible.

Saludos cordiales,

[Nombre del Especialista]
People Services

---
📌 Número de caso: [Número de Ticket] - Guarda este número para futuras referencias`,
    },
    en: {
      short: `Good morning/Good afternoon [Employee Name],

Thank you for contacting People Services. We have received your request and are processing it.

📋 Information:
- Type: [Request Description]
- Case number: [Ticket Number]
- Estimated time: [X] business days

We will notify you when we complete the process.

Best regards,
[Specialist Name]
People Services`,
      long: `Good morning/Good afternoon [Employee Name],

Thank you for contacting People Services. We have received your request and understand the importance of resolving this for you in a timely manner.

📋 Important Information:
- Type: [Request Description] in EC-SF
- Case number: [Ticket Number]
- Assigned to: [Specialist Name]
- Current status: In progress
- Estimated time: [X] business days (until [estimated date])

📌 Next steps:
1. We will validate the information in our systems (1-2 business days)
2. If we need additional information, we will contact you via [email/phone]
3. We will notify you as soon as we complete the process

⏰ What can you do in the meantime?
- Keep your email updated to receive notifications
- Check the status at any time by citing your case number: [Number]

💡 Need additional help?
If you have questions about the process or need to update information related to your request, contact us:
[Contact information]

📊 Your opinion matters:
Once we resolve your request, we will invite you to complete a brief survey (2 minutes) to help us improve our service.

We are committed to providing you with the best possible experience.

Best regards,

[Specialist Name]
People Services

---
📌 Case number: [Ticket Number] - Save this number for future reference`,
    },
    pt: {
      short: `Bom dia/Boa tarde [Nome do Colaborador],

Obrigado por entrar em contato com People Services. Recebemos sua solicitação e estamos processando.

📋 Informações:
- Tipo: [Descrição da solicitação]
- Número do caso: [Número do Ticket]
- Tempo estimado: [X] dias úteis

Notificaremos você quando concluirmos o processo.

Atenciosamente,
[Nome do Especialista]
People Services`,
      long: `Bom dia/Boa tarde [Nome do Colaborador],

Obrigado por entrar em contato com People Services. Recebemos sua solicitação e entendemos a importância de resolver isso para você de maneira oportuna.

📋 Informações importantes:
- Tipo: [Descrição da solicitação] em EC-SF
- Número do caso: [Número do Ticket]
- Atribuído a: [Nome do Especialista]
- Status atual: Em andamento
- Tempo estimado: [X] dias úteis (até [data estimada])

📌 Próximos passos:
1. Validaremos as informações em nossos sistemas (1-2 dias úteis)
2. Se precisarmos de informações adicionais, entraremos em contato via [e-mail/telefone]
3. Notificaremos você assim que concluirmos o processo

⏰ O que você pode fazer enquanto isso?
- Mantenha seu e-mail atualizado para receber notificações
- Consulte o status a qualquer momento citando seu número de caso: [Número]

💡 Precisa de ajuda adicional?
Se você tiver dúvidas sobre o processo ou precisar atualizar informações relacionadas à sua solicitação, entre em contato:
[Informações de contato]

📊 Sua opinião é importante:
Assim que resolvermos sua solicitação, convidaremos você a completar uma breve pesquisa (2 minutos) para nos ajudar a melhorar nosso serviço.

Estamos comprometidos em fornecer a você a melhor experiência possível.

Atenciosamente,

[Nome do Especialista]
People Services

---
📌 Número do caso: [Número do Ticket] - Guarde este número para referência futura`,
    },
  },
  whenToUse: [
    "After completing new hire setup in EC-SF",
    "When all systems are configured",
    "Before closing the JIRA ticket",
  ],
  relatedTemplates: [
    { label: "New Hire - Initial Comment", to: "/templates/new-hire-initial" },
    { label: "New Hire - Incomplete Information", to: "/templates/new-hire-incomplete" },
  ],
};

const languageLabels: Record<Language, { flag: string; label: string }> = {
  es: { flag: "🇪🇸", label: "Spanish" },
  en: { flag: "🇬🇧", label: "English" },
  pt: { flag: "🇧🇷", label: "Portuguese" },
};

const tagVariants = {
  info: "bg-info-light text-info",
  success: "bg-success-light text-success",
};

export function FeaturedTemplates() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("es");
  const [selectedLength, setSelectedLength] = useState<Length>("short");
  const [copiedLang, setCopiedLang] = useState<Language | null>(null);

  const handleCopy = async (lang: Language) => {
    const textToCopy = sampleTemplate.content[lang][selectedLength];
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedLang(lang);
      toast({
        title: "Copied!",
        description: `${languageLabels[lang].label} version copied to clipboard`,
      });
      setTimeout(() => setCopiedLang(null), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6 text-foreground border-b border-border pb-2">
        Featured Templates
      </h2>

      <div className="bg-card rounded-xl shadow-md overflow-hidden">
        <div className="p-5 md:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                {sampleTemplate.title} - {languageLabels[selectedLanguage].label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {sampleTemplate.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={cn("px-3 py-1 rounded-full text-sm font-medium", tagVariants[tag.variant])}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex gap-2">
              {(Object.keys(languageLabels) as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={cn(
                    "text-2xl p-2 rounded-lg transition-all hover:scale-110",
                    selectedLanguage === lang
                      ? "bg-accent ring-2 ring-primary"
                      : "hover:bg-muted"
                  )}
                  title={languageLabels[lang].label}
                >
                  {languageLabels[lang].flag}
                </button>
              ))}
            </div>
          </div>

          {/* Length Toggle */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium text-muted-foreground">Version:</span>
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setSelectedLength("short")}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                  selectedLength === "short"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Short
              </button>
              <button
                onClick={() => setSelectedLength("long")}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                  selectedLength === "long"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Long
              </button>
            </div>
          </div>

          {/* Template Content */}
          <div className="mb-6">
            <h4 className="font-medium text-muted-foreground mb-2">
              {languageLabels[selectedLanguage].label} Version ({selectedLength}):
            </h4>
            <div className="bg-muted p-4 rounded-lg border border-border max-h-80 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
                {sampleTemplate.content[selectedLanguage][selectedLength]}
              </pre>
            </div>
          </div>

          {/* Copy Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {(Object.keys(languageLabels) as Language[]).map((lang) => {
              const isCopied = copiedLang === lang;
              const isSelected = selectedLanguage === lang;
              return (
                <button
                  key={lang}
                  onClick={() => handleCopy(lang)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
                    isSelected
                      ? "bg-info hover:bg-info/90 text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  )}
                >
                  {isCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  Copy {languageLabels[lang].label}
                </button>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="border-t border-border pt-4">
            <h4 className="font-medium text-muted-foreground mb-2">When to Use:</h4>
            <ul className="list-disc pl-5 text-muted-foreground mb-4 space-y-1">
              {sampleTemplate.whenToUse.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h4 className="font-medium text-muted-foreground mb-2">Related Templates:</h4>
            <div className="flex flex-wrap gap-2">
              {sampleTemplate.relatedTemplates.map((template) => (
                <Link
                  key={template.to}
                  to={template.to}
                  className="text-info hover:underline"
                >
                  {template.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
