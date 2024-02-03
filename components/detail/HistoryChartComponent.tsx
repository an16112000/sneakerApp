import { getHistorySneakerKream, getHistorySneakerSnkrDunk } from "@/function"
import { useEffect, useState } from "react"
import KreamChartComponent from "./KreamHistoryChartComponent"
import SnkrDunkHistoryChartComponent from "./SnkrDunkHistoryChartComponent"
import { Stack } from "@mui/material"

interface HistoryChartComponentProps {
    sku: string
}

export default function HistoryChartComponent({ sku }: HistoryChartComponentProps) {
    const [historySnkrDunkData, setHistorySnkrDunkData] = useState<any>([])
    const [historyKreamData, setHistoryKreamData] = useState<any>([])
    
    useEffect(
        () => {
            if (sku != undefined && typeof window !== 'undefined') {
                fetchData()
            }
            async function fetchData() {
                const dataSnkrDunk = await getHistorySneakerSnkrDunk(sku)
                const dataKream = await getHistorySneakerKream(sku)
                setHistorySnkrDunkData(dataSnkrDunk)
                setHistoryKreamData(dataKream)
            }
        }, [sku]
    )
    return (
        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} gap={'100px'}>
            <KreamChartComponent list={historyKreamData} />
            <SnkrDunkHistoryChartComponent list={historySnkrDunkData} />
        </Stack>
    )
}