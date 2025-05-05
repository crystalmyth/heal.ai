import { jwtDecode } from 'jwt-decode';
export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated, token } = useAuthStore()

    if(isAuthenticated) {
        if(to.name === 'login' || to.name === 'signup') {
            const decoded = jwtDecode(token);
            if(decoded.role === USER_ROLES.ADMIN) {
                return navigateTo({ name: 'admin' })
            } else {
                return navigateTo({ name: 'user' })
            }
        }
    }
})