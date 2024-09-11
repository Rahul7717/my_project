
'use client'
import { Provider } from 'react-redux';
import store from '../app/store/store';

export default function Layout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </Provider>
  );
}

