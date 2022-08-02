import { getHumanReadableNetworkFromChainId, getChainInfoFromId } from "../utils/cryptoUtils"

test('test getHumanReadableNetworkFromChainId', () => {
  expect(getHumanReadableNetworkFromChainId("1")).toBe("Ethereum Mainnet")
  expect(getHumanReadableNetworkFromChainId("3")).toBe("Ropsten Test Network")
  expect(getHumanReadableNetworkFromChainId("4")).toBe("Rinkeby Test Network")
  expect(getHumanReadableNetworkFromChainId("5")).toBe("Goerli Test Network")
  expect(getHumanReadableNetworkFromChainId("250")).toBe("Fantom Network")
  expect(getHumanReadableNetworkFromChainId("137")).toBe("Matic Mainnet")
})

test('test getChainInfoFromChainId', () => {
  const TestChainETH = getChainInfoFromId("1");
  expect(TestChainETH.name).toBe("Ethereum Mainnet")
  expect(TestChainETH.nativecurrency).toBe("Ether")
  expect(TestChainETH.rpcurl).toBe("https://api.mycryptoapi.com/eth")
  expect(TestChainETH.explorerurl).toBe("https://etherscan.io")

  const TestChainBNB = getChainInfoFromId("38");
  expect(TestChainBNB.name).toBe("Binance Smart Chain")
  expect(TestChainBNB.nativecurrency).toBe("Binance Chain Native Token")
  expect(TestChainBNB.rpcurl).toBe("https://bsc-dataseed1.binance.org")
  expect(TestChainBNB.explorerurl).toBe("")

})