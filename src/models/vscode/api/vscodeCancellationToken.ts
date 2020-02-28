import { IVSCodeEvent } from './vscodeEvent';

export interface IVSCodeCancellationToken {
  isCancellationRequested: boolean;
  onCancellationRequested: IVSCodeEvent<any>;
}
