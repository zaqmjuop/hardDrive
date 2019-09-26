interface cookie {
    [key: string]: string
}
function setCookie(state: cookie) {
    document.cookie = Object.keys(state).map(key => `${key}=${state[key]}`).join(';')
}
function getCookie() {
    const hash: cookie = {};
    document.cookie.split(';').map(item => item.split('=')).forEach(keyValue => {
        hash[keyValue[0]] = keyValue[1]
    })
    return hash;
}