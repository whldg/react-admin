import React from 'react'
import styles from './footer.module.css'
import Setting from 'settings'

export default ()=>{
  return (
    <div className={styles.footer}>
      {Setting.footerText}
    </div>
  )
}