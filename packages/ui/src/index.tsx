import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { Dashboard } from '@modules';

const rootElement = document.getElementById('root');

const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <Dashboard />
    </Provider>
  </StrictMode>,
);
