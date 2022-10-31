import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import Login from './pages/Login';
import { persistor, store } from './redux-store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <Routes>
              <Route path='*' element={<Login />} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
