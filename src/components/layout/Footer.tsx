import { Link } from "react-router-dom";
import { Mail, MessageSquare, Share2 } from "lucide-react";

const footerSections = [
  {
    title: "Resources",
    links: [
      { to: "/documentation", label: "Documentation" },
      { to: "/training", label: "Training Videos" },
      { to: "/policies", label: "HR Policies" },
      { to: "/compliance", label: "Compliance Guide" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/help", label: "Help Center" },
      { to: "/contact-it", label: "Contact IT" },
      { to: "/report-issue", label: "Report Issue" },
      { to: "/feedback", label: "Feedback" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Use" },
      { to: "/cookies", label: "Cookie Policy" },
      { to: "/data-protection", label: "Data Protection" },
    ],
  },
];

const socialLinks = [
  { icon: Mail, label: "Email", href: "#" },
  { icon: MessageSquare, label: "Chat", href: "#" },
  { icon: Share2, label: "Share", href: "#" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString();

  return (
    <footer className="bg-primary text-primary-foreground mt-8">
      <div className="max-w-[1400px] mx-auto px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">HR ScriptWiki</h3>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Your comprehensive resource for standardized HR responses across all regions.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/70">
          <p>© {currentYear} B. Braun People Services. All rights reserved. | Version 2.1.4</p>
          <p className="mt-1">Last updated: {currentDate}</p>
        </div>
      </div>
    </footer>
  );
}
