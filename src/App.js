/*
import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import Login from './components/Sidebar/Login'

const App = () => {
  return (
    <>
      <Sidebar/>
      <Main/>
    </>
  )
}

export default App;

*/




/*
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import Login from './components/Sidebar/Login';

const App = () => {
  return (
    <>
      <Routes>
        {/* Default route with Sidebar + Main *
        <Route
          path="/"
          element={
            <>
              <Sidebar />
              <Main />
            </>
          }
        />

        {/* Login page route *
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;

*/



import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import Login from './components/Sidebar/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<><Sidebar /><Main /></>} />
      <Route path="/login" element={<Login />} />
      {/* You can add help and activity routes too */}
    </Routes>
  );
};

export default App;


