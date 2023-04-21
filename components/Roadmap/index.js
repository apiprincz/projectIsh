import { Grid } from "@mui/material";
import React from "react";
import { Element } from "react-scroll";

const Roadmap = () => {
  return (
    <Element name="section-5" className="page-section page-section-5">

    <Grid px={5} my={5}>
        <h1>RoadMap</h1>
      <Grid className="roadmapContainer" container>
        <Grid pl={4} container flexDirection={"column"}>
          <Grid className="roadmapContent">
            <h2>Phase 1: Pre-Launch</h2>
            <ul>
              <li>
                Conduct market research to determine the demand for a new
                memecoin project.
              </li>
              <li>
                Develop a comprehensive whitepaper that outlines the project’s
                goals, features, and roadmap.
              </li>
              <li>
                Build a team of developers, marketers, and community managers to
                help execute the project.
              </li>
              <li>
                Launch website and social media channels to start building a
                community and generating buzz.
              </li>
            </ul>
          </Grid>

          <Grid mt={3} className="roadmapContent">
            <h2>Phase 2: Token Creation and Distribution</h2>
            <ul>
              <li>Launch the AiShiba OG NFT Collection.</li>
              <li>
                Launch the token on a decentralized exchange (DEX) platform,
                such as Uniswap or Camelot Dex.
              </li>
              <li>
                Set a total supply for the token and decide on an initial
                distribution strategy for airdrops and work with auditors to
                ensure the token’s code is secure and free from vulnerabilities.
              </li>
            </ul>
          </Grid>

          <Grid mt={3} className="roadmapContent">
            <h2> Phase 3: Initial Exchange Listing</h2>
            <ul>
              <li>
                Apply for AiShiba listing on major centralized exchanges (CEX)
                such as Mexc, Binance, Coinbase, or Kraken.
              </li>
              <li>
                Engage in marketing efforts to increase the token’s visibility
                and attract investors.
              </li>
              <li>Coingecko and CoinMarket listings.</li>
            </ul>
          </Grid>
          <Grid mt={3} className="roadmapContent">
            <h2>Phase 4: Community Building and Growth</h2>
            <ul>
              <li>
                Launch a community forum and engage with Aishiba Arb token
                holders to gather feedback and improve the project.
              </li>
              <li>
                Host events and promotions to incentivize people to hold and use
                the token, such as contests or giveaways.
              </li>
              <li>
                Build partnerships with other projects and influencers to expand
                Aishiba Arb’s reach.
              </li>
            </ul>
          </Grid>
          <Grid mt={3} className="roadmapContent">
            <h2> Phase 5: Project Expansion</h2>
            <ul>
              <li>
                Launch additional features, such as staking or yield farming, to
                provide additional benefits to Aishiba Arb token holders.
              </li>
              <li>
                Develop a mobile wallet or other tools to make it easier for
                people to use and hold the token.
              </li>
              <li>
                Explore opportunities to integrate Aishiba Arb into other
                blockchain ecosystems, such as DeFi protocols or NFT
                marketplaces.
              </li>
            </ul>
          </Grid>
          <Grid mt={3} className="roadmapContent">
            <h2> Phase 6: Long-Term Sustainability</h2>
            <ul>
              <li>
                Continue to build and engage with the Aishiba Arb community to
                ensure the project’s longevity.
              </li>
              <li>
                Explore options for governance and decentralization to make the
                project more community-driven and sustainable over the long
                term.
              </li>
              <li>
                Work with regulators and compliance experts to ensure that
                Aishiba Arb remains compliant with applicable laws and
                regulations.
              </li>
            </ul>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </Element>
  );
};

export default Roadmap;
