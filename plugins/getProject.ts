
import {useProjectStore} from "~/stores/project";

export default defineNuxtPlugin(async (nuxtApp) => {
    const projectID = nuxtApp.$config.public.projectID
    const store = useProjectStore()
    // fetch https://api.mojshop.net/api/projects/1 using useFetch
    await store.getProjectData(projectID)
    // set app title to project name
})
