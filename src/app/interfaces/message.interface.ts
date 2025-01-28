export interface Message {
  text: string;
  isDeep: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}
