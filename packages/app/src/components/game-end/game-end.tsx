import classnames from 'classnames'
import { useNativeShare } from '../../hooks/use-native-share'
import { PlayIcon, SadIcon, ShareIcon, VictoryIcon } from '../../icons'
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
  const { canUseNativeShare, share } = useNativeShare()

  const shareParams = {
    text: `¡He encadenado ${score} palabras! ¿Puedes superarlo?`,
    url: 'https://palabras-encadenadas.app',
  }

  return (
    <div className={classnames(classes.gameEnd, 'full-height')}>
      <Icon score={score} />
      <h1 className={classes.heading}>
        Has encadenado <span className={classes.lineBreak}>{score} palabras</span>
      </h1>

      {!canUseNativeShare && (
        <div className={classes.share}>
          <h2 className={classes.shareHeading}>{shareHeading}</h2>
          <Sharer {...shareParams} hashtags={['PalabrasEncadenadas']} />
        </div>
      )}

      <div className={classes.actions}>
        {canUseNativeShare && (
          <Button
            onClick={() => share(shareParams)}
            icon={<ShareIcon size={20} strokeWidth={3} aria-hidden="true" />}
            outlined
          >
            Compartir
          </Button>
        )}
        <Button
          onClick={onPlayClick}
          icon={<PlayIcon size={20} strokeWidth={3} aria-hidden="true" />}
        >
          Jugar otra
        </Button>
      </div>
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
