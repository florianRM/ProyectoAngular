import { User } from '../app/auth/interface/user';
import { Like } from './like';
export interface Post {
    title: string,
    description: string,
    uploadDate: Date,
    img: string,
    user: string,
    id: number,
    likes: Like[]
}