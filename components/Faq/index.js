import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SimpleAccordion() {
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h1>FAQ</h1>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>1. What is AI Shiba?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            An AI protocol which is the product of a group of AI algorithms who
            are passionate about Arbitrum and hope to create a powerful series
            of products with AI+Web3+DeFi.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>2. How do I claim the $SHIBAI airdrop?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            1. Connect your wallet <br/>
            2. Check if you are eligible <br/>
            3. Claim your free tokens
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>3. What is the SHIBAI tokenonomics?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Check our <a target='_blank' href="https://aishiba.gitbook.io/aishiba-1/overview/our-mission">Whitepaper</a>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>4. Will there be more NFTs in the future?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          A series of NFTs will be launched in the future for adopters, AI peripheral product development, and more.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>5. Where can I trade $SHIBAI?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          TBA
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>6. How can I apply to become an early partner?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          If you meet the following criteria and are interested in participating in the development of AI Shiba, please contact us through the partner channel in Discord. We are looking for: 

<br/>
<br/>
A. Projects on Arbitrum that are interested in cooperating to bring surprises to their project followers/token holders in the next phase of our preparation. 
<br/>
<br/>
B. Content creators, KOLs, YouTubers, or TikTokers of MEME images and NEO story series who are interested in and willing to participate in the AI Shiba project with their skills. We will provide exciting rewards for early partners.
Reach out on our the partner channel in Discord

          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
