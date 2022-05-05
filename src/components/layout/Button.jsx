import { Link } from 'react-router-dom'

import styles from './Button.module.css'

function Button({text, to}){
  return(
    <Link className={styles.bnt_container} to={to}>{text}</Link>
  )
}

export default Button