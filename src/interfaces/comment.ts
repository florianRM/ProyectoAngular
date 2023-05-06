import { User } from "src/app/auth/interface/user";
import { Post } from "./post";

export interface Comment {
    post: Post,
    user: User,
    commentContain: string,
    commentDate: Date
}