import { miniprogramThis } from '../internals/global'
import { pxToNumber } from '../shared/pxToNumber'

export const useQuery = (vm) => {
    return !!vm ? miniprogramThis.createSelectorQuery().in(vm) : miniprogramThis.createSelectorQuery()
}

const makeFields = () => ({
    id: true,
    dataset: true,
    mark: true,
    rect: true,
    // size: true,
    scrollOffset: true,
    computedStyle: [
        'width',
        'height',
        'borderTopWidth',
        'borderRightWidth',
        'borderBottomWidth',
        'borderLeftWidth',
    ],
    node: true,
})

const makeNodeRef = (node) => {
    const borderRightWidth = pxToNumber(node.borderRightWidth || 0)
    const borderLeftWidth = pxToNumber(node.borderLeftWidth || 0)
    const borderTopWidth = pxToNumber(node.borderTopWidth || 0)
    const borderBottomWidth = pxToNumber(node.borderBottomWidth || 0)
    const clientWidth = pxToNumber(node.width)
    const clientHeight = pxToNumber(node.height)
    const offsetWidth = clientWidth + borderRightWidth + borderLeftWidth
    const offsetHeight = clientHeight + borderTopWidth + borderBottomWidth

    return {
        id: node.id,
        dataset: node.dataset,
        mark: node.mark,

        top: node.top,
        right: node.right,
        bottom: node.bottom,
        left: node.left,
        width: offsetWidth,
        height: offsetHeight,
        x: node.left,
        y: node.top,
    
        offsetWidth,
        offsetHeight,
        clientLeft: borderLeftWidth,
        clientTop: borderTopWidth,
        clientWidth,
        clientHeight,

        scrollHeight: node.scrollHeight,
        scrollLeft: node.scrollLeft,
        scrollTop: node.scrollTop,
        scrollWidth: node.scrollWidth,

        node: node.node,
    }
}

export const useRef = (selector, vm) => {
    return new Promise((resolve) => {
        const query = useQuery(vm)
        const isArray = Array.isArray(selector)
        const classList = isArray ? selector : [selector]
        classList.forEach((s) => {
            query
                .select(s)
                .fields(makeFields())
        })
        query.exec((nodes) => {
            resolve(
                isArray
                    ? nodes.map((node) => makeNodeRef(node))
                    : makeNodeRef(nodes[0])
            )
        })
    })
}

export const useRefAll = (selector, vm) => {
    return new Promise((resolve) => {
        const query = useQuery(vm)
        const isArray = Array.isArray(selector)
        const classList = isArray ? selector : [selector]
        classList.forEach((s) => {
            query
                .selectAll(s)
                .fields(makeFields())
        })
        query.exec((nodesList) => {
            resolve(
                isArray
                    ? nodesList.map((nodes) => nodes.map((node) => makeNodeRef(node)))
                    : nodesList[0].map((node) => makeNodeRef(node))
            )
        })
    })
}

export const useRect = (selector, vm) => {
    return new Promise((resolve) => {
        const query = useQuery(vm)
        const isArray = Array.isArray(selector)
        const classList = isArray ? selector : [selector]
        classList.forEach((s) => {
            query
                .select(s)
                .boundingClientRect()
        })
        query.exec((nodes) => {
            resolve(isArray ? nodes : nodes[0])
        })
    })
}

export const useRectAll = (selector, vm) => {
    return new Promise((resolve) => {
        const query = useQuery(vm)
        const isArray = Array.isArray(selector)
        const classList = isArray ? selector : [selector]
        classList.forEach((s) => {
            query
                .selectAll(s)
                .boundingClientRect()
        })
        query.exec((nodesList) => {
            resolve(isArray ? nodesList : nodesList[0])
        })
    })
}

export const useScrollOffset = (vm) => {
    return new Promise((resolve) => {
        const query = useQuery(vm)
        query
            .selectViewport()
            .scrollOffset()
        query.exec(([node]) => {
            resolve(node)
        })
    })
}

export const useComputedStyle = (selector, ...args) => {
    const computedStyle = args.length === 2 ? args[0] : ['width', 'height']
    const vm = args.length === 2 ? args[1] : args[0]
    return new Promise((resolve) => {
        const query = useQuery(vm)
        query
            .select(selector)
            .fields({
                computedStyle,
            })
        query.exec(([node]) => {
            resolve(node)
        })
    })
}
