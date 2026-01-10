import { Layout } from "@/components/layout/Layout";
import { Search, Phone, Mail, AlertTriangle, BookOpen } from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { searchContent, getTypeLabel, getTypeColor, SearchableItem } from "@/data/content";
import { cn } from "@/lib/utils";

// Icons for each type
const typeIcons: Record<SearchableItem["type"], React.ElementType> = {
  "phone-script": Phone,
  "email-template": Mail,
  "jira-response": AlertTriangle,
  "glossary": BookOpen,
};

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // Search results grouped by type
  const { results, groupedResults } = useMemo(() => {
    const searchResults = searchContent(query);
    
    const grouped: Record<SearchableItem["type"], SearchableItem[]> = {
      "phone-script": [],
      "email-template": [],
      "jira-response": [],
      "glossary": [],
    };

    searchResults.forEach((item) => {
      grouped[item.type].push(item);
    });

    return { results: searchResults, groupedResults: grouped };
  }, [query]);

  // Highlight matching text
  const highlightMatch = (text: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? (
        <span key={i} className="bg-primary/20 text-primary font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const categoryOrder: SearchableItem["type"][] = ["phone-script", "email-template", "jira-response", "glossary"];

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Search Results</h1>
            <p className="text-muted-foreground">
              {query ? (
                <>
                  {results.length} {results.length === 1 ? "result" : "results"} for "
                  <span className="text-primary font-medium">{query}</span>"
                </>
              ) : (
                "Enter a search term to find scripts"
              )}
            </p>
          </div>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="space-y-8">
          {categoryOrder.map((type) => {
            const items = groupedResults[type];
            if (items.length === 0) return null;

            const Icon = typeIcons[type];

            return (
              <div key={type} className="animate-fade-in">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-border">
                  <div className={cn("p-2 rounded-lg", getTypeColor(type))}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {getTypeLabel(type)}s
                  </h2>
                  <span className="bg-muted text-muted-foreground text-sm px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </div>

                {/* Results Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                  {items.map((result) => (
                    <Link
                      key={result.id}
                      to={result.path}
                      className="bg-card rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20 group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
                          {highlightMatch(result.title)}
                        </h3>
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                          {result.category}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {highlightMatch(result.description)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : query ? (
        <div className="bg-card rounded-lg shadow-md p-8 text-center animate-fade-in">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-card-foreground mb-2">No Results Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find anything matching "<span className="text-primary font-medium">{query}</span>".
          </p>
          <div className="text-sm text-muted-foreground mb-6">
            <p className="mb-2">Try:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Using different keywords</li>
              <li>Checking your spelling</li>
              <li>Browsing the sidebar categories</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/phone-scripts"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <Phone className="h-4 w-4" />
              View All Templates
            </Link>
            <Link
              to="/help"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium"
            >
              Contact Help
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-lg shadow-md p-8 text-center animate-fade-in">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-card-foreground mb-2">Start Searching</h2>
          <p className="text-muted-foreground mb-6">
            Use the search bar on the homepage to find phone scripts, email templates, JIRA responses, and glossary terms.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Go to Homepage
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default SearchPage;
