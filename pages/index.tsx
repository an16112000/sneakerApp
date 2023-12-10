import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/header'
import { Box, Pagination, Stack } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [page, setPage] = useState(1)
  function handleClick(e: any) {
    const currentPage = e.target.innerText
    setPage(currentPage)
  }



  // const handleClick = (event: any) => {
  //   setType(event.target.value)
  //   router.push(`/${type}`)
  // };


  return (
    <Box sx={{position: 'relative'}}>
      <Header />
      {/* <MenuSneaker /> */}
      
    </Box>
  )
}
