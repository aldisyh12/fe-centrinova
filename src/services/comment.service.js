import Host from '@/api/host'
import Api from "../api/Api";

class CommentService {
    getCommentByPostId(id) {
        return Api.doGet(Host.API_V1 + `/comment/showCommentByPost/${id}`);
    }

    createCommentByPostId(payloads) {
        return Api.doPost(Host.API_V1 + `/comment/create`, payloads);
    }

}

export default new CommentService();
