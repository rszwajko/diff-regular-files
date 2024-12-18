import * as vscode from "vscode";

interface ApplyBlockArgs {
  mapping: { original: vscode.Range; innerChanges: unknown };
  modifiedUri: vscode.Uri;
  originalUri: vscode.Uri;
  originalWithModifiedChanges: string;
}

export const applyBlock = async ({
  originalUri,
  originalWithModifiedChanges,
}: ApplyBlockArgs) => {
  const doc = vscode.workspace.textDocuments.find(
    (doc) => doc.uri.toString() === originalUri.toString()
  );

  if (!doc) {
    vscode.window.showErrorMessage(
      `Failed to retrieve editor for ${originalUri}`
    );
    console.error(`Failed to retrieve editor for ${originalUri}`);
    return;
  }

  const edit = new vscode.WorkspaceEdit();
  edit.replace(
    originalUri,
    new vscode.Range(0, 0, doc.lineCount, 0),
    originalWithModifiedChanges
  );

  // note that left side edits will open a duplicated editor
  // bug opened: https://github.com/microsoft/vscode/issues/234097
  return vscode.workspace.applyEdit(edit);
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("diff-regular-files.applyBlock", applyBlock)
  );
}

export function deactivate() {}
