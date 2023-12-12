import useHomeApi from "./api/menu"
import { VND } from "./constants/headers-option"

export default async function fetchDataMenu(type: string, page: number) {
    const { getSneakerOnMenu, getImagesAndNames, getMinPriceJp, getRateJp, getMinPriceKream, getRateKor } = useHomeApi()
    const listData: any[] = []

    const data = await getImagesAndNames(type, page)
    console.log(data)
    data ? await Promise.all(
        data.map(
            async (item: any, index: number) => {
                try {
                    const rateJp = await getRateJp()
                    const minPriceJp = await getMinPriceJp(item.model_no)
                    const dataKream = await getMinPriceKream(item.model_no)
                    console.log(dataKream, item.model_no)
                    const idKream = dataKream.release.id
                    const isOk = await isSnkrDunkOkFunction(idKream, item.model_no)
                    const minPriceKream = dataKream.market.lowest_ask
                    const rateKor = await getRateKor()
                    listData.push(
                        {
                            ...item,
                            minPriceJp: VND.format(minPriceJp * rateJp),
                            minPriceKream: VND.format(minPriceKream * rateKor),
                            ...isOk
                        }
                    )
                } catch (Error) {
                    console.log(Error)
                }
            }
        )
    ) : []
    // if(listData.length != 0) {
    return listData
    // }

}

export async function fetchDataDetail(sku: string) {
    console.log(sku)
    const { getDetailSneakerKream, getDetailSneakerJp, getMinPriceKream, getRateKor, getRateJp } = useHomeApi()
    const dataKream = await getMinPriceKream(sku)
    const idKream = dataKream.release.id
    const dataKor = await getDetailSneakerKream(idKream)
    const dataJp = await getDetailSneakerJp(sku)
    const rateKor = await getRateKor()
    const rateJp = await getRateJp()
    const newArray = dataJp ? dataJp.map(
        (itemJp: any) => {
            let isSnkrDunkOk = false
            let isKreamOk = false
            const dataKream = dataKor && dataKor.find(
                (itemKor: any) => {
                    // if(itemJp?.sizeJp == itemKor.option) {
                    //     console.log(itemJp.sizeJp, itemKor.option)
                    //     return {
                    //         // ...itemKor,
                    //         // ...itemJp
                    //         name: 1
                    //     }
                    // }
                    return itemJp?.sizeJp == itemKor.option
                }
            )
            if (dataKream?.lowest_normal > dataKream?.lowest_100) {
                dataKream.lowest_normal = dataKream.lowest_100
            }
            if ((itemJp?.priceJp * 92 / 100 - 1050) * rateJp - (dataKream?.lowest_normal * 103.8 / 100 + 3000 + 25000) * rateKor > (dataKream?.lowest_normal * 103.8 / 100 + 3000 + 25000) * rateKor * 20 / 100 && dataKream?.lowest_normal > 0) {
                isSnkrDunkOk = true;
            } else {
                isSnkrDunkOk = false
            }
            if (dataKream?.lowest_normal * 95 / 100 * rateKor - ((itemJp?.priceJp * 105.5 / 100 + 990) * rateJp + 500000) > ((itemJp?.priceJp * 105.5 / 100 + 990) * rateJp + 500000) * 20 / 100 && itemJp?.priceJp > 0) {
                isKreamOk = true
            }
            else {
                isKreamOk = false
            }
            // console.log({
            //     priceKor: dataKream?.lowest_normal ? dataKream?.lowest_normal : VND.format(0),
            //     ...itemJp,
            //     priceJp: itemJp?.priceJp ? itemJp?.priceJp : VND.format(0),
            //     isKreamOk,
            //     isSnkrDunkOk
            // })
            return {
                priceKor: dataKream?.lowest_normal ? VND.format((dataKream?.lowest_normal * 103.8 / 100 + 3000 + 25000) * rateKor) : VND.format(0),
                ...itemJp,
                priceJp: itemJp?.priceJp ? VND.format((itemJp?.priceJp * 92 / 100 - 1050) * rateJp) : VND.format(0),
                isKreamOk,
                isSnkrDunkOk
            }
        }
    ) : dataKor.map(
        (item: any) => {
            return {
                sizeJp: item.option,
                priceKor: item?.lowest_normal ? VND.format((item?.lowest_normal * 103.8 / 100 + 3000 + 25000) * rateKor) : VND.format(0),
                priceJp: VND.format(0),
                amounts: 0,
                isKreamOk: false,
                isSnkrDunkOk: false
            }
        }
    )
    return newArray
}

async function isSnkrDunkOkFunction(id: string, sku: string) {
    const { getDetailSneakerKream, getDetailSneakerJp, getRateKor, getRateJp } = useHomeApi()
    const dataKor = await getDetailSneakerKream(id)
    const dataJp = await getDetailSneakerJp(sku)
    const rateKor = await getRateKor()
    const rateJp = await getRateJp()
    let isSnkrDunkOk = false
    let isKreamOk = false
    const newArray = dataJp && dataJp.forEach(
        (itemJp: any) => {
            const dataKream = dataKor.find(
                (itemKor: any) => {
                    // if(itemJp?.sizeJp == itemKor.option) {
                    //     console.log(itemJp.sizeJp, itemKor.option)
                    //     return {
                    //         // ...itemKor,
                    //         // ...itemJp
                    //         name: 1
                    //     }
                    // }
                    return itemJp?.sizeJp == itemKor.option
                }
            )
            if (dataKream?.lowest_normal > dataKream?.lowest_100) {
                dataKream.lowest_normal = dataKream.lowest_100
            }
            if ((itemJp?.priceJp * 92 / 100 - 1050) * rateJp - (dataKream?.lowest_normal * 103.8 / 100 + 3000 + 25000) * rateKor > (dataKream?.lowest_normal * 103.8 / 100 + 3000 + 25000) * rateKor * 20 / 100 && dataKream?.lowest_normal > 0) {
                isSnkrDunkOk = true;
            }
            if (dataKream?.lowest_normal * 95 / 100 * rateKor - ((itemJp?.priceJp * 105.5 / 100 + 990) * rateJp + 500000) > (((itemJp?.priceJp * 105.5 / 100 + 990) * rateJp + 500000) * 20 / 100) && itemJp?.priceJp > 0) {
                isKreamOk = true
            }
        }
    )
    return { isSnkrDunkOk, isKreamOk }
}

export async function getHistorySneakerSnkrDunk(sku: string) {
    const { getHistorySnkrDunk } = useHomeApi()
    const listHistory = await getHistorySnkrDunk(sku)
    return listHistory
}

export async function getHistorySneakerKream(sku: string) {
    const { getHistoryKream, getMinPriceKream } = useHomeApi()
    const dataKream = await getMinPriceKream(sku)
    const idKream = dataKream.release.id
    const listHistory = await getHistoryKream(idKream)
    return listHistory
}
