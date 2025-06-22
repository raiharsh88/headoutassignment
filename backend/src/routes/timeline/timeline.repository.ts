import { PoolClient } from 'pg'
import pool from '../../clients/database'
import { Post, PostAction } from '../../models/timeline'
import { containerClient, directoryPrefix } from '../../clients/azureStorage';

interface PostResponse extends Post{
    likes: number,
    shares:number
}

export class TimelineRepository {
    private connection: PoolClient | undefined;
    private instance: TimelineRepository | undefined;
    async getInstance() {
        if (!this.instance) {
            this.instance = new TimelineRepository();
            this.instance.connection = (await pool.connect());
        }
        return this.instance
    }

    async get(page: number, limit: number = 20): Promise<PostResponse[]> {
        const offset = (page - 1) * limit;
        const query = this.commonPostQuery() + ` LIMIT $1 OFFSET $2`
        const result = await this.connection?.query(query, [limit, offset]);
        return result?.rows as PostResponse[];
    }

    async getPost(postId:string): Promise<PostResponse> {
        const query = this.commonPostQuery(postId)
        const result = await this.connection?.query(query, [postId]);
        return result?.rows?.[0] as PostResponse;
    }

    async patch(postId: string, userId: string, action: string, meta: any = {}) {
        const query = `INSERT INTO action_logs (action, user_id, post_id, metadata)
                       VALUES ($1, $2, $3, $4)
                        on conflict (action , user_id , post_id)
                        do update set is_true = not action_logs.is_true
                        `;
        await this.connection?.query(query, [action, userId, postId, meta]);
    }
    async post(postId: string, file_name: string, user_id: string,caption:string, buffer:any,mime_type:string) {
        const blobName = `${directoryPrefix}${file_name}`;
        containerClient.setAccessPolicy('blob')
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        
        // Upload file to Azure Blob Storage
        const blobResponse = await blockBlobClient.upload(buffer, buffer.length, {
            blobHTTPHeaders: {
                blobContentType: mime_type
            }
        });
    
        const filePath = `${process.env.AZURE_STORAGE_BASE_URL}${file_name}`
        const query = `INSERT INTO posts (id, file_path, user_id,caption)
                       VALUES ($1, $2, $3,$4)
                        `;
        console.log(query)
        await this.connection?.query(query, [postId, filePath, user_id,caption]);
    }

    async delete(postId: string, userId: string) {
        return {
            message:'not implemented yet'
        }
    }

    private commonPostQuery(postId?:string){
        return `SELECT p.*, 
        sum(
            case when al.action = 'likes' and al.is_true
                then 1
                else 0
            ) as likes ,
        sum(
        case when al.action = 'shares'  and al.is_true
            then 1
            else 0
            ) as shares 
        FROM posts p 
    `
    + (postId?` where p.id = $1`:'') +
    `
    join action_logs al on al.post_id = p.id 
    group by p.id,p.caption, p.user_id, p.file_path, p.file_type, p.created_at, p.metadata,p.updated_at
    order by p.created_at desc`;
    }

}