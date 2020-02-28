import {
  IVSCodeCommands,
  IVSCodeEnv,
  IVSCodeExtensionContext,
  IVSCodeWindow,
  IVSCodeWorkspace,
  IVSCodeUriStatic,
} from './api';

export interface IVSCodeManager {
  context: IVSCodeExtensionContext;
  env: IVSCodeEnv;
  commands: IVSCodeCommands;
  version: string;
  window: IVSCodeWindow;
  workspace: IVSCodeWorkspace;
  Uri: IVSCodeUriStatic;
  supportsThemesReload: boolean;
  isSupportedVersion: boolean;
  getWorkspacePaths(): string[];
  getAppUserDirPath(): string;
}
