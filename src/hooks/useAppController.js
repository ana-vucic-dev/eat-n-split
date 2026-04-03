import { useState, useMemo } from 'react';
import useFriendContext from './useFriendContext.js';
import useDialog from './useDialog.js';
import sortFriends from '../utils/sortFriends.js';

export default function useAppController() {
  const { dialogConfig, closeDialog } = useDialog();
  const { friends } = useFriendContext();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sortBy, setSortBy] = useState('first-added');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFriends = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return friends.filter(friend => friend.name.toLowerCase().includes(query));
  }, [friends, searchQuery]);

  const sortedFriends = useMemo(() => {
    return sortFriends(filteredFriends, sortBy);
  }, [filteredFriends, sortBy]);

  function handleSortChange(e) {
    setSortBy(e.target.value);
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  return {
    dialogConfig,
    activeTab,
    sortBy,
    searchQuery,

    sortedFriends,
    filteredFriends,

    setActiveTab,
    handleSortChange,
    handleSearchChange,
    closeDialog
  };
}
