export interface Post{
    id:string,
    caption:string,
    user_id:string,
    updated_at:string,
    created_at:string,
    file_path:string,
    file_type:string,
    metadata:object,
}

export interface PostAction{
    id:string,
    action:'likes'|'shares',
    user_id:string,
    is_true:boolean,
    created_at:string,
    updated_at:string,
    post_id:string,
    metadata:object
}