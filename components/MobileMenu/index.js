import * as React from "react";
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
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-scroll";
import { Grid } from "@mui/material";
import Logo from "../Header/Logo";
// import useWindowDimensions from "../../hooks/screen";
import CloseIcon from "@mui/icons-material/Close";

import Socials from "../Socials";
import SocialsAlt from "../Socials/SocialsAlt";
import { toast } from "react-toastify";

const drawerWidth = 240;
const navItems = ["Home", "Airdrop", "Perks", "Tokenomics", "Roadmap"];

function MobileMenu(props) {
  const { window } = props;
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

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleAlert = () => {
    toast.warning(
      <span style={{ fontSize: "10px", color: "black" }}>Coming Soon!</span>
    );
  };

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

              {/* <Grid style={{position:'absolute', right:'10px'}}>
         
         <Grid container alignItems="center">
         <Button className='btn-header' variant='contained'
         
         >Connect Wallet</Button>

              <Logo />
              <Grid>
                <span style={{ color: "rgb(150, 190, 220)" }}></span>
              </Grid>
            </Grid>
         </Grid> */}

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
                className="menu"
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
                <Link onClick={handleAlert} spy={true} smooth={true} disabled>
                  Staking &nbsp;&nbsp;&nbsp;
                </Link>
                <Link to="section-4" spy={true} smooth={true}>
                  Tokenomics&nbsp;&nbsp;&nbsp;
                </Link>{" "}
                <Link to="section-5" spy={true} smooth={true}>
                  Roadmap&nbsp;&nbsp;&nbsp;
                </Link>
                <Button
                  className="btn-header"
                  onClick={connectWallet}
                  variant="contained"
                  disabled
                >
                  Connect Wallet
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
          <Box component="nav">
            <Drawer
              container={container}
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
  );
}

MobileMenu.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default MobileMenu;
