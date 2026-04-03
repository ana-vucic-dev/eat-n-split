import { useEffect, useRef } from 'react';

export default function SearchForm({ searchQuery, handleSearchChange }) {
  const searchRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    function handleKey(e) {
      if (e.key === '/') {
        e.preventDefault();
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }

      if (e.key === 'Escape') {
        if (searchRef.current) {
          searchRef.current.blur();
        }
      }
    }

    window.addEventListener('keydown', handleKey);

    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <form
      role='search'
      className='friend-search-form'
      onSubmit={handleSubmit}>
      <fieldset className='friend-search-bar'>
        <legend className='visually-hidden'>Enter a friend's name</legend>
        <i
          aria-hidden='true'
          className='bi bi-search search-icon'></i>

        <label
          htmlFor='search-input'
          className='visually-hidden'>
          Search
        </label>

        <input
          type='search'
          id='search-input'
          name='q'
          placeholder='Search friends...'
          ref={searchRef}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </fieldset>
    </form>
  );
}
