import 'vanilla-cookieconsent'

export function setupCookieConset() {
  const cookieconsent = initCookieConsent()

  cookieconsent.run({
    autorun: true,
    current_lang: 'es',
    autoclear_cookies: true,
    page_scripts: true,
    onAccept() {
      if (cookieconsent.allowedCategory('analytics')) {
        cookieconsent.loadScript(
          'https://www.googletagmanager.com/gtag/js?id=G-146W6XF4HB',
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          () => {}
        )
      }
    },
    languages: {
      es: {
        consent_modal: {
          title: 'Uso de cookies',
          description:
            'Esta web utiliza cookies propias y de terceros para obtener datos estadísticos de navegación y ofrecer una mejor experiencia de usuario. Las últimas solo se establecerán bajo tu aceptación.',
          primary_btn: {
            text: 'Aceptar todas',
            role: 'accept_all', // 'accept_selected' or 'accept_all'
          },
          secondary_btn: {
            text: 'Configurar',
            role: 'settings', // 'settings' or 'accept_necessary'
          },
        },
        settings_modal: {
          title: 'Preferencias de cookies',
          save_settings_btn: 'Guardar',
          accept_all_btn: 'Aceptar todas',
          blocks: [
            {
              title: 'Cookies técnicas',
              description:
                'Estas cookies son necesarias para guardar tus preferencias sobre el uso de cookies.',
              toggle: {
                value: 'necessary',
                enabled: true,
                readonly: true,
              },
            },
            {
              title: 'Cookies de análisis',
              description:
                'Estas cookies sirven para analizar la procedencia del tráfico y entender cómo se interactúa con la web. Estos datos son anónimos y no se pueden utilizar para identificarte.',
              toggle: {
                value: 'analytics',
                enabled: false,
                readonly: false,
              },
            },
          ],
        },
      },
    },
  })
}
