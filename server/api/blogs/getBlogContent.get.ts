export default defineEventHandler(async (event) => {
	const baseUrl = useRuntimeConfig().public.serviceUrl;
	const res = await fetch(baseUrl + '/blogs/getBlogContent?'+new URLSearchParams(event.context.query),{
		method: 'GET',
	}).then((res)=>res.json());
	console.log(res.data)
	return res;
})