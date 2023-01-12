import { createEmptyTransactions, updateTransactionTotals, addNewTransaction, createNewTaxTransaction } from "../utils/usaTaxUtils"
import { parseTransactions, addHistoricEthPriceToTransaction } from "../utils/cryptoUtils"

var fs = require('fs');
const ETHERSCANTESTDATA = JSON.parse(fs.readFileSync('test/etherscantestdata2.json', 'utf8'));
//EtherScan test data from this external random account $nuxt.$store.commit("set_address", "0xb85a0fe43ef7edc7ac9e594421d59c5c55361f0c");
const OWNER = ETHERSCANTESTDATA.owner;

test('test createEmptyTransactions', async () => {

  const result = createEmptyTransactions()
  expect(result.length).toBe(2)
  expect(result[0].Description).toBe("Description of Property")
  expect(result[1].Description).toBe("Totals")
  expect(result[0].Proceeds).toBe("Proceeds")
  expect(result[1].Proceeds).toBe("Proceeds")
  expect(result[0].Cost_Basis).toBe("Cost Basis")
  expect(result[1].Cost_Basis).toBe("Cost Basis")
  expect(result[0]).toHaveProperty("Date_Acquired")
  expect(result[0]).toHaveProperty("Date_Sold")
  expect(result[1]).not.toHaveProperty("Date_Acquired")
  expect(result[1]).not.toHaveProperty("Date_Sold")

})

test('test updateTransactionTotals', async () => {

  let transactions = createEmptyTransactions()

  transactions[0].Proceeds = 1;
  transactions[0].Cost_Basis = 1;
  transactions[0].Gain_Loss = 1;

  const result = updateTransactionTotals(transactions);
  expect(result[1].Proceeds).toBe(1)
  expect(result[1].Cost_Basis).toBe(1)
  expect(result[1].Gain_Loss).toBe(1)

})

test('test addNewTransaction', async () => {

  const result = addNewTransaction(createEmptyTransactions())
  expect(result.length).toBe(3)
  expect(result[0].Description).toBe("Description of Property")
  expect(result[1].Description).toBe("Description of Property")
  expect(result[2].Description).toBe("Totals")
  expect(result[0].Proceeds).toBe("Proceeds")
  expect(result[1].Proceeds).toBe("Proceeds")
  expect(result[2].Proceeds).toBe("Proceeds")
  expect(result[0].Cost_Basis).toBe("Cost Basis")
  expect(result[1].Cost_Basis).toBe("Cost Basis")
  expect(result[2].Cost_Basis).toBe("Cost Basis")
  expect(result[0]).toHaveProperty("Date_Acquired")
  expect(result[1]).toHaveProperty("Date_Acquired")
  expect(result[0]).toHaveProperty("Date_Sold")
  expect(result[1]).toHaveProperty("Date_Sold")
  expect(result[2]).not.toHaveProperty("Date_Acquired")
  expect(result[2]).not.toHaveProperty("Date_Sold")

})

test('test updateTransactionTotals', async () => {

  let transactions = addNewTransaction(createEmptyTransactions())

  transactions[0].Proceeds = 1;
  transactions[0].Cost_Basis = 1;
  transactions[0].Gain_Loss = 1;
  transactions[1].Proceeds = 1;
  transactions[1].Cost_Basis = 1;
  transactions[1].Gain_Loss = 1;

  const result = updateTransactionTotals(transactions);
  expect(result[2].Proceeds).toBe(2)
  expect(result[2].Cost_Basis).toBe(2)
  expect(result[2].Gain_Loss).toBe(2)

})

test('test updateTransactionTotals negatives', async () => {

  let transactions = addNewTransaction(createEmptyTransactions())

  transactions[0].Proceeds = 1;
  transactions[0].Cost_Basis = -4;
  transactions[0].Gain_Loss = 1;
  transactions[1].Proceeds = 1;
  transactions[1].Cost_Basis = 3;
  transactions[1].Gain_Loss = -1;

  const result = updateTransactionTotals(transactions);
  expect(result[2].Proceeds).toBe(2)
  expect(result[2].Cost_Basis).toBe(-1)
  expect(result[2].Gain_Loss).toBe(0)

})

test('test updateTransactionTotals numbers as strings', async () => {

  let transactions = addNewTransaction(createEmptyTransactions())

  transactions[0].Proceeds = "1";
  transactions[0].Cost_Basis = -4;
  transactions[0].Gain_Loss = 1;
  transactions[1].Proceeds = 1;
  transactions[1].Cost_Basis = "3";
  transactions[1].Gain_Loss = -1;

  const result = updateTransactionTotals(transactions);
  expect(result[2].Proceeds).toBe(2)
  expect(result[2].Cost_Basis).toBe(-1)
  expect(result[2].Gain_Loss).toBe(0)

})

test('test updateTransactionTotals with invalid inputs', async () => {

  let transactions = addNewTransaction(createEmptyTransactions())

  transactions[0].Proceeds = "something";
  transactions[0].Cost_Basis = -4;
  transactions[0].Gain_Loss = 1;
  transactions[1].Proceeds = 1;
  transactions[1].Cost_Basis = "something else";
  transactions[1].Gain_Loss = "";

  const result = updateTransactionTotals(transactions);
  expect(result[2].Proceeds).toBe(NaN) //invalid string number + 1 is not a number
  expect(result[2].Cost_Basis).toBe(NaN) //invalid string number + -4 is not a number
  expect(result[2].Gain_Loss).toBe(1) //blank string or nothing is consider zero + 1 would be 1

})

test('test add usaTaxForm transactions from two etherscan transactions', async () => {


  let parsedTransactions = parseTransactions(ETHERSCANTESTDATA.result, OWNER);

  const expectedDescription = "ETHEREUM (ETH) 1 Units Sold with ID (Txn Hash): 0x3546ee716062f48cc68517c16640ad8dcd7a6b9df1f0091e77af47b5b9627a52"
  const purchasePrice = "1000"
  const sellPrice = "1500"
  //our test data has 1 ETH purchased and then sold 
  const expectedProceeds = 500;
  const expectedGainLoss = 498.5; //Capital Gain = Value at disposal (500) - Cost Basis(1.5) = 498.5
  const expectedCostBasis = 1.5;

  const transactionIn = addHistoricEthPriceToTransaction(parsedTransactions[0], purchasePrice);
  const transactionOut = addHistoricEthPriceToTransaction(parsedTransactions[2], sellPrice);

  const usaTaxFormTransaction = createNewTaxTransaction(transactionIn, transactionOut);
  expect(usaTaxFormTransaction.Proceeds).toBe(expectedProceeds);
  expect(usaTaxFormTransaction.Gain_Loss).toBe(expectedGainLoss);
  expect(usaTaxFormTransaction.Cost_Basis).toBe(expectedCostBasis);
  expect(usaTaxFormTransaction.Date_Acquired).toStrictEqual(new Date(transactionIn.timeStamp * 1000));
  expect(usaTaxFormTransaction.Date_Sold).toStrictEqual(new Date(transactionOut.timeStamp * 1000));
  expect(usaTaxFormTransaction.Description).toBe(expectedDescription);

})