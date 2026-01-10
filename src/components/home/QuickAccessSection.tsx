import { Link } from "react-router-dom";
import { Phone, Mail, AlertCircle, Clock, ArrowRight } from "lucide-react";

const quickAccessCards = [
  {
    title: "Phone Scripts",
    description: "Standardized call responses for all regions",
    icon: Phone,
    to: "/phone-scripts",
    iconBg: "bg-info-light",
    iconColor: "text-info",
  },
  {
    title: "Email Templates",
    description: "Pre-approved email responses for common scenarios",
    icon: Mail,
    to: "/email-templates",
    iconBg: "bg-success-light",
    iconColor: "text-success",
  },
  {
    title: "Security Protocols",
    description: "Verification questions and call flow procedures",
    icon: AlertCircle,
    to: "/security",
    iconBg: "bg-purple-light",
    iconColor: "text-purple",
  },
  {
    title: "Recently Updated",
    description: "View the latest script updates and additions",
    icon: Clock,
    to: "/recent",
    iconBg: "bg-warning-light",
    iconColor: "text-warning",
  },
];

export function QuickAccessSection() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-foreground border-b border-border pb-2">
        Quick Access
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {quickAccessCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.to}
              to={card.to}
              className="bg-card rounded-lg shadow-md p-5 hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center mb-4">
                <div className={`${card.iconBg} p-3 rounded-full mr-4`}>
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
                <h3 className="font-semibold text-lg text-card-foreground">{card.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">{card.description}</p>
              <span className="text-info font-medium flex items-center text-sm group-hover:gap-2 transition-all">
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
