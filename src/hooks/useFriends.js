import { useMemo } from 'react';
import useLocalStorageState from './useLocalStorageState.js';
import friendsReducer from '../reducers/friendsReducer.js';

import calculateBalances from '../utils/calculateBalances.js';

const demoFriends = [
  {
    id: 118836,
    name: 'Clark',
    gender: 'male',
    avatar: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
    createdAt: Date.now()
  },
  {
    id: 933372,
    name: 'Sarah',
    gender: 'female',
    avatar: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
    createdAt: Date.now()
  },
  {
    id: 499476,
    name: 'Anthony',
    gender: 'male',
    avatar: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
    createdAt: Date.now()
  }
];

export default function useFriends() {
  const [state, setState] = useLocalStorageState(() => {
    const saved = localStorage.getItem('eat-n-split');

    if (!saved) {
      return {
        friends: demoFriends,
        activity: []
      };
    }

    const parsed = JSON.parse(saved);

    return {
      friends: parsed.friends?.length ? parsed.friends : demoFriends,
      activity: parsed.activity ?? []
    };
  }, 'eat-n-split');

  const { friends, activity } = state;

  const balances = useMemo(() => {
    return calculateBalances(friends);
  }, [friends]);

  function dispatch(action) {
    setState(state => friendsReducer(state, action));
  }

  function addFriend(friend) {
    dispatch({
      type: 'friend/add',
      payload: friend
    });
  }

  function renameFriend(id, name) {
    dispatch({
      type: 'friend/rename',
      payload: { id, name }
    });
  }

  function deleteFriend(id) {
    dispatch({
      type: 'friend/delete',
      payload: id
    });
  }

  function deleteAllFriends() {
    dispatch({
      type: 'friend/deleteAll'
    });
  }

  function splitBill({ participant, bill, userExpense, payer }) {
    dispatch({
      type: 'bill/split',
      payload: { participant, bill, userExpense, payer }
    });
  }

  function settleUp(id) {
    dispatch({
      type: 'friend/settleUp',
      payload: { id }
    });
  }

  function settleAll() {
    dispatch({
      type: 'friend/settleAll'
    });
  }

  function clearActivity() {
    dispatch({
      type: 'activity/clear'
    });
  }

  return {
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
  };
}
