import { join } from 'path';
import {
  IVSCodeManager,
  IWebviewPanelOptions,
  ILanguageResourceManager,
  LangResourceKeys,
  ViewColumn,
  IWebviewMessage,
} from '../models';
import { WebViewPanel } from './webViewPanel';

export class WelcomeWebviewPanel extends WebViewPanel {
  constructor(
    vscodeManager: IVSCodeManager,
    i18nManager: ILanguageResourceManager,
  ) {
    const options: IWebviewPanelOptions = {
      iconPath: 'images/logo.svg',
      viewType: 'welcome',
      title: 'Welcome',
      showOptions: ViewColumn.One,
      panelOptions: {
        enableScripts: true,
        localResourceRoots: [
          vscodeManager.Uri.file(
            join(vscodeManager.context.extensionPath, 'assets'),
          ),
        ],
      },
    };
    super(vscodeManager, i18nManager, options);
  }

  public async show(): Promise<void> {
    if (this.panel.webview.html) {
      if (this.panel.visible) {
        return;
      }
      const activeTextEditor = this.vscodeManager.window.activeTextEditor;
      const columnToShowIn = activeTextEditor
        ? activeTextEditor.viewColumn
        : undefined;
      return this.panel.reveal(columnToShowIn);
    }
    this.panel.webview.html = await this.bind(this.data());
  }

  protected onMessageReceived(message: IWebviewMessage): Promise<string> {
    switch (message.command) {
      case 'cbwelcomeChanged':
        return this.vscodeManager.window.showErrorMessage(
          `Checkbox checked: ${message.bool}`,
        ) as Promise<string>;
    }
  }

  private data(): object {
    // TODO: Use `panel.webview.asWebviewUri` when reaching minimun `vscode v1.38`
    return {
      nonce: this.getNonce(),
      style: this.vscodeManager.Uri.file(
        join(
          this.panel.webview.options.localResourceRoots[0].path,
          'style',
          'welcome.css',
        ),
      ).with({ scheme: 'vscode-resource' }),
      script: this.vscodeManager.Uri.file(
        join(
          this.panel.webview.options.localResourceRoots[0].path,
          'scripts',
          'welcome.js',
        ),
      ).with({ scheme: 'vscode-resource' }),
      'logo.path': this.vscodeManager.Uri.file(
        join(
          this.panel.webview.options.localResourceRoots[0].path,
          'images',
          'logo.svg',
        ),
      ).with({ scheme: 'vscode-resource' }).path,
      'LangResourceKeys.dontShowThis': LangResourceKeys.dontShowThis,
    };
  }
}
