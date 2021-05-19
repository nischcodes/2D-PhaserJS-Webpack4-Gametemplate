class isMobile {
    static Android():boolean {
        return navigator.userAgent.match(/Android/i) ? true : false
    }
    static BlackBerry():boolean {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false
    }
    static iOS():boolean {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false
    }
    static iPadOS():boolean {
        return (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 0) || navigator.platform === 'iPad' ? true : false
    }
    static Opera():boolean {
        return navigator.userAgent.match(/Opera Mini/i) ? true : false
    }
    static Windows():boolean {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i) ? true : false
    }
    static any():boolean {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.iPadOS() || isMobile.Opera() || isMobile.Windows());
    }
}

export { isMobile };