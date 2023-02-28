import { User } from './user';
export interface Follow {
    follows: User,
    followed: User
}