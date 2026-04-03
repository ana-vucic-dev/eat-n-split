import { createContext, useState, useRef } from 'react';

const DialogContext = createContext();
export default DialogContext;

export function DialogProvider({ children }) {
  const [dialogConfig, setDialogConfig] = useState(null);
  const dialogTriggerRef = useRef(null);

  function openDialog(config, trigger) {
    dialogTriggerRef.current = trigger;
    setDialogConfig(config);
  }

  function closeDialog() {
    setDialogConfig(null);
    dialogTriggerRef.current?.focus();
  }

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, dialogConfig }}>
      {children}
    </DialogContext.Provider>
  );
}
