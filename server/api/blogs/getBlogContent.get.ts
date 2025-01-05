export default defineEventHandler(async (event) => {
	const baseUrl = useRuntimeConfig().public.serviceUrl;
	const query = getQuery(event) as {id:string};
	const res = await fetch(baseUrl + '/blogs/getBlogContent?'+new URLSearchParams(query),{
		method: 'GET',
	}).then((res)=>res.json());
	console.log(res.data)
	return res;
})