import { IVSCodeDisposable } from './vscodeDisposable';

export type IVSCodeEvent<T> = (
  listener: (e: T) => any,
  thisArgs?: any,
  disposables?: IVSCodeDisposable[],
) => IVSCodeDisposable;
