import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { vmContract } from "../../blockchain/vending";

const VendingPage = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    callVmBalance();
  }, []);

  const callVmBalance = async () => {
    const data = await vmContract.methods.getVendingMachineBalance().call();
    setTotal(data)
  };

  return (
    <div>
      <Typography variant="h4">VendingPage</Typography>
      <Box>
        <Typography>Total count: {total}</Typography>
      </Box>
    </div>
  );
};

export default VendingPage;
