export const useNativeShare = () => {
  const canUseNativeShare = 'share' in navigator

  /* istanbul ignore next */
  const share = (data?: ShareData) => {
    navigator.share(data).catch(() => {
      // noop
    })
  }

  return { canUseNativeShare, share }
}
