import { useContext, useMemo, useState } from "react";
import { createContext } from "react";
import Web3 from "web3";

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  const handleConnect = async () => {
    if (typeof window.ethereum !== undefined) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const balance  = await window.ethereum.request({ method: "eth_getBalance", params: [] })
        console.log(balance)
        setWeb3(new Web3(window.ethereum));
      } catch (err) {
        console.log(err);
      }
    }
  };
  console.log(window.ethereum);
  const values = useMemo(
    () => ({
      account,
      web3,
      handleConnect,
    }),
    []
  );

  return <Web3Context.Provider value={values}>{children}</Web3Context.Provider>;
};
