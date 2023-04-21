import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MobileMenu from "../MobileMenu"


import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";


const Header = ({connectWallet}) => {
  return (
    <Grid>
      <Grid
        container
        p={2}
        px={5}
        alignItems="center"
        justifyContent="center"
        className="header"
      >
        <MobileMenu />
      </Grid>
    </Grid>
  );
};

export default Header;
