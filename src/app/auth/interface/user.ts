import { Follow } from '../../../interfaces/follow';
export interface User {
    username: string,
    email: string,
    name: string,
    surName: string,
    lastName: string,
    creationDate: Date,
    enabled: boolean,
    role: string,
    user: Follow[],
    followed: Follow[],
    img: string
}