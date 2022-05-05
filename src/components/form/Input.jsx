import styles from './Input.module.css'

function Input({type, name, handleOnChange, value, placeholder, text}){
  return(
    <form className={styles.input_container}>
      <label htmlFor={name}>{text}</label> <br />
      <input type={type} name={name} onChange={handleOnChange} value={value} placeholder={placeholder} className={styles.input_box}
       />
    </form>
    
  )
}

export default Input