import { NextRequest, NextResponse } from 'next/server';
import { generateAI, CREATOR_PROMPTS } from '@/lib/ai/ai-router';
import type { AIProvider } from '@/lib/ai/ai-router';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, prompt, provider, context } = body as {
      type?: string;
      prompt?: string;
      provider?: AIProvider;
      context?: Record<string, string>;
    };

    let aiPrompt = prompt || '';
    let systemPrompt: string | undefined;

    // Use pre-built prompts if type is specified
    if (type && context) {
      switch (type) {
        case 'caption': {
          const p = CREATOR_PROMPTS.caption(context.content || '');
          aiPrompt = p.prompt;
          systemPrompt = p.systemPrompt;
          break;
        }
        case 'hashtags': {
          const p = CREATOR_PROMPTS.hashtags(context.topic || '', context.platform || 'instagram');
          aiPrompt = p.prompt;
          systemPrompt = p.systemPrompt;
          break;
        }
        case 'script': {
          const p = CREATOR_PROMPTS.script(context.topic || '', context.duration || '60 seconds');
          aiPrompt = p.prompt;
          systemPrompt = p.systemPrompt;
          break;
        }
        case 'reply': {
          const p = CREATOR_PROMPTS.reply(context.comment || '', context.tone || 'friendly');
          aiPrompt = p.prompt;
          systemPrompt = p.systemPrompt;
          break;
        }
        case 'ideas': {
          const p = CREATOR_PROMPTS.contentIdeas(context.niche || '', context.platform || 'instagram');
          aiPrompt = p.prompt;
          systemPrompt = p.systemPrompt;
          break;
        }
        case 'analytics': {
          const p = CREATOR_PROMPTS.analytics(context.data || '');
          aiPrompt = p.prompt;
          systemPrompt = p.systemPrompt;
          break;
        }
      }
    }

    if (!aiPrompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const result = await generateAI({
      prompt: aiPrompt,
      provider: provider || undefined,
      systemPrompt,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'AI generation failed' },
      { status: 500 }
    );
  }
}
