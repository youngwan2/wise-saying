import { config } from "./config.url";

const apiRoute = {
    BASE_URL: config.apiPrefix + config.apiHost + "/api/",
    QUOTES: {
        BASE_URL: "quotes",
        QUOTES_TODAY: (limit: number) => apiRoute.BASE_URL + apiRoute.QUOTES.BASE_URL + "/today?random-count=" + limit,
        QUOTES_POPLARS: () => apiRoute.BASE_URL + apiRoute.QUOTES.BASE_URL + "/populars",
        QUOTES_DETAIL: () => apiRoute.BASE_URL + apiRoute.QUOTES.BASE_URL + "/",
        QUOTES_SEARCH: () => apiRoute.BASE_URL + apiRoute.QUOTES.BASE_URL + "/",
        QUOTES_CATEGORY: () => apiRoute.BASE_URL + apiRoute.QUOTES.BASE_URL + "/category",
        QUOTES_LIKE_COUNT: (id: string) => apiRoute.BASE_URL + apiRoute.QUOTES.BASE_URL + `/${id}/like`
    },
    AUTH: {
        BASE_URL: "auth",
        LOGIN: () => apiRoute.BASE_URL + apiRoute.AUTH.BASE_URL + "/login",
        REGISTER: () => apiRoute.BASE_URL + apiRoute.AUTH.BASE_URL + "/register",
        LOGOUT: () => apiRoute.BASE_URL + apiRoute.AUTH.BASE_URL + "/logout",
        EMAIL_CHECK: () => apiRoute.BASE_URL + apiRoute.AUTH.BASE_URL + "/check-email",
        AUTH_EMAIL: () => apiRoute.BASE_URL + apiRoute.AUTH.BASE_URL + "/auth-email",
        PASSWORD_RESET: () => apiRoute.BASE_URL + apiRoute.AUTH.BASE_URL + "/forgot-password",
        PASSWORD_CHANGE: () => apiRoute.BASE_URL + apiRoute.AUTH.BASE_URL + "/reset-password",
        REFRESH_ACCESS_TOKEN: () => apiRoute.BASE_URL + apiRoute.AUTH.BASE_URL + "/auth/access-token",

    },
    NOTICE: {
        NOTICE_LIST: () => apiRoute.BASE_URL + "notices",
        NOTICE_DETAIL: () => apiRoute.BASE_URL + "notices",
    },
    BOOKMARK: {
        BASE_URL: "bookmark",
        BOOKMARK_LIST: ({ page, limit = 5 }: { page: number, limit: number }) => apiRoute.BASE_URL + apiRoute.BOOKMARK.BASE_URL + "?page=" + page + "&limit=" + limit,
        BOOKMARK_CREATE: () => apiRoute.BASE_URL + apiRoute.BOOKMARK.BASE_URL,
        BOOKMARK_DELETE: (id: number, type: "user" | "no-user") => apiRoute.BASE_URL + apiRoute.BOOKMARK.BASE_URL + "/" + id + "?type=" + type,

    },
    USER: {
        BASE_URL: "users",
        USER_PASSWORD_UPDATE: () => apiRoute.BASE_URL + apiRoute.USER.BASE_URL,
        USER_ACCOUNT_DELETE: () => apiRoute.BASE_URL + apiRoute.USER.BASE_URL,
        USER_PROFILE_UPDATE: () => apiRoute.BASE_URL + apiRoute.USER.BASE_URL + "/profile",
        USER_PROFILE_READ: () => apiRoute.BASE_URL + apiRoute.USER.BASE_URL + "/profile",
        USER_MYPAGE_QUOTES: (page: number) => apiRoute.BASE_URL + apiRoute.USER.BASE_URL + "/posts?page=" + page
    }
} as const


export default apiRoute;