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

export function calculateTotal(transactionarray) {
  let total = 0;
  transactionarray.forEach(transaction => {
    total += parseFloat(transaction.valueUSD);
  })
  return total;
}

export function calculateFeeTotal(transactionarray) {
  let total = 0;
  transactionarray.forEach(transaction => {
    total += parseFloat(transaction.txn_feeUSD);
  })
  return total;
}

export function addTotalToTransactions(transactionarray){
  const feetotal = calculateFeeTotal(transactionarray);
  const valueUSD = calculateTotal(transactionarray);
  transactionarray.push({
    timeStamp: "Total",
    txn_feeUSD: feetotal,
    valueUSD: valueUSD,
  })
  return transactionarray
}

export function getTransactionDateRange(transactionarray){
  let daterange = {"start":"error","end":"error"}
  if(Array.isArray(transactionarray)){
    const timeStampArray = transactionarray.map(transaction => { return parseInt(transaction.timeStamp)});
    daterange.start = Math.min(...timeStampArray).toString();
    daterange.end = Math.max(...timeStampArray).toString();
  }
  return daterange
}

function calculateUSDValues(transaction){
  let valueUSD = fromWei(transaction.value) * transaction.historicEthPrice
  transaction.valueUSD = valueUSD.toFixed(2)
  let txn_feeUSD =  fromWei(transaction.txn_fee) * transaction.historicEthPrice
  transaction.txn_feeUSD = txn_feeUSD.toFixed(2)
  return transaction
}