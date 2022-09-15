import { getHumanReadableNetworkFromChainId, getChainInfoFromId, getTransactionTypeFromHex, parseTransaction, parseTransactions,addHistoricEthPriceToTransaction } from "../utils/cryptoUtils"
import { toBN } from "web3-utils";

var fs = require('fs');
const ETHERSCANTESTDATA = JSON.parse(fs.readFileSync('test/etherscantestdata.json', 'utf8'));
const TRANSFERTESTDATA = ETHERSCANTESTDATA.result[0];
const DEPOSITTESTDATA = ETHERSCANTESTDATA.result[1];
const APPROVETESTDATA = ETHERSCANTESTDATA.result[2];
const OWNER = ETHERSCANTESTDATA.owner;

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

  expect(getTransactionTypeFromHex(TRANSFERTESTDATA.methodId)).toBe("Transfer")
  expect(getTransactionTypeFromHex(DEPOSITTESTDATA.methodId)).toBe("Deposit")
  expect(getTransactionTypeFromHex(APPROVETESTDATA.methodId)).toBe("Approve")
  expect(getTransactionTypeFromHex("invalidhex")).toBe("invalidhex")
})

test('test parseTransaction', () => {

  let initialGas = toBN(toBN(TRANSFERTESTDATA.gasPrice) * toBN(TRANSFERTESTDATA.gasUsed))
  let depositToWethGas = toBN(toBN(DEPOSITTESTDATA.gasPrice) * toBN(DEPOSITTESTDATA.gas))
  let approveGas = toBN(toBN(APPROVETESTDATA.gasPrice) * toBN(APPROVETESTDATA.gas))

  let parsedTRANSFERDATA = parseTransaction(TRANSFERTESTDATA, OWNER)
  expect(parsedTRANSFERDATA.in_out).toBe("IN")
  expect(parsedTRANSFERDATA.txn_fee).toBe(initialGas.toString())

  let parsedDEPOSITTESTDATA = parseTransaction(DEPOSITTESTDATA, OWNER)
  expect(parsedDEPOSITTESTDATA.in_out).toBe("OUT")
  expect(parsedDEPOSITTESTDATA.txn_fee).toBe(depositToWethGas.toString())

  let parsedAPROVETESTDATA = parseTransaction(APPROVETESTDATA, OWNER)
  expect(parsedAPROVETESTDATA.in_out).toBe("OUT")
  expect(parsedAPROVETESTDATA.txn_fee).toBe(approveGas.toString())

})

test('test parseTransactions', () => {

  let parsedTransactions = parseTransactions(ETHERSCANTESTDATA.result, OWNER);

  expect(parsedTransactions[0]).toHaveProperty("in_out")
  expect(parsedTransactions[0]).toHaveProperty("txn_fee")
  expect(parsedTransactions[1]).toHaveProperty("in_out")
  expect(parsedTransactions[1]).toHaveProperty("txn_fee")
  expect(parsedTransactions[2]).toHaveProperty("in_out")
  expect(parsedTransactions[2]).toHaveProperty("txn_fee")

})

test('test addHistoricEthPriceToTransaction', () => {

  const price = "1000"
  let transactionWithHistoricEthPrice = addHistoricEthPriceToTransaction(TRANSFERTESTDATA,price);
  expect(transactionWithHistoricEthPrice).toHaveProperty("historicEthPrice")
  expect(transactionWithHistoricEthPrice.historicEthPrice).toBe(price)
})