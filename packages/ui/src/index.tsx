import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AllFavorites, MySpecialists } from '@modules';

const rootElement = document.getElementById('root');

const root = createRoot(rootElement!);

const router = createBrowserRouter([
  {
    path: '/',
    element: <AllFavorites />,
  },
  {
    path: '/my-specialists',
    element: <MySpecialists />,
  },
]);

root.render(
  <StrictMode>
    <Provider store={store}>
      <div className="bg-bgPrimary h-full px-64 py-16 min-h-screen">
        <RouterProvider router={router} />
      </div>
    </Provider>
  </StrictMode>,
);
