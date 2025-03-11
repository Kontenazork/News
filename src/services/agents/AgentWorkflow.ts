import { ResearchLeaderAgent } from "./ResearchLeaderAgent";
import { ProjectPlannerAgent } from "./ProjectPlannerAgent";
import { ResearchAssistantAgent } from "./ResearchAssistantAgent";
import { EditorAgent } from "./EditorAgent";
import { CompetitorAnalysisAgent } from './CompetitorAnalysisAgent';
import { Settings, Article } from "@/types";
import { AgentResult, ResearchTask } from "./types";

export class AgentWorkflow {
  private researchLeader: ResearchLeaderAgent;
  private projectPlanner: ProjectPlannerAgent;
  private researchAssistants: ResearchAssistantAgent[];
  private editor: EditorAgent;
  private competitorAnalysis: CompetitorAnalysisAgent;
  private settings: Required<Settings>;

  constructor(settings: Required<Settings>) {
    this.settings = settings;
    this.researchLeader = new ResearchLeaderAgent({
      basePrompt: settings.basePrompt,
      businessFields: settings.companyBranches.map(b => b.businessField),
      keywords: settings.keywords,
      timeframe: settings.timeframe
    });

    this.projectPlanner = new ProjectPlannerAgent({
      maxParallelTasks: 3,
      taskPriority: 'balanced'
    });

    this.researchAssistants = Array(3).fill(null).map(() => new ResearchAssistantAgent({
      perplexityPrompt: settings.perplexityPrompt,
      perplexityMaxTokens: settings.perplexityMaxTokens,
      perplexityTemperature: settings.perplexityTemperature,
      autoRetry: settings.perplexityAutoRetry,
      stream: settings.perplexityStream
    }));

    this.editor = new EditorAgent({
      editorPrompt: settings.editorPrompt,
      relevanceWeights: settings.relevanceWeights,
      minimumScore: settings.minimumScore
    });

    this.competitorAnalysis = new CompetitorAnalysisAgent({
      competitors: settings.competitorAnalysis.competitors,
      minMentionsThreshold: settings.competitorAnalysis.minMentionsThreshold,
      timeframe: {
        start: new Date(Date.now() - settings.timeframe * 24 * 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString()
      }
    });
  }

  async executeWorkflow(): Promise<AgentResult> {
    try {
      const scopeResult = await this.researchLeader.establishScope();
      if (!scopeResult.success) throw new Error(scopeResult.error);
      const tasks = scopeResult.data as ResearchTask[];

      const planResult = await this.projectPlanner.planResearch(tasks);
      if (!planResult.success) throw new Error(planResult.error);
      const taskBatches = planResult.data as ResearchTask[][];

      const allArticles: Article[] = [];
      for (const batch of taskBatches) {
        const researchPromises = batch.map((task, index) => 
          this.researchAssistants[index % this.researchAssistants.length].performResearch(task)
        );
        const batchResults = await Promise.all(researchPromises);
        
        batchResults.forEach(result => {
          if (result.success && result.data) {
            allArticles.push(...result.data);
          }
        });
      }

      const editorResult = await this.editor.compileReport(allArticles);
      if (!editorResult.success) throw new Error(editorResult.error);

      // Add competitor analysis if enabled
      if (this.settings.competitorAnalysis.enabled) {
        const competitorAnalysisResult = await this.competitorAnalysis.analyzeArticles(allArticles);
        if (!competitorAnalysisResult.success) {
          console.warn('Competitor analysis failed:', competitorAnalysisResult.error);
        } else {
          editorResult.data.competitorAnalysis = competitorAnalysisResult.data;
        }
      }

      return {
        success: true,
        data: editorResult.data
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error in workflow execution'
      };
    }
  }
}