import { createEmptyTransactions } from "../utils/usaTaxUtils"

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