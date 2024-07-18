import * as vscode from 'vscode';

// The range of lines to consider for the completion context
const LINE_RANGE = 100;

// Get the context around the current position
export function getContent(document: vscode.TextDocument, position: vscode.Position) {
	const lineStart = Math.max(0, position.line - Math.round(LINE_RANGE / 2));
	const lineEnd = Math.min(document.lineCount - 1, position.line + Math.round(LINE_RANGE / 2));

	let range: vscode.Range;

	if (lineStart === lineEnd) {
		range = document.lineAt(position.line).range;
	} else {
		const charEnd = document.lineAt(lineEnd).range.end.character;

		range = new vscode.Range(
			new vscode.Position(lineStart, 0),
			new vscode.Position(lineEnd, charEnd)
		);
	}

	const validatedRange = document.validateRange(range);

	return document.getText(validatedRange);
}
