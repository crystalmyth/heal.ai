import { useQuasar } from "quasar"
export default defineNuxtPlugin((nuxtApp) => {
    const $q = useQuasar();

    return {
        provide: {
            notify: (options) => {
                if($q) {
                    $q.notify({
                        position: $q.screen.lt.sm ? 'bottom' : 'top-right',
                        timeout: 3000,
                        ...options
                    });
                } else {
                    console.log('Quasar $q not initialised');
                }
            }
        }
    }
})