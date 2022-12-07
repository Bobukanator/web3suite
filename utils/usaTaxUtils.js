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

export function addNewTransaction(transactions) {

  let newtransaction = {
    Description: "Description of Property",
    Date_Acquired: new Date(),
    Date_Sold: new Date(),
    Proceeds: "Proceeds",
    Cost_Basis: "Cost Basis",
    Gain_Loss: "Gain or loss",
  }

  let totalTransaction = transactions.pop();
  transactions.push(newtransaction);
  transactions.push(totalTransaction);
  return transactions;
}

export function updateTransactionTotals(transactions) {

  let proceedsTotal = 0;
  let cost_basisTotal = 0;
  let gain_lossTotal = 0;

  //using old school for let with i as cleaner for in won't allow me to directly modify the Totals in the loop due to copy by value/ref issues
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].Description != "Totals") {
      proceedsTotal += Number(transactions[i].Proceeds);
      cost_basisTotal += Number(transactions[i].Cost_Basis);
      gain_lossTotal += Number(transactions[i].Gain_Loss);
    } else if (transactions[i].Description == "Totals") {
      transactions[i].Proceeds = proceedsTotal;
      transactions[i].Cost_Basis = cost_basisTotal;
      transactions[i].Gain_Loss = gain_lossTotal;
    }
  }
  return transactions;
}