import { Follow } from './follow';
export interface User {
    username: string,
    email: string,
    name: string,
    surName: string,
    creationDate: Date,
    enabled: boolean,
    phoneNumber: string,
    role: string,
    user: Follow[],
    followed: Follow[],
    img: string
}