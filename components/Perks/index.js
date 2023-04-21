import { Grid } from "@mui/material";
import React from "react";
import { Element } from "react-scroll";

const Perks = () => {
  return (
    <Element name="section-3" className="page-section page-section-3">

    <Grid px={5} my={5}>
        <h1>Perks</h1>
      <Grid className="perksContainer" container>
        <Grid pl={2} container justifyContent='space-between' spacing={2} >
          <Grid item sm={3} p={2} className="perksContent">
            <h2>OwnerShip </h2>
            <p className='perksText'>By owning one of our 48000 AiShiba OG Collection, you automatically become an early member of AiShiba army. 
            <br/>
            <br/>
            All NFT holders are eligible for our upcoming airdrop and future events.
            <br/>
            <br/>
            
              <a target='_blank' href="https://opensea.io/collection/aishiba-og-collection/activity" style={{textDecoration:'underline'}}>Collection already sold out you can get from opensea</a></p>
          
          </Grid>
          <Grid item sm={3} p={2} className="perksContent">
            <h2>100% Community-Owned</h2>
            <p className='perksText'>
              AiShiba is built different that is why we are allocating 100% of our tokens to the community to decide the value of the project. 
              <br></br>
              <br></br>
              NOTE: NO TOKEN IS ALLOCATED TO TEAM
              <br></br>
              <br></br>
              and it even gets better
            </p>
          </Grid>
          <Grid item sm={3} p={2} className="perksContent">
            <h2>Locked Liquidity</h2>
            <p className='perksText'>
              The hallmark of every great project is transparency and fairness. Inorder to ensure the safety of our investors, we will lock liquidity to boost investors confidence and ensure we continue building long term
          </p>
          </Grid>
          <Grid item sm={3} p={2} className="perksContent">
            <h2>Earn Rewards for holding $SHIBAI TOken</h2>
            <p className='perksText'>
             Arb Rewards will be distributed to top 500 holders weekly as a way to earn passive income
          </p>
          <br/>
      
          <p className='perksText'>You can also stake your NFT and SHIBAI to earn ARB token</p>
          </Grid>

  
       
        </Grid>
      </Grid>
    </Grid>
    </Element>
  );
};

export default Perks;
