import useFriendContext from '../hooks/useFriendContext.js';
import { useState, useRef } from 'react';
import parseLocaleNumber from '../utils/parseLocaleNumber.js';
import shakeInputField from '../utils/shakeInputField.js';
import Button from './Button';

export default function BillSplitForm() {
  const { selectedFriend, splitBill, updateLiveRegion, goBack } =
    useFriendContext();

  const { id, name } = selectedFriend;

  const [billInput, setBillInput] = useState('');
  const [userExpenseInput, setUserExpenseInput] = useState('');
  const [payer, setPayer] = useState('user');

  const [errors, setErrors] = useState({
    bill: false,
    userExpense: false
  });

  const billRef = useRef();
  const userExpenseRef = useRef();

  const bill = parseLocaleNumber(billInput);
  const userExpense = parseLocaleNumber(userExpenseInput);

  const friendExpense = bill ? Number((bill - userExpense).toFixed(2)) : 0;

  const isBillEmpty = !billInput.trim();
  const isExpenseEmpty = !userExpenseInput.trim();

  const isBillInvalid = bill <= 0;
  const isExpenseInvalid = userExpense <= 0;

  const hasErrors =
    isBillEmpty || isExpenseEmpty || isBillInvalid || isExpenseInvalid;

  const isExpenseUntouched = errors.userExpense === false;

  function handleBillChange(e) {
    const value = e.target.value;

    if (/^\d*[.,]?\d*$/.test(value)) {
      setBillInput(value);

      const newBill = parseLocaleNumber(value);
      const currentExpense = parseLocaleNumber(userExpenseInput);

      if (currentExpense >= newBill) {
        setUserExpenseInput(String(newBill));
      } else {
        setUserExpenseInput(value);
      }

      setErrors(prev => ({
        ...prev,
        bill: newBill <= 0,
        userExpense: !isExpenseUntouched && currentExpense <= 0
      }));

      if (newBill <= 0 || (!isExpenseUntouched && currentExpense <= 0)) {
        shakeInputField(billRef.current);
      }
    }
  }

  function handleExpenseChange(e) {
    const value = e.target.value;

    if (/^\d*[.,]?\d*$/.test(value)) {
      const expense = parseLocaleNumber(value);

      if (expense >= bill) {
        setUserExpenseInput(String(bill));
      } else {
        setUserExpenseInput(value);
      }

      setErrors(prev => ({
        ...prev,
        userExpense: expense <= 0
      }));

      if (expense <= 0) {
        shakeInputField(userExpenseRef.current);
      }
    }
  }

  function handlePayerChange(e) {
    setPayer(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (hasErrors) {
      setErrors(prev => ({
        ...prev,
        bill: isBillEmpty || isBillInvalid,
        userExpense: isExpenseEmpty || isExpenseInvalid
      }));

      return;
    }

    splitBill({
      participant: selectedFriend,
      bill,
      userExpense,
      payer
    });

    updateLiveRegion(`Bill split with ${name}`);
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
        className='bill-split-form'
        onSubmit={handleSubmit}>
        <fieldset>
          <legend>Split a Bill With {name}</legend>

          <div className='input-container'>
            <label htmlFor={`bill-${id}`}>
              <span aria-hidden='true'>💰 </span>Bill value
            </label>

            <input
              type='text'
              id={`bill-${id}`}
              ref={billRef}
              placeholder='0'
              className={errors.bill ? 'invalid' : ''}
              aria-invalid={errors.bill}
              aria-describedby='bill-error-message'
              value={billInput}
              onChange={handleBillChange}
              autoFocus
              required
            />

            {errors.bill && (
              <p
                id='bill-error-message'
                className='error'
                role='alert'>
                Enter a valid bill amount.
              </p>
            )}
          </div>

          <div className='input-container'>
            <label htmlFor={`user-expense-${id}`}>
              <span aria-hidden='true'>🧍 </span>Your expense
            </label>

            <input
              type='text'
              id={`user-expense-${id}`}
              ref={userExpenseRef}
              placeholder='0'
              className={errors.userExpense ? 'invalid' : ''}
              aria-invalid={errors.userExpense}
              aria-describedby='expense-error-message'
              value={userExpenseInput}
              onChange={handleExpenseChange}
              required
            />

            {errors.userExpense && (
              <p
                id='expense-error-message'
                className='error'
                role='alert'>
                Your expense must be greater than 0 and not exceed the bill.
              </p>
            )}
          </div>

          <div className='input-container'>
            <label htmlFor={`friend-expense-${id}`}>
              <span aria-hidden='true'>👫 </span>
              {name}'s expense
            </label>

            <input
              type='text'
              id={`friend-expense-${id}`}
              value={friendExpense}
              readOnly
            />
          </div>

          <div className='input-container'>
            <label htmlFor={`payer-${id}`}>Who is paying the bill?</label>

            <select
              id={`payer-${id}`}
              value={payer}
              onChange={handlePayerChange}>
              <option value='user'>You</option>
              <option value='friend'>{name}</option>
            </select>
          </div>
        </fieldset>

        <Button
          type='submit'
          className='primary split-bill'
          disabled={hasErrors || errors.bill || errors.userExpense}>
          Split bill
        </Button>
      </form>
    </section>
  );
}
