import classNames from '../libs/classNames'
import { FIELD_META_PROP, FIELD_DATA_PROP } from '../shared/constants'

function intersperseSpace(list) {
    return list.reduce((current, item) => [...current, ' ', item], []).slice(1)
}

export default Behavior({
    properties: {
        validateStatus: {
            type: null,
            value: null,
        },
        required: {
            type: null,
            value: null,
        },
        help: {
            type: null,
            value: null,
        },
        hasFeedback: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        mergedValidateStatus: '',
        mergedRequired: false,
        feedbackMessage: '',
        validateClasses: '',
    },
    methods: {
        getControls() {
            return this.getRelationsByType('descendant').filter((node) => !!node.hasFieldDecorator)
        },
        getOnlyControl() {
            const child = this.getControls()[0]
            return child !== undefined ? child : null
        },
        getChildProp(prop) {
            const child = this.getOnlyControl()
            return child && child.data && child.data[prop]
        },
        getMeta() {
            return this.getChildProp(FIELD_META_PROP)
        },
        getField() {
            return this.getChildProp(FIELD_DATA_PROP)
        },
        getValidateState(_fieldMeta, _field) {
            const onlyControl = this.getOnlyControl()
            if (!onlyControl) {
                return ''
            }
            const fieldMeta = _fieldMeta || this.getMeta()
            const field = _field || this.getField()
            if (field.validating) {
                return 'validating'
            }
            if (field.errors) {
                return 'error'
            }
            const fieldValue = 'value' in field ? field.value : fieldMeta.initialValue
            if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
                return 'success'
            }
            return ''
        },
        getRequiredState(required) {
            if (required !== null) {
                return !!required
            }
            if (this.getOnlyControl()) {
                const meta = this.getMeta() || {}
                const validate = meta.validate || []
          
                return validate
                    .filter((item) => !!item.rules)
                    .some((item) => {
                        return item.rules.some((rule) => rule.required)
                    })
            }
            return false
        },
        getFeedbackMessage(help) {
            // if (help !== null) {
            //     return help
            // }
            if (this.getOnlyControl()) {
                const { errors } = this.getField()
                if (errors) {
                    return intersperseSpace(
                        errors.map((e) => (e.message)),
                    )
                }
            }
            return ''
        },
        getValidateClasses(mergedValidateStatus, hasFeedback, help) {
            if (mergedValidateStatus) {
                return classNames({
                    // 'with-help': help !== null,
                    // 'has-feedback': mergedValidateStatus && hasFeedback,
                    'has-success': mergedValidateStatus === 'success',
                    'has-warning': mergedValidateStatus === 'warning',
                    'has-error': mergedValidateStatus === 'error',
                    'is-validating': mergedValidateStatus === 'validating',
                })
            }
            return ''
        },
        reRender(props = this.data) {
            const mergedValidateStatus = props.validateStatus !== null ? `${props.validateStatus}` : this.getValidateState()
            if (this.data.mergedValidateStatus !== mergedValidateStatus) {
                this.setData({ mergedValidateStatus })
            }

            const mergedRequired = this.getRequiredState(props.required)
            if (this.data.mergedRequired !== mergedRequired) {
                this.setData({ mergedRequired })
            }

            const feedbackMessage = this.getFeedbackMessage(props.help)
            if (this.data.feedbackMessage !== feedbackMessage) {
                this.setData({ feedbackMessage })
            }

            const validateClasses = this.getValidateClasses(mergedValidateStatus, props.hasFeedback, props.help)
            if (this.data.validateClasses !== validateClasses) {
                this.setData({ validateClasses })
            }
        },
    },
})
