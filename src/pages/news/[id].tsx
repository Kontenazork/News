
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Article } from "@/types";
import { mockDataService } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Calendar, 
  ExternalLink, 
  Star, 
  BarChart3, 
  Briefcase, 
  Lightbulb, 
  Share2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ArticleDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const data = await mockDataService.getArticleById(id as string);
        setArticle(data);
        
        // Fetch related articles from the same business field
        if (data) {
          const allArticles = await mockDataService.getArticles();
          const related = allArticles
            .filter(a => a.id !== id && a.businessField === data.businessField)
            .sort((a, b) => b.relevanceScores.overall - a.relevanceScores.overall)
            .slice(0, 3);
          setRelatedArticles(related);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getBusinessFieldColor = (field: string) => {
    switch (field) {
      case "HPC":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Bitcoin":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Energy Storage":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-green-600 dark:text-green-400";
    if (score >= 3.8) return "text-blue-600 dark:text-blue-400";
    return "text-amber-600 dark:text-amber-400";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container max-w-4xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/news")}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Button>
          
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => router.push("/news")}>
              Browse All Articles
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => router.push("/news")}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to News
        </Button>
        
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className={cn("whitespace-nowrap", getBusinessFieldColor(article.businessField))}>
            {article.businessField}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(article.publicationDate)}
          </div>
          <div className="flex items-center text-sm ml-auto">
            <Star className="h-4 w-4 mr-1" />
            <span className={cn("font-medium", getScoreColor(article.relevanceScores.overall))}>
              {article.relevanceScores.overall.toFixed(1)} Relevance Score
            </span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Source: {article.source}</span>
          <a 
            href={article.sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center ml-4 text-primary hover:underline"
          >
            Original Article <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>
      
      {article.imageUrl && (
        <div className="mb-8">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image 
              src={article.imageUrl} 
              alt={article.title} 
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Article Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{article.content}</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Relevance Scores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Technical</span>
                    <span className={getScoreColor(article.relevanceScores.technical)}>
                      {article.relevanceScores.technical.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${(article.relevanceScores.technical / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Business</span>
                    <span className={getScoreColor(article.relevanceScores.business)}>
                      {article.relevanceScores.business.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${(article.relevanceScores.business / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Sustainability</span>
                    <span className={getScoreColor(article.relevanceScores.sustainability)}>
                      {article.relevanceScores.sustainability.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full" 
                      style={{ width: `${(article.relevanceScores.sustainability / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="pt-2 mt-2 border-t">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Overall</span>
                    <span className={cn("font-medium", getScoreColor(article.relevanceScores.overall))}>
                      {article.relevanceScores.overall.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${(article.relevanceScores.overall / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Lightbulb className="h-4 w-4 mr-2" />
                Key Innovations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {article.keyInnovations.map((innovation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs mr-2 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm">{innovation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                Actionable Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {article.actionableInsights.map((insight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs mr-2 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm">{insight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {relatedArticles.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Card key={relatedArticle.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base line-clamp-2">{relatedArticle.title}</CardTitle>
                  <CardDescription className="flex items-center text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(relatedArticle.publicationDate)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                    {relatedArticle.content}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link 
                    href={`/news/${relatedArticle.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Read more
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-8 pt-6 border-t flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={() => router.push("/news")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to News
        </Button>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => {
            // In a real app, this would open a share dialog
            // For now, we'll just copy the URL to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
          }}
        >
          <Share2 className="h-4 w-4" />
          Share Article
        </Button>
      </div>
    </div>
  );
}
