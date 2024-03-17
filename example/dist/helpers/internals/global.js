const check =  (it) => {
    return it && typeof it.env && it
}

export const miniprogramThis = check(typeof wx === 'object' && wx)
export default miniprogramThis