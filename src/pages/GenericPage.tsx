import { Layout } from "@/components/layout/Layout";
import { DollarSign, Database, Star, Clock, HelpCircle, FileText, Clipboard, Flag } from "lucide-react";
import { useParams } from "react-router-dom";

interface GenericPageProps {
  title: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const pageConfigs: Record<string, GenericPageProps> = {
  "payroll-scripts": {
    title: "Payroll Scripts",
    description: "Payroll-related responses and procedures",
    icon: DollarSign,
    iconBg: "bg-success-light",
    iconColor: "text-success",
  },
  "ec-sf-workflows": {
    title: "EC-SF Workflows",
    description: "Employee Central & SuccessFactors workflow guides",
    icon: Database,
    iconBg: "bg-info-light",
    iconColor: "text-info",
  },
  favorites: {
    title: "Favorites",
    description: "Your saved scripts and templates",
    icon: Star,
    iconBg: "bg-warning-light",
    iconColor: "text-warning",
  },
  recent: {
    title: "Recently Updated",
    description: "Latest script updates and additions",
    icon: Clock,
    iconBg: "bg-purple-light",
    iconColor: "text-purple",
  },
  help: {
    title: "Help Center",
    description: "Guides and documentation for using the wiki",
    icon: HelpCircle,
    iconBg: "bg-info-light",
    iconColor: "text-info",
  },
  "call-flow": {
    title: "Call Flow Diagram",
    description: "Visual guide for handling calls",
    icon: FileText,
    iconBg: "bg-success-light",
    iconColor: "text-success",
  },
  "security-protocol": {
    title: "Security Protocol",
    description: "Security verification procedures",
    icon: Clipboard,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
  "decision-tree": {
    title: "Decision Tree",
    description: "Interactive decision guides for common scenarios",
    icon: HelpCircle,
    iconBg: "bg-purple-light",
    iconColor: "text-purple",
  },
};

export function GenericPage({ pageKey }: { pageKey: string }) {
  const config = pageConfigs[pageKey] || {
    title: "Page",
    description: "Content coming soon",
    icon: FileText,
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
  };

  const Icon = config.icon;

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className={`${config.iconBg} p-3 rounded-full`}>
            <Icon className={`h-6 w-6 ${config.iconColor}`} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{config.title}</h1>
            <p className="text-muted-foreground">{config.description}</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-md p-8 text-center">
        <div className={`${config.iconBg} p-6 rounded-full inline-block mb-4`}>
          <Icon className={`h-12 w-12 ${config.iconColor}`} />
        </div>
        <h2 className="text-xl font-semibold text-card-foreground mb-2">Content Coming Soon</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          This section is being developed. Check back later for {config.title.toLowerCase()} content.
        </p>
      </div>
    </Layout>
  );
}

export function CountryPage() {
  const { country } = useParams<{ country: string }>();
  const countryNames: Record<string, string> = {
    colombia: "Colombia 🇨🇴",
    ecuador: "Ecuador 🇪🇨",
    brazil: "Brazil 🇧🇷",
    usa: "USA 🇺🇸",
    canada: "Canada 🇨🇦",
  };

  const displayName = country ? countryNames[country] || country : "Country";

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-info-light p-3 rounded-full">
            <Flag className="h-6 w-6 text-info" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{displayName}</h1>
            <p className="text-muted-foreground">Region-specific scripts and templates</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-md p-8 text-center">
        <div className="bg-info-light p-6 rounded-full inline-block mb-4">
          <Flag className="h-12 w-12 text-info" />
        </div>
        <h2 className="text-xl font-semibold text-card-foreground mb-2">
          {displayName} Content Coming Soon
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Region-specific scripts for {displayName} are being developed.
        </p>
      </div>
    </Layout>
  );
}
