'use-client'
import { VND } from "@/constants/headers-option";
import axios from "axios";

const axiosInstanceKream = axios.create({
    headers: {

        // Authorization: `Bearer ${localStorage.getItem('token')}`,
        'X-Kream-Device-Id': 'web;a92b0217-7110-4b01-ac11-8b57af9151ff',
        'X-Kream-Client-Datetime': '20231209171950+0700',
        'X-Kream-Api-Version': '27',
    }
})

const axiosInstanceKreamWithoutAuth = axios.create({
    headers: {
        'X-Kream-Device-Id': 'web;a92b0217-7110-4b01-ac11-8b57af9151ff',
    }
})

const axiosInstanceSoldOut = axios.create(
    {
        headers: {
            Appkey: 'JAkSzosy4X7K2FvPBwut5GN0At8DFuIwdhfs1dvr'
        }
    }
)

const axiosInstanceJp = axios.create()

export default function useHomeApi() {
    function getSubstringBeforeSpace(inputString: string) {
        // Kiểm tra xem chuỗi có chứa dấu khoảng trắng không
        const indexOfSpace = inputString.indexOf(' ');

        if (indexOfSpace !== -1) {
            // Nếu có dấu khoảng trắng, cắt từ đầu đến vị trí dấu khoảng trắng
            const result = inputString.substring(0, indexOfSpace);
            // Hoặc sử dụng slice: const result = inputString.slice(0, indexOfSpace);
            return result;
        } else {
            // Nếu không có dấu khoảng trắng, trả về chuỗi ban đầu
            return inputString;
        }
    }
    async function getSneakerOnMenu(type: string) {
        try {
            const response = await axios.get(`https://snkrdunk.com/v1/models/${type}/posts?page=1&perPage=12`)
            const data = response.data.data.postSneakerMap
            return data
        } catch (Error) {
        }
    }

    async function getImagesAndNames(type: string, page: number) {
        try {
            const response = await axiosInstanceSoldOut.get(`https://www.soldout.co.kr/api/v3/search/get-item-list?&typeGb=goods&pageIndex=${page}&pageSize=12&keyword=${type}`)
            const data = response.data.data.product_info.list
            return data
        }
        catch (Error) {
        }
    }

    async function getImageFromSoldOut(id: string) {
        try {
            const response = await axiosInstanceSoldOut.get(`https://www.soldout.co.kr/api/v3/product/item/get-item-detail?item_id=${id}&is_pc_request=1`)
            const data = response.data.data.product_info.item_detail_image[0]
            return data
        } catch (Error) {
        }
    }

    async function getMinPriceJp(code: string) {
        const skuWithoutSpace = getSubstringBeforeSpace(code);
        try {
            const response = await axiosInstanceJp.get(`https://snkrdunk.com/v1/products/${skuWithoutSpace}/sales-history?size_id=0&page=1&per_page=20`)
            const data = response.data.minPrice
            return data
        } catch (Error) {
        }
    }

    async function getRateJp() {
        try {
            const response = await axios.get('https://wise.com/rates/history+live?source=JPY&target=VND&length=30&resolution=hourly&unit=day')
            const temp = response.data
            const data = temp[temp.length - 1].value
            return data
        } catch (Error) {
        }
    }

    async function getRateKor() {
        try {
            const response = await axios.get('https://wise.com/rates/history+live?source=KRW&target=VND&length=30&resolution=hourly&unit=day')
            const temp = response.data
            const data = temp[temp.length - 1].value
            return data
        } catch (Error) {
        }
    }

    async function getMinPriceKream(code: string) {
        const skuWithoutSpace = getSubstringBeforeSpace(code);
        try {
            const response = await axiosInstanceKreamWithoutAuth.get(`https://kream.co.kr/api/se/products/?keyword=${skuWithoutSpace}&request_key=70ad1f14-d5a9-403b-8826-c0b7c2f81fb7`)
            const data = response.data.items[0].product
            return data
        }
        catch (Error) {
        }
    }

    // async function searchFromKream(sku: string) {
    //     try{

    //     }
    //     const response = await axiosInstanceKreamWithoutAuth.get(`https://kream.co.kr/api/se/products/?keyword=${sku}&request_key=8a721c4f-e18c-4220-a36a-a6387c69dbee`)
    //     const data = response.data
    //     console.log(data)
    // }

    async function getDetailSneakerKream(id: string) {
        try {
            const response = await axiosInstanceKream(`https://kream.co.kr/api/p/products/${id}?base_product_id=${id}&request_key=3c4dde26-db75-45ff-a948-cff5598da55f`)
            // https://kream.co.kr/api/p/products/83900?base_product_id=27986&request_key=3c4dde26-db75-45ff-a948-cff5598da55f
            // const rateKor = await getRateKor()
            const data = response.data.sales_options
            // const newArray = data.map(
            //     (item: any) => ({
            //         priceKor: VND.format(item.lowest_normal*rateKor),
            //         sizeKor: item.option
            //     })
            // )
            // return newArray
            return data
        } catch (Error) {
        }
    }

    async function getDetailSneakerJp(sku: string) {
        const skuWithoutSpace = getSubstringBeforeSpace(sku);
        try {
            const response = await axiosInstanceJp.get(`https://snkrdunk.com/v1/sneakers/${skuWithoutSpace}/size/list`)
            const data = response.data
            const newArray = data.data.minPriceOfSizeList.map(
                (item: any) => {
                    if (data.data.listingItemCountIntMap.hasOwnProperty(item.size)) {
                        const value = data.data.listingItemCountIntMap[item.size]
                        return {
                            priceJp: item.price,
                            sizeJp: 10 * (item.size + 0.5 * (28 - item.size)),
                            amounts: value
                        }
                    }
                }
            )
            return newArray
        } catch (Error) {
        }
    }

    async function getHistorySnkrDunk(sku: string) {
        try {
            const skuWithoutSpace = getSubstringBeforeSpace(sku);
            const response = await axiosInstanceJp.get(`https://snkrdunk.com/v1/products/${skuWithoutSpace}/sales-history?size_id&page=1&per_page=50`)
            const data = response.data.history
            return data
        } catch (Error) {
        }
    }

    async function getHistoryKream(id: string) {
        try {
            let item
            if (typeof window !== 'undefined') {
                // Perform localStorage action
                item = localStorage.getItem('token')
            }
            const response = await axiosInstanceKream.get(`https://kream.co.kr/api/p/products/${id}/sales?cursor=1&per_page=50&sort=date_created[desc]&request_key=196a4ccc-c9f6-40e1-9e25-518da2e398b8`, {
                headers: {
                    Authorization: `Bearer ${item}`
                }
            })
            const data = response.data.items
            return data
        } catch (Error) {
        }
    }

    return {
        getSneakerOnMenu,
        getImagesAndNames,
        getMinPriceJp,
        getRateJp,
        getMinPriceKream,
        getRateKor,
        // searchFromKream,
        getDetailSneakerKream,
        getDetailSneakerJp,
        getImageFromSoldOut,
        getHistorySnkrDunk,
        getHistoryKream
    }
}