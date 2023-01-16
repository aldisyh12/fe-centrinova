import VueJwtDecode from "vue-jwt-decode";

class Utils {

    /**
     * @param token
     * @returns {*}
     */
    jwtDecode(token) {
        return VueJwtDecode.decode(token);
    }
}

export default new Utils();
