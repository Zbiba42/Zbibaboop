import { useEffect } from 'react'
import { motion, useAnimation, AnimationControls } from 'framer-motion'
import { useContext } from 'react'
import { HandleProfileClickContext } from '../routes/AppRoutes'
export const Profile = () => {
  const controls = useAnimation()
  const animateContext = useContext(HandleProfileClickContext)

  const AnimateFunction = async () => {
    if (animateContext?.animate === 'open') {
      await controls.start({ x: 81 })
    } else {
      await controls.start({ x: '-100%' })
    }
  }
  useEffect(() => {
    AnimateFunction()
  }, [animateContext?.animate])

  const onAnimationComplete = (e: any) => {
    console.log(e)

    if (e.x === '-100%') {
      animateContext?.setAnimate('close')
    }
  }

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={controls as AnimationControls}
      transition={{ type: 'spring', duration: 0.8 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '50%',
        height: '100vh',
        backgroundColor: 'blue',
        borderRight: '1px solid black',
      }}
      onAnimationComplete={onAnimationComplete}
    >
      Profile Content
      <button onClick={() => animateContext?.setAnimate('closing')}>
        Close
      </button>
    </motion.div>
  )
}
