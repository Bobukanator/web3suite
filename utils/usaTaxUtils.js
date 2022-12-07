export function createEmptyTransactions() {

  let transactions = [
    {
      Description: "Description of Property",
      Date_Acquired: new Date(),
      Date_Sold: new Date(),
      Proceeds: "Proceeds",
      Cost_Basis: "Cost Basis",
      Gain_Loss: "Gain or loss",
    },
    {
      Description: "Totals",
      Proceeds: "Proceeds",
      Cost_Basis: "Cost Basis",
      Gain_Loss: "Gain or loss",
    },
  ]

  return transactions

}