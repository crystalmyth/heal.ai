import { jwtDecode } from 'jwt-decode';

export default defineNuxtRouteMiddleware((to, from) => {
    const {token, logoutFromMiddleware} = useAuthStore();
    if (token) {
        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
            logoutFromMiddleware(true);
            return navigateTo({ name: 'login' })
        }
        if(decoded.role === null) {
            return navigateTo({ name: 'login' })
        }

        if(to.name.includes('admin') && decoded.role !== USER_ROLES.ADMIN) {
            return navigateTo({ name: 'user' })
        }
    } else {
        logoutFromMiddleware(false);
        return navigateTo({ name: 'login' })
    }
});