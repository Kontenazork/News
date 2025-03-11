
import { config } from './config';

const mockChatResponse = () => {
  return {
    text: "This is a mock response from the chat API.",
    sources: []
  };
};

export const perplexityApi = {
  async chat(messages: { role: string; content: string }[]) {
    const useMockData = config.app?.useMockData ?? false;
    
    if (useMockData) {
      return mockChatResponse();
    }

    if (!config.perplexity?.apiKey) {
      throw new Error('Perplexity API key not configured');
    }

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.perplexity.apiKey}`
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-instruct',
          messages
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return {
        text: data.choices[0].message.content,
        sources: data.choices[0].message.context || []
      };
    } catch (error) {
      console.error('Error calling Perplexity API:', error);
      throw error;
    }
  }
};

export const openaiApi = {
  async chat(messages: { role: string; content: string }[]) {
    const useMockData = config.app?.useMockData ?? false;
    
    if (useMockData) {
      return mockChatResponse();
    }

    if (!config.openai?.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.openai.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return {
        text: data.choices[0].message.content,
        sources: []
      };
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
  }
};
