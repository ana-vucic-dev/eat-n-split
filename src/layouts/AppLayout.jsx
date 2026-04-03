import useAppController from '../hooks/useAppController.js';
import useFriendContext from '../hooks/useFriendContext.js';

import Sidebar from '../components/Sidebar';
import DashboardView from '../views/DashboardView';
import FriendsView from '../views/FriendsView';
import ActivityView from '../views/ActivityView';
import ConfirmationDialog from '../components/ConfirmationDialog';
import Footer from '../components/Footer';

export default function AppLayout() {
  const app = useAppController();
  const { liveMessage } = useFriendContext();

  return (
    <div
      className='app-layout'
      aria-labelledby='main-heading'>
      <div
        aria-live='polite'
        aria-atomic='true'
        className='visually-hidden'>
        {liveMessage}
      </div>

      <div className='app-container'>
        <Sidebar
          activeTab={app.activeTab}
          setActiveTab={app.setActiveTab}
        />

        <div className='main-container'>
          <main>
            {app.activeTab === 'dashboard' && <DashboardView />}
            {app.activeTab === 'friends' && <FriendsView />}
            {app.activeTab === 'activity' && <ActivityView />}
          </main>

          <div className='main-footer'>
            <Footer />
          </div>
        </div>
      </div>

      {app.dialogConfig && (
        <ConfirmationDialog
          config={app.dialogConfig}
          closeDialog={app.closeDialog}
        />
      )}
    </div>
  );
}
