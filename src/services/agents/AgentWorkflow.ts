
import { ResearchLeaderAgent } from "./ResearchLeaderAgent";
import { ProjectPlannerAgent } from "./ProjectPlannerAgent";
import { ResearchAssistantAgent } from "./ResearchAssistantAgent";
import { EditorAgent } from "./EditorAgent";
import { Settings, Article } from "@/types";
import { AgentResult, ResearchTask } from "./types";

export class AgentWorkflow {
  private researchLeader: ResearchLeaderAgent;
  private projectPlanner: ProjectPlannerAgent;
  private researchAssistants: ResearchAssistantAgent[];
  private editor: EditorAgent;

  constructor(settings: Settings) {
    this.researchLeader = new ResearchLeaderAgent({
      basePrompt: settings.basePrompt,
      businessFields: settings.companyBranches.map(b => b.businessField),
      keywords: settings.keywords,
      timeframe: settings.timeframe
    });

    this.projectPlanner = new ProjectPlannerAgent({
      maxParallelTasks: 3,
      taskPriority: "balanced"
    });

    // Create multiple research assistants for parallel processing
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
  }

  async executeWorkflow(): Promise<AgentResult> {
    try {
      // Step 1: Research Leader establishes scope
      const scopeResult = await this.researchLeader.establishScope();
      if (!scopeResult.success) throw new Error(scopeResult.error);
      const tasks = scopeResult.data as ResearchTask[];

      // Step 2: Project Planner organizes tasks
      const planResult = await this.projectPlanner.planResearch(tasks);
      if (!planResult.success) throw new Error(planResult.error);
      const taskBatches = planResult.data as ResearchTask[][];

      // Step 3: Research Assistants perform parallel research
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

      // Step 4: Editor compiles and scores results
      const editorResult = await this.editor.compileReport(allArticles);
      if (!editorResult.success) throw new Error(editorResult.error);

      return {
        success: true,
        data: editorResult.data
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error in workflow execution"
      };
    }
  }
}
