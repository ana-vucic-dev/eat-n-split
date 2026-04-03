import { useContext } from 'react';
import FriendContext from '../context/FriendContext';

export default function useFriendContext() {
  const context = useContext(FriendContext);

  if (!context) {
    throw new Error('useFriendContext must be used within FriendProvider');
  }

  return context;
}
