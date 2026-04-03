import useFriendContext from '../hooks/useFriendContext.js';
import useDialog from '../hooks/useDialog.js';
import Button from './Button';

export default function BalanceReset() {
  const { friends, settleAll, updateLiveRegion } = useFriendContext();
  const { openDialog } = useDialog();

  return (
    <div className='balance-reset'>
      <Button
        type='button'
        className='primary settle-all'
        disabled={!friends.length}
        aria-haspopup='dialog'
        aria-describedby='balance-reset-description'
        onClick={e =>
          openDialog(
            {
              id: 'settle-all-dialog',
              labelId: 'settle-all-title',
              className: 'confirmation-dialog',
              title: 'Confirm Balance Reset',
              content: (
                <>
                  <p className='question'>
                    Are you sure you want to
                    <strong> settle all debts</strong>?
                  </p>
                  <p className='warning'>This action cannot be undone.</p>
                </>
              ),
              confirmBtnClassName: 'primary confirm-btn',
              confirmText: 'Confirm',
              onConfirm: () => {
                settleAll();
                updateLiveRegion('Settled debts with all friends');
              }
            },
            e.currentTarget
          )
        }>
        Settle all debts
      </Button>

      <p id='balance-reset-description'>
        <em>
          <strong>Warning: </strong>This action will reset all balances.
        </em>
      </p>
    </div>
  );
}
