
import { useState, useEffect, useCallback } from "react";
import { Article, BusinessField } from "@/types";
import { mockDataService } from "@/services/mockData";
import { NewsCard } from "@/components/news/NewsCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  LayoutGrid, 
  List, 
  Search, 
  SlidersHorizontal,
  X
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [businessFieldFilter, setBusinessFieldFilter] = useState<BusinessField | "all">("all");
  const [sortBy, setSortBy] = useState<"date" | "relevance">("date");

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await mockDataService.getArticles();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = useCallback(() => {
    let filtered = [...articles];
    
    // Apply business field filter
    if (businessFieldFilter !== "all") {
      filtered = filtered.filter(article => article.businessField === businessFieldFilter);
    }
    
    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.content.toLowerCase().includes(query) ||
        article.keyInnovations.some(innovation => innovation.toLowerCase().includes(query)) ||
        article.actionableInsights.some(insight => insight.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    if (sortBy === "date") {
      filtered.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());
    } else {
      filtered.sort((a, b) => b.relevanceScores.overall - a.relevanceScores.overall);
    }
    
    setFilteredArticles(filtered);
  }, [articles, searchQuery, businessFieldFilter, sortBy]);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, searchQuery, businessFieldFilter, sortBy, filterArticles]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterArticles();
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const resetFilters = () => {
    setBusinessFieldFilter("all");
    setSortBy("date");
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">News Articles</h1>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-8"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter & Sort</SheetTitle>
                <SheetDescription>
                  Customize how articles are displayed
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Business Field</h3>
                  <Select 
                    value={businessFieldFilter} 
                    onValueChange={(value) => setBusinessFieldFilter(value as BusinessField | "all")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Fields</SelectItem>
                      <SelectItem value="HPC">HPC</SelectItem>
                      <SelectItem value="Bitcoin">Bitcoin</SelectItem>
                      <SelectItem value="Energy Storage">Energy Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Sort By</h3>
                  <Select 
                    value={sortBy} 
                    onValueChange={(value) => setSortBy(value as "date" | "relevance")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Latest First</SelectItem>
                      <SelectItem value="relevance">Relevance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button>Apply</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          <div className="border rounded-md overflow-hidden flex">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-none"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No articles found matching your criteria.</p>
          <Button variant="link" onClick={resetFilters}>Clear filters</Button>
        </div>
      ) : (
        <Tabs defaultValue={viewMode} value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list")}>
          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <div key={article.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-bold">{article.title}</h2>
                    <div className="text-sm text-muted-foreground">
                      {new Date(article.publicationDate).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{article.content}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm">{article.businessField}</div>
                    <a 
                      href={article.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-primary hover:underline"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
