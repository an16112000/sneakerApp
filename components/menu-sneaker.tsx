import useHomeApi from "@/api/menu";
import Header from "@/components/header";
import MenuSneakerComponents from "@/components/menu-sneaker-components";
import { VND } from "@/constants/headers-option";
import fetchDataMenu from "@/function";
import { Box, Pagination, Stack } from "@mui/material";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface MenuSneakerProps {
    page: number
}

export default function MenuSneaker({page}: MenuSneakerProps) {
    const [listSneaker, setListSneaker] = useState<any[]>([])
    const { getSneakerOnMenu, getImagesAndNames, getMinPriceJp, getRateJp, getMinPriceKream, getRateKor } = useHomeApi()
    const router = useRouter();
    const type = router.query.type as string



    useEffect(
        () => {
            if (type != undefined) {
                fetchData()
            }
            async function fetchData() {
                // const data = await getImagesAndNames(type, page)
                setListSneaker([])
                const data = await fetchDataMenu(type, page)
                setListSneaker(data)
            }
        }, [type, page]
    )
    if (listSneaker.length != 0) {
        return (
            <Box>
                <MenuSneakerComponents list={listSneaker} />

            </Box>
        )
    }
}

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//     // Trả về dữ liệu dựa trên biến trong URL
//     // Thay thế hàm này bằng logic của bạn
//     // const data = fetchData(params.slug);
//     // console.log(params)
//     return {
//       props: {
//         // data,
//       },
//     };
//   };