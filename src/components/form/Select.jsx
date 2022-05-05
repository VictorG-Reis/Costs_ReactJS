import styles from './Select.module.css'

function Select({name, text, options, value, handleOnChange}){
  return(
    <div className={styles.select_container}>
      <label htmlFor={name}>{text}:</label> <br />
      <select name={name} id={name} value={value || ''} className={styles.select_box} onChange={handleOnChange}>
        <option>Escolha uma opção</option>
        {options.map((option)=>(
          <option value={option.id} key={option.id}>{option.name}</option>
        ))}
      </select>
    </div>
  )
}

export default Select