import * as models from '../models';
import { WelcomeWebviewPanel } from './welcomeWebviewPanel';

export class UIManager implements models.IUIManager {
  // private readonly assetsRootPath: string;
  // private panel: models.IVSCodeWebviewPanel;
  private welcomePage: WelcomeWebviewPanel;

  constructor(
    private vscodeManager: models.IVSCodeManager,
    private i18nManager: models.ILanguageResourceManager,
  ) {}

  public async showWelcomePage(): Promise<void> {
    if (!this.welcomePage) {
      this.welcomePage = new WelcomeWebviewPanel(
        this.vscodeManager,
        this.i18nManager,
      );
      this.welcomePage.panel.onDidDispose(
        () => (this.welcomePage = undefined),
        undefined,
        this.vscodeManager.context.subscriptions,
      );
    }
    await this.welcomePage.show();
    await this.welcomePage.sendMessage({ command: 'dontShowThis', bool: true });
  }
}
