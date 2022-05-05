import bglogo from '../img/savings.svg'

import styles from './Home.module.css'

import Button from '../layout/Button'

function Home(){
  return(
    <section className={styles.home_container}>
      <h1> Bem vindo ao <span>Costs</span> </h1>
      <p>Faça seu projeto ")</p>
      <Button text='Criar projeto' to='/NewProject'/>
      <img src={bglogo} alt="logo costs" />
    </section>
  )

}

export default Home