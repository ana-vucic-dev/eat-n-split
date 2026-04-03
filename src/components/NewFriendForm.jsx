import useFriendContext from '../hooks/useFriendContext.js';
import { useState, useRef } from 'react';
import sanitizeNameInput from '../utils/sanitizeNameInput.js';
import shakeInputField from '../utils/shakeInputField.js';
import isValidName from '../utils/isValidName.js';
import getAvatar from '../utils/getAvatar.js';
import Button from './Button';

export default function NewFriendForm() {
  const { addFriend, updateLiveRegion, goBack } = useFriendContext();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('female');
  const [error, setError] = useState(false);

  const nameInputRef = useRef();

  function handleNameChange(e) {
    let value = e.target.value;

    value = sanitizeNameInput(value);

    setName(value);
    setError(!value.trim());

    if (!value.trim()) {
      shakeInputField(nameInputRef.current);
    }
  }

  function handleGenderChange(e) {
    setGender(e.target.value);
  }

  function handleNewFriendCancel() {
    setError(false);
    goBack();
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!isValidName(name)) {
      setError(true);
      shakeInputField(nameInputRef.current);
      return;
    }

    setError(false);

    const id = crypto.randomUUID();
    const avatar = getAvatar(id, gender);
    const date = Date.now();

    const newFriend = {
      id,
      name,
      gender,
      avatar,
      balance: 0,
      createdAt: date
    };

    addFriend(newFriend);
    updateLiveRegion(`${name} added to your friend list`);

    setName('');
    setGender('female');
    goBack();
  }

  return (
    <section className='panel'>
      <Button
        type='button'
        className='secondary back-btn'
        onClick={handleNewFriendCancel}>
        <i
          className='bi bi-arrow-left'
          aria-hidden='true'></i>{' '}
        Back
      </Button>

      <form
        className='new-friend-form'
        onSubmit={handleSubmit}>
        <fieldset>
          <legend>New Friend</legend>

          <div className='input-container'>
            <label htmlFor='new-friend-name'>
              <span aria-hidden='true'>👫 </span>Friend Name
            </label>

            <input
              type='text'
              inputMode='text'
              id='new-friend-name'
              ref={nameInputRef}
              className={error ? 'invalid' : ''}
              aria-describedby='name-help'
              aria-invalid={error}
              aria-errormessage='name-error-message'
              value={name}
              onChange={handleNameChange}
              autoFocus
              autoComplete='off'
              required
            />

            {error && (
              <p
                id='name-error-message'
                className='error'
                role='alert'>
                Please enter a valid name.
              </p>
            )}

            <p
              id='name-help'
              className='input-requirement'>
              Name must contain 2–40 alphabetic characters and no numeric or
              special characters.
            </p>
          </div>

          <div className='input-container'>
            <label htmlFor='gender'>
              <span aria-hidden='true'>
                {gender === 'female' ? '🧍‍♀️' : '🧍‍♂️'}{' '}
              </span>
              Gender
            </label>

            <select
              id='gender'
              value={gender}
              onChange={handleGenderChange}>
              <option value='female'>Female</option>
              <option value='male'>Male</option>
            </select>
          </div>
        </fieldset>

        <Button
          type='submit'
          className='primary add'
          disabled={!name.trim() || error}>
          Add
        </Button>
      </form>
    </section>
  );
}
