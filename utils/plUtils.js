import { fromWei } from "web3-utils";

export function getIncomeTransactions(transactionarray) {
  const incomeTransactions = []
  if(Array.isArray(transactionarray))
  transactionarray.forEach(transaction => {
    if(transaction.in_out == "IN")
      incomeTransactions.push(calculateUSDValues(transaction))
  });
  return incomeTransactions;
}

export function getExpenseTransactions(transactionarray) {
  const expenseTransactions = []
  if(Array.isArray(transactionarray))
  transactionarray.forEach(transaction => {
    if(transaction.in_out == "OUT")
      expenseTransactions.push(calculateUSDValues(transaction))
  });
  return expenseTransactions;
}

export function calculateIncomeTotal(incometransactionarray) {
  let total = 0;
  incometransactionarray.forEach(transaction => {
    total += parseFloat(transaction.valueUSD);
  })
  return total;
}

function calculateUSDValues(transaction){
  let valueUSD = fromWei(transaction.value) * transaction.historicEthPrice
  transaction.valueUSD = valueUSD.toFixed(2)
  let txn_feeUSD =  fromWei(transaction.txn_fee) * transaction.historicEthPrice
  transaction.txn_feeUSD = txn_feeUSD.toFixed(2)
  return transaction
}