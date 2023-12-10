import useHomeApi from "@/api/menu"
import { Stack } from "@mui/material"
import Image from "next/image"
import { useEffect, useState } from "react"

interface ImageSneakerComponentProps {
    sku: string,
    id: string
}

export default function ImageSneakerComponent({ sku, id }: ImageSneakerComponentProps) {
    const { getImageFromSoldOut } = useHomeApi()
    const [image, setImage] = useState()

    useEffect(
        () => {
            if (id != undefined && typeof window !== 'undefined') {
                fetchData()
            }
            async function fetchData() {
                const data = await getImageFromSoldOut(id)
                setImage(data)
            }
        }, [id]
    )
    return (
        <Stack flex={1}>
            <Image unoptimized src={image || ''} alt={""} width={100} height={100} style={{width: '100%', height: 'auto'}}/>
        </Stack>
    )
}