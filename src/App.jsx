import { FriendProvider } from './context/FriendContext';
import AppLayout from './layouts/AppLayout';

export default function App() {
  return (
    <FriendProvider>
      <AppLayout />
    </FriendProvider>
  );
}
