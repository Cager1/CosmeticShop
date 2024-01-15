
import {useProjectStore} from "~/stores/project";

export default defineNuxtPlugin(async (nuxtApp) => {

    // get url of current page in ssr
    // @ts-ignore
    let project = useRequestURL().origin
    // now get from project only subodmain
    project = project.split('.')[0].split('//')[1]
    const store = useProjectStore()
    await store.getProjectData(project)
})
