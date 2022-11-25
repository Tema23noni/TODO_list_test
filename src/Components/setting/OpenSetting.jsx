import React from 'react'
import cl from './Settings.module.scss'
const OpenSetting = ({setActive, active}) => {
  return (
    <div className={cl.bur__cont} onClick={() => setActive(!active)}>
    <div className={cl.SettingsBtn} >
        <span/>
    </div>
    </div>
  )
}

export default OpenSetting