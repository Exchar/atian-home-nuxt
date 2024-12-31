export default defineEventHandler(async (event) => {
    const baseUrl = useRuntimeConfig().public.serviceUrl;
    console.log(event)
    return fetch(baseUrl + '/blogs/getBlogs', {
        method: 'GET',
    }).then((res) => res.json());
    
})