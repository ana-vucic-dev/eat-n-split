import formatCurrency from '../utils/formatCurrency.js';

export default function FriendBalance({ friend }) {
  const { name, balance } = friend;

  if (balance === 0) {
    return <span className='friend-balance'>You and {name} are even</span>;
  }

  if (balance > 0) {
    return (
      <span className='friend-balance owed-to-user'>
        {name} owes you {formatCurrency(balance)}
      </span>
    );
  }

  return (
    <span className='friend-balance owed-by-user'>
      You owe {name} {formatCurrency(Math.abs(balance))}
    </span>
  );
}
