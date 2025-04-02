import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';

import store from './Redux/store';
import Login from './Components/login/Login';
import Signup from './Components/login/Signup';
import Protected from './Components/login/Protected';
import Home from './Components/Dashboard/Home';
import Sidebar from './Components/Dashboard/Sidebar';
import UnprotectedRoute from './Components/login/UnprotectedRotes';

function App() {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>

        <ToastContainer />
        <Routes>
          <Route element={<UnprotectedRoute/>}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
          <Route element={<Protected />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
