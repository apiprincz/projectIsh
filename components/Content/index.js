import {

  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";


import Modal from "@mui/material/Modal";

import "./styles.css";
import { ApiContext } from "../../context/api-context";
import { Link, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "wheat",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialState = {
  wallet: "",
};

const Content = () => {
  const [open, setOpen] = useState(false);


  const {
    images,
    loading,
    postTask,
    getTask,
    access,
    getInvite,
    apiInvite,
    apiStory,
    apiUser,
    codeLoading,
    getLoveStory,
    getWlStatus
  } = useContext(ApiContext);
  const query = useQuery();

  const props = {
    inputStyle: {
      fontFamily: "monospace",
      margin: "4px",
      MozAppearance: "textfield",
      width: "40px",
      borderRadius: "3px",
      fontSize: "18px",
      height: "26px",
      paddingLeft: "7px",
      backgroundColor: "gray",

      border: "1px solid lightskyblue",
      outline: "none",
    },
    inputStyleInvalid: {
      fontFamily: "monospace",
      margin: "4px",
      MozAppearance: "textfield",
      width: "40px",
      borderRadius: "3px",
      fontSize: "14px",
      height: "26px",
      paddingLeft: "7px",
      backgroundColor: "black",
      color: "red",
      border: "1px solid red",
    },
  };



  return (
    <Grid container alignItems="center">

   
    </Grid>
  );
};

export default Content;
