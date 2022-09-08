const ua = window.navigator.userAgent

/** Is mobile device? */
export function isMobile(): boolean {
    return !! (ua.match(/Android/i) || ua.match(/webOS/i) || ua.match(/iPhone/i) || ua.match(/iPad/i) || ua.match(/iPod/i) || ua.match(/BlackBerry/i) || ua.match(/Windows Phone/i))
}
