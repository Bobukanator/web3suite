import {getIncomeTransactions,getExpenseTransactions,calculateIncomeTotal} from "../utils/plUtils"

var fs = require('fs');
const PLTESTDATA = JSON.parse(fs.readFileSync('test/pltestdata.json', 'utf8'));

test('test getIncomeTransactions', async () => {

  const result = getIncomeTransactions(PLTESTDATA)
  expect(result.length).toBe(2)
  expect(result[0].in_out).toBe("IN")
  expect(result[1].in_out).toBe("IN")
  expect(result[0].valueUSD).toBe("186.90")
  expect(result[1].valueUSD).toBe("9.06")
  expect(result[0].txn_feeUSD).toBe("0.62")
  expect(result[1].txn_feeUSD).toBe("0.61")
})

test('test getIncomeTransactions', async () => {

  const result = getExpenseTransactions(PLTESTDATA)
  expect(result.length).toBe(8)
  expect(result[0].in_out).toBe("OUT")
  expect(result[1].in_out).toBe("OUT")
  expect(result[0].valueUSD).toBe("87.00")
  expect(result[1].valueUSD).toBe("38.40")
  expect(result[0].txn_feeUSD).toBe("2.87")
  expect(result[1].txn_feeUSD).toBe("2.72")
})

test('test calculateIncomeTotal', async () => {

  expect(calculateIncomeTotal(getIncomeTransactions(PLTESTDATA))).toBe(195.96);

})
