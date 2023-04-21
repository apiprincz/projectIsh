import { Grid } from "@mui/material";
import React from "react";
import { Element } from "react-scroll";

const Tokenomics = () => {
  return (
    <Element name="section-4" className="page-section page-section-4">

    <Grid px={5} my={5}>
      <h1>Tokenomics</h1>

      <p>
        SHIBAI is the fundamental token within the AiShiba ecosystem. It
        possesses powerful deflationary attributes and offers users the
        opportunity to generate passive income via staking, thereby establishing
        enduring value for the token.
      </p>
      <h3>Total Supply : 210,000,000,000,000,000 tokens</h3>
      <h3>Token Symbol : $SHIBAI</h3>
      <h3>
        Token Allocation : <br />
        90% distributed as airdrop to eligible wallets <br />
        10% DEX Liquidity and CEX Listing
      </h3>

      <p>Our tokenomics and airdrop eligibility criteria is fully explained in our
      <a target='_blank' style={{color:'white !important'}} className='diff' href="https://aishiba.gitbook.io/aishiba-1/overview/our-mission">whitepaper</a> </p>
    </Grid>
    </Element>
  );
};

export default Tokenomics;
