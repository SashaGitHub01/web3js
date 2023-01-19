import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useWeb3 } from "../../context/Web3Context";

const VendingPage = () => {
  const [qty, setQty] = useState("");
  const { vmContract, account } = useWeb3();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (vmContract) {
      callVmBalance();
    }
  }, [vmContract]);

  const callVmBalance = async () => {
    const data = await vmContract.methods.getVendingMachineBalance().call();
    setTotal(data);
  };

  const buyDonut = async () => {
    if (account) {
      const tx = await vmContract.methods.purchase(qty).send({
        from: account,
        value: 10,
      });
    }
  };

  const changeQty = async (e) => {
    setQty(e.target.value);
  };

  return (
    <div>
      <Typography variant="h4">VendingPage</Typography>
      <Box>
        <Typography>Total count: {total}</Typography>
        <Typography>Your donuts: {total}</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField onChange={changeQty} value={qty} placeholder="count" />
          <Button onClick={buyDonut} variant="contained">
            Buy
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default VendingPage;
