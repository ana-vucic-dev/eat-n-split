export default function calculateBalances(friends) {
  let owedByUser = 0;
  let owedToUser = 0;

  friends.forEach(friend => {
    if (friend.balance < 0) {
      owedByUser += Math.abs(friend.balance);
    } else if (friend.balance > 0) {
      owedToUser += friend.balance;
    }
  });

  const netBalance = owedToUser - owedByUser;

  return {
    owedByUser,
    owedToUser,
    netBalance
  };
}
