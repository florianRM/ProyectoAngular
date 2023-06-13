import { User } from "src/app/auth/interface/user";
import { Post } from "./post";

export interface Comment {
    id: number,
    post: Post,
    user: string,
    commentContain: string,
    commentDate: Date
}