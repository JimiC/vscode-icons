import {
  IVSCodeWebviewOptions,
  IVSCodeWebviewPanelOptions,
  ViewColumn,
} from '../vscode';

export interface IWebviewPanelOptions {
  viewType: string;
  title: string;
  showOptions: ViewColumn | { preserveFocus: boolean; viewColumn: ViewColumn };
  panelOptions?: IVSCodeWebviewPanelOptions & IVSCodeWebviewOptions;
  iconPath?: string;
}
