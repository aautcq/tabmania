import * as vscode from 'vscode';
import { getCompletion, initLlm } from './llm';
import { getContent } from './content';

let abortController: AbortController | null = null;

let isInitialized = false;

export async function activate(context: vscode.ExtensionContext) {
	const { url, model } = vscode.workspace.getConfiguration('tabmania')

	const provider = vscode.languages.registerInlineCompletionItemProvider(
		{ pattern: '**' },
		{
			async provideInlineCompletionItems(document, position) {
				if (abortController) abortController.abort();

				const input = getContent(document, position);

				abortController = new AbortController();
				const text = await getCompletion(input, abortController.signal);
				abortController = null;

				const range = new vscode.Range(position, position);
				const completion = new vscode.InlineCompletionItem(text, range);

				return [completion];
			}
		}
	);

	try {
		if (!isInitialized) {
			await initLlm(url, model);
			isInitialized = true;
			vscode.window.showInformationMessage('Tabmania initialized');
		}
		context.subscriptions.push(provider);
	}
	catch (error) {
		vscode.window.showInformationMessage(`Tabmania ${error}`);
	}

}
