export default function addActivity(message, friendId) {
  return {
    id: crypto.randomUUID(),
    message,
    timestamp: Date.now(),
    friendId: friendId ?? null
  };
}
