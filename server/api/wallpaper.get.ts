// import dayjs from "dayjs";
export default defineEventHandler(async (event) => {
    const {bingUrl} = useRuntimeConfig().public;
    const imgInfo = await fetch(`${bingUrl}?format=json&resolution=UHD&index=random&mkt=zh-CN`).then((res) => res.json());
    // console.log(imgInfo);
    return imgInfo
});