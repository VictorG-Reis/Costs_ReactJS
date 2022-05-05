import { useLocation } from "react-router"
import { useEffect, useState } from 'react'

import Button from '../layout/Button'
import Message from "../layout/Message"
import Conteiner from '../layout/Conteiner'
import ProjectCard from "../project/ProjectCard"
import Loading from "../layout/Loading"

import styles from './Projects.module.css'


function Projects(){
  const [Projects, setProjects] = useState([])
  const [RemoveLoading, setRemoveLoading] = useState(false)
  const [MessageProject, setMessageProject] = useState('')
  const location = useLocation()
  let message = ''
  if(location.state){
    message= location.state.message
  }

  useEffect(()=>{
   setTimeout(()=>{
    fetch('http://localhost:5000/projects',{
      method: 'GET',
      headers:{
       'Content-Type': 'application/json',
      },
    })
    .then((resp) => resp.json())
    .then((data) => {
      setProjects(data)
      setRemoveLoading(true)
    })
    .catch((err)=> console.log(err))
   },1000)
  }, [])


  function RemoveProject(id){
    fetch(`http://localhost:5000/projects/${id}`,{
      method: 'DELETE',
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then((resp)=> resp.json())
    .then((data) => {
      setProjects(Projects.filter((project)=> project.id !== id))
      setMessageProject('Projeto deletado com sucesso')
      
    })
    .catch((err)=> console.log(err))
 
  }

 

  return(
    <div className={styles.projects_container}>
      <div className={styles.projects_title}>
        <h1>Meus Projetos </h1>
        <Button to='/NewProject' text='Criar projeto' />
      </div>
      <Conteiner customClass='start'>
      {MessageProject && <Message msg={MessageProject} type='success'/>}
        {Projects.length > 0 &&
          Projects.map((project) =>(
            <ProjectCard text={project.text}
            budget={project.budget}
            category={project.category.name}
            key={project.id}
            id={project.id}
            name={project.name}
            handleRemove={RemoveProject}/>
          ))
        }
        {!RemoveLoading && <Loading/> }
        {RemoveLoading && Projects == 0 &&(
          <p>Não há projetos cadastrados ;(</p>

        )}
      </Conteiner>
     
     

    </div>
  )
}

export default Projects