import Header from "@/components/header";
import MenuSneaker from "@/components/menu-sneaker";
import { Box, Pagination, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

export default function Menu() {
    const [page, setPage] = useState<number>(1)
    const { asPath } = useRouter()
    // function handleClick(e: any) {
    //     const currentPage = e.target.innerText
    //     setPage(currentPage)
    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth"
    //     });
    // }
    useEffect(
        () => {
            setPage(1)
        }, [asPath]
    )

    function handleChangePage(page: any) {
        setPage(page)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    return (
        <Box>
            <Header />
            {/* <MenuSneaker /> */}
            <Stack alignItems={'center'} spacing={2} sx={{
                marginTop: '50px',
                backgroundColor: '#000',
                padding: '30px 30px',
                '.css-19micn4-MuiButtonBase-root-MuiPaginationItem-root': {
                    color: '#fff'
                },
                '.css-1kz0k3h': {
                    color: '#fff'
                }
            }}>
                <MenuSneaker page={page} />
                <Pagination count={10} color="secondary" page={page} onChange={(event: ChangeEvent<unknown>, page: number) => handleChangePage(page)} sx={{color: '#fff'}}/>
            </Stack>
        </Box>
    )
}