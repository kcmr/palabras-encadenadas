import { useState } from 'react'
import { InfoIcon } from '../../icons'
import { Button } from '../button'
import { Dialog } from '../dialog'
import * as classes from './game-info.module.css'

export const GameInfo = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Button
        className={classes.button}
        aria-label="Información sobre el juego"
        transparent
        onClick={() => setModalOpen(true)}
        icon={<InfoIcon size={20} aria-hidden="true" />}
      />

      <Dialog
        header={<h1 className={classes.dialogHeading}>Acerca del juego</h1>}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div className={classes.dialogContent}>
          <details>
            <summary>¿Cómo funciona?</summary>
            <p>
              El objetivo es encadenar el mayor número de palabras sin repetir. Ejemplo:
              mon
              <b>ja</b>-<b>jamón</b>-<b>mon</b>te…
            </p>
            <p>
              Para ello dispones de <strong>10 segundos por palabra</strong> que empiezan
              a contar en el momento en que empiezas a escribir en el campo de texto.
            </p>
            <p>
              En la esquina superior derecha verás el tiempo restante. A medida que el
              tiempo se agote, el color de fondo irá cambiando para alertarte (y meterte
              un poco de presión). El juego termina cuando se te acaba el tiempo.
            </p>
          </details>

          <details>
            <summary>¿Qué palabras son válidas?</summary>
            <p>
              Puedes usar{' '}
              <strong>
                nombres, adjetivos en femenino y masculino y verbos en infinitivo
              </strong>
              . No son válidos los plurales, nombres propios, topónimos, preposiciones,
              artículos, pronombres, abreviaturas, aumentativos, diminutivos, adverbios y
              contracciones.
            </p>
            <p>
              También puedes usar <strong>eñes, tildes y diéresis</strong> pero no son
              necesarias (el juego las ignora). Si tu conciencia te lo permite, evítalas
              para ganar tiempo.
            </p>
            <p>
              <strong>Aviso:</strong> nada es perfecto y mucho menos este juego, así que
              verás ciertas inconsistencias, como palabras que no existen y deberían,
              topónimos que sí son válidos, etc.
            </p>
          </details>

          <details>
            <summary>¿Quién hace esto?</summary>
            <p>
              Kus Cámara. Puedes encontrarme en{' '}
              <a
                href="https://www.linkedin.com/in/kuscamara/"
                target="_blank"
                rel="noreferrer"
              >
                Linkedin
              </a>{' '}
              o{' '}
              <a href="https://github.com/kcmr" target="_blank" rel="noreferrer">
                Github
              </a>
              .
            </p>
            <p>
              Este juego es un proyecto personal hecho en mi tiempo libre. Si te gusta
              muchísimo y me lo quieres agradecer de alguna manera, me puedes{' '}
              <a
                href="https://www.buymeacoffee.com/kuscamara"
                target="_blank"
                rel="noreferrer"
              >
                pagar un café
              </a>{' '}
              😊 (bebo mucho).
            </p>
          </details>
        </div>
      </Dialog>
    </>
  )
}
