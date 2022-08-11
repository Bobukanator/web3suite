import { getHumanReadableNetworkFromChainId, getChainInfoFromId, getTransactionTypeFromHex } from "../utils/cryptoUtils"

var fs = require('fs');
const ETHERSCANTESTDATA = JSON.parse(fs.readFileSync('test/etherscantestdata.json', 'utf8'));


test('test getHumanReadableNetworkFromChainId', () => {
  expect(getHumanReadableNetworkFromChainId("1")).toBe("Ethereum Mainnet")
  expect(getHumanReadableNetworkFromChainId("3")).toBe("Ropsten Test Network")
  expect(getHumanReadableNetworkFromChainId("4")).toBe("Rinkeby Test Network")
  expect(getHumanReadableNetworkFromChainId("5")).toBe("Goerli Test Network")
  expect(getHumanReadableNetworkFromChainId("250")).toBe("Fantom Network")
  expect(getHumanReadableNetworkFromChainId("137")).toBe("Matic Mainnet")
})

test('test getChainInfoFromChainId', () => {
  const TestChainETH = getChainInfoFromId("1")
  expect(TestChainETH.name).toBe("Ethereum Mainnet")
  expect(TestChainETH.nativecurrency).toBe("Ether")
  expect(TestChainETH.rpcurl).toBe("https://api.mycryptoapi.com/eth")
  expect(TestChainETH.explorerurl).toBe("https://etherscan.io")

  const TestChainBNB = getChainInfoFromId("56")
  expect(TestChainBNB.name).toBe("Binance Smart Chain")
  expect(TestChainBNB.nativecurrency).toBe("Binance Chain Native Token")
  expect(TestChainBNB.rpcurl).toBe("https://bsc-dataseed1.binance.org")
  expect(TestChainBNB.explorerurl).toBe("")

})

test('test getTransactionTypeDescription', () => {

  const TransferTestData = ETHERSCANTESTDATA.result[0];
  const DepositTestData = ETHERSCANTESTDATA.result[1];
  const ApproveTestData = ETHERSCANTESTDATA.result[2];

  expect(getTransactionTypeFromHex(TransferTestData.methodId)).toBe("Transfer")
  expect(getTransactionTypeFromHex(DepositTestData.methodId)).toBe("Deposit")
  expect(getTransactionTypeFromHex(ApproveTestData.methodId)).toBe("Approve")
  expect(getTransactionTypeFromHex("invalidhex")).toBe("invalidhex")
})