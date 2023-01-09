import { FacebookIcon, TwitterIcon, WhatsappIcon } from '../../icons'
import { isMobile } from '../../utils/is-mobile'
import * as classes from './sharer.module.css'

type SharerProps = {
  url: string
  text: string
  hashtags?: string[]
}

export const Sharer = ({ url, text, hashtags = [] }: SharerProps) => {
  const shareURL = getShareURL({ url, text, hashtags })

  return (
    <>
      <h2 className={classes.heading}>¡Compártelo!</h2>
      <ul className={classes.list}>
        <li>
          <a href={shareURL('facebook')} target="_blank" rel="noreferrer">
            <FacebookIcon
              size={46}
              className={classes.icon}
              aria-label="Compartir en Facebook"
            />
          </a>
        </li>
        <li>
          <a href={shareURL('twitter')} target="_blank" rel="noreferrer">
            <TwitterIcon
              size={46}
              className={classes.icon}
              aria-label="Compartir en Twitter"
            />
          </a>
        </li>
        <li>
          <a href={shareURL('whatsapp')} target="_blank" rel="noreferrer">
            <WhatsappIcon
              size={46}
              className={classes.icon}
              aria-label="Compartir en Whatsapp"
            />
          </a>
        </li>
      </ul>
    </>
  )
}

type ShareType = 'twitter' | 'facebook' | 'whatsapp'

const getShareURL =
  ({ url, text, hashtags }: SharerProps) =>
  (type: ShareType) => {
    if (type === 'twitter') {
      return `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(
        text
      )}&hashtags=${hashtags?.join(',')}`
    }

    if (type === 'facebook') {
      return `https://www.facebook.com/sharer.php?u=${url}`
    }

    if (isMobile()) {
      return `whatsapp://send?text=${encodeURIComponent([text, url].join(' '))}`
    }

    return `https://web.whatsapp.com/send?text=${encodeURIComponent(
      [text, url].join(' ')
    )}`
  }
