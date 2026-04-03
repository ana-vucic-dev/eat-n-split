import createBillMessage from '../utils/createBillMessage.js';
import addActivity from '../utils/addActivity.js';

export default function friendsReducer(state, action) {
  function getFriend(id) {
    return state.friends.find(friend => friend.id === id);
  }

  switch (action.type) {
    case 'friend/add': {
      return {
        ...state,
        friends: [...state.friends, action.payload],
        activity: [
          addActivity(
            `Added ${action.payload.name} to your friend list`,
            action.payload.id
          ),
          ...state.activity
        ].slice(0, 50)
      };
    }

    case 'friend/rename': {
      const { id, name } = action.payload;

      return {
        ...state,
        friends: state.friends.map(friend =>
          friend.id === id ? { ...friend, name } : friend
        )
      };
    }

    case 'friend/delete': {
      const id = action.payload;
      const deletedFriend = state.friends.find(friend => friend.id === id);

      return {
        ...state,
        friends: state.friends.filter(friend => friend.id !== id),
        activity: deletedFriend
          ? [
              addActivity(`Deleted friend ${deletedFriend.name}`, id),
              ...state.activity
            ].slice(0, 50)
          : state.activity
      };
    }

    case 'friend/deleteAll': {
      return {
        ...state,
        friends: [],
        activity: []
      };
    }

    case 'bill/split': {
      const { participant, bill, userExpense, payer } = action.payload;

      const friendExpense = bill - userExpense;
      const value = payer === 'user' ? friendExpense : -userExpense;

      let newBalance;

      const updatedFriends = state.friends.map(friend => {
        if (friend.id !== participant.id) {
          return friend;
        }

        newBalance = friend.balance + value;
        return { ...friend, balance: newBalance };
      });

      return {
        ...state,
        friends: updatedFriends,
        activity: [
          addActivity(
            createBillMessage({
              friendName: participant.name,
              balance: newBalance,
              bill,
              payer
            }),
            participant.id
          ),
          ...state.activity
        ].slice(0, 50)
      };
    }

    case 'friend/settleUp': {
      const { id } = action.payload;
      const friend = getFriend(id);

      return {
        ...state,
        friends: state.friends.map(friend =>
          friend.id === id ? { ...friend, balance: 0 } : friend
        ),
        activity: [
          addActivity(`Settled up with ${friend.name}`, id),
          ...state.activity
        ].slice(0, 50)
      };
    }

    case 'friend/settleAll': {
      return {
        ...state,
        friends: state.friends.map(friend =>
          friend.balance === 0 ? friend : { ...friend, balance: 0 }
        ),
        activity: [
          addActivity(`Settled debts with all friends`),
          ...state.activity
        ].slice(0, 50)
      };
    }

    case 'activity/clear': {
      return {
        ...state,
        activity: []
      };
    }

    default:
      return state;
  }
}
