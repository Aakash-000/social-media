import React, { useContext } from 'react'
import { Posts } from '../../components/Posts/Posts'
import { Stories } from '../../components/Stories/Stories'
import './home.css'
import Share from '../../components/share/Share'
import { AuthContext } from '../../context/AuthContext'

export function Home() {

  const [state] = useContext(AuthContext)

  return (
    <div className='home'>
      <Stories/>
      <Share/>
      <Posts userId=""/>
    </div>
  )
}
