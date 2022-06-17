import { getHumanReadableNetworkFromChainId } from "../utils/cryptoUtils"

test('test getHumanReadableNetworkFromChainId', () => {
  expect(getHumanReadableNetworkFromChainId("0x1")).toBe("Ethereum Mainnet")
  expect(getHumanReadableNetworkFromChainId("0x3")).toBe("Ropsten Test Network")
  expect(getHumanReadableNetworkFromChainId("0x4")).toBe("Rinkeby Test Network")
  expect(getHumanReadableNetworkFromChainId("0x5")).toBe("Goerli Test Network")
  expect(getHumanReadableNetworkFromChainId("0x2018")).toBe("Ethereum Dev Network")
  expect(getHumanReadableNetworkFromChainId("0x61")).toBe("Ethereum Classic")
})