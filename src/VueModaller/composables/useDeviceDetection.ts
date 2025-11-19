import { ref } from 'vue'

export const useDeviceDetection = () => {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)
  
  const detectDevice = () => {
    const width = window.innerWidth
    const userAgent = navigator.userAgent
    
    // Screen size detection
    const isMobileSize = width <= 768
    const isTabletSize = width > 768 && width <= 1024
    const isDesktopSize = width > 1024
    
    // More precise mobile detection
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    const isMobileDevice = mobileRegex.test(userAgent)
    
    // Touch capability detection
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    
    // Final determination
    isMobile.value = isMobileSize || (isMobileDevice && hasTouch)
    isTablet.value = isTabletSize && !isMobile.value
    isDesktop.value = isDesktopSize && !hasTouch && !isMobileDevice
    
    // If it's not clearly desktop, default to mobile for better UX
    if (!isDesktop.value && !isTablet.value) {
      isMobile.value = true
    }
  }

  
  return {
    isMobile,
    isTablet,
    isDesktop,
    detectDevice
  }
}
