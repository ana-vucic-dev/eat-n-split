export default function getElapsedTime(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return 'just now';

  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);

    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);

    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  const days = Math.floor(seconds / 86400);

  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;

  return new Date(timestamp).toLocaleDateString();
}
