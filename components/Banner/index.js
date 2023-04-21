import { Grid } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import AiShiba from  "aishiba.png"

const Banner = () => {
  return (
    <Grid mb={5} p={5} className='Banner'>
      <Grid container>
        <Grid pl={5}  xs={12}>
          <h1>Meet <span style={{color:'#D8601E'}}>Ai</span>Shiba </h1>

          <h4>The Community-inspired meme coin for arbitrum blockchain</h4>
          <Grid container alignItems="center">
            <CheckCircleIcon className='circle' />
            &nbsp; &nbsp;
            <p>Zero FUD</p>
          </Grid>
          <Grid container alignItems="center" flexWrap='nowrap'>
            <CheckCircleIcon  className='circle' />
            &nbsp; &nbsp;
            <p>100% Community Owned</p>
          </Grid>
          <Grid container alignItems="center">
            <CheckCircleIcon  className='circle' />
            &nbsp; &nbsp;
            <p>Zero FUGAZI</p>
          </Grid>
        </Grid>
        <Grid sm={6} xs={12}>
            <img className='AiShiba' src="./aishiba.png" alt='AiShiba'/>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Banner;
