import { User } from '../app/auth/interface/user';
export interface Post {
    title: string,
    description: string,
    uploadDate: Date,
    img: string,
    user: string,
    _id: number
}