import { IVSCodeEvent } from './vscodeEvent';
import { IVSCodeWebviewOptions } from './vscodeWebviewOptions';

export interface IVSCodeWebview {
  onDidReceiveMessage: IVSCodeEvent<any>;
  html: string;
  options: IVSCodeWebviewOptions;
  postMessage(message: any): Thenable<boolean>;
}
