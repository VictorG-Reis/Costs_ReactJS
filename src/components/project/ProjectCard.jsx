import {FaPen, FaTrash} from 'react-icons/fa'
import { Link } from 'react-router-dom'

import styles from './ProjectCard.module.css'


function ProjectCard({text,budget, category, id, name ,handleRemove}){

  const Remove = (e)=>{
    e.preventDefault()
    handleRemove(id)
  }
  
  return(
    <div className={styles.project_card}>
      <h4>{text}</h4>
      <p>
        <span>Orçamento:</span> R${budget}  
      </p>  
      <p className={styles.category_text}>
        <span className={`${styles[category.toLowerCase()]}`}></span> {category}
      </p>
      <div className={styles.bntsCards}>
        <Link to={`/Project/${id}`} > <FaPen/> Editar</Link>
        <button onClick={Remove}><FaTrash/> Remover</button>

      </div>
    </div>
  )
}

export default ProjectCard