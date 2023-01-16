import Host from '@/api/host'
import Api from "../api/Api";

class PostUserService {
    getPosts(payloads) {
        return Api.doGet(Host.API_V1 + "/user/post/paginate?", payloads);
    }

    getPost(id) {
        return Api.doGet(Host.API_V1 + `/user/post/show/${id}`);
    }

    createPost(payloads) {
        return Api.doPost(Host.API_V1 + `/user/post/create`, payloads);
    }

    deletePost(id) {
        return Api.doDelete(Host.API_V1 + `/user/post/delete/${id}`);
    }

    updatePost(id, payload) {
        return Api.doPost(Host.API_V1 + `/user/post/update/${id}`, payload);
    }
}

export default new PostUserService();
