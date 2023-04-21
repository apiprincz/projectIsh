import { Button, Grid, Input, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ProgressBar from "../ProgressBar";
import { Element } from "react-scroll";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Web3Modal from "web3modal";
import { BigNumber, Contract, providers, utils } from "ethers";
import { WHITELIST_ADDRESS } from "../../whitelistNFT/whitelist_Address";
import { nftAmount } from "../../whitelistNFT/nftAmount";

import {
  AISHIBA_CONTRACT_ADDRESS,
  AISHIBA_CONTRACT_ABI,
} from "../../constants";

import { arbMerkleTree, arbRootHash } from "../../whitelistArb/merkleProof";
import { ogMerkleTree, ogRootHash } from "../../whitelistOg/merkleProof";
import { keccak256 } from "ethers/lib/utils";
import { toast } from "react-toastify";
import { merkleTree, rootHash } from "../../whitelistNFT/merkleProof";

import "react-sweet-progress/lib/style.css";

import Web3 from "web3";

import WalletConnectProvider from "@walletconnect/web3-provider";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Airdrop = ({ walletConnected }) => {
  const [value, setValue] = useState("");
  const [tabValue, setTabValue] = React.useState(0);
  const web3ModalRef = useRef();

  // const [merkleRoot, setMerkleRoot] = useState(rootHash)
  // const [loading, setLoading] = useState(false);

  const [userAddress, setUserAddress] = useState("");
  const [ogMerkleProof, setOgMerkleProof] = useState([]);
  const [arbMerkleProof, setArbMerkleProof] = useState([]);
  const [merkleProof, setMerkleProof] = useState([]);
  const [totalAmountMinted, setTotalAmountMinted] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isWl, setIsWl] = useState(false);
  const [signature, setSignature] = useState("");
  const [library, setLibrary] = useState("");
  const [network, setNetwork] = useState("");
  const [ogClaim, setOgClaim] = useState(false);
  const [arbClaim, setArbClaim] = useState(false);
  const [nftClaim, setNftClaim] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userTokenIds, setUserTokenIds] = useState([]);
  const [amountOfTokensToClaim, setAmountOfTokensToClaim] = useState();
  const [claim, setClaim] = useState(false);
  const [nftBalance, setNftBalance] = useState();
  let claimPerNFT = 5900000000000;

  const ogValue = "300000000000";
  const arbValue = "420000000000";

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

  const getOGProof = async () => {
    const signer = await getProviderOrSigner(true);
    const _userAddress = await signer.getAddress();
    const _leaf = keccak256(_userAddress);
    const _merkleProof = ogMerkleTree.getHexProof(_leaf);
    setUserAddress(_userAddress);
    setOgMerkleProof(_merkleProof);
  };
  const getArbProof = async () => {
    const signer = await getProviderOrSigner(true);
    const _userAddress = await signer.getAddress();
    const _leaf = keccak256(_userAddress);
    const _merkleProof = arbMerkleTree.getHexProof(_leaf);
    setUserAddress(_userAddress);
    setArbMerkleProof(_merkleProof);
  };
  const getProof = async () => {
    const signer = await getProviderOrSigner(true);
    const _userAddress = await signer.getAddress();
    const _leaf = keccak256(_userAddress);
    const _merkleProof = merkleTree.getHexProof(_leaf);
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
      if (switchError.code === 42161) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]],
          });
        } catch (error) {
          console.log("error");
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

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleClaimors = (e) => {
    console.log("tab", e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    console.log("value", value);
    console.log("mkog", ogMerkleProof.length);
    console.log("mkarb", arbMerkleProof.length);

    if (value === "og") {
      if (ogMerkleProof.length > 0) {
        console.log("you can claim og token");
        setOgClaim(true);
      } else {
        console.log("you cannot claim og token");
        setOgClaim(false);
      }
    } else if (value === "arb") {
      if (arbMerkleProof.length > 0) {
        console.log("you can claim arb token");
        setArbClaim(true);
      } else {
        console.log("you cannot claim arb token");
        setArbClaim(false);
      }
    }
  }, [value]);

  useEffect(() => {
    getOGProof();
    getArbProof();
    getProof();
  }, [walletConnected]);

  const calculateTokensForNFT = () => {
    console.log("userAddress", userAddress);

    const indexPosition = WHITELIST_ADDRESS.indexOf(userAddress);
    console.log("indexPosition", nftAmount[indexPosition]);

    const nftBalance = nftAmount[indexPosition];
    setNftBalance(nftBalance)
    let amountOfTokensToClaim = 0;

    if (nftBalance === 0) {
      setClaim(false);
      setAmountOfTokensToClaim(0);
    } else {
      if (nftBalance <= 2) {
        amountOfTokensToClaim = (25 * claimPerNFT) / 100;
      } else if (nftBalance > 2 && nftBalance <= 4) {
        amountOfTokensToClaim = (125 * claimPerNFT) / 100;
      } else if (nftBalance > 4 && nftBalance <= 9) {
        amountOfTokensToClaim = (250 * claimPerNFT) / 100;
      } else if (nftBalance > 10) {
        amountOfTokensToClaim = (300 * claimPerNFT) / 100;
      }
      setAmountOfTokensToClaim(amountOfTokensToClaim);
      setClaim(true);
    }
  };

  useEffect(() => {
    web3ModalRef.current = new Web3Modal({
      network: "arbitrum",
      providerOptions: {},
      disableInjectedProvider: false,
    });

    // console.log("userAddress", userAddress)

    if (merkleProof.length > 0) {
      console.log("you can claim nft token");
      console.log("userAddress", userAddress);
      if (userAddress) {
        calculateTokensForNFT();
      }
      // setClaim(true);
    } else {
      console.log("you cannot claim nft token")
      setClaim(false);
    }

    // onPageLoad()
  }, [walletConnected]);

  const handleOgClaim = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const aiShibaContract = new Contract(
        AISHIBA_CONTRACT_ADDRESS,
        AISHIBA_CONTRACT_ABI,
        signer
      );

      const sendOgFunds = await aiShibaContract.claimTokensForOG(ogMerkleProof);
      setIsLoading(true);

      await sendOgFunds.wait();
      setIsLoading(false);
      toast.success(
        <span style={{ fontSize: "10px", color: "black" }}>Congratulation!!</span>
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleArbClaim = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const aiShibaContract = new Contract(
        AISHIBA_CONTRACT_ADDRESS,
        AISHIBA_CONTRACT_ABI,
        signer
      );

      const sendArbFunds = await aiShibaContract.claimTokensForARB(
        arbMerkleProof
      );
      setIsLoading(true);

      await sendArbFunds.wait();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClaimForNfts = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const userAddress = signer.getAddress();
      const aiShibaContract = new Contract(
        AISHIBA_CONTRACT_ADDRESS,
        AISHIBA_CONTRACT_ABI,
        signer
      );
 

    
      const txn = await aiShibaContract.claimTokensForNft(merkleProof, nftBalance);
      await txn.wait();
      

      console.log("txn", txn);
      console.log("txn", "successful");

    } catch (error) {
      console.error(error);
    }
  };

  console.log("ogRootHash", ogRootHash);
  console.log("arbRootHash", arbRootHash);
  console.log("RootHash", rootHash);

  return (
    <Element name="section-2" className="page-section page-section-2">
      <Grid mt={5}>
        <Grid
          className="Airdrop"
          container
          sm={6}
          xs={12}
          flexDirection={"column"}
          p={5}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="NFT Claim" {...a11yProps(0)} />
                <Tab label="ARB/OG Claim" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <Grid
                className="Airdrop"
                container
                sm={12}
                xs={12}
                flexDirection={"column"}
              >
                <h3 className="airdropTitle">Claim Airdrop For Your NFT</h3>
                <p className="airdropTitle">Who is eligible??</p>
                <h4 className="airdropTitle">
                  <CheckCircleIcon
                    style={{ fill: "black", verticalAlign: "middle" }}
                  />{" "}
                  AiShiba OG Collection NFT Holder
                </h4>

                <ProgressBar />
                <Grid pt={2}>
                  <TextField
                    fullWidth
                    id="outlined-read-only-input"
                    label="Your Airdrop Allocation"
                    defaultValue="0"
                    value={amountOfTokensToClaim}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid pt={2}>
                  <Button
                    variant="contained"
                    disabled={claim ? false : true}
                    onClick={handleClaimForNfts}
                  >
                    Claim Airdrop
                  </Button>
                   {walletConnected ? 
                   <>{!claim ? <span style={{color:'red'}}>Sorry, You are Not Eligible</span> : <span style={{color:'green'}}>Congratulations, You are Eligible</span> }</> : "" }
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Grid
                className="Airdrop"
                container
                sm={12}
                xs={12}
                flexDirection={"column"}
              >
                <h3 className="airdropTitle">Claim Airdrop</h3>
                <p className="airdropTitle">Who is eligible??</p>
                <h4 className="airdropTitle">
                  <CheckCircleIcon
                    style={{ fill: "black", verticalAlign: "middle" }}
                  />{" "}
                  Early Birds
                </h4>
                <h4 className="airdropTitle">
                  <CheckCircleIcon
                    style={{ fill: "black", verticalAlign: "middle" }}
                  />{" "}
                  Arb Claimooorssss
                </h4>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Choose A Side
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={handleClaimors}
                  >
                    <FormControlLabel
                      value="og"
                      control={<Radio />}
                      label="Early Birds"
                    />

                    <FormControlLabel
                      value="arb"
                      control={<Radio />}
                      label="Arb Claimooorssss"
                    />
                  </RadioGroup>
                </FormControl>
                <ProgressBar />
                <Grid pt={2}>
                  <TextField
                    fullWidth
                    id="outlined-read-only-input"
                    label="Your Airdrop Allocation"
                    defaultValue="0"
                    value={
                      (value === "og" ? (ogClaim ? ogValue : 0) : 0) ||
                      (value === "arb" ? (arbClaim ? arbValue : 0) : 0)
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid pt={2}>
                  {value === "" ? (
                    <Button variant="contained" disabled>
                      {walletConnected ? (
                        <>claim airdrop</>
                      ) : (
                        <>Connect Wallet</>
                      )}
                    </Button>
                  ) : (
                    <>
                      {value === "og" ? (
                        <Grid>
     <Button
                          variant="contained"
                          disabled={ogClaim ? false : true}
                          onClick={handleOgClaim}
                        >
                          {walletConnected ? (
                            <>claim airdrop</>
                          ) : (
                            <>Connect Wallet</>
                          )}
                        </Button>
                        <>{!ogClaim ? <span style={{color:'red'}}>Sorry, You are Not Eligible</span> : <span style={{color:'green'}}>Congratulations, You are Eligible</span> }</>
                        </Grid>
                   
                      ) : (
                        <Grid>
  <Button
                          variant="contained"
                          disabled={arbClaim ? false : true}
                          onClick={handleArbClaim}
                        >
                          {walletConnected ? (
                            <>claim airdrop</>
                          ) : (
                            <>Connect Wallet</>
                          )}
                        </Button>
                         <>{!arbClaim ? <span style={{color:'red'}}>Sorry, You are Not Eligible</span> : <span style={{color:'green'}}>Congratulations, You are Eligible</span> }</>
                    

                        </Grid>
                        )}
                    </>
                  )}
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Element>
  );
};

export default Airdrop;
