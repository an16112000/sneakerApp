import { fetchDataDetail } from "@/function";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

interface SaleChartComponentProps {
    sku: string
}

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { VND } from "@/constants/headers-option";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    // '&:nth-of-type(odd)': theme.palette.action.hover,
    // '&:nth-of-type(odd)': '',
    // },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

export default function SalesChartComponent({ sku }: SaleChartComponentProps) {
    const [dataSneaker, setDataSneaker] = useState([])
    useEffect(
        () => {
            if (sku != undefined && typeof window !== 'undefined') {
                fetchData()
            }
            async function fetchData() {
                const data = await fetchDataDetail(sku)
                setDataSneaker(data)
            }
        }, [sku]
    )
    return (
        <Stack flex={1} sx={{
            '.MuiTableContainer-root.MuiTableContainer-root': {
                height: '800px',
                borderRadius: '10px'
            }
        }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow sx={{ heigh: '100px', overflow: 'hidden' }}>
                            <StyledTableCell>Size</StyledTableCell>
                            <StyledTableCell align="right">Kream Price</StyledTableCell>
                            {/* <StyledTableCell align="right">Quantity Of Kream</StyledTableCell> */}
                            <StyledTableCell align="right">SnkrDunk Price</StyledTableCell>
                            <StyledTableCell align="right">Quantity Of SnkrDunk</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ heigh: '50px', overflow: 'hidden' }}>
                        {dataSneaker.map((item: any, index) => {
                            return <StyledTableRow key={index} sx={item.isSnkrDunkOk && {
                                backgroundColor: '#51a0f8',
                                color: '#fff'
                            }}>
                                <StyledTableCell component="th" scope="row">
                                    {item?.sizeJp}
                                </StyledTableCell>
                                <StyledTableCell align="right">{item?.priceKor || 0}</StyledTableCell>
                                {/* <StyledTableCell align="right">{}</StyledTableCell> */}
                                <StyledTableCell align="right">{item?.priceJp}</StyledTableCell>
                                <StyledTableCell align="right">{item?.amounts}</StyledTableCell>
                            </StyledTableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )
}