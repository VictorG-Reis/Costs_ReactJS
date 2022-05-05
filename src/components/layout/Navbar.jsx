import {Link} from 'react-router-dom'
import Conteiner from './Conteiner'

import Logo from '../img/costs_logo.png'
import styles from './Navbar.module.css'

function Navbar(){
  return(
    <nav className={styles.navbar_container}>
      <Conteiner>
        <Link to='/'>
          <img src={Logo} alt="" />
        </Link>

        <ul className={styles.navbar_ul}>
          <li className={styles.navbar_link} > <Link to='/'>Home</Link></li>
          <li className={styles.navbar_link}><Link to='/Projects'>Projetos</Link></li>
          <li className={styles.navbar_link}> <Link to='/NewProject'>Criar Projetos</Link></li>
         

        </ul>
      </Conteiner>
    </nav>
   
    
  )
}

export default Navbar 