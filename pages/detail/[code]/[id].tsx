import HistoryChartComponent from "@/components/detail/HistoryChartComponent";
import ImageSneakerComponent from "@/components/detail/ImageSneakerComponent";
import SalesChartComponent from "@/components/detail/SaleChartComponent";
import Header from "@/components/header";
import { fetchDataDetail } from "@/function";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DetailSneakerPage() {
    const router = useRouter()
    const [sneakerData, setSneakerData] = useState<any>({})

    const sku = router.query.code
    const id = router.query.id as string

    // useEffect(
    //     () => {
    //         if (sku != undefined && id != undefined) {
    //             fetchData()
    //         }
    //         async function fetchData() {
    //             const data = await fetchDataDetail(sku as string, id as string )
    //             setSneakerData(data)
    //         }
    //     }, [sku, id]
    // )
    return (
        <Box sx={{ position: 'relative' }}>
            <Header />
            <Stack sx={{padding: '30px 30px', backgroundColor: '#000'}}>
                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <ImageSneakerComponent sku={sku as string} id={id}/>
                    <SalesChartComponent sku={sku as string} />
                </Stack>

                <Stack>
                    <HistoryChartComponent sku={sku as string} />
                </Stack>
            </Stack>
        </Box>
    )
}