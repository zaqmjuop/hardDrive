
document.addEventListener('DOMContentLoaded', () => {
    const app: HTMLElement = document.querySelector('#app')
    const swiper: HTMLElement = app.querySelector('.swiper')
    const wraper: HTMLElement = swiper.querySelector('.wraper')
    const wraperItems: NodeListOf<HTMLLIElement> = wraper.querySelectorAll('.wraper-item')

    const sdata = {
        height: swiper.offsetHeight,
        width: swiper.offsetWidth,
        current: 0,
        change: { x: 0, y: 0 },
        status: 0,
    }
    let start: Touch | undefined = undefined;
    let moving: Touch | undefined = undefined;
    let end: Touch | undefined = undefined;
    const setState = (data: { [p: string]: any }) => {
        for (const key in data) {
            if (!sdata.hasOwnProperty(key) || typeof sdata[key] !== typeof data[key]) {
                throw new TypeError(`键${key}不存在或类型错误`)
            }
        }
        if (data.current) {
            data.current = Math.min(Math.max(0, data.current), wraperItems.length - 1)
        }
        Object.assign(sdata, data)
        render()
    }

    swiper.addEventListener('touchstart', (event: TouchEvent) => {
        start = event.targetTouches[0]
        setState({ status: 0 })
    })
    swiper.addEventListener('touchmove', (event: TouchEvent) => {
        moving = event.targetTouches[0]
        if (start) {
            const change = { x: moving.clientX - start.clientX, y: moving.clientY - start.clientY }
            if ((sdata.current === 0 && change.x > 0) || (sdata.current === wraperItems.length - 1 && change.x < 0)) {
                change.x = change.x / 4
            }
            setState({ change, status: 1 })
        }
    })
    swiper.addEventListener('touchend', (event: TouchEvent) => {
        end = event.changedTouches[0]
        if (start) {
            /**
             * 1 移动距离大于图片宽度一半才改变current
             * 2 current 有取值范围
             */
            const endChangeRound = {
                x: (end.clientX - start.clientX) / sdata.width, // -1~1
                y: (end.clientY - start.clientY) / sdata.height,
            }
            let current = sdata.current
            if (Math.abs(endChangeRound.x) > 0.4) {
                const dir = endChangeRound.x > 0 ? -1 : 1;
                current += dir;
            }
            setState({ change: { x: 0, y: 0 }, status: 2, current })
        }
    })
    function render() {
        const wraperTransition = sdata.status === 2 ? 'transform 0.5s' : ''
        wraper.style.transition !== wraperTransition && (wraper.style.transition = wraperTransition);
        wraperItems.forEach(item => {
            item.style.width = sdata.width + 'px' 
            item.style.height = sdata.height + 'px' 
        })
        wraper.style.width = `${wraperItems.length + 2}00%`
        const left = -(sdata.current + 1 - (sdata.change.x / sdata.width)) / (wraperItems.length + 2) * 100
        wraper.style.transform = `translateX(${left}%)`;
    }
    render()
})