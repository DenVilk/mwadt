import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store'
import RouterConfig from './navigation/RouterConfig'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={'556663052333-3j4mqbvm00blfnv2ahm1j4e1igmk91d2.apps.googleusercontent.com'}>
        <RouterConfig />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>,
)
