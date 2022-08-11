
export function getHumanReadableNetworkFromChainId(chainID) {
  return getChainInfoFromId(chainID).name
}

export function getChainInfoFromId(chainID) {
  for (let chaininfo of SupportedNetworks) {
    if (chaininfo.id == chainID) return chaininfo
  }
  return null;
}

export function getTransactionTypeFromHex(hex) {
  return TransactionType[hex] || hex;
}

export const SupportedNetworks = [
  { id: "1", name: "Ethereum Mainnet", nativecurrency: "Ether", rpcurl: "https://api.mycryptoapi.com/eth", explorerurl: "https://etherscan.io" },
  { id: "3", name: "Ropsten Test Network", nativecurrency: "Ropsten Ether", rpcurl: "https://ropsten.infura.io/v3/", explorerurl: "" },
  { id: "4", name: "Rinkeby Test Network", nativecurrency: "Rinkeby Ether", rpcurl: "https://rinkeby.infura.io/v3/", explorerurl: "" },
  { id: "5", name: "Goerli Test Network", nativecurrency: "Görli Ether", rpcurl: "https://rpc.goerli.mudit.blog/", explorerurl: "" },
  { id: "56", name: "Binance Smart Chain", nativecurrency: "Binance Chain Native Token", rpcurl: "https://bsc-dataseed1.binance.org", explorerurl: "" },
  { id: "137", name: "Matic Mainnet", nativecurrency: "Matic", rpcurl: "https://polygon-rpc.com", explorerurl: "https://polygonscan.com/" },
  { id: "42", name: "Kovan Test Network", nativecurrency: "Kovan Ether", rpcurl: "https://kovan.optimism.io/", explorerurl: "" },
  { id: "250", name: "Fantom Network", nativecurrency: "Fantom", rpcurl: "https://rpcapi.fantom.network/", explorerurl: "https://ftmscan.com" }
]

export const TransactionType = {
  '0x': 'Transfer',
  '0x095ea7b3': 'Approve',
  '0xd0e30db0': 'Deposit',
  '0xb6b55f25': 'Deposit',
  '0x3ccfd60b': 'Withdraw',
  '0x2e1a7d4d': 'Withdraw',
  '0xa9059cbb': 'Transfer'
}