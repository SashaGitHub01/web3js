import Web3 from "web3";

const provider = new Web3.providers.HttpProvider(
  "https://goerli.infura.io/v3/ab6a148e872a49bc892dc80113a94ec2"
);

const web3 = new Web3(provider);

const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "donutBalances",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVendingMachineBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "purchase",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "restock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const vmContract = new web3.eth.Contract(
  abi,
  "0xE776722B5Ec4Ef4B7CD1FD60cE88b2DCeA53626f"
);
