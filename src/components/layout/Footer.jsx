import {FaFacebook, FaGithub, FaTwitter  } from 'react-icons/fa'

import styles from './Footer.module.css'

function Footer(){
  return(
    <footer className={styles.footer_container}>
      <ul className={styles.footer_list}>
        <li className={styles.footer_item}><FaFacebook/></li>
        <li className={styles.footer_item}><FaGithub/></li>
        <li className={styles.footer_item}><FaTwitter/></li>
      </ul>
      <p>VictorG</p>
    </footer>
  )
}

export default Footer