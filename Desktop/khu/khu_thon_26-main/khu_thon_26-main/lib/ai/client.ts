import Anthropic from '@anthropic-ai/sdk';

export const MODEL = 'claude-sonnet-4-5';

let _client: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      'ANTHROPIC_API_KEY is not set. Add it to .env.local or set USE_MOCK=true to skip live API calls.'
    );
  }
  if (!_client) {
    _client = new Anthropic({ apiKey });
  }
  return _client;
}
