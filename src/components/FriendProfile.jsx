import useFriendContext from '../hooks/useFriendContext.js';
import useDialog from '../hooks/useDialog.js';

import Button from './Button';
import FriendBalance from './FriendBalance';
import getElapsedTime from '../utils/getElapsedTime.js';

export default function FriendProfile() {
  const {
    activity,
    selectedFriend,
    openRenameForm,
    openBillSplitForm,
    settleUp,
    deleteFriend,
    updateLiveRegion,
    goBack,
    resetView
  } = useFriendContext();

  const { openDialog } = useDialog();

  if (!selectedFriend) return null;

  const { id, name, avatar, balance } = selectedFriend;

  const friendActivity = activity.filter(event => event.friendId === id);

  return (
    <section className='panel friend-profile-view'>
      <Button
        type='button'
        className='secondary back-btn'
        onClick={goBack}>
        <i
          className='bi bi-arrow-left'
          aria-hidden='true'></i>{' '}
        Back
      </Button>

      <section
        className='friend-profile'
        aria-label={`${name}'s profile`}>
        <section
          className='friend-profile-info'
          aria-label='Personal information'>
          <figure className='profile-avatar'>
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              className='avatar'
            />
          </figure>

          <h2 className='friend-name'>{name}</h2>

          <Button
            type='button'
            className='secondary rename'
            onClick={openRenameForm}>
            <i
              className='bi bi-pencil-square'
              aria-hidden='true'></i>{' '}
            Rename
          </Button>
        </section>

        <p className='elapsed-time'>
          Added {getElapsedTime(selectedFriend.createdAt)}
        </p>

        <section
          className='friend-profile-balance'
          aria-label={`${name}'s balance`}>
          <FriendBalance friend={selectedFriend} />
        </section>

        <section
          aria-label={`Bill options with ${name}`}
          className='btn-container'>
          <Button
            type='button'
            className='primary split-bill'
            onClick={() => openBillSplitForm(id)}>
            Split bill
          </Button>

          <Button
            type='button'
            className='primary settle-up'
            aria-haspopup='dialog'
            disabled={balance === 0}
            onClick={e =>
              openDialog(
                {
                  id: 'debt-settlement-dialog',
                  labelId: 'debt-settlement-title',
                  className: 'confirmation-dialog',
                  title: 'Confirm Debt Settlement',
                  content: (
                    <>
                      <p className='question'>
                        Are you sure you want to
                        <strong> reset {name}'s balance</strong>?
                      </p>
                    </>
                  ),
                  confirmBtnClassName: 'primary confirm-btn',
                  confirmText: 'Confirm',
                  onConfirm: () => {
                    settleUp(id);
                    updateLiveRegion(`Settled up with ${name}`);
                  }
                },
                e.currentTarget
              )
            }>
            Settle up
          </Button>
        </section>

        <div className='friend-activity-wrapper'>
          <section
            className='recent-activity friend-activity'
            aria-labelledby='friend-activity-heading'>
            <h2 id='friend-activity-heading'>Recent Activity With {name}:</h2>

            {!friendActivity.length ? (
              <p className='no-activity'>No activity yet</p>
            ) : (
              <ul>
                {friendActivity.map(event => (
                  <li key={event.id}>
                    <span className='activity-message'>{event.message} </span>
                    <small className='elapsed-time'>
                      {getElapsedTime(event.timestamp)}
                    </small>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <section
          className='danger-zone'
          aria-labelledby='danger-zone-heading'>
          <h2 id='danger-zone-heading'>Danger Zone</h2>

          <Button
            type='button'
            className='delete-btn'
            aria-haspopup='dialog'
            onClick={e =>
              openDialog(
                {
                  id: 'friend-deletion-dialog',
                  labelId: 'friend-deletion-title',
                  className: 'confirmation-dialog',
                  title: 'Confirm Deletion',
                  content: (
                    <>
                      <p className='question'>
                        Delete <strong>{name}</strong> from your friend list?
                      </p>
                    </>
                  ),
                  confirmBtnClassName: 'delete-btn',
                  confirmText: 'Delete',
                  onConfirm: () => {
                    deleteFriend(id);
                    updateLiveRegion('Friend deleted');
                    resetView();
                  }
                },
                e.currentTarget
              )
            }>
            Delete friend
          </Button>
        </section>
      </section>
    </section>
  );
}
