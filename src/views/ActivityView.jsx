import useFriendContext from '../hooks/useFriendContext.js';
import ActivityLog from '../components/ActivityLog';

export default function ActivityView() {
  const { activity, clearActivity } = useFriendContext();

  return (
    <ActivityLog
      activity={activity}
      clearActivity={clearActivity}
    />
  );
}
