import { ChatMessage } from "./message";

export interface Chat {
    id: string,
    name: string,
    members: string[],
    messages: ChatMessage[],
    group: boolean
}

export interface CreateChat {
    members: string[],
    group: boolean
}

export interface CreateGroup {
    name: string,
    members: string[],
    group: boolean
}