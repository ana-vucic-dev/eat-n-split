import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { DialogProvider } from './context/DialogContext.jsx';

import './styles/layout.css';
import './styles/dashboard-activity.css';
import './styles/friends.css';
import './styles/buttons.css';
import './styles/forms.css';
import './styles/dialog.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <DialogProvider>
        <App />
      </DialogProvider>
    </ThemeProvider>
  </StrictMode>
);
