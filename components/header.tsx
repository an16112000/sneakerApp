import useHomeApi from "@/api/menu";
import { headerOptions } from "@/constants/headers-option";
import { headerOptionChildrenData, headerOptionsData } from "@/ultils/interface";
import { Box, Button, Menu, Popover, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";



export default function Header() {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [children, setChildren] = useState<headerOptionChildrenData[]>([])

    const [sku, setSku] = useState<string>('')
    const [type, setType] = useState<string>('')

    const router = useRouter()


    const handlePopoverOpen = (event: any, item?: headerOptionsData) => {
        setAnchorEl(event.currentTarget);
        item && setChildren(item.children)
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    function handleClick(e: any) {
        router.push(`/${e.target.value}`)
    }

    function handleChangeSku(e: any) {
        setSku(e.target.value)
    }
    async function handleSubmitSku() {
        router.push(`/${sku}`)
        setSku('')
    }

    function handleChangeType(e: any) {
        const data = e.target.value.replaceAll(' ', '+')
        setType(data)
    }
    function handleSubmitType() {
        setType('')
        router.push(`/${type}`)
    }

    const open = Boolean(anchorEl);

    return (
        <Stack
            position={'fixed'}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{
                zIndex: '1000000',
                top: 0,
                width: '100%',
                backgroundColor: '#ccc',
                height: '50px',
                padding: '4px 10px'
            }}>
            <Stack
                flex={1}
                flexDirection={'row'}
                alignItems={'center'}
                gap={'25px'}
                textTransform={'uppercase'}
            >
                {
                    headerOptions.map(
                        (item: headerOptionsData, index: number) => {
                            return <>
                                <Button
                                    aria-owns={open ? 'mouse-over-popover' : undefined}
                                    onMouseEnter={(e) => handlePopoverOpen(e, item)}
                                    // onMouseLeave={handlePopoverClose}
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                    key={index}
                                    sx={{
                                        cursor: 'pointer'
                                    }}>
                                    {item.title}
                                </Button>
                                <Popover
                                    // onMouseEnter={(e) => handlePopoverOpen(e, item)}
                                    onClose={handlePopoverClose}
                                    id={open ? 'simple-popover' : undefined}
                                    sx={{
                                        // pointerEvents: 'none',
                                    }}
                                    open={open}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Stack flexDirection={'row'} alignItems={'center'} gap={'20px'} padding={'4px 8px'} textTransform={'capitalize'} sx={{
                                        cursor: 'pointer'
                                    }}>
                                        {
                                            children.map(
                                                (item: headerOptionChildrenData, index: number) => {
                                                    return <Button onClick={handleClick} key={index} value={item.path}>{item.title}</Button>
                                                }
                                            )
                                        }
                                    </Stack>
                                </Popover>
                            </>
                        }
                    )
                }
            </Stack>

            <Stack flex={1} flexDirection={'row'} gap={'5px'}>
                <input style={{ width: '450px', borderRadius: '10px', padding: '0 6px' }} placeholder="Search..." onChange={handleChangeType} value={type} />
                <Button
                    onClick={handleSubmitType}
                    sx={{
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: '#1976d2',
                            opacity: '0.7'
                        }
                    }}>
                    Search
                </Button>
            </Stack>

            <Stack flex={0.5} flexDirection={'row'} gap={'5px'}>
                <input style={{ width: '250px', borderRadius: '10px', padding: '0 6px' }} placeholder="Search SKU..." onChange={handleChangeSku} value={sku} />
                <Button
                    onClick={handleSubmitSku}
                    sx={{
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: '#1976d2',
                            opacity: '0.7'
                        }
                    }}>
                    Search
                </Button>
            </Stack>
        </Stack>
    )
    //     const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    //   const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget);
    //   };

    //   const handlePopoverClose = () => {
    //     setAnchorEl(null);
    //   };

    //   const open = Boolean(anchorEl);

    //   return (
    //     <div>
    //       <Typography
    //         aria-owns={open ? 'mouse-over-popover' : undefined}
    //         aria-haspopup="true"
    //         onMouseEnter={handlePopoverOpen}
    //         onMouseLeave={handlePopoverClose}
    //       >
    //         Hover with a Popover.
    //       </Typography>
    //       <Popover
    //         id="mouse-over-popover"
    //         sx={{
    //           pointerEvents: 'none',
    //         }}
    //         open={open}
    //         anchorEl={anchorEl}
    //         anchorOrigin={{
    //           vertical: 'bottom',
    //           horizontal: 'left',
    //         }}
    //         transformOrigin={{
    //           vertical: 'top',
    //           horizontal: 'left',
    //         }}
    //         onClose={handlePopoverClose}
    //         disableRestoreFocus
    //       >
    //         <Typography sx={{ p: 1 }}>I use Popover.</Typography>
    //       </Popover>
    //     </div>
    //   );
}