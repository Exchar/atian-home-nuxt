export default defineEventHandler(async (event) => {
    const baseUrl = useRuntimeConfig().public.serviceUrl;
    return fetch(baseUrl + '/blogs/getBlogs', {
        method: 'GET',
    }).then((res) => res.json());
    
})