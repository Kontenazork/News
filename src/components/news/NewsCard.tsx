
import { Article } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
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

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <Link href={`/news/${article.id}`}>
            <CardTitle className="text-lg font-bold line-clamp-2 hover:text-primary transition-colors">
              {article.title}
            </CardTitle>
          </Link>
          <Badge variant="outline" className={cn("ml-2 whitespace-nowrap", getBusinessFieldColor(article.businessField))}>
            {article.businessField}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <Calendar className="h-4 w-4 mr-1" />
          {formatDate(article.publicationDate)}
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <Star className="h-4 w-4 mr-1" />
            <span className={cn("font-medium", getScoreColor(article.relevanceScores.overall))}>
              {article.relevanceScores.overall.toFixed(1)}
            </span>
          </span>
        </div>
      </CardHeader>
      {article.imageUrl && (
        <div className="px-6 pt-2">
          <Link href={`/news/${article.id}`}>
            <div className="aspect-video relative rounded-md overflow-hidden">
              <Image 
                src={article.imageUrl} 
                alt={article.title} 
                className="object-cover hover:scale-105 transition-transform duration-300"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Link>
        </div>
      )}
      <CardContent className="py-4 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{article.content}</p>
        
        {article.keyInnovations.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-medium mb-1">Key Innovations:</h4>
            <ul className="text-sm list-disc pl-5 space-y-1">
              {article.keyInnovations.slice(0, 2).map((innovation, index) => (
                <li key={index} className="text-muted-foreground">{innovation}</li>
              ))}
            </ul>
          </div>
        )}
        
        {article.actionableInsights.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-1">Actionable Insights:</h4>
            <ul className="text-sm list-disc pl-5 space-y-1">
              {article.actionableInsights.slice(0, 2).map((insight, index) => (
                <li key={index} className="text-muted-foreground">{insight}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <div className="flex justify-between items-center w-full text-sm">
          <span className="text-muted-foreground">{article.source}</span>
          <div className="flex items-center gap-4">
            <Link 
              href={`/news/${article.id}`}
              className="text-primary hover:underline"
            >
              View details
            </Link>
            <a 
              href={article.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-primary hover:underline"
            >
              Source <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
