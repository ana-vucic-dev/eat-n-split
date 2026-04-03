import { useEffect, useRef } from 'react';

export default function ConfirmationDialog({ config, closeDialog }) {
  const dialogRef = useRef();

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  const {
    id,
    labelId,
    className,
    title,
    content,
    confirmBtnClassName,
    confirmText = 'Confirm',
    onConfirm
  } = config;

  if (!config) return null;

  function handleConfirm() {
    onConfirm?.();
    closeDialog();
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      dialogRef.current.close();
    }
  }

  return (
    <dialog
      id={id}
      className={className}
      aria-labelledby={labelId}
      role='dialog'
      aria-modal='true'
      aria-describedby={`dialog-${id}-content`}
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={closeDialog}>
      <h1 id={labelId}>{title}</h1>

      <div
        id={`dialog-${id}-content`}
        className='dialog-content'>
        {content}
      </div>

      <div className='dialog-actions'>
        <button
          className='secondary cancel-btn'
          onClick={closeDialog}>
          Cancel
        </button>

        <button
          className={confirmBtnClassName}
          onClick={handleConfirm}>
          {confirmText}
        </button>
      </div>
    </dialog>
  );
}
