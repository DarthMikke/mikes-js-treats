'use strict';

/**
 * Format a date according to the C89 spec.
 * @link https://docs.python.org/3/library/datetime.html#strftime-and-strptime-format-codes
 * 
 * @param {Number} time - milliseconds since epoch
 * @param {string} format
 * @return {string}
 */
export function strftime(time, format) {
    let date = new Date(time);
    format = format.replace("%d", (date.getDate() < 10) ? "0" + date.getDate() : date.getDate());
    format = format.replace("%m", (date.getMonth() < 9) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
    format = format.replace("%Y", date.getFullYear());
    format = format.replace("%w", date.getDay());
    return format;
}

/**
 * 
 * @param {string} tag 
 * @param {Object} options 
 * @returns HTMLElement
 */
export const createElement = (tag, options={}) => {
    let e = document.createElement(tag);
    Object.keys(options).forEach(key => {
        let newkey = key == "className" ? "class" : key;
        e.setAttribute(newkey, options[key]);
    });
    return e;
}

export function duration(duration) {
    return duration/3600;
}

export function durationAsString(duration, mins=true, secs=false) {
    duration = parseTime(duration);
    let out = duration.hrs > 9 ? "" : "0";
    out += duration.hrs;
    if (!mins) {
        return out;
    }
    out += ":";
    out += duration.mins > 9 ? "" : "0";
    out += duration.mins;
    if (!secs) {
        return out;
    }
    out += ":";
    out += duration.secs > 9 ? "" : "0";
    out += duration.secs;
    return out;
}

export function parseTime(duration) {
    let secs = duration % 60;
    let mins = ((duration - secs) % 3600) / 60;
    let hrs = (duration - mins*60 - secs) / 3600;

    return {hrs: hrs, mins: mins, secs: secs};
}

/**
 * 
 * @param {Object|null} options 
 * @param {Object} defaults 
 * @returns {Object} for every key existing in defaults, fill it in the options.
 */
 export function fillDefaults(options, defaults) {
    if (options === null) return defaults;
    Object.keys(options).forEach(k => defaults[k] = options[k]);
    return defaults;
}
