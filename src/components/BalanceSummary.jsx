import useFriendContext from '../hooks/useFriendContext.js';
import formatCurrency from '../utils/formatCurrency.js';

export default function BalanceSummary() {
  const { balances } = useFriendContext();
  const { owedToUser, owedByUser, netBalance } = balances;

  return (
    <section
      className='balance-summary'
      aria-labelledby='balance-summary-heading'>
      <h3 id='balance-summary-heading'>Balance Summary</h3>

      <p className='owed-by-user'>
        <strong>You owe: </strong>
        {formatCurrency(owedByUser)}
      </p>

      <p className='owed-to-user'>
        <strong>You are owed: </strong>
        {formatCurrency(owedToUser)}
      </p>

      <p>
        <strong>Net balance: </strong>
        {netBalance >= 0 ? '+' : '-'}
        {formatCurrency(netBalance)}
      </p>
    </section>
  );
}
