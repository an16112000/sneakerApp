import useHomeApi from "@/api/menu"
import { Box, Stack } from "@mui/material"
import Image from 'next/image'
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface MenuSneakerComponentsProps {
    list: any
}

export default function MenuSneakerComponents({ list }: MenuSneakerComponentsProps) {
    const router = useRouter()

    if (list.length != 0) {
        return (
            <Stack flexDirection={'row'} width={'100%'} flexWrap={'wrap'} justifyContent={'space-between'}>

                {
                    list.map(
                        (item: any, index: number) => {
                            return <Box width={'30%'}>
                                <Link href={`/detail/${item.model_no}/${item.id}`}>
                                    <Stack alignItems={'center'} sx={{
                                        cursor: 'pointer',
                                        ':hover': {
                                            opacity: '0.7'
                                        }
                                    }}>
                                        <Image unoptimized src={item.image_path} alt={""} height={100} width={100} style={{ height: 'auto', width: 'auto' }} />
                                        <Stack gap={'8px'} alignItems={'center'}>
                                            <Box sx={{ fontStyle: 'italic' }}>{item.model_no}</Box>
                                            <Box sx={{ fontWeight: '900' }}>{item.name_eng}</Box>
                                            <Stack sx={{ color: '#fff' }} flexDirection={'row'} alignItems={'center'} gap={'10px'}>
                                                <Box sx={{ color: '#ccc' }}>MinPriceSNKRDUNK: {item.minPriceJp}</Box>
                                                {item.isSnkrDunkOk && <i className="fa-regular fa-circle-check" style={{
                                                    color: '#fff',
                                                    backgroundColor: 'blue',
                                                    borderRadius: '50%'
                                                }}></i>}
                                            </Stack>
                                            <Stack sx={{ color: '#fff' }} flexDirection={'row'} alignItems={'center'} gap={'10px'}>
                                                <Box sx={{ color: '#ccc' }}>MinPriceKream: {item.minPriceKream}</Box>
                                                {item.isKreamOk && <i className="fa-regular fa-circle-check" style={{
                                                    color: '#fff',
                                                    backgroundColor: 'blue',
                                                    borderRadius: '50%'
                                                }}></i>}
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Link>
                            </Box>
                        }
                    )
                }
            </Stack>
        )
    }
}