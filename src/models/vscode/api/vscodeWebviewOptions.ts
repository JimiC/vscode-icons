import { IVSCodeUri } from './vscodeUri';

export interface IVSCodeWebviewOptions {
  enableCommandUris?: boolean;
  enableScripts?: boolean;
  localResourceRoots?: readonly IVSCodeUri[];
}
