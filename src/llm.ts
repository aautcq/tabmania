import { ChatOllama } from '@langchain/community/chat_models/ollama'
import { ChatPromptTemplate } from '@langchain/core/prompts'

// LLM prompt
const PROMPT = `
	You are assisting me in writing code or plain text.
	Based on the input provided, complete the following in the most concise and accurate way possible.
	Your response should only include the missing part needed to complete the input.
	Do not repeat the input or provide any additional context.

	<Input>
		{input}
	</Input>

	If the input is already complete, or if you are unsure how to complete it, do not provide any response.
	Only provide a response if it is clear that something is missing or incomplete.
`;

let OLLAMA_URL = 'http://localhost:11434';

let MODEL = 'mistral';

interface OllamaModel {
  name: string
  details: { parameter_size: string }
  modified_at: string
}

export async function initLlm(url: string, model: string) {
	OLLAMA_URL = url;
	MODEL = model;

	const response = await fetch(`${OLLAMA_URL}/api/tags`);
	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}
	const { models } = await response.json() as { models: OllamaModel[] };

	if (!models.some(({ name }) => name.split(':').slice(0, 1)[0] === model)) {
		throw new Error(`Model ${model} not found`);
	}
}

// Get the completion text based on the context
export async function getCompletion(input: string, signal: AbortSignal) {
	const chatModel = new ChatOllama({ baseUrl: OLLAMA_URL, model: MODEL });

  const prompt = ChatPromptTemplate.fromMessages([['system', PROMPT]]);
	const chain = prompt.pipe(chatModel);

	const answer = await chain.invoke({ input, signal });
	return answer.content.toString();
}
