import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('"myfirstvscodeextension" aktifleştirildi...');

	const editor = vscode.window.activeTextEditor;

	let disposable = vscode.commands.registerCommand('myfirstvscodeextension.clearSpaces', () => {

		if(editor){
			const document = editor.document;
			const selection = editor.selection;
			const selectedPortion = document.getText(selection);
			const withoutSpaces = selectedPortion.replace(/\s+/g, '');
			editor.edit(editBuilder => {
				editBuilder.replace(selection, withoutSpaces);
			});
			vscode.window.showInformationMessage('Boşluklar silindi.');
		} else {
			vscode.window.showInformationMessage('Aktif bir kod penceresi bulunamadı!');
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
