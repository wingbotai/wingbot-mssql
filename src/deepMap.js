/*
 * @author David Menger
 */
'use strict';

const ISODatePattern = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;


/* eslint-disable no-param-reassign */

function deepEncode (obj) {
    if (Array.isArray(obj)) {
        const len = obj.length;
        for (let i = 0; i < len; i++) {
            const v = obj[i];
            if (typeof v === 'object' && v !== null) {
                if (v instanceof Date) {
                    obj[i] = v.toISOString();
                } else {
                    obj[i] = deepEncode(v);
                }
            }
        }
    } else {
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in obj) {
            const v = obj[key];
            if (typeof v === 'object' && v !== null) {
                if (v instanceof Date) {
                    obj[key] = v.toISOString();
                } else {
                    obj[key] = deepEncode(v);
                }
            }
        }
    }


    return obj;
}

function deepDecode (obj) {
    if (Array.isArray(obj)) {
        const len = obj.length;
        for (let i = 0; i < len; i++) {
            const v = obj[i];
            if (typeof v === 'object' && v) {
                obj[i] = deepDecode(v);
            } else if (typeof v === 'string' && ISODatePattern.test(v)) {
                obj[i] = new Date(v);
            }
        }
    } else {
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in obj) {
            const v = obj[key];
            if (typeof v === 'object' && v) {
                obj[key] = deepDecode(v);
            } else if (typeof v === 'string' && ISODatePattern.test(v)) {
                obj[key] = new Date(v);
            }
        }
    }


    return obj;
}

module.exports = { deepEncode, deepDecode };
