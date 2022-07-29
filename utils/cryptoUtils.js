
export function getHumanReadableNetworkFromChainId(chainID) {
  for (let network of SupportedNetworks) {
    if (network.id == chainID) return network.name
  }
  return null;
}

export const SupportedNetworks = [
  { id: "0x1", name: "Ethereum Mainnet" },
  { id: "0x3", name: "Ropsten Test Network" },
  { id: "0x4", name: "Rinkeby Test Network" },
  { id: "0x5", name: "Goerli Test Network" },
  { id: "0x38", name: "Binance Smart Chain" },
  { id: "0x137", name: "Matic Mainnet" },
  { id: "0x42", name: "Kovan Test Network" },
  { id: "0x2018", name: "Ethereum Dev Network" },
  { id: "0x61", name: "Ethereum Classic" }
] 