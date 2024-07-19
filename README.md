# Tabmania

A Visual Studio Code extension that provides code autocompletion in the same way as GitHub Copilot. It uses locally hosted Large Language Models (such as [Mistral](https://mistral.ai/), [Phi3](https://ollama.com/library/phi3),...) downloaded and served with [Ollama](https://ollama.com/).

## Features

When writing in a file, Tabmania provides autocompletion. Pressing the **tab** key accepts the suggestion and inserts the text at the cursor location.

\!\[feature screenshot\]\(https://github.com/aautcq/tabmania/blob/master/images/feature.png?raw=true\)

## Extension Settings

This extension contributes the following settings:

* `tabmania.url`: URL to the local ollama server.
* `tabmania.model`: Name of the AI model to use.

## Known Issues

The autocomplete suggestions can take a long time to be displayed. This can be due to the size of the model used and the amount of memory in your computer. We recommend sticking with relatively small models, such as **Phi3** and having at least 32GB of memory.

## Release Notes

### 1.0.0

Initial release of Tabmania
