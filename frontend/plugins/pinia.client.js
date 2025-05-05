import { setActivePinia } from "pinia"

export default defineNuxtPlugin((nuxtApp) => {
    const { $pinia } = nuxtApp

    setActivePinia($pinia)

    $pinia.use(({ store }) => {
        store.$notify = useNuxtApp().$notify;
    })
})