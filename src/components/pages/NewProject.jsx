import Projectform from "../project/ProjectForm"
import Message from "../layout/Message"

import styles from './NewProject.module.css'

import { useNavigate } from "react-router-dom"



function Newproject(){
  const navigate = useNavigate()

  function CreatePost(project){
    project.cost = 0 
    project.services=[]

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers:{
        'content-Type': 'application/json'
      },
      body : JSON.stringify(project)

    })
    .then((resp)=> resp.json())
    .then((dados) => {
      
      navigate('/projects', { state: {message: 'Projeto criado com sucesso!'} })
    }
    
    )
    .catch((err) => console.log(err))


  }
  return(
    <div className={styles.formProject_container}>
      <div className={styles.formTitles}>
        <h1>Crie seu novo projeto </h1>
        <p>Crie seu projeto para depois adicionar serviços</p>
      </div>
    
      <div className={styles.formProject}>
        <Projectform handleSubmit={CreatePost}  btnText='Criar projeto'/>
      </div>
    </div>
  )
}

export default Newproject