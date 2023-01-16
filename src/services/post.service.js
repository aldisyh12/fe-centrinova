import Host from '@/api/host'
import Api from "../api/Api";

class PostService {
    getPosts(payloads) {
        return Api.doGet(Host.API_V1 + "/post/paginate?", payloads);
    }

    getPost(id) {
        return Api.doGet(Host.API_V1 + `/post/show/${id}`);
    }

}

export default new PostService();
