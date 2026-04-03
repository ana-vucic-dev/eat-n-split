import formatCurrency from './formatCurrency.js';

export default function createBillMessage({
  friendName,
  balance,
  bill,
  payer
}) {
  let balanceMessage;

  if (balance === 0) {
    balanceMessage = `You and ${friendName} are square.`;
  } else if (balance > 0) {
    balanceMessage = `${friendName} owes you ${formatCurrency(balance)} total.`;
  } else {
    balanceMessage = `You owe ${friendName} ${formatCurrency(Math.abs(balance))} total.`;
  }

  return payer === 'user'
    ? `You paid ${formatCurrency(bill)} for a meal with ${friendName}. ${balanceMessage}`
    : `${friendName} paid ${formatCurrency(bill)} for your meal. ${balanceMessage}`;
}
