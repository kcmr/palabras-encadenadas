import classnames from 'classnames'
import { useEffect, useState } from 'react'
import { ChainIcon } from '../../icons'
import * as classes from './game-loading.module.css'

export const GameLoading = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true))
  }, [])

  const classname = classnames({
    [classes.root]: true,
    [classes.visible]: isVisible,
    'full-height': true,
  })

  return (
    <div className={classname}>
      <ChainIcon size={90} className={classes.icon} />
      <p className={classes.text}>
        <span className={classes.large}>Cargando</span> diccionario…{' '}
      </p>
    </div>
  )
}
