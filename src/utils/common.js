export function debounce(cb, wait = 1000, immediate = false) {
    if (!cb || typeof cb !== 'function')
        throw new TypeError('cb不能为空或cb必须是一个函数')
    let timer = null
    return function () {
        if (timer) clearTimeout(timer)
        if (immediate && !timer) {
            cb.apply(this, arguments)
        }
        timer = setTimeout(() => {
            cb.apply(this, arguments)
            clearTimeout(timer)
            timer = null
        }, wait)
    }
}

export function throttle(cb, wait = 1000) {
    if (!cb && typeof cb !== 'function') {
        throw new TypeError('cb不能为空或者cb必须是funciton')
    }
    let preTimeStamp = 0
    return function () {
        const now = Date.now()
        if (now - preTimeStamp > wait) {
            preTimeStamp = now
            cb.apply(this, arguments)
        }
    }
}

/**
 * @desc 检查一个标签是否含有某个class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`))
}

/**
 * @desc 给标签添加class
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ` ${cls}`
}

/**
 * 从标签移除class
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`)
        ele.className = ele.className.replace(reg, ' ')
    }
}
