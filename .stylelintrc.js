module.exports = {
    "extends": "stylelint-config-standard",
    "rules": {
        "unit-no-unknown": [
            true,
            {
                "ignoreUnits": "/rpx/"
            }
        ],
        "selector-type-no-unknown": [
            true,
            {
                "ignoreTypes": [
                    "/page/"
                ]
            }
        ],
        "indentation": 4,
        "declaration-block-trailing-semicolon": "always",
        "block-closing-brace-newline-before": "always",
        "unit-case": null,
        "color-hex-case": null,
        "max-empty-lines": null,
        "at-rule-no-unknown": null,
        "comment-empty-line-before": null,
        "number-leading-zero": null,
        "no-descending-specificity": null,
        "no-duplicate-selectors": null,
        "no-empty-source": null,
        "declaration-block-no-duplicate-properties": null,
        "function-calc-no-invalid": null,
        "font-family-no-missing-generic-family-keyword": null
    }
}
