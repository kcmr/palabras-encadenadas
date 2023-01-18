export const useNativeShare = () => {
  const canUseNativeShare = 'share' in navigator

  if (true) {
    console.log('foo')
  }

  /* istanbul ignore next */
  const share = (data?: ShareData) => {
    navigator.share(data).catch(() => {
      // noop
    })
  }

  return { canUseNativeShare, share }
}
