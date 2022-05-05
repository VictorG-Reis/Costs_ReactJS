import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';

import Projects from './components/pages/Projects';
import Newproject from './components/pages/NewProject';
import Conteiner from './components/layout/Conteiner';
import Footer from './components/layout/Footer';
import Project from './components/pages/Project';

import './App.css';

function App() {
  return (
   <Router>
      <Navbar/>

      <Conteiner customClass='min-height'>
        <Routes>
          <Route exact path='/' element={<Home/>}> </Route>
          <Route path='/Projects' element={<Projects/>}> </Route>
          <Route path='/NewProject' element={<Newproject/>}> </Route>

          <Route path='/Project/:id' element={<Project/>}> </Route>
        </Routes>
      </Conteiner>
      <Footer/>

    </Router>

  );
}

export default App;
