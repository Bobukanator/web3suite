import { toBN, fromWei } from "web3-utils";

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

export function createNewTaxTransaction(transactionIn, transactionOut) {
  /**
   * This function takes two time sequential transactions and automatically calculates an entry that 
   * can be used on USA Tax Form 8949. 
   * 
   * NOTES:  
   * 
   * The Cost_Basis only considers the transaction fee when selling/transferring out the ethereum as
   * currently the SENDER is the only one who pays transaction fees. This calculation is most likely not 
   * correct because most exchanges will charge you additional fees to convert from FIAT to ethereum 
   * and will most likely charge a fee. 
   * 
   * That fee CAN be included in each transaction and users may manually modify the transaction in the UI
   * if the user has that information. If not - it is acceptable to not include that fee in the cost basis 
   * but keep in mind the user will pay a little more taxes as you won't be able to deduct that intial fee. 
   * 
   * References used: 
   * https://koinly.io/blog/deducting-crypto-trading-transfer-fees/
   * https://www.irs.gov/instructions/i8949
   * 
   * This function was last updated on January 12th 2023 and should be revisted before each new tax year. 
   */

  //For a digital asset, include the full name or an abbreviated symbol of the digital asset and the exact 
  //amount of units sold or disposed of in the transaction, and include the sale transaction ID number, if available.
  const Description = "ETHEREUM (ETH) " + fromWei(toBN(transactionOut.value)) + " Units Sold with ID (Txn Hash): " + transactionOut.hash

  const transactionBuyPrice = Number(transactionIn.historicEthPrice) * fromWei(toBN(transactionIn.value))
  //we calculate Buy Cost Basis but intentionally not using it
  const transactionBuyCostBasis = Number(transactionIn.historicEthPrice) * fromWei(toBN(transactionIn.txn_fee))

  const transactionSellPrice = Number(transactionOut.historicEthPrice) * fromWei(toBN(transactionOut.value))
  const transactionSellCostBasis = Number(transactionOut.historicEthPrice) * fromWei(toBN(transactionOut.txn_fee))

  const Proceeds = transactionSellPrice - transactionBuyPrice
  const Cost_Basis = transactionSellCostBasis
  const Gain_Loss = Proceeds - Cost_Basis



  return {
    Description,
    Proceeds,
    Gain_Loss,
    Cost_Basis,
    Date_Acquired: new Date(transactionIn.timeStamp * 1000),
    Date_Sold: new Date(transactionOut.timeStamp * 1000),
  }
}