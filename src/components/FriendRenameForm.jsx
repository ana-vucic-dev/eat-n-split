import useFriendContext from '../hooks/useFriendContext.js';
import { useState, useRef } from 'react';
import sanitizeNameInput from '../utils/sanitizeNameInput.js';
import shakeInputField from '../utils/shakeInputField.js';
import isValidName from '../utils/isValidName.js';
import Button from './Button';

export default function FriendRenameForm() {
  const { selectedFriend, renameFriend, updateLiveRegion, goBack } =
    useFriendContext();

  const { id, name } = selectedFriend;

  const [editName, setEditName] = useState(name);
  const [error, setError] = useState(false);

  const renameInputRef = useRef();

  function handleRenameCancel() {
    setError(false);
    setEditName(name);
    goBack();
  }

  function handleNameInputChange(e) {
    let value = e.target.value;

    value = sanitizeNameInput(value);

    setEditName(value);
    setError(!value.trim());

    if (!value.trim()) {
      shakeInputField(renameInputRef.current);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = editName.trim();

    if (!isValidName(trimmed)) {
      setError(true);
      shakeInputField(renameInputRef.current);
      return;
    }

    if (trimmed !== name) {
      setError(false);
      renameFriend(id, trimmed);
      updateLiveRegion('Friend renamed successfully');
    }

    goBack();
  }

  return (
    <section className='panel'>
      <Button
        type='button'
        className='secondary back-btn'
        onClick={goBack}>
        <i
          className='bi bi-arrow-left'
          aria-hidden='true'></i>{' '}
        Back
      </Button>

      <form
        className='friend-rename-form'
        onSubmit={handleSubmit}>
        <fieldset className='friend-name-edit'>
          <legend>Edit {editName ? `${editName}'s name` : 'name'}</legend>

          <div className='input-container'>
            <label
              htmlFor='new-name'
              className='visually-hidden'>
              New name
            </label>

            <input
              type='text'
              inputMode='text'
              id='new-name'
              ref={renameInputRef}
              className={error ? 'invalid' : ''}
              aria-describedby='rename-help'
              aria-invalid={error}
              aria-errormessage='rename-error-message'
              value={editName}
              onChange={handleNameInputChange}
              autoFocus
              autoComplete='name'
            />

            {error && (
              <p
                id='rename-error-message'
                className='error'
                role='alert'>
                Please enter a valid name.
              </p>
            )}

            <p
              id='rename-help'
              className='input-requirement'>
              Name must contain 2–40 alphabetic characters and no numeric or
              special characters.
            </p>
          </div>
        </fieldset>

        <div className='btn-container'>
          <Button
            type='button'
            className='secondary cancel-btn'
            onClick={handleRenameCancel}>
            Cancel
          </Button>

          <Button
            type='submit'
            className='primary save-btn'
            disabled={error || editName.trim() === name}>
            Save
          </Button>
        </div>
      </form>
    </section>
  );
}
