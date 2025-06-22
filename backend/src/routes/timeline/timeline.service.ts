import { randomUUID } from "crypto";
import { TimelineRepository } from "./timeline.repository";

export default class  TimelineService{
    private repository:TimelineRepository|undefined;
    private instance:TimelineService|undefined;
    async getInstance(){
        if(!this.instance){
            this.instance = await new TimelineService();
            this.instance.repository = await new TimelineRepository().getInstance();
        }
        return this.instance;
    }
    async get(page:number, limit:number){
        return this.repository?.get(page, limit);
    }

    async getPost(postId:string){
        return this.repository?.getPost(postId);
    }
    async patch(postId: string, userId: string, action: string, meta: any = {}){
        return this.repository?.patch(postId, userId, action, meta);
    }

    async post(file_name:string, user_id:string,caption:string, buffer:any , mime_type:string){
        console.log(file_name, user_id);
        const postId = randomUUID();
        return this.repository?.post(postId, file_name, user_id,caption,buffer , mime_type);
    }

    async delete(){}
}