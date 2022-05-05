import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { parse, v4 as uuidv4 } from 'uuid'

import Conteiner from '../layout/Conteiner'
import Loading from '../layout/Loading'
import Projectform from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

import styles from './Project.module.css'


function Project(){
  const {id} = useParams()
  const [EditProject, setEditProject] = useState([])
  const [Services, setServices] = useState([])
  const [ShowProjectForm, setShowProjectForm] = useState(false)
  const [ShowServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [TypeMessage, setTypeMessage] = useState()
 
 

  useEffect(()=>{
   setTimeout(()=>{
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then((resp)=> resp.json())
    .then((data)=>{
      setEditProject(data)
      setServices(data.services)
    })
    .catch((err) => console.log(err))
   },500)

  }, [id])
 

  function createService(project){
    setMessage('')


    const lastService = project.services[project.services.length - 1]

    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost
    
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)


    
    if(newCost > parseFloat(project.budget)){
      // parei aqui no minuto 13:16 do 34# add msg e typemsg 
      setMessage(`O valor do serviço está acima do orçamento `)
      setTypeMessage('error')
      project.services.pop()
      return false

    }

    project.cost = newCost


    fetch(`http://localhost:5000/projects/${project.id}`, {
      method :'PATCH',
      headers:{ 'Content-Type':'application/json'},
      body: JSON.stringify(project)
    })
    .then((resp)=> resp.json())
    .then((data) =>{
      //exibir os serviço
      console.log(data)
      setMessage('serviço adicionado com sucesso!')
      setTypeMessage('success')
      if(ShowServiceForm ){
        setShowServiceForm(false)
      }
    })
    .catch((err)=> console.log(err))

  }

  function RemoveService(id, cost){
    const servicesUpdate = EditProject.services.filter((Service) => Service.id !== id)

    const projectUpdate = EditProject

    projectUpdate.services = servicesUpdate
    projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
      method: 'PATCH', 
      headers: {'Content-Type': 'application.json'},
      body: JSON.stringify(projectUpdate)
    }).then((resp) => resp.json())
    .then((data)=>{
      setEditProject(projectUpdate)
      setServices(servicesUpdate)
      setMessage('Serviço removido com sucesso!')
      setTypeMessage('success')
    })
    .catch((err) => console.log(err))
  }

  function toggleProjectForm(){
    setShowProjectForm(!ShowProjectForm)
  }
  
  function toggleServiceForm(){
    setShowServiceForm(!ShowServiceForm)
  }

  function EditPost(Project){
    setMessage('')

    

    fetch(` http://localhost:5000/projects/${EditProject.id}`, {
      method: 'PATCH',
      headers:{ 'Content-Type' : 'Application/json'},
      body: JSON.stringify(Project)
    })
    .then((resp)=> resp.json())
    .then((data)=>{
      setEditProject(data)
      setShowProjectForm(false)
      setMessage('Projeto atualizado com sucesso!')
      setTypeMessage('success')
    })
    
    .catch((err)=> console.log(err))
  }
  return(
  <>
    {EditProject.text ? (
      <div className={styles.ProjectInfo_Container}>
        <Conteiner custonClass='column'/>
        {Message && <Message msg={message} type={TypeMessage}/>}
         <div className={styles.info_Conteiner}>
            <div className={styles.resolve}>
              <h1>Projeto: {EditProject.text}</h1>
                <button className={styles.btn} onClick={toggleProjectForm}>
                  {!ShowProjectForm? 'Editar projeto':
                  'Fechar'
                  }
                </button>
            </div>
              {!ShowProjectForm? (
                <div className={styles.info_Conteiner} >
                  <p><span>Categoria do Projeto: </span>
                    {EditProject.category.name} </p>
                  <p><span>Valor total do projeto: </span>R${EditProject.budget}</p>
                  <p><span>Valor utilizado no projeto: </span>R${EditProject.cost}</p>
                </div>
                ):(
                  <div className={styles.info_Conteiner}>
                    <Projectform handleSubmit={EditPost} btnText='Editar Projeto'  projectData={Project}/>
                  </div>
                )}
          </div>
          <div className={styles.info_Conteiner}>
            <div className={styles.resolve}>
              <h2>Adicionar serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!ShowServiceForm ? 'Adicionar serviço' : 'Fechar'}
              </button>
            </div>
            <div className={styles.info_Conteiner}>
              {ShowServiceForm&&(
                <div>
                  <ServiceForm btnText='Adicione serviço' projectData={EditProject} handleSubmit={createService}/>
                </div>
              )}
            </div>
          </div>
              <h2>Serviços</h2>
            <Conteiner custonClass='start'>
            {Services.length > 0 && 
              Services.map((service)=> (
              <ServiceCard 
              name = {service.name}
              cost ={service.cost}
              description={service.description}
              id={service.id}
              key={service.id}
              handleRemove={RemoveService}
              />   
              
              ))
            }
            {Services.length ===0 && <p>Não há serviços cadastrados  </p>}
            </Conteiner>
          
        <Conteiner/>
      </div>
    ):(
      <Loading/>
    )}
  
  </>
  )
}

export default Project

