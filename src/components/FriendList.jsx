import FriendItem from './FriendItem';

export default function FriendList({ friends }) {
  return (
    <div className='friend-list-wrapper'>
      <ul className='friend-list'>
        {friends?.map(friend => (
          <FriendItem
            key={friend.id}
            friend={friend}
          />
        ))}
      </ul>
    </div>
  );
}
