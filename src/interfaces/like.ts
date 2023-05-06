import { User } from "src/app/auth/interface/user";
import { Post } from "./post";

export interface Like {
    user: User,
    post: Post
}