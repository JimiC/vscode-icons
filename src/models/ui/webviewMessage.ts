export interface IWebviewMessage {
  command: string;
  text?: string;
  bool?: boolean;
  data?: any;
}
