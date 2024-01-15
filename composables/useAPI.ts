// import i18n

export const useApi: typeof useFetch = (request, opts?) => {
  let headers: any = {}
  const config = useRuntimeConfig()

  // get current url
  const nuxtApp = useNuxtApp()
  const url = nuxtApp.$router.currentRoute.value.fullPath
  console.log(url)
  if (process.server) {
    // server side headers
    headers = {
      'referer': url,
      ...useRequestHeaders(["referer", "cookie"])
    }
  }
  // server side headers
  return useFetch(request, {
    headers: {
      'accept': 'application/json',
      'x-localization': 'hr',
      ...headers
    },
    // @ts-ignore
    baseURL: config.public.apiUrl, credentials: 'include',
    onResponse: (res) => {
      // if (res.response.status === 401 || (res.response.redirected && res.response.url.includes('/login'))) {
      //   navigateTo(config.public.loginUrl + '?redirect=' + config.public.adminUrl, {external: true });
      // }
      // if status is 403 show error page
        if (res.response.status === 403) {
          throw showError({
            statusCode: 403,
            fatal: true,
          })
        }
        // if status is 429 sho
      console.log(res)
    },
    ...opts
  })
}
