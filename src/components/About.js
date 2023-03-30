import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../context/noteContext'

const About = () => {
  const tmp = useContext(noteContext);
  useEffect(() => {
    tmp.update()
  }, [])
  return (
    <>
      This demonstrates {tmp.state.name}, and the class is {tmp.state.class}.
    </>
  )
}

export default About
