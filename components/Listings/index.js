import { Grid } from '@mui/material'
import React from 'react'
import CameLot from "../../Assets/camelot.svg"
import Mexc from "../../Assets/mexc.png"
import Lbank from "../../Assets/lbank.png"
import BitKan from "../../Assets/bitkan.jpg"
import AscenDex from "../../Assets/ascendex.png"

const Listings = () => {
  return (
    <Grid p={5}>

        <h1 >TRADE SHIBAI ON THIS EXCHANGES</h1>
        <Grid container alignItems='center'>
            <Grid py={2} container sm={6} md={3}  className='listing'>
               <a className='listingText' href="https://app.camelot.exchange/?token2=0xfa296fca3c7dba4a92a42ec0b5e2138da3b29050" target="_blank">
             <img style={{width:'40px', height:'40px'}} src={CameLot} alt="dex"/> <br/>
             Camelot DEX 
                </a> 
            </Grid>
            <Grid py={2} container  sm={6} md={3}   className='listing'>
               <a className='listingText' href="https://m.mexc.com/trade/spot-kline#SHIBAI_USDT" target="_blank">
               <img src={Mexc} alt="mexc"/> <br/>
               MEXC
                </a> 
            </Grid>
            <Grid py={2} container  sm={6} md={3}   className='listing'>
               <a className='listingText' href="https://m.mexc.com/trade/spot-kline#SHIBAI_USDT" target="_blank">
               <img src={Lbank} alt="lbank"/> <br/>
               LBANK
                </a> 
            </Grid>
            <Grid py={2} container sm={6} md={3}className='listing'>
               <a className='listingText' href="https://bitkan.com/trade/SHIBAI-USDT" target="_blank">
               <img style={{width:'25px', height:'25px'}} src={BitKan} alt="BitKan"/> <br/>
               BitKan
                </a> 
            </Grid>
            <Grid py={2} container  sm={6} md={3}  className='listing'>
               <a className='listingText' href="https://m.ascendex.com/en/cashtrade-spottrading/usd/shibai" target="_blank">
               <img style={{width:'35px', height:'35px'}} src={AscenDex} alt="AscenDex"/> <br/>
               AscenDex
                </a> 
            </Grid>
            <Grid py={2} container xs={12} justifyContent={'center'}  className='listing'>
            <h1 style={{color:'#9f793463'}}>More Coming Soon!!</h1>
        </Grid>
        </Grid>
    </Grid>
  )
}

export default Listings