import React from "react";
import { Box, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { useWeb3 } from "../../context/Web3Context";

const Layout = () => {
  const { handleConnect } = useWeb3();

  return (
    <>
      <Box sx={{}}>
        <Button onClick={handleConnect} variant="contained">
          Connect
        </Button>
        <Link to={"vending"}>Vending</Link>
      </Box>
      <Outlet />
    </>
  );
};

export default Layout;