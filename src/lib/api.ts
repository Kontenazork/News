
import { config } from "./config";

export const perplexityApi = {
  async chat(messages: { role: string; content: string }[]) {
    if (config.app.useMockData) {
      return mockChatResponse();
    }

    const response = await fetch(config.perplexity.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.perplexity.apiKey}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error("Perplexity API request failed");
    }

    return response.json();
  },
};

export const pineconeApi = {
  async query(vector: number[], topK: number = 5) {
    if (config.app.useMockData) {
      return mockPineconeResponse();
    }

    const response = await fetch(`${config.pinecone.url}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": config.pinecone.apiKey,
      },
      body: JSON.stringify({
        vector,
        topK,
        namespace: config.pinecone.namespace,
      }),
    });

    if (!response.ok) {
      throw new Error("Pinecone API request failed");
    }

    return response.json();
  },
};

// Mock responses for development
const mockChatResponse = () => ({
  choices: [
    {
      message: {
        role: "assistant",
        content: "This is a mock response from the chat API.",
      },
    },
  ],
});

const mockPineconeResponse = () => ({
  matches: [
    {
      id: "mock-id-1",
      score: 0.95,
      metadata: {
        title: "Mock Article 1",
        content: "This is a mock article content.",
      },
    },
  ],
});
