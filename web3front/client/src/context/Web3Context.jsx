import { useContext, useMemo, useState, createContext, useEffect } from "react";
import Web3 from "web3";
import { createVmContract } from "../blockchain/vending";

const isInstalled = window.ethereum && window.ethereum.isMetaMask;

const Web3Context = createContext({
  account: null,
  web3: null,
  handleConnect: () => {},
  balance: null,
  vmContract: null,
});

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [vmContract, setVmContract] = useState(null);

  const getAccounts = async () => {
    if (isInstalled) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      return accounts;
    }
  };

  const handleConnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const w3 = new Web3(window.ethereum)

        setWeb3(w3);
        initWeb3(w3)
      } catch (err) {
        console.log(err);
      } 
    }
  };

  useEffect(() => {
    getAccounts().then(async (res) => {
      const acc = res[0];
      setAccount(acc);

      if (acc) {
        const prov = new Web3(window.ethereum);

        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [acc],
        });
        setWeb3(prov);
        setBalance(prov.utils.fromWei(balance, "ether"));
        initWeb3(prov)
      }
    });
  }, []);

  useEffect(() => {
    if (!!isInstalled) {
      window.ethereum.on("accountsChanged", async (accs) => {
        setAccount(accs[0] || null);
      });
    }
  }, [isInstalled]);

  const initWeb3 = async (w3) => {
    setWeb3(w3);
    const vm = await createVmContract(w3);
    setVmContract(vm);
  };

  const values = useMemo(() => {
    return {
      account,
      web3,
      handleConnect,
      balance,
      vmContract
    };
  }, [account, web3, balance]);

  return <Web3Context.Provider value={values}>{children}</Web3Context.Provider>;
};
