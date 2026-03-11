// ============================================
// CREVO AI ROUTER — Smart multi-provider AI system
// Routes between NVIDIA NIM, Groq, and Google Gemini
// ============================================

export type AIProvider = 'nvidia' | 'groq' | 'gemini';

export interface AIRequestOptions {
  prompt: string;
  provider?: AIProvider;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

export interface AIResponse {
  text: string;
  provider: AIProvider;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Default models per provider
const MODELS = {
  nvidia: 'meta/llama-3.1-70b-instruct',
  groq: 'llama-3.3-70b-versatile',
  gemini: 'gemini-2.0-flash',
} as const;

// API endpoints
const ENDPOINTS = {
  nvidia: 'https://integrate.api.nvidia.com/v1/chat/completions',
  groq: 'https://api.groq.com/openai/v1/chat/completions',
  gemini: 'https://generativelanguage.googleapis.com/v1beta/models',
} as const;

/**
 * Call NVIDIA NIM API
 */
async function callNvidia(options: AIRequestOptions): Promise<AIResponse> {
  const response = await fetch(ENDPOINTS.nvidia, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODELS.nvidia,
      messages: [
        ...(options.systemPrompt ? [{ role: 'system', content: options.systemPrompt }] : []),
        { role: 'user', content: options.prompt },
      ],
      max_tokens: options.maxTokens || 1024,
      temperature: options.temperature || 0.7,
    }),
  });

  if (!response.ok) throw new Error(`NVIDIA API error: ${response.statusText}`);
  const data = await response.json();

  return {
    text: data.choices[0].message.content,
    provider: 'nvidia',
    model: MODELS.nvidia,
    usage: data.usage ? {
      promptTokens: data.usage.prompt_tokens,
      completionTokens: data.usage.completion_tokens,
      totalTokens: data.usage.total_tokens,
    } : undefined,
  };
}

/**
 * Call Groq API (OpenAI-compatible)
 */
async function callGroq(options: AIRequestOptions): Promise<AIResponse> {
  const response = await fetch(ENDPOINTS.groq, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODELS.groq,
      messages: [
        ...(options.systemPrompt ? [{ role: 'system', content: options.systemPrompt }] : []),
        { role: 'user', content: options.prompt },
      ],
      max_tokens: options.maxTokens || 1024,
      temperature: options.temperature || 0.7,
    }),
  });

  if (!response.ok) throw new Error(`Groq API error: ${response.statusText}`);
  const data = await response.json();

  return {
    text: data.choices[0].message.content,
    provider: 'groq',
    model: MODELS.groq,
    usage: data.usage ? {
      promptTokens: data.usage.prompt_tokens,
      completionTokens: data.usage.completion_tokens,
      totalTokens: data.usage.total_tokens,
    } : undefined,
  };
}

/**
 * Call Google Gemini API
 */
async function callGemini(options: AIRequestOptions): Promise<AIResponse> {
  const url = `${ENDPOINTS.gemini}/${MODELS.gemini}:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const contents = [];
  if (options.systemPrompt) {
    contents.push({ role: 'user', parts: [{ text: options.systemPrompt }] });
    contents.push({ role: 'model', parts: [{ text: 'Understood. I will follow these instructions.' }] });
  }
  contents.push({ role: 'user', parts: [{ text: options.prompt }] });

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        maxOutputTokens: options.maxTokens || 1024,
        temperature: options.temperature || 0.7,
      },
    }),
  });

  if (!response.ok) throw new Error(`Gemini API error: ${response.statusText}`);
  const data = await response.json();

  return {
    text: data.candidates[0].content.parts[0].text,
    provider: 'gemini',
    model: MODELS.gemini,
    usage: data.usageMetadata ? {
      promptTokens: data.usageMetadata.promptTokenCount || 0,
      completionTokens: data.usageMetadata.candidatesTokenCount || 0,
      totalTokens: data.usageMetadata.totalTokenCount || 0,
    } : undefined,
  };
}

/**
 * Smart AI Router — routes to the specified provider with automatic fallback
 */
export async function generateAI(options: AIRequestOptions): Promise<AIResponse> {
  const provider = options.provider || (process.env.DEFAULT_AI_PROVIDER as AIProvider) || 'gemini';

  // Provider chain for fallback: try requested → fallback order
  const fallbackOrder: AIProvider[] = [provider, 'gemini', 'groq', 'nvidia']
    .filter((v, i, a) => a.indexOf(v) === i) as AIProvider[];

  let lastError: Error | null = null;

  for (const p of fallbackOrder) {
    try {
      switch (p) {
        case 'nvidia': return await callNvidia(options);
        case 'groq': return await callGroq(options);
        case 'gemini': return await callGemini(options);
      }
    } catch (err) {
      lastError = err as Error;
      console.warn(`AI provider ${p} failed, trying next...`, err);
    }
  }

  throw lastError || new Error('All AI providers failed');
}

// ============================================
// Pre-built prompts for creator-specific tasks
// ============================================

export const CREATOR_PROMPTS = {
  caption: (context: string) => ({
    prompt: `Generate 3 engaging social media captions for the following content. Include relevant emojis and hashtags.\n\nContent: ${context}`,
    systemPrompt: 'You are a social media expert who writes viral, engaging captions. Keep them concise, punchy, and platform-appropriate.',
  }),

  hashtags: (topic: string, platform: string) => ({
    prompt: `Suggest 15 trending and relevant hashtags for "${topic}" on ${platform}. Mix popular and niche hashtags for maximum reach.`,
    systemPrompt: 'You are a social media growth strategist. Provide hashtags in order of relevance.',
  }),

  script: (topic: string, duration: string) => ({
    prompt: `Write a ${duration} video script about "${topic}". Include hook, main content, and CTA. Format with timestamps.`,
    systemPrompt: 'You are a professional content creator who writes engaging video scripts that keep viewers watching till the end.',
  }),

  reply: (comment: string, tone: string) => ({
    prompt: `Generate a ${tone} reply to this comment: "${comment}". Keep it authentic and engaging.`,
    systemPrompt: 'You are a community manager who writes authentic, on-brand replies that build genuine connections.',
  }),

  contentIdeas: (niche: string, platform: string) => ({
    prompt: `Generate 10 unique content ideas for a ${niche} creator on ${platform}. Include content type, hook, and expected engagement.`,
    systemPrompt: 'You are a content strategist who understands viral trends and audience psychology.',
  }),

  analytics: (data: string) => ({
    prompt: `Analyze this social media performance data and provide actionable insights:\n${data}`,
    systemPrompt: 'You are a data analyst specializing in social media metrics. Provide specific, actionable recommendations.',
  }),
};
