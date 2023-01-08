import classnames from 'classnames'
import { VictoryIcon } from '../../icons'
import { Button } from '../button'
import { Sharer } from '../sharer'
import * as classes from './game-end.module.css'

type GameEndProps = {
  score: number
  onPlayClick: () => void
}

export const GameEnd = ({ score, onPlayClick }: GameEndProps) => (
  <div className={classnames(classes.gameEnd, 'full-height')}>
    <VictoryIcon
      color="var(--bg-color-alert)"
      className={classes.icon}
      strokeWidth={1.4}
    />
    <h1 className={classes.heading}>
      Has encadenado <span className={classes.lineBreak}>{score} palabras</span>
    </h1>
    <div className={classes.share}>
      <Sharer
        url="https://palabras-encadenadas.app"
        text={`¡He encadenado ${score} palabras! ¿Puedes superarlo?`}
        hashtags={['PalabrasEncadenadas']}
      />
    </div>
    <Button onClick={onPlayClick}>Jugar otra vez</Button>
  </div>
)
