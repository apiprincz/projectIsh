import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Link } from "react-scroll";

import Logo from "../components/Header/Logo";
// import useWindowDimensions from "../../hooks/screen";
import CloseIcon from "@mui/icons-material/Close";
import SocialsAlt from "../components/Socials/SocialsAlt";
const drawerWidth = 240;
const navItems = ["Home", "Airdrop", "Perks", "Tokenomics", "Roadmap"];

import { Button, Grid, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";

import Web3Modal from "web3modal";
import { BigNumber, Contract, providers, utils } from "ethers";
import { useEffect, useState, useRef } from "react";
import { AISHIBA_CONTRACT_ADDRESS, AISHIBA_CONTRACT_ABI } from "../constants";

import { arbMerkleTree, arbRootHash } from "../whitelistArb/merkleProof";
import { keccak256 } from "ethers/lib/utils";
import { toast } from "react-toastify";

import "react-sweet-progress/lib/style.css";

import Web3 from "web3";

import WalletConnectProvider from "@walletconnect/web3-provider";
import { WHITELIST_ADDRESS } from "@/whitelistArb/whitelist_Address";

import "react-toastify/dist/ReactToastify.css";

import Banner from "../components/Banner";
import Airdrop from "../components/Airdrop";
import Roadmap from "../components/Roadmap";
import Perks from "../components/Perks";
import Tokenomics from "../components/Tokenomics";
import Socials from "../components/Socials";
import Header from "../components/Header";
import Faq from "../components/Faq";
import { testHolder } from "./testholder";
// import Listings from "@/components/Listings";


const Home = () => {
  const one = BigNumber.from(1);
  const zero = BigNumber.from(0);
  const [walletConnected, setWalletConnected] = useState(false);

  // const [merkleRoot, setMerkleRoot] = useState(rootHash)
  // const [loading, setLoading] = useState(false);
  const [mintedForFree, setMintedForFree] = useState(false);
  const [freeMinted, setFreeMinted] = useState(0);
  const [userAddress, setUserAddress] = useState("");
  const [merkleProof, setMerkleProof] = useState([]);
  const [totalAmountMinted, setTotalAmountMinted] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isWl, setIsWl] = useState(false);
  const [signature, setSignature] = useState("");
  const [library, setLibrary] = useState("");
  const [network, setNetwork] = useState("");

  // const { width , height} = useWindowDimensions();

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [top, setTop] = React.useState(true);
  const [topEl, setTopEl] = React.useState(false);
  // const { width , height} = useWindowDimensions();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", background: "white" }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        <Grid container alignItems="center">
          <Logo />
          <Grid style={{ color: "blue" }}>
            <span style={{ color: "black" }}>AiShiba</span>
          </Grid>
        </Grid>
      </Typography>
      <Grid style={{ position: "absolute", top: "10px", right: "10px" }}>
        <CloseIcon style={{ fill: "black" }} />
      </Grid>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link
                className={top ? "active" : null}
                to={`section-${index + 1}`}
                spy={true}
                smooth={true}
              >
                {item}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // const container =window !== undefined ? () => window().document.body : undefined;

  const handleAlert = () => {
    toast.warning(
      <span style={{ fontSize: "10px", color: "black" }}>Coming Soon!</span>
    );
  };

  const walletConnectOptions = {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "232319aff64548999468c6dfeef73cfe", // required
    },
  };

  const onPageLoad = async () => {
    await getTotalAndMaxSupply();
    await getMintStatus();

    // checkFreeMint()
    getProof();
    console.log("walletConnected", walletConnected);

    setInterval(() => {
      setLoading(false);
    }, 1000);

    console.log("rootHash", arbRootHash);
  };

  const getProof = async () => {
    const signer = await getProviderOrSigner(true);
    const _userAddress = await signer.getAddress();
    const _leaf = keccak256(_userAddress);
    const _merkleProof = arbMerkleTree.getHexProof(_leaf);
    setUserAddress(_userAddress);
    setMerkleProof(_merkleProof);
  };

  const switchNetwork = async () => {
    if (!library) return;

    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xa4b1" }],
      });
      console.log("switch2", network);
      setNetwork(42161);
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]],
          });
        } catch (error) {
          console.log(switchError);
        }
      }
    }
  };

  const getProviderOrSigner = async (isSigner = false) => {
    const web3Modal = new Web3Modal({
      disableInjectedProvider: false,
      cacheProvider: false, // optional
      providerOptions: {}, // required
    });

    const provider = await web3Modal.connect();
    const web3Provider = new providers.Web3Provider(provider);
    setLibrary(web3Provider);

    const { chainId } = await web3Provider.getNetwork();
    setNetwork(chainId);

    // if (chainId != 5) {

    //   toast("Incorrect network, please connect to goerli", {
    //     hideProgressBar: true,
    //     autoClose: 2000,
    //     type: "error",
    //   });
    // }
    if (chainId != 42161) {
      //   window.alert("Incorrect network, please connect to goerli")
      toast("Incorrect network, please connect to ethereum", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });
    }

    if (isSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const providerOptions = {
    walletconnect: walletConnectOptions,
  };

  const [web3Account, setWeb3Account] = useState();
  const [web3, setWeb3] = useState();
  const [message, setMessage] = useState("Sign wallet to prove ownership");
  const [signedMessage, setSignedMessage] = useState("");
  const [btn, setBtn] = useState(false);
  const NFTOwnedArray = []

  const connectWallet = async () => {
    const web3Modal = new Web3Modal({
      disableInjectedProvider: false,
      cacheProvider: false, // optional
      providerOptions: providerOptions, // required
    });
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    setLoading(true);

    setWeb3(web3);
    setWalletConnected(true);
    setUserAddress(accounts[0]);
    await getProviderOrSigner();
  };

  const getMintStatus = async () => {
    try {
      const provider = await getProviderOrSigner();
      const miraContract = new Contract(
        AISHIBA_CONTRACT_ADDRESS,
        AISHIBA_CONTRACT_ABI,
        provider
      );
      let mintStage = await miraContract.mintStatus();
      if (mintStage === 1) {
        setMintStatus(true);
      }
      console.log("mintStage", mintStage);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (walletConnected) {
      if (userAddress === "0x11EF4c095859B1F9360538dE3d509d270A211c9a") {
        setBtn(true);
      } else {
        setBtn(false);
      }
    }
  }, [walletConnected]);

  const handleNFTHolders = async() => {
        try {
          const signer = await getProviderOrSigner(true);
      const aiShibaContract = new Contract(
        AISHIBA_CONTRACT_ADDRESS,
        AISHIBA_CONTRACT_ABI,
        signer
      );

      for (let i = 0; i < testHolder.length; i++) {
        
      const NFTOwned = await aiShibaContract.getNftOwned(testHolder[i])

      console.log("NFTOwned",testHolder[i], NFTOwned.toNumber() )
        NFTOwnedArray.push(NFTOwned.toNumber())
        
      }
    
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Grid>
      <Head>
        <title>AIShiba </title>
        <meta name="description" content="AiShiba" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <Grid>
        <Grid>
          <Grid
            container
            p={2}
            px={5}
            alignItems="center"
            justifyContent="center"
            className="header"
          >
            
            <Box
              sx={{ display: "flex" }}
              style={{ background: "orange !important" }}
            >
              <CssBaseline />
              <AppBar component="nav">
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: "none" } }}
                  >
                    <MenuIcon />
                  </IconButton>

                  <Grid
                    className="mobileBtn"
                    style={{ position: "absolute", right: "10px" }}
                  >
                    <Grid container alignItems="center">
                      <Grid>
                        {walletConnected ? (
                          <p>
                          
                              <>
                                {network !== 42161 && (
                                  <Button
                                    variant="outlined"
                                    onClick={switchNetwork}
                                    disabled={network === 42161}
                                  >
                                    switch to ARB Network
                                  </Button>
                                )}
                                {userAddress.slice(0, 6)}...
                                {userAddress.slice(38, 42)}
                              </>
                           
                        
                          </p>
                        ) : (
                          <Button
                          
                            onClick={connectWallet}
                            variant="contained"
                         
                          >
                            Connect Wallet
                          </Button>
                        )}
                      </Grid>

                      <Logo />
                      <Grid>
                        <span style={{ color: "rgb(150, 190, 220)" }}></span>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                  >
                    <Grid container alignItems="center" pl={5}>
                      <Logo />
                      <Grid>
                        <span style={{ color: "rgb(150, 190, 220)" }}></span>
                      </Grid>
                    </Grid>
                  </Typography>
                  <Box
                    className="menuLg"
                    style={{ display: "flex", alignItems: "center" }}
                    sx={{ display: { xs: "none", sm: "block" } }}
                  >
                    <Link to="section-1" spy={true} smooth={true}>
                      Home&nbsp;&nbsp;&nbsp;
                    </Link>
                    <Link to="section-2" spy={true} smooth={true}>
                      Airdrop&nbsp;&nbsp;&nbsp;
                    </Link>
                    <Link to="section-3" spy={true} smooth={true}>
                      Perks&nbsp;&nbsp;&nbsp;
                    </Link>
                    <Link
                      onClick={handleAlert}
                      spy={true}
                      smooth={true}
                      disabled
                    >
                      Staking &nbsp;&nbsp;&nbsp;
                    </Link>
                    <Link to="section-4" spy={true} smooth={true}>
                      Tokenomics&nbsp;&nbsp;&nbsp;
                    </Link>{" "}
                    <Link to="section-5" spy={true} smooth={true}>
                      Roadmap&nbsp;&nbsp;&nbsp;
                    </Link>
                    <Grid>
                      {walletConnected ? (
                        <p>
                       
                            <>
                              {network !== 42161 && (
                                <Button
                                  variant="outlined"
                                  onClick={switchNetwork}
                                  disabled={network === 42161}
                                >
                                  switch to ARB Network
                                </Button>
                              )}
                              {userAddress.slice(0, 6)}...
                              {userAddress.slice(38, 42)}
                            </>
                     
                        </p>
                      ) : (
                        <Button
                         
                          onClick={connectWallet}
                          variant="contained"
                         
                        >
                          Connect Wallet
                        </Button>
                      )}
                    </Grid>
                  </Box>
                </Toolbar>
              </AppBar>
              <Box component="nav">
                <Drawer
                  // container={container}
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                  style={{ background: " " }}
                  sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                      boxSizing: "border-box",
                      width: drawerWidth,
                    },
                  }}
                >
                  {drawer}
                  <SocialsAlt />
                </Drawer>
              </Box>
              <Box component="main">
                <Toolbar />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid mb={5} p={5} className="Banner">
          <Grid container>
            <Grid pl={5} xs={12}>
              <h1>
                Meet <span style={{ color: "#D8601E" }}>Ai</span>Shiba{" "}
              </h1>

              <h4>The Community-inspired meme coin for arbitrum blockchain</h4>
              <Grid container alignItems="center">
                <CheckCircleIcon className="circle" />
                &nbsp; &nbsp;
                <p>Zero FUD</p>
              </Grid>
              <Grid container alignItems="center" flexWrap="nowrap">
                <CheckCircleIcon className="circle" />
                &nbsp; &nbsp;
                <p>100% Community Owned</p>
              </Grid>
              <Grid container alignItems="center">
                <CheckCircleIcon className="circle" />
                &nbsp; &nbsp;
                <p>Zero FUGAZI</p>
              </Grid>
              {btn && (
                <Button
                  variant="outlined"
                  onClick={handleNFTHolders}
                 
                >
                 Check NFT Owned
                </Button>
              )}
            </Grid>
            <Grid sm={6} xs={12}>
              <img className="AiShiba" src="./aishiba.png" alt="AiShiba" />
            </Grid>
          </Grid>
        </Grid>
        {/* <Banner /> */}
        <Airdrop walletConnected={walletConnected} userAddress={userAddress} />
        <Grid py={5}>
          <hr style={{ borderColor: "white", width: "50%" }} />
        </Grid>
        <Perks />
        <Tokenomics />
        <Roadmap />
        <Grid py={3}>
          <Faq />
        </Grid>
        {/* <Listings/> */}
        {/* <Grid py={5}>
            <hr style={{ borderColor: "white", width: "50%" }} />
          </Grid>
          <Grid
            container
            p={5}
            xs={12}
            justifyContent={"center"}
            style={{ margin: "0 auto", background: "rgb(204 214 225 / 8%)" }}
          >
            <Grid py={2} container sm={6} md={3} className="listing">
              <a
                className="listingText"
                href="https://www.coingecko.com/en/coins/aishiba"
                target="_blank"
              >
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={Coingecko}
                  alt="Coingecko"
                />{" "}
                <br />
                Coingecko
              </a>
            </Grid>
            <Grid py={2} container sm={6} md={3} className="listing">
              <a
                className="listingText"
                href="https://coinmarketcap.com/currencies/aishiba/"
                target="_blank"
              >
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={Coinmarketcap}
                  alt="Coinmarketcap"
                />{" "}
                <br />
                Coinmarketcap
              </a>
            </Grid>
            <Grid py={2} container sm={6} md={3} className="listing">
              <a
                className="listingText"
                href="https://dexscreener.com/arbitrum/0xbb1554b79d49327f6f000fb8057a972bfee4afca"
                target="_blank"
              >
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={DEXTools}
                  alt="DEXTools"
                />{" "}
                <br />
                DEXTools
              </a>
            </Grid>
          </Grid> */}
        <Socials />
      </Grid>
    </Grid>
  );
};

export default Home;
