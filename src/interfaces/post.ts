import { Like } from './like';
export interface Post {
    description: string,
    uploadDate: Date,
    img: string,
    user: string,
    id: number,
    likes: Like[]
}