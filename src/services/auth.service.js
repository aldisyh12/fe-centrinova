import Host from "@/api/host";
import router from "../router/index";
import Api from "../api/Api";
import VueCookies from "vue-cookies";
import Pages from "../helpers/Pages";

class AuthService {
    login(user) {
        return Api.doPostOut(Host.API_V1 + "/auth/login", user).then((response) => {
            if (response.code === 200 && response.data.access_token) {
                VueCookies.set(
                    "__MIH__BASE__SESSIONID__",
                    JSON.stringify(response.data),
                    Math.floor(response.data.expires_in / 1440) + "d",
                    "/",
                    "",
                    true,
                    "Strict"
                );
            }
            return response;
        });
    }

    logout() {
        return Api.doPostOut(Host.API_V1 + "/user/logout", "").then(
            () => {
                VueCookies.remove("__MIH__BASE__SESSIONID__");
                router.push(Pages.LOGIN);
                location.reload();
            },
            () => {
                VueCookies.remove("__MIH__BASE__SESSIONID__");
                router.push(Pages.LOGIN);
                location.reload();
            }
        );
    }

    refreshToken() {
        return Api.doPost(Host.API_V1 + "/auth/refresh", "").then(
            (response) => {
                if (response.code === 200 && response.data.access_token) {
                    VueCookies.set(
                        "__MIH__BASE__SESSIONID__",
                        JSON.stringify(response.data),
                        Math.floor(response.data.expires_in / 1440) + "d",
                        "/",
                        "",
                        true,
                        "Strict"
                    );
                }
                return response.data;
            },
            () => {
                this.logout().then(() => {
                    router.push(Pages.LOGIN);
                });
            }
        );
    }

    register(payloads) {
        return Api.doPost(Host.API_V1 + `/auth/register`, payloads);
    }

    profile(id) {
        return Api.doGet(Host.API_V1 + `/user/show/profile/${id}`);
    }

    changePassword(id, payloads) {
        return Api.doPost(Host.API_V1 + `/user/update/profile/${id}`, payloads);
    }
}

export default new AuthService();
