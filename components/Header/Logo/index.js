import React from 'react'
import { Grid } from "@mui/material";
import Image from 'next/image';
// import LogoImg from '../../../Assets/logo.png'


const Logo = () => {
  return (
    <Grid>
      <Image style={{width:'60px', borderRadius:'50%'}} src="./logo.png" alt='Logo'/>
    
    </Grid>
  )
}

export default Logo