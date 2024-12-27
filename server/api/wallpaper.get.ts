export default defineEventHandler(async (event) => {
    const {bingUrl} = useRuntimeConfig().public;
    const imgInfo = await fetch(`${bingUrl}?format=json&resolution=UHD`).then((res) => res.json());
    // console.log(imgInfo);
    return imgInfo
});