import { createEmptyTransactions, updateTransactionTotals, addNewTransaction } from "../utils/usaTaxUtils"

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