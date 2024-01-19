export default function pxToNumber(value) {
    if (!value) return 0
    const match = value.match(/^\d*(\.\d*)?/)
    return match ? Number(match[0]) : 0
}
