import { useState, useEffect } from  'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './ProjectForm.module.css'

function Projectform({handleSubmit , btnText, projectData}){
  const [categories, setcategories] = useState([]) 
  const [projects, setprojects] = useState({projectData})

  useEffect(()=>{
    fetch('http://localhost:5000/categories',{
    method: 'GET',
    headers:{'Content-Type': 'application/json'}
  })
  .then((resp) => resp.json())
  .then((dados) => setcategories(dados))
  .catch((err) => console.log(err))
  },[])

  const submit = (e) =>{
    e.preventDefault()
    handleSubmit(projects)
   
  }

  function handleChange(e){
    setprojects({...projects, [e.target.name] : e.target.value}) 
  }

  function handleSelect(e){
    setprojects({...projects, category: {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text
    },
    })
  }
 


  return(
    <>
    <form onSubmit={submit} className={styles.form_container}>
        
      <>
        <Input type='text' name='text' placeholder='Insira o nome do projeto' text='Nome do projeto: ' handleOnChange={handleChange} 
        value={projects.name} />

        <Input type='number' name='budget' placeholder='Insira o valor do projeto' text='valor do projeto: ' handleOnChange={handleChange} 
        value={projects.budget? projects.budget:''}/>
        
        <Select name='category_id' text='Selecione uma opção' options={categories} handleOnChange={handleSelect} value={projects.category? projects.category.id : ''}/>

        <SubmitButton text={btnText}/>
      </>
    </form>
    </>
  )
}

export default Projectform