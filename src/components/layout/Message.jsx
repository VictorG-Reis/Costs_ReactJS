import { useState, useEffect } from  'react'

import styles from './Message.module.css'

function Message({msg, type  }){
  const [visible, setvisible ] = useState(false)

  useEffect(() =>{
    if(!msg){
      setvisible(false)
      return
    }
    
    setvisible(true)

    const timer = setTimeout(() =>{
      setvisible(false)
    }, 3000)

    return () => clearTimeout(timer)

  }, [msg])

  return(
    <>
      {visible &&(
          <div className={`${styles.messageConteiner} ${styles[type]}`}>{msg}</div>
      )}    
    </>
  )
}

export default Message 