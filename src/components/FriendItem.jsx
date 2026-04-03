import useFriendContext from '../hooks/useFriendContext.js';
import Button from './Button';
import FriendBalance from './FriendBalance';

export default function FriendItem({ friend }) {
  const { openFriendProfile } = useFriendContext();
  const { name, avatar } = friend;

  return (
    <li className='friend-item'>
      <Button
        type='button'
        className='friend-item-btn'
        onClick={() => openFriendProfile(friend)}>
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className='avatar'
        />

        <span className='friend-name'>{name}</span>

        <FriendBalance friend={friend} />
      </Button>
    </li>
  );
}
