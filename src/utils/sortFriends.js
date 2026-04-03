const sortStrategies = Object.freeze({
  'name-ascending': (a, b) => a.name.localeCompare(b.name),
  'name-descending': (a, b) => b.name.localeCompare(a.name),
  'first-added': (a, b) => a.createdAt - b.createdAt,
  'last-added': (a, b) => b.createdAt - a.createdAt,
  owed: (a, b) => b.balance - a.balance,
  owe: (a, b) => a.balance - b.balance
});

export default function sortFriends(friends, sortBy) {
  const sorted = [...friends];
  const strategy = sortStrategies[sortBy];

  if (strategy) {
    sorted.sort(strategy);
  }

  return sorted;
}
