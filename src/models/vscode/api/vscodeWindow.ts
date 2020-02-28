import { IVSCodeTextEditor } from './vscodeTextEditor';
import { ViewColumn } from './vscodeViewColumn';
import { IVSCodeWebviewOptions } from './vscodeWebviewOptions';
import { IVSCodeWebviewPanel } from './vscodeWebviewPanel';
import { IVSCodeWebviewPanelOptions } from './vscodeWebviewPanelOptions';

export interface IVSCodeWindow {
  activeTextEditor?: IVSCodeTextEditor;
  createWebviewPanel(
    viewType: string,
    title: string,
    showOptions:
      | ViewColumn
      | { preserveFocus: boolean; viewColumn: ViewColumn },
    options?: IVSCodeWebviewPanelOptions & IVSCodeWebviewOptions,
  ): IVSCodeWebviewPanel;

  showInformationMessage(
    message: string,
    ...items: string[]
  ): Thenable<string | undefined>;

  showWarningMessage(
    message: string,
    ...items: string[]
  ): Thenable<string | undefined>;

  showErrorMessage(
    message: string,
    ...items: string[]
  ): Thenable<string | undefined>;
}
