export default function getAvatar(id, gender) {
  const group = gender === 'female' ? 'women' : 'men';

  const hash = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const index = hash % 100;

  return `https://randomuser.me/api/portraits/thumb/${group}/${index}.jpg`;
}
