




export const useProjectStore = defineStore('project', () => {
    const project = ref() as Ref<Project | null>
    const setProject = (newProject: Project) => {
        // if project is not defined, get it from the server
        project.value = newProject
    }

    const getProject = () => {
        return project.value
    }
    const getProjectData = async (id: string) => {
        const { data, error } = await useApi('/api/projects/' + id, {
            params: {
                with: ['products','categories']
            }
        })
        // @ts-ignore
        if (data.value) {
            setProject(data.value as Project)
        }
        if (error.value) return error.value
    }

    return {
        project,
        setProject,
        getProjectData,
        getProject
    }
})
