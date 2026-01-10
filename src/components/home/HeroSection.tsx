import { Search } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { searchContent, getTypeLabel, getTypeColor, SearchableItem } from "@/data/content";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Live search results - show top 6
  const searchResults = useMemo(() => {
    return searchContent(searchQuery).slice(0, 6);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
      setSearchQuery("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
      setSearchQuery("");
    }
    if (e.key === "Escape") {
      setShowDropdown(false);
      setIsFocused(false);
    }
  };

  const handleResultClick = (result: SearchableItem) => {
    navigate(result.path);
    setShowDropdown(false);
    setSearchQuery("");
  };

  return (
    <section className="bg-gradient-to-r from-primary/90 to-primary rounded-xl p-6 md:p-10 mb-8 shadow-lg text-primary-foreground">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-3">
          Welcome to People Services Scripts Wiki
        </h1>
        <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
          Your quick reference guide for standardized HR responses across all regions
        </p>

        <div ref={searchRef} className="relative w-full max-w-2xl">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(e.target.value.length > 0);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                setIsFocused(true);
                if (searchQuery.length > 0) setShowDropdown(true);
              }}
              placeholder="Search by topic, language, or scenario..."
              className={cn(
                "w-full py-4 md:py-5 px-6 md:px-8 pr-16 rounded-full text-foreground bg-card shadow-lg transition-all duration-300 focus:outline-none",
                isFocused
                  ? "ring-4 ring-primary/50 shadow-[0_0_20px_rgba(4,173,151,0.3)]"
                  : "ring-2 ring-transparent"
              )}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-md"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>

          {/* Quick Results Dropdown */}
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-card rounded-xl shadow-2xl border border-border overflow-hidden z-50 animate-fade-in">
              <div className="p-2 border-b border-border bg-muted/50">
                <p className="text-xs text-muted-foreground font-medium px-2">Quick Results</p>
              </div>
              <div className="max-h-[320px] overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full flex items-start gap-3 p-3 hover:bg-muted transition-colors text-left"
                  >
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded-full shrink-0 mt-0.5 font-medium",
                        getTypeColor(result.type)
                      )}
                    >
                      {getTypeLabel(result.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-card-foreground truncate">{result.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{result.description}</p>
                    </div>
                  </button>
                ))}
              </div>
              <Link
                to={`/search?q=${encodeURIComponent(searchQuery)}`}
                onClick={() => {
                  setShowDropdown(false);
                  setSearchQuery("");
                }}
                className="block w-full p-3 text-center text-sm font-medium text-primary hover:bg-muted transition-colors border-t border-border"
              >
                View all results for "{searchQuery}"
              </Link>
            </div>
          )}

          {/* No Results in Dropdown */}
          {showDropdown && searchQuery.length > 0 && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-card rounded-xl shadow-2xl border border-border p-4 z-50 animate-fade-in">
              <p className="text-center text-muted-foreground text-sm">
                No results found for "{searchQuery}"
              </p>
              <Link
                to="/glossary"
                className="block text-center text-primary text-sm font-medium mt-2 hover:underline"
              >
                Browse the Glossary instead
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
