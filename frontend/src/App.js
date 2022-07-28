import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BOOKS_ROUTE, HOME_ROUTE } from './utils/const';
import Shop from './pages/Home';
import NavBar from './components/NavBar';

import BooksList from './components/BooksList';

function App() {
  return (
    <BrowserRouter className="App">
      <NavBar/>
      <Routes>
        <Route exact path={HOME_ROUTE} element={<Shop/>}/>
        <Route path={BOOKS_ROUTE} element={<BooksList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
