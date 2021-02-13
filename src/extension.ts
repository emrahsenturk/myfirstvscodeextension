import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('"myfirstvscodeextension" aktifleştirildi...');
	vscode.window.setStatusBarMessage("Zaman girişi yapılması bekleniyor...");

	let disposable = vscode.commands.registerCommand('myfirstvscodeextension.setAlarm', () => {

		let optionsTime: vscode.InputBoxOptions = {
			prompt: "Saat kaçta alarm çalsın: ",
			placeHolder: "13:30 vb.."
		}

		let optionsAlarmName: vscode.InputBoxOptions = {
			prompt: "Alarm adı: ",
			placeHolder: "Dinlenme zamanı vb.."
		}
		
		var diffSeconds = 0;
		vscode.window.showInputBox(optionsTime).then(value => {
			if (!value){
				vscode.window.showWarningMessage("Bir değer girmediniz!");
				return;
			}

			vscode.window.setStatusBarMessage("Alarm adı girilmesi bekleniyor...");
			
			var timeStart = new Date("01/01/2021 " + new Date().toLocaleTimeString()).getTime();
			var timeEnd = new Date("01/01/2021 " + value).getTime();
			diffSeconds = timeEnd - timeStart;

			vscode.window.showInputBox(optionsAlarmName).then(value => {
				if (!value){
					value = "Alarm";
					vscode.window.showInformationMessage("Bir değer girilmediği için varsayılan olarak 'Alarm' adı verilmiştir.");
				}

				vscode.window.showInformationMessage("Alarm kuruldu.");
	
				if(diffSeconds != 0){
					diffSeconds /= 1000;
					countDownTime(diffSeconds, value);
				}
			});
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

function countDownTime(diffSeconds:number, alarmName:string){
	let modalMessageTrue: vscode.MessageOptions = {
		modal: true
	}

	let intervalId = setInterval(() => {
		diffSeconds = diffSeconds - 1;
		if(diffSeconds < 4 && diffSeconds != 0) {
			vscode.window.showInformationMessage(diffSeconds.toString());
		}
		if(diffSeconds === 0) {
			clearInterval(intervalId);
			vscode.window.showInformationMessage(alarmName, modalMessageTrue);
			vscode.window.setStatusBarMessage(alarmName);
		} 
	}, 1000);
}
