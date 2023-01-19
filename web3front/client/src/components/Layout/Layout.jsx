import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { useWeb3 } from "../../context/Web3Context";

const Layout = () => {
  const { handleConnect, balance, account } = useWeb3();
  
  return (
    <>
      <Box sx={{}}>
        {!account ? (
          <Button onClick={handleConnect} variant="contained">
            Connect
          </Button>
        ) : (
          <Typography variant="h6">{account} - {balance} ETH</Typography>
        )}
        <Link to={"vending"}>Vending</Link>
        <div/>
        <Link to={"/"}>Home</Link>
      </Box>
      <Outlet />
    </>
  );
};

export default Layout;
