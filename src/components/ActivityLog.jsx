import useDialog from '../hooks/useDialog.js';
import useFriendContext from '../hooks/useFriendContext.js';
import getElapsedTime from '../utils/getElapsedTime.js';
import Button from './Button';

export default function ActivityLog({ activity, clearActivity }) {
  const { updateLiveRegion } = useFriendContext();
  const { openDialog } = useDialog();

  return (
    <section
      id='activity'
      className='panel activity'
      aria-labelledby='activity-heading'>
      <header className='panel-header activity-header'>
        <h2 id='activity-heading'>Activity Overview</h2>
      </header>

      <div className='activity-wrapper'>
        <section
          className='recent-activity'
          aria-labelledby='recent-activity-heading'>
          <h3
            id='recent-activity-heading'
            aria-describedby='recent-activity-description'>
            Recent Activity
          </h3>

          {!activity.length ? (
            <p className='no-activity'>No activity yet</p>
          ) : (
            <>
              <p
                id='recent-activity-description'
                className='note'>
                <em>
                  <strong>Note:</strong> Activity shows only 50 most recent
                  events.
                </em>
              </p>

              <ul>
                {activity.map(event => (
                  <li key={event.id}>
                    <p className='activity-message'>{event.message}</p>
                    <small className='elapsed-time'>
                      {getElapsedTime(event.timestamp)}
                    </small>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>

      {activity.length ? (
        <section
          className='danger-zone'
          aria-labelledby='danger-zone-title'>
          <h3 id='danger-zone-title'>Danger Zone</h3>

          <Button
            type='button'
            className='delete-btn'
            aria-haspopup='dialog'
            disabled={!activity.length}
            onClick={e =>
              openDialog(
                {
                  id: 'activity-deletion-dialog',
                  labelId: 'activity-deletion-title',
                  className: 'confirmation-dialog',
                  title: 'Confirm Deletion',
                  content: (
                    <>
                      <p className='question'>
                        Are you sure you want to
                        <strong> delete all activity</strong>?
                      </p>
                      <p className='warning'>This action cannot be undone.</p>
                    </>
                  ),
                  confirmBtnClassName: 'delete-btn',
                  confirmText: 'Delete',
                  onConfirm: () => {
                    clearActivity();
                    updateLiveRegion('All activity cleared');
                  }
                },
                e.currentTarget
              )
            }>
            Clear activity
          </Button>
        </section>
      ) : null}
    </section>
  );
}
