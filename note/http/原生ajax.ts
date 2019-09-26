
interface params {
    [key: string]: any
}
function paramsStringify(params: params) {
    return Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
}
interface getOption {
    params?: params
}
function get(url: string, option: getOption = {}) {
    const xhr = new XMLHttpRequest;
    const promise = new Promise((resolve) => {
        xhr.onreadystatechange = () => { xhr.readyState === 4 && resolve(xhr) }
    });
    const search = option.params && paramsStringify(option.params)
    xhr.open('get', search ? `${url}?${search}` : url)
    xhr.send();
    return promise;
}
interface postOption {
    header?: {
        [key: string]: string;
    },
    body?: params
}
function post(url: string, option: postOption = {}) {
    const xhr = new XMLHttpRequest()
    //2.给上一步实例化出来的对象绑定监听，名为：onreadystatechange
    const promise = new Promise((resolve) => {
        xhr.onreadystatechange = () => { xhr.readyState === 4 && resolve(xhr) }
    });
    //3.指定发送请求的：方式、地址、参数
    xhr.open('post', url)
    if (option.header) {
        Object.keys(option.header).forEach(key => {
            xhr.setRequestHeader(key, option.header[key])
        })
    }
    const body = option.body ? paramsStringify(option.body) : ''
    xhr.send(body)
    return promise
}