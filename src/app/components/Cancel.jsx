import React from 'react'
import {ReactSVG} from 'react-svg'

export const Cancel = () => {
  return (
    <div>
      <p>Cancel</p>
      <ReactSVG style={{cursor: 'pointer'}} onClick={handleCancel} src={cancelBig}/>
    </div>
  )
}
