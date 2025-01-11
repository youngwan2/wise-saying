import { config } from "./config.url";

const apiRoute = {
    BASE_URL: config.apiPrefix + config.apiHost + "/api/",
    QUOTES: {
        BASE_URL: "quotes",
        QUOTES_TODAY: () => apiRoute.BASE_URL + apiRoute.QUOTES.BASE_URL + "/today",
        QUOTES_POPLARS: () => apiRoute.BASE_URL + apiRoute.QUOTES.BASE_URL + "/poplars",
        QUOTES_DETAIL: () => apiRoute.BASE_URL + apiRoute.QUOTES.BASE_URL + "/",
        QUOTES_SEARCH: () => apiRoute.BASE_URL + apiRoute.QUOTES.BASE_URL + "/",
        QUOTES_CATEGORY: () => apiRoute.BASE_URL + apiRoute.QUOTES.BASE_URL + "/category",
    },
    AUTH: {
        BASE_URL: "auth",
        LOGIN: () => apiRoute.BASE_URL + apiRoute.AUTH.BASE_URL + "/login",
        REGISTER: () => apiRoute.BASE_URL + apiRoute.AUTH.BASE_URL + "/register",
        LOGOUT:()=> apiRoute.BASE_URL + apiRoute.AUTH.BASE_URL + "/logout",
        EMAIL_CHECK:() => apiRoute.BASE_URL + apiRoute.AUTH.BASE_URL+"/check-email",
        AUTH_EMAIL:() => apiRoute.BASE_URL + apiRoute.AUTH.BASE_URL+"/auth-email",
        PASSWORD_RESET: () => apiRoute.BASE_URL + apiRoute.AUTH.BASE_URL + "/forgot-password",
        PASSWORD_CHANGE: () => apiRoute.BASE_URL + apiRoute.AUTH.BASE_URL + "/reset-password",

    },
    NOTICE: {
        NOTICE_LIST: () => apiRoute.BASE_URL + "notices",
        NOTICE_DETAIL: () => apiRoute.BASE_URL + "notices",
    }

} as const


export default apiRoute;