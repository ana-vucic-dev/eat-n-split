import useFriendContext from '../hooks/useFriendContext.js';
import useAppController from '../hooks/useAppController.js';
import useDialog from '../hooks/useDialog.js';

import Button from '../components/Button';
import BalanceReset from '../components/BalanceReset';
import FriendSort from '../components/FriendSort';
import SearchForm from '../components/SearchForm';
import FriendList from '../components/FriendList';

export default function FriendListView() {
  const app = useAppController();

  const {
    friends,
    openNewFriendForm,
    deleteAllFriends,
    updateLiveRegion,
    resetView
  } = useFriendContext();

  const { openDialog } = useDialog();

  return (
    <section
      id='friends'
      className='panel friends-view'
      aria-label='Eat and Split friends'>
      <div className='panel-header friends-view-header'>
        <Button
          type='button'
          className='primary add-friend'
          onClick={openNewFriendForm}>
          Add friend
        </Button>

        <BalanceReset />
      </div>

      <div className='filters'>
        <FriendSort
          sortBy={app.sortBy}
          handleSortChange={app.handleSortChange}
        />

        <SearchForm
          searchQuery={app.searchQuery}
          handleSearchChange={app.handleSearchChange}
        />
      </div>

      <div className='friends'>
        {!friends.length ? (
          <p className='no-friends-box'>Start adding friends to your list</p>
        ) : !app.filteredFriends.length ? (
          <p className='no-results'>
            No match for <strong>"{app.searchQuery}"</strong>
          </p>
        ) : (
          <>
            <FriendList friends={app.sortedFriends} />

            <section
              className='danger-zone'
              aria-labelledby='danger-zone-header'>
              <h2 id='danger-zone-header'>Danger Zone</h2>

              <Button
                type='button'
                className='delete-btn'
                aria-haspopup='dialog'
                onClick={e =>
                  openDialog(
                    {
                      id: 'all-friends-deletion-dialog',
                      labelId: 'all-friends-deletion-title',
                      className: 'confirmation-dialog',
                      title: 'Confirm Deletion',
                      content: (
                        <>
                          <p className='question'>
                            Are you sure you want to
                            <strong> delete all friends</strong>?
                          </p>
                          <p className='warning'>
                            This action will also clear all activity and cannot
                            be undone.
                          </p>
                        </>
                      ),
                      confirmBtnClassName: 'delete-btn',
                      confirmText: 'Delete',
                      onConfirm: () => {
                        deleteAllFriends();
                        updateLiveRegion('All friends deleted');
                        resetView();
                      }
                    },
                    e.currentTarget
                  )
                }>
                Delete all friends
              </Button>
            </section>
          </>
        )}
      </div>
    </section>
  );
}
