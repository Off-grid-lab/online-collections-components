import MasonryWall from '@yeger/vue-masonry-wall'
import MobileDetect from 'mobile-detect'
import { defineNuxtPlugin, useRequestHeaders } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MasonryWall)

  const headers = useRequestHeaders()

  const md = import.meta.server
    ? new MobileDetect(headers['user-agent']!)
    : new MobileDetect(navigator.userAgent)

  const isMobile = md.phone() !== null || md.mobile() === 'UnknownMobile'
  const isTablet = md.tablet() !== null || md.mobile() === 'UnknownTablet'
  const isDesktop = !isMobile && !isTablet

  return {
    provide: {
      isMobile: () => isMobile,
      isTablet: () => isTablet,
      isDesktop: () => isDesktop,
      masonrySsrColumns: isMobile ? 1 : isTablet ? 2 : 3,
    },
  }
})
