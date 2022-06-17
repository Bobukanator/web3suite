
export function getHumanReadableNetworkFromChainId(chainID) {
  switch (chainID) {
    case "0x1": return "Ethereum Mainnet"
    case "0x3": return "Ropsten Test Network"
    case "0x4": return "Rinkeby Test Network"
    case "0x5": return "Goerli Test Network"
    case "0x2018": return "Ethereum Dev Network"
    case "0x61": return "Ethereum Classic"
  }
}