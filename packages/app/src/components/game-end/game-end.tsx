import classnames from 'classnames'
import { SadIcon, VictoryIcon } from '../../icons'
import { Button } from '../button'
import { Sharer } from '../sharer'
import * as classes from './game-end.module.css'
import type { IconProps } from '../../types'

type GameEndProps = {
  score: number
  onPlayClick: () => void
}

export const GameEnd = ({ score, onPlayClick }: GameEndProps) => {
  const shareHeading = score > 0 ? '¡Compártelo!' : 'Yo que tú no lo compartiría…'

  return (
    <div className={classnames(classes.gameEnd, 'full-height')}>
      <Icon score={score} />
      <h1 className={classes.heading}>
        Has encadenado <span className={classes.lineBreak}>{score} palabras</span>
      </h1>
      <div className={classes.share}>
        <h2 className={classes.shareHeading}>{shareHeading}</h2>
        <Sharer
          url="https://palabras-encadenadas.app"
          text={`¡He encadenado ${score} palabras! ¿Puedes superarlo?`}
          hashtags={['PalabrasEncadenadas']}
        />
      </div>
      <Button onClick={onPlayClick}>Jugar otra vez</Button>
    </div>
  )
}

const Icon = ({ score }: { score: number }) => {
  const props: IconProps = {
    color: 'var(--bg-color-alert)',
    className: classes.icon,
    strokeWidth: 1.4,
  }

  if (score > 0) {
    return <VictoryIcon {...props} />
  }

  return <SadIcon {...props} />
}
