import { createContext, useState } from 'react';
import useFriends from '../hooks/useFriends.js';

const FriendContext = createContext();
export default FriendContext;

export function FriendProvider({ children }) {
  const {
    friends,
    addFriend,
    renameFriend,
    deleteFriend,
    deleteAllFriends,
    splitBill,
    settleUp,
    settleAll,
    balances,
    activity,
    clearActivity
  } = useFriends();

  const [viewMode, setViewMode] = useState('list');
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [liveMessage, setLiveMessage] = useState('');

  const selectedFriend =
    friends.find(friend => friend.id === selectedFriendId) || null;

  function clearSelectedFriend() {
    setSelectedFriendId(null);
  }

  function openNewFriendForm() {
    setViewMode('new');
  }

  function openFriendProfile(friend) {
    setSelectedFriendId(friend.id);
    setViewMode('profile');
  }

  function openRenameForm() {
    if (!selectedFriendId) return;
    setViewMode('rename');
  }

  function openBillSplitForm() {
    if (!selectedFriendId) return;
    setViewMode('split');
  }

  function updateLiveRegion(message) {
    setLiveMessage(message);
  }

  function goBack() {
    setViewMode(prev =>
      prev === 'rename' || prev === 'split' ? 'profile' : 'list'
    );

    if (viewMode === 'profile') {
      setSelectedFriendId(null);
    }
  }

  function resetView() {
    setViewMode('list');
    clearSelectedFriend();
  }

  const value = {
    friends,
    balances,
    activity,
    selectedFriend,
    viewMode,
    liveMessage,

    openNewFriendForm,
    openFriendProfile,
    openRenameForm,
    openBillSplitForm,
    goBack,
    resetView,

    addFriend,
    renameFriend,
    deleteFriend,
    deleteAllFriends,
    splitBill,
    settleUp,
    settleAll,
    clearActivity,
    updateLiveRegion
  };

  return (
    <FriendContext.Provider value={value}>{children}</FriendContext.Provider>
  );
}
