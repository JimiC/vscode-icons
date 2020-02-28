import { IVSCodeCancellationToken } from './vscodeCancellationToken';
import { IVSCodeConfigurationChangeEvent } from './vscodeConfigurationChangeEvent';
import { IVSCodeEvent } from './vscodeEvent';
import { IVSCodeTextDocument } from './vscodeTextDocument';
import { IVSCodeUri } from './vscodeUri';
import { IVSCodeWorkspaceConfiguration } from './vscodeWorkspaceConfiguration';
import { IVSCodeWorkspaceFolder } from './vscodeWorkspaceFolder';

export interface IVSCodeWorkspace {
  rootPath: string | undefined;
  workspaceFolders: IVSCodeWorkspaceFolder[] | undefined;
  onDidChangeConfiguration: IVSCodeEvent<IVSCodeConfigurationChangeEvent>;
  getConfiguration(
    section?: string,
    resource?: IVSCodeUri,
  ): IVSCodeWorkspaceConfiguration;
  findFiles(
    include: GlobPattern,
    exclude?: GlobPattern,
    maxResults?: number,
    token?: IVSCodeCancellationToken,
  ): Thenable<IVSCodeUri[]>;
  openTextDocument(fileName: string): Thenable<IVSCodeTextDocument>;
}

type GlobPattern = string | IVSCodeRelativePattern;

interface IVSCodeRelativePattern {
  base: string;
  pattern: string;
  new (base: IVSCodeWorkspaceFolder | string, pattern: string);
}
