export interface ChatDefineStoreOptions {
  SDKAppID: number;
}
export interface TIMCoreLoginParams {
  userID: string;
  userSig: string;
}

export interface ITextPayload {
  text: string;
}

export interface TextMessageEvent {
  name: string;
  data: TextMessage[];
}
export interface TextMessage {
  payload: ITextPayload;
}

export interface Conversation {
  lastMessage: TextMessage;
  userProfile: {
    userID: string;
  };
}
export interface itemMessageUser {
  userID: string;
  itemMessage: itemMessage[];
}
export interface itemMessage {
  text: string;
  direction: string;
}
