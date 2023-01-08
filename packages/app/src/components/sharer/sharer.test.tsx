import { render, screen } from '@testing-library/react'
import { Sharer } from './sharer'

const networks = ['facebook', 'twitter', 'whatsapp']

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

describe('Sharer', () => {
  it('shows the expected buttons for sharing content', () => {
    render(<Sharer url="any" text="whatever" />)

    networks.forEach((network) => {
      screen.getByRole('link', {
        name: `Compartir en ${capitalize(network)}`,
      })
    })
  })

  it('twitter link has the correct format', () => {
    render(<Sharer url="any" text="encode this text!" hashtags={['uno', 'dos']} />)

    expect(screen.getByRole('link', { name: /twitter/i })).toHaveAttribute(
      'href',
      'https://twitter.com/intent/tweet?url=any&text=encode%20this%20text!&hashtags=uno,dos'
    )
  })

  it('facebook link has the correct format', () => {
    render(<Sharer url="any" text="" />)

    expect(screen.getByRole('link', { name: /facebook/i })).toHaveAttribute(
      'href',
      'https://www.facebook.com/sharer.php?u=any'
    )
  })

  it('whatsapp link has the correct format', () => {
    render(<Sharer url="any" text="encode this text!" />)

    expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute(
      'href',
      'whatsapp://send?text=encode%20this%20text!%20any'
    )
  })
})
