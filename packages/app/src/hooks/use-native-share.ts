export const useNativeShare = () => {
  const canUseNativeShare = 'share' in navigator

  /* istanbul ignore next */
  const share = (data?: ShareData) => {
    try {
      navigator.share(data)
    } catch (e) {}
  }

  return { canUseNativeShare, share }
}
