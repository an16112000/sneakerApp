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
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import useHomeApi from '@/api/menu';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface SnkrDunkHistoryChartComponentProps {
    list: any[]
}

export default function SnkrDunkHistoryChartComponent({ list }: SnkrDunkHistoryChartComponentProps) {
    const { getRateJp, getRateKor } = useHomeApi()
    const [rateJp, setRateJp] = useState(1)
    // const [rateKor, setRateKor] = useState(1)

    useEffect(
        () => {
            async function fetchData() {
                const dataJp = await getRateJp()                      
                // const dataKor = await getRateKor()
                setRateJp(dataJp)
                // setRateKor(dataKor)                      
            } 
            fetchData()
        }, []
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
                            <StyledTableCell>Index</StyledTableCell>
                            <StyledTableCell>Size</StyledTableCell>
                            <StyledTableCell align="right">SnkrDunk Price</StyledTableCell>
                            {/* <StyledTableCell align="right">Quantity Of Kream</StyledTableCell> */}
                            <StyledTableCell align="right">Date</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ heigh: '50px', overflow: 'hidden' }}>
                        {list.map((item: any, index) => (
                            <StyledTableRow key={index} sx={item.isSnkrDunkOk && {
                                backgroundColor: '#51a0f8',
                                color: '#fff'
                            }}>
                                <StyledTableCell component="th" scope="row">
                                    {index}
                                </StyledTableCell>
                                <StyledTableCell align="right">{item?.size || 0}</StyledTableCell>
                                {/* <StyledTableCell align="right">{}</StyledTableCell> */}
                                <StyledTableCell align="right">{VND.format((item?.price * 92 / 100 - 1050)*rateJp)}</StyledTableCell>
                                <StyledTableCell align="right">{item?.date}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )
}