
import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DisplayUser from './components/DisplayUser';
import EditUser from './components/EditUser';
import Register from './components/Register';
import Login from './components/Login';

export const userContext = createContext();

const App = () => {
  const [users, setUsers] = useState([]);

  return (
    <BrowserRouter>
      <userContext.Provider value={{ users, setUsers }}>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<DisplayUser />} />
          <Route path='/:id' element={<EditUser />} />
        </Routes>
      </userContext.Provider>
    </BrowserRouter>
  );
};

export default App;
