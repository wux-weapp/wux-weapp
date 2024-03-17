var i;

!function(i) {
    i[i.HIGH_SURROGATE_START = 55296] = 'HIGH_SURROGATE_START', i[i.HIGH_SURROGATE_END = 56319] = 'HIGH_SURROGATE_END', 
    i[i.LOW_SURROGATE_START = 56320] = 'LOW_SURROGATE_START', i[i.REGIONAL_INDICATOR_START = 127462] = 'REGIONAL_INDICATOR_START', 
    i[i.REGIONAL_INDICATOR_END = 127487] = 'REGIONAL_INDICATOR_END', i[i.FITZPATRICK_MODIFIER_START = 127995] = 'FITZPATRICK_MODIFIER_START', 
    i[i.FITZPATRICK_MODIFIER_END = 127999] = 'FITZPATRICK_MODIFIER_END', i[i.VARIATION_MODIFIER_START = 65024] = 'VARIATION_MODIFIER_START', 
    i[i.VARIATION_MODIFIER_END = 65039] = 'VARIATION_MODIFIER_END', i[i.DIACRITICAL_MARKS_START = 8400] = 'DIACRITICAL_MARKS_START', 
    i[i.DIACRITICAL_MARKS_END = 8447] = 'DIACRITICAL_MARKS_END', i[i.ZWJ = 8205] = 'ZWJ';
}(i || (i = {}));

const t = Object.freeze([ 0x0308, 0x0937, 0x093F, 0x0BA8, 0x0BBF, 0x0BCD, 0x0E31, 0x0E33, 0x0E40, 0x0E49, 0x1100, 0x1161, 0x11A8 ]);

var r;

function runes(i) {
    if ('string' != typeof i) throw new TypeError('string cannot be undefined or null');
    const t = [];
    let r = 0, n = 0;
    for (;r < i.length; ) n += nextUnits(r + n, i), isGraphem(i[r + n]) && n++, isVariationSelector(i[r + n]) && n++, 
    isDiacriticalMark(i[r + n]) && n++, isZeroWidthJoiner(i[r + n]) ? n++ : (t.push(i.substring(r, r + n)), 
    r += n, n = 0);
    return t;
}

function nextUnits(i, t) {
    const r = t[i];
    if (!isFirstOfSurrogatePair(r) || i === t.length - 1) return 1;
    const n = r + t[i + 1];
    let e = t.substring(i + 2, i + 5);
    return isRegionalIndicator(n) && isRegionalIndicator(e) || isFitzpatrickModifier(e) ? 4 : 2;
}

function isFirstOfSurrogatePair(i) {
    return i && betweenInclusive(i[0].charCodeAt(0), 55296, 56319);
}

function isRegionalIndicator(i) {
    return betweenInclusive(codePointFromSurrogatePair(i), 127462, 127487);
}

function isFitzpatrickModifier(i) {
    return betweenInclusive(codePointFromSurrogatePair(i), 127995, 127999);
}

function isVariationSelector(i) {
    return 'string' == typeof i && betweenInclusive(i.charCodeAt(0), 65024, 65039);
}

function isDiacriticalMark(i) {
    return 'string' == typeof i && betweenInclusive(i.charCodeAt(0), 8400, 8447);
}

function isGraphem(i) {
    return 'string' == typeof i && t.includes(i.charCodeAt(0));
}

function isZeroWidthJoiner(i) {
    return 'string' == typeof i && 8205 === i.charCodeAt(0);
}

function codePointFromSurrogatePair(i) {
    return (i.charCodeAt(0) - 55296 << 10) + (i.charCodeAt(1) - 56320) + 0x10000;
}

function betweenInclusive(i, t, r) {
    return i >= t && i <= r;
}

function substring(i, t, r) {
    const n = runes(i);
    if (void 0 === t) return i;
    if (t >= n.length) return '';
    const e = n.length - t;
    let o = t + (void 0 === r ? e : r);
    return o > t + e && (o = void 0), n.slice(t, o).join('');
}

!function(i) {
    i[i.unit_1 = 1] = 'unit_1', i[i.unit_2 = 2] = 'unit_2', i[i.unit_4 = 4] = 'unit_4';
}(r || (r = {}));

export { r as EnumCodeUnits, i as EnumRunesCode, t as GRAPHEMS, betweenInclusive, codePointFromSurrogatePair, runes as default, isDiacriticalMark, isFirstOfSurrogatePair, isFitzpatrickModifier, isGraphem, isRegionalIndicator, isVariationSelector, isZeroWidthJoiner, nextUnits, runes, substring as substr, substring };
