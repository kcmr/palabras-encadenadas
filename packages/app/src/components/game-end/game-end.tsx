import classnames from 'classnames'
import { VictoryIcon } from '../../icons'
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
    <div>
      <p>¡Compártelo!</p>
    </div>
    <button onClick={onPlayClick}>Jugar otra</button>
  </div>
)
