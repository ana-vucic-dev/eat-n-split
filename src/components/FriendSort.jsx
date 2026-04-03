import useFriendContext from '../hooks/useFriendContext.js';

export default function FriendSort({ sortBy, handleSortChange }) {
  const { friends } = useFriendContext();

  return (
    <fieldset className='sort'>
      <legend className='visually-hidden'>Sort your friends</legend>

      <label
        htmlFor='sorting-options'
        className='visually-hidden'>
        Select a sorting option
      </label>

      <select
        name='sorting-options'
        id='sorting-options'
        value={sortBy}
        onChange={handleSortChange}
        disabled={!friends.length}>
        <option value='name-ascending'>Sort by name (A-Z)</option>
        <option value='name-descending'>Sort by name (Z-A)</option>
        <option value='first-added'>Sort by first added</option>
        <option value='last-added'>Sort by last added</option>
        <option value='owed'>Sort by who owes you</option>
        <option value='owe'>Sort by whom you owe</option>
      </select>
    </fieldset>
  );
}
