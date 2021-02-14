import React, {useState} from 'react'

export const SeasonTopRowSign = () => {

  const [signText, setSignText] = useState('Your team is ready to play.')

  return (
    <div className='SeasonTopRow-sign'>
      {signText}
    </div>
  )
}
