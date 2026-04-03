import useFriendContext from '../hooks/useFriendContext.js';
import BalanceSummary from '../components/BalanceSummary';

export default function DashboardView() {
  const { friends } = useFriendContext();

  const maxVisible = 5;
  const displayedFriends = friends.slice(0, maxVisible);
  const remainingCount = friends.length - maxVisible;

  return (
    <section
      id='dashboard'
      className='panel dashboard'
      aria-labelledby='dashboard-title'>
      <header className='panel-header dashboard-header'>
        <h2 id='dashboard-title'>Overview</h2>
      </header>

      <section
        className='dashboard-friends'
        aria-labelledby='dashboard-friends-heading'>
        <h3 id='dashboard-friends-heading'>
          Friends:
          <span className='number-of-friends'> {friends.length}</span>
        </h3>

        {friends.length ? (
          <div
            className='dashboard-avatars'
            aria-label='Friend avatars'>
            {displayedFriends.map(friend => (
              <figure key={friend.id}>
                <img
                  src={friend.avatar}
                  alt={`${friend.name}'s avatar`}
                  className='avatar'
                />
              </figure>
            ))}

            {remainingCount > 0 && (
              <div
                className='avatar-count'
                aria-label={`${remainingCount} more friends`}>
                +{remainingCount}
              </div>
            )}
          </div>
        ) : null}
      </section>

      <BalanceSummary />
    </section>
  );
}
