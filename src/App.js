
import { Provider } from 'react-redux';
import Login from './Components/login/Login';
import Signup from './Components/login/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Protected from './Components/login/Protected';
import Home from './Components/Dashboard/Home';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from './Components/Redux/store';
import Sidebar from './Components/Dashboard/Sidebar';
import { ToastContainer } from 'react-toastify';


function App() {
  let persistor=persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        
        <div className="App d-flex">
          <ToastContainer />
          <div> <Sidebar/></div>
          <div>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Protected component={Login} />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/dashboard' element={<Protected component={Home} />} />

            </Routes>
          </BrowserRouter>
          </div>
        </div>
        
      </PersistGate>
    </Provider>
  );
}

export default App;
