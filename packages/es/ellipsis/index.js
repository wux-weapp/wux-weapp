import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import styleToCssString from '../helpers/libs/styleToCssString'
import runes2 from '../helpers/libs/runes2'
import { pxToNumber } from '../helpers/shared/pxToNumber'
import { useRef, useComputedStyle } from '../helpers/hooks/useDOM'

function getSubString(chars, start, end) {
    return chars.slice(start, end).join('')
}

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-ellipsis',
        },
        content: {
            type: String,
            value: '',
        },
        direction: {
            type: String,
            value: 'end',
        },
        defaultExpanded: {
            type: Boolean,
            value: false,
        },
        expandText: {
            type: String,
            value: '',
        },
        collapseText: {
            type: String,
            value: '',
        },
        rows: {
            type: Number,
            value: 1,
        },
    },
    data: {
        ellipsised: {
            leading: '',
            tailing: '',
        },
        expanded: false,
        exceeded: false,
        innerText: '',
        end: -1,
        containerStyle: '',
    },
    observers: {
        ['prefixCls, content, direction, rows, expandText, collapseText'](...args) {
            const [
                prefixCls,
                content,
                direction,
                rows,
                expandText,
                collapseText,
            ] = args

            this.calcEllipsised({
                prefixCls,
                content,
                direction,
                rows,
                expandText,
                collapseText,
            })
        },
    },
    computed: {
        classes: ['prefixCls', function(prefixCls) {
            const wrap = classNames(prefixCls)
            const container = classNames(prefixCls, [`${prefixCls}--container`])
            const expanded = `${prefixCls}__expanded`
            const collapsed = `${prefixCls}__collapsed`

            return {
                wrap,
                container,
                expanded,
                collapsed,
            }
        }],
    },
    methods: {
        /**
         * 点击事件
         */
        onTap() {
            this.triggerEvent('click')
        },
        /**
         * 展开事件
         */
        setExpanded(e) {
            const { expanded } = e.target.dataset
            this.setDataPromise({
                expanded: expanded === '1',
            })
        },
        /**
         * 计算省略值
         */
        calcEllipsised(props) {
            const chars = runes2(props.content)
            const end = props.content.length
            const middle = Math.floor((0 + end) / 2)
            const defaultState = {
                innerText: props.content,
                chars,
                end,
                middle,
                containerStyle: '',
            }

            const setExceeded = (exceeded) => {
                if (this.data.exceeded !== exceeded) {
                    this.setDataPromise({
                        exceeded,
                    })
                }
            }
            const setEllipsised = (ellipsised) => {
                if (this.data.ellipsised !== ellipsised) {
                    this.setDataPromise({
                        ellipsised,
                    })
                }
            }

            this.getRootRef()
                .then((root) => (
                    this.setDataPromise({
                        ...defaultState,
                        containerStyle: styleToCssString({
                            width: root.width,
                            wordBreak: root.wordBreak,
                        }),
                        removeContainer: false,
                    }).then(() => (
                        Promise.all([
                            Promise.resolve(root),
                            this.getContainerRef(),
                        ])
                    ))
                ))
                .then(([root, container]) => {
                    if (container.clientHeight <= root.maxHeight) {
                        setExceeded(false)
                    } else {
                        setExceeded(true)
                        if (props.direction === 'middle') {
                            this.checkMiddle([0, middle], [middle, end], this.data).then(setEllipsised)
                        } else {
                            this.check(0, end, this.data).then(setEllipsised)
                        }
                    }
                })
        },
        check(left, right, props) {
            const chars = props.chars
            const end = props.content.length
            const actionText = props.expanded ? props.collapseText : props.expandText
            if (right - left <= 1) {
                if (props.direction === 'end') {
                    return Promise.resolve({
                        leading: getSubString(chars, 0, left) + '...',
                    })
                } else {
                    return Promise.resolve({
                        tailing: '...' + getSubString(chars, right, end),
                    })
                }
            }
            const middle = Math.round((left + right) / 2)
            const innerText = props.direction === 'end'
                ? getSubString(chars, 0, middle) + '...' + actionText
                : actionText + '...' + getSubString(chars, middle, end)
            
            return this.setDataPromise({ innerText })
                .then(() => (
                    Promise.all([
                        this.getRootRef(),
                        this.getContainerRef(),
                    ])
                ))
                .then(([root, container]) => {
                    if (container.clientHeight <= root.maxHeight) {
                        if (props.direction === 'end') {
                            return this.check(middle, right, props)
                        } else {
                            return this.check(left, middle, props)
                        }
                    } else {
                        if (props.direction === 'end') {
                            return this.check(left, middle, props)
                        } else {
                            return this.check(middle, right, props)
                        }
                    }
                })
        },
        checkMiddle(
            leftPart,
            rightPart,
            props
        ) {
            const chars = props.chars
            const end = props.content.length
            const actionText = props.expanded ? props.collapseText : props.expandText
            if (
                leftPart[1] - leftPart[0] <= 1 &&
              rightPart[1] - rightPart[0] <= 1
            ) {
                return Promise.resolve({
                    leading: getSubString(chars, 0, leftPart[0]) + '...',
                    tailing: '...' + getSubString(chars, rightPart[1], end),
                })
            }
            const leftPartMiddle = Math.floor((leftPart[0] + leftPart[1]) / 2)
            const rightPartMiddle = Math.ceil((rightPart[0] + rightPart[1]) / 2)
            const innerText =
              getSubString(chars, 0, leftPartMiddle) +
              '...' +
              actionText +
              '...' +
              getSubString(chars, rightPartMiddle, end)
            
            return this.setDataPromise({ innerText })
                .then(() => (
                    Promise.all([
                        this.getRootRef(),
                        this.getContainerRef(),
                    ])
                ))
                .then(([root, container]) => {
                    if (container.clientHeight <= root.maxHeight) {
                        return this.checkMiddle(
                            [leftPartMiddle, leftPart[1]],
                            [rightPart[0], rightPartMiddle],
                            props,
                        )
                    } else {
                        return this.checkMiddle(
                            [leftPart[0], leftPartMiddle],
                            [rightPartMiddle, rightPart[1]],
                            props,
                        )
                    }
                })
        },
        setDataPromise(state) {
            return new Promise((resolve) => {
                this.setData(state, resolve)
            })
        },
        getContainerRef() {
            const { prefixCls } = this.data
            return useRef(`.${prefixCls}--container`, this)
        },
        getRootRef() {
            const { prefixCls, rows } = this.data
            const computedStyle = [
                'width',
                'wordBreak',
                'lineHeight',
                'paddingTop',
                'paddingBottom',
            ]
            return useComputedStyle(`.${prefixCls}`, computedStyle, this)
                .then((originStyle) => {
                    const width = pxToNumber(originStyle.width)
                    const lineHeight = pxToNumber(originStyle.lineHeight)
                    const maxHeight = Math.floor(
                        lineHeight * (rows + 0.5) +
                        pxToNumber(originStyle.paddingTop) +
                        pxToNumber(originStyle.paddingBottom)
                    )
                    return {
                        width,
                        wordBreak: originStyle.wordBreak,
                        maxHeight,
                    }
                })
        },
    },
    attached() {
        const props = this.data
        const expanded = props.defaultExpanded

        this.setDataPromise({ expanded })
        this.calcEllipsised({ ...props, expanded })
    },
})
