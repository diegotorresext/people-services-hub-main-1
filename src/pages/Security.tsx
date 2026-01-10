import { Layout } from "@/components/layout/Layout";
import { Shield, Copy, Check, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const securityScripts = [
  {
    id: 1,
    title: "Identity Verification - Employee",
    category: "Verification",
    questions: [
      { es: "¿Cuál es su número de empleado?", en: "What is your employee number?", pt: "Qual é o seu número de funcionário?" },
      { es: "¿Cuál es su fecha de nacimiento?", en: "What is your date of birth?", pt: "Qual é a sua data de nascimento?" },
      { es: "¿Cuál es el nombre de su supervisor directo?", en: "What is the name of your direct supervisor?", pt: "Qual é o nome do seu supervisor direto?" },
    ],
  },
  {
    id: 2,
    title: "Password Reset Authorization",
    category: "Authorization",
    questions: [
      { es: "¿Cuáles son los últimos 4 dígitos de su SSN?", en: "What are the last 4 digits of your SSN?", pt: "Quais são os últimos 4 dígitos do seu SSN?" },
      { es: "¿Cuál es su dirección de correo corporativo?", en: "What is your corporate email address?", pt: "Qual é o seu endereço de e-mail corporativo?" },
      { es: "¿En qué departamento trabaja?", en: "What department do you work in?", pt: "Em qual departamento você trabalha?" },
    ],
  },
  {
    id: 3,
    title: "Payroll Information Request",
    category: "Sensitive Data",
    questions: [
      { es: "¿Cuál fue su último banco registrado para depósitos?", en: "What was your last registered bank for deposits?", pt: "Qual foi o seu último banco registrado para depósitos?" },
      { es: "¿Cuál es su ubicación de trabajo actual?", en: "What is your current work location?", pt: "Qual é a sua localização de trabalho atual?" },
      { es: "Confirme su estado civil actual registrado en el sistema.", en: "Confirm your current marital status registered in the system.", pt: "Confirme seu estado civil atual registrado no sistema." },
    ],
  },
];

type Language = "es" | "en" | "pt";

const languageLabels: Record<Language, string> = {
  es: "🇪🇸 Spanish",
  en: "🇬🇧 English",
  pt: "🇧🇷 Portuguese",
};

const Security = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLang, setSelectedLang] = useState<Language>("en");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredScripts = securityScripts.filter(
    (script) =>
      script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = async (id: number, questions: typeof securityScripts[0]["questions"]) => {
    const text = questions.map((q, i) => `${i + 1}. ${q[selectedLang]}`).join("\n");
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({ title: "Copied!", description: "Security questions copied to clipboard" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-light p-3 rounded-full">
            <Shield className="h-6 w-6 text-purple" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Security & Verification</h1>
            <p className="text-muted-foreground">Verification questions and security protocols</p>
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
              placeholder="Search protocols..."
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

      {/* Scripts Grid */}
      <div className="grid gap-4">
        {filteredScripts.map((script) => (
          <div
            key={script.id}
            className="bg-card rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow animate-fade-in"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">{script.title}</h3>
                <span className="text-sm text-muted-foreground">{script.category}</span>
              </div>
              <button
                onClick={() => handleCopy(script.id, script.questions)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  copiedId === script.id
                    ? "bg-success-light text-success"
                    : "bg-info hover:bg-info/90 text-primary-foreground"
                )}
              >
                {copiedId === script.id ? (
                  <>
                    <Check className="h-4 w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy All
                  </>
                )}
              </button>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <ol className="list-decimal list-inside space-y-2">
                {script.questions.map((q, index) => (
                  <li key={index} className="text-foreground">
                    {q[selectedLang]}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Security;
