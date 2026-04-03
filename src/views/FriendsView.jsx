import useFriendContext from '../hooks/useFriendContext.js';

import NewFriendForm from '../components/NewFriendForm';
import FriendProfile from '../components/FriendProfile';
import FriendRenameForm from '../components/FriendRenameForm';
import BillSplitForm from '../components/BillSplitForm';
import FriendListView from './FriendListView';

export default function FriendsView() {
  const { viewMode } = useFriendContext();

  switch (viewMode) {
    case 'new':
      return <NewFriendForm />;

    case 'profile':
      return <FriendProfile />;

    case 'rename':
      return <FriendRenameForm />;

    case 'split':
      return <BillSplitForm />;

    default:
      return <FriendListView />;
  }
}
