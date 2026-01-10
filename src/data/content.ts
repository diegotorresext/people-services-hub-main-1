// Centralized content data for search functionality

export type Language = "es" | "en" | "pt";

export interface SearchableItem {
  id: string;
  type: "phone-script" | "email-template" | "jira-response" | "glossary";
  title: string;
  category: string;
  description: string;
  keywords: string[];
  path: string;
  content?: Record<Language, string>;
}

// Phone Scripts
export const phoneScripts: SearchableItem[] = [
  {
    id: "ps-1",
    type: "phone-script",
    title: "Greeting - Standard Opening",
    category: "General",
    description: "Standard greeting for incoming calls",
    keywords: ["greeting", "opening", "hello", "welcome", "call"],
    path: "/phone-scripts",
    content: {
      es: "Buenos días/tardes, gracias por llamar a People Services, mi nombre es [Nombre]. ¿En qué puedo ayudarle hoy?",
      en: "Good morning/afternoon, thank you for calling People Services, my name is [Name]. How may I help you today?",
      pt: "Bom dia/boa tarde, obrigado por ligar para People Services, meu nome é [Nome]. Como posso ajudá-lo hoje?",
    },
  },
  {
    id: "ps-2",
    type: "phone-script",
    title: "Hold Request",
    category: "General",
    description: "Request to place caller on hold",
    keywords: ["hold", "wait", "verify", "system", "brief"],
    path: "/phone-scripts",
    content: {
      es: "¿Me permite un momento mientras verifico esta información en nuestro sistema?",
      en: "May I place you on a brief hold while I verify this information in our system?",
      pt: "Posso colocá-lo em espera por um momento enquanto verifico essas informações em nosso sistema?",
    },
  },
  {
    id: "ps-3",
    type: "phone-script",
    title: "Transfer Announcement",
    category: "Transfer",
    description: "Announcing a call transfer",
    keywords: ["transfer", "department", "line", "redirect"],
    path: "/phone-scripts",
    content: {
      es: "Voy a transferir su llamada al departamento de [Departamento]. Por favor, permanezca en línea.",
      en: "I'm going to transfer your call to the [Department] department. Please stay on the line.",
      pt: "Vou transferir sua chamada para o departamento de [Departamento]. Por favor, aguarde na linha.",
    },
  },
  {
    id: "ps-4",
    type: "phone-script",
    title: "Closing - Standard",
    category: "Closing",
    description: "Standard call closing script",
    keywords: ["closing", "goodbye", "thank you", "end call"],
    path: "/phone-scripts",
    content: {
      es: "¿Hay algo más en lo que pueda ayudarle hoy? Gracias por llamar a People Services. Que tenga un excelente día.",
      en: "Is there anything else I can help you with today? Thank you for calling People Services. Have a great day.",
      pt: "Há mais alguma coisa em que eu possa ajudá-lo hoje? Obrigado por ligar para People Services. Tenha um ótimo dia.",
    },
  },
];

// Email Templates
export const emailTemplates: SearchableItem[] = [
  {
    id: "et-1",
    type: "email-template",
    title: "Request Confirmation",
    category: "General",
    description: "Confirm receipt of a request",
    keywords: ["confirmation", "receipt", "ticket", "received", "acknowledge"],
    path: "/email-templates",
  },
  {
    id: "et-2",
    type: "email-template",
    title: "Missing Information Request",
    category: "Follow-up",
    description: "Request additional information from employee",
    keywords: ["missing", "information", "documents", "follow-up", "request"],
    path: "/email-templates",
  },
  {
    id: "et-3",
    type: "email-template",
    title: "Request Completed",
    category: "Resolution",
    description: "Notify that request has been completed",
    keywords: ["completed", "resolved", "done", "finished", "processed"],
    path: "/email-templates",
  },
];

// JIRA Responses
export const jiraResponses: SearchableItem[] = [
  {
    id: "jr-1",
    type: "jira-response",
    title: "Initial Acknowledgment",
    category: "Opening",
    description: "First response to a JIRA ticket",
    keywords: ["acknowledgment", "initial", "first", "received", "working"],
    path: "/jira-responses",
  },
  {
    id: "jr-2",
    type: "jira-response",
    title: "Pending Information",
    category: "Follow-up",
    description: "Request more info via JIRA",
    keywords: ["pending", "information", "waiting", "need", "require"],
    path: "/jira-responses",
  },
  {
    id: "jr-3",
    type: "jira-response",
    title: "Resolution Complete",
    category: "Closing",
    description: "Close ticket with resolution",
    keywords: ["resolution", "complete", "closed", "solved", "done"],
    path: "/jira-responses",
  },
];

// Glossary Terms
export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "g-1",
    term: "Onboarding",
    definition: "The process of integrating a new employee into an organization, including paperwork, orientation, and training to help them become productive team members.",
    category: "HR Process",
    relatedTerms: ["Orientation", "New Hire"],
  },
  {
    id: "g-2",
    term: "PBP (Performance-Based Pay)",
    definition: "A compensation strategy where employee pay is directly linked to their performance metrics and achievements within a given period.",
    category: "Compensation",
    relatedTerms: ["KPI", "Bonus"],
  },
  {
    id: "g-3",
    term: "Stipend",
    definition: "A fixed regular sum paid as a salary or allowance, often provided for specific purposes such as education, training, or living expenses.",
    category: "Compensation",
    relatedTerms: ["Allowance", "Benefits"],
  },
  {
    id: "g-4",
    term: "KPI (Key Performance Indicator)",
    definition: "A measurable value that demonstrates how effectively an employee or department is achieving key business objectives.",
    category: "Performance",
    relatedTerms: ["PBP", "Metrics"],
  },
  {
    id: "g-5",
    term: "Offboarding",
    definition: "The formal separation process when an employee leaves the company, including exit interviews, knowledge transfer, and asset return.",
    category: "HR Process",
    relatedTerms: ["Exit Interview", "Termination"],
  },
  {
    id: "g-6",
    term: "PTO (Paid Time Off)",
    definition: "A policy that provides employees with a bank of hours that can be used for vacation, sick days, or personal time.",
    category: "Benefits",
    relatedTerms: ["Vacation", "Leave"],
  },
  {
    id: "g-7",
    term: "HRIS (HR Information System)",
    definition: "A software solution for managing HR functions including employee data, payroll, benefits, and compliance.",
    category: "Systems",
    relatedTerms: ["SAP", "SuccessFactors"],
  },
  {
    id: "g-8",
    term: "SuccessFactors",
    definition: "SAP's cloud-based human capital management (HCM) software suite used for HR processes including recruiting, onboarding, and performance management.",
    category: "Systems",
    relatedTerms: ["HRIS", "SAP"],
  },
  {
    id: "g-9",
    term: "LOA (Leave of Absence)",
    definition: "An approved period of time that an employee is away from work while maintaining their employment status.",
    category: "Leave",
    relatedTerms: ["PTO", "FMLA"],
  },
  {
    id: "g-10",
    term: "FMLA (Family and Medical Leave Act)",
    definition: "A US federal law requiring covered employers to provide employees with job-protected unpaid leave for qualified medical and family reasons.",
    category: "Compliance",
    relatedTerms: ["LOA", "Leave"],
  },
  {
    id: "g-11",
    term: "Employee Self-Service (ESS)",
    definition: "A portal or system allowing employees to access and manage their own HR-related information and transactions.",
    category: "Systems",
    relatedTerms: ["HRIS", "Portal"],
  },
  {
    id: "g-12",
    term: "Gross Pay",
    definition: "The total amount of money earned by an employee before any deductions such as taxes, insurance, or retirement contributions.",
    category: "Payroll",
    relatedTerms: ["Net Pay", "Deductions"],
  },
  {
    id: "g-13",
    term: "Net Pay",
    definition: "The amount of money an employee takes home after all deductions have been subtracted from gross pay.",
    category: "Payroll",
    relatedTerms: ["Gross Pay", "Take-home"],
  },
  {
    id: "g-14",
    term: "Direct Deposit",
    definition: "An electronic payment method that deposits an employee's paycheck directly into their bank account.",
    category: "Payroll",
    relatedTerms: ["Payment", "Banking"],
  },
  {
    id: "g-15",
    term: "Ticket",
    definition: "A service request or issue logged in a tracking system like JIRA for resolution by the People Services team.",
    category: "Service",
    relatedTerms: ["JIRA", "Request"],
  },
];

// Convert glossary terms to searchable items
export const glossarySearchItems: SearchableItem[] = glossaryTerms.map((term) => ({
  id: term.id,
  type: "glossary" as const,
  title: term.term,
  category: term.category,
  description: term.definition,
  keywords: [term.term.toLowerCase(), ...(term.relatedTerms || []).map(t => t.toLowerCase())],
  path: "/glossary",
}));

// All searchable content combined
export const allContent: SearchableItem[] = [
  ...phoneScripts,
  ...emailTemplates,
  ...jiraResponses,
  ...glossarySearchItems,
];

// Search function
export function searchContent(query: string): SearchableItem[] {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return allContent.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(normalizedQuery);
    const descriptionMatch = item.description.toLowerCase().includes(normalizedQuery);
    const categoryMatch = item.category.toLowerCase().includes(normalizedQuery);
    const keywordMatch = item.keywords.some((kw) => kw.includes(normalizedQuery));
    
    return titleMatch || descriptionMatch || categoryMatch || keywordMatch;
  });
}

// Get type label for display
export function getTypeLabel(type: SearchableItem["type"]): string {
  const labels: Record<SearchableItem["type"], string> = {
    "phone-script": "Phone Script",
    "email-template": "Email Template",
    "jira-response": "JIRA Response",
    "glossary": "Glossary",
  };
  return labels[type];
}

// Get type color for display
export function getTypeColor(type: SearchableItem["type"]): string {
  const colors: Record<SearchableItem["type"], string> = {
    "phone-script": "bg-info text-primary-foreground",
    "email-template": "bg-success text-primary-foreground",
    "jira-response": "bg-warning text-foreground",
    "glossary": "bg-primary text-primary-foreground",
  };
  return colors[type];
}
