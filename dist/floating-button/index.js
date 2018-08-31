const defaultAction = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBAQLCR5MtjrbAAAAjUlEQVRo3u3ZMRKAIAxEUbDirp4nXnctFFDHBtDQ/O1Nnk6aHUMgZCBKMkmmNAtgOmL9M+IQQGVM95zljy8DAAAAAAAAAAAAAACALsDZcppSx7Q+WdtUvA5xffUtrjeA8/qQ21S9gc15/3Nfzw0M5O0G2kM5BQAAAAAAAAAAAAAAQGk33q0qZ/p/Q/JFdmei9usomnwIAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTA0VDExOjA5OjMwKzA4OjAw1U4c3wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0wNFQxMTowOTozMCswODowMKQTpGMAAAAASUVORK5CYII='

Component({
    externalClasses: ['wux-class'],
    properties: {
        theme: {
            type: String,
            value: 'balanced',
        },
        position: {
            type: String,
            value: 'bottomRight',
        },
        action: {
            type: String,
            value: defaultAction,
        },
        actionRotate: {
            type: Boolean,
            value: true,
        },
        backdrop: {
            type: Boolean,
            value: false,
        },
        buttons: {
            type: Array,
            value: [],
        },
        defaultVisible: {
            type: Boolean,
            value: false,
        },
        visible: {
            type: Boolean,
            value: false,
            observer(newVal) {
                if (!this.data.auto) {
                    this.setData({
                        buttonVisible: newVal,
                    })
                }
            },
        },
        auto: {
            type: Boolean,
            value: true,
        },
    },
    methods: {
        /**
         * change 事件的回调
         */
        fireEvents(buttonVisible) {
            if (this.data.buttonVisible !== buttonVisible) {
                if (this.data.auto) {
                    this.setData({
                        buttonVisible,
                    })
                }
            }

            this.triggerEvent('change', { value: buttonVisible })
        },
        /**
         * 按钮点击事件
         */
        buttonClicked(e) {
            const { index, value } = e.currentTarget.dataset
            const params = {
                index,
                value,
                buttons: this.data.buttons,
            }

            this.triggerEvent('click', params)
            this.fireEvents(false)
        },
        /**
         * 切换状态
         */
        onToggle(e) {
            this.fireEvents(!this.data.buttonVisible)
        },
    },
    data: {
        buttonVisible: false,
    },
    attached() {
        const { defaultVisible, visible, auto } = this.data
        const buttonVisible = !auto ? visible : defaultVisible

        this.setData({
            buttonVisible,
        })
    },
})