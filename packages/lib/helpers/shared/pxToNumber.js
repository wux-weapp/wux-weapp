"use strict";function pxToNumber(e){if(!e)return 0;if("number"==typeof e)return e;var r=e.match(/^\d*(\.\d*)?/);return r?Number(r[0]):0}Object.defineProperty(exports,"__esModule",{value:!0}),exports.pxToNumber=pxToNumber;