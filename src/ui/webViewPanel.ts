import { join } from 'path';
import {
  IVSCodeManager,
  IVSCodeWebviewPanel,
  IWebviewPanelOptions,
  ILanguageResourceManager,
  IWebviewMessage,
} from '../models';

export abstract class WebViewPanel {
  public panel: IVSCodeWebviewPanel;

  constructor(
    protected vscodeManager: IVSCodeManager,
    protected i18nManager: ILanguageResourceManager,
    protected options: IWebviewPanelOptions,
  ) {
    this.panel = this.vscodeManager.window.createWebviewPanel(
      options.viewType,
      options.title,
      options.showOptions,
      options.panelOptions,
    );
    this.panel.iconPath = this.vscodeManager.Uri.file(
      join(
        this.panel.webview.options.localResourceRoots[0].path,
        options.iconPath,
      ),
    ).with({ scheme: 'file' });
    this.panel.webview.onDidReceiveMessage(
      this.onMessageReceived,
      this,
      this.vscodeManager.context.subscriptions,
    );
    this.panel.onDidDispose(
      this.onDisposed,
      this,
      this.vscodeManager.context.subscriptions,
    );
  }

  public sendMessage(message: IWebviewMessage): Promise<boolean> {
    return this.panel.webview.postMessage(message) as Promise<boolean>;
  }

  public getNonce(): string {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  protected async bind(data: object, fileName?: string): Promise<string> {
    let content = (
      await this.vscodeManager.workspace.openTextDocument(
        join(
          this.panel.webview.options.localResourceRoots[0].path,
          'views',
          `${fileName || this.options.viewType}.html`,
        ),
      )
    ).getText();
    for (const key of Object.keys(data)) {
      const regexp = RegExp(`{{${key}}}`, 'ig');
      const value = /LangResourceKeys/.test(key)
        ? this.i18nManager.localize(data[key])
        : data[key];
      content = content.replace(regexp, value);
    }
    return content;
  }

  private onDisposed(): void {
    this.panel = undefined;
  }

  public abstract show(): Promise<void>;
  protected abstract onMessageReceived(message: any): Promise<string>;
}
