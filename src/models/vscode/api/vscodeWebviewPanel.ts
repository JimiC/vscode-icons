import { IVSCodeEvent } from './vscodeEvent';
import { IVSCodeUri } from './vscodeUri';
import { ViewColumn } from './vscodeViewColumn';
import { IVSCodeWebview } from './vscodeWebview';
import { IVSCodeWebviewPanelOptions } from './vscodeWebviewPanelOptions';

export interface IVSCodeWebviewPanel {
  readonly active: boolean;
  readonly options: IVSCodeWebviewPanelOptions;
  readonly onDidDispose: IVSCodeEvent<void>;
  readonly viewColumn?: ViewColumn;
  readonly viewType: string;
  readonly visible: boolean;
  readonly webview: IVSCodeWebview;
  iconPath?: IVSCodeUri | { dark: IVSCodeUri; light: IVSCodeUri };
  title: string;
  dispose(): any;
  reveal(viewColumn?: ViewColumn, preserveFocus?: boolean): void;
}
