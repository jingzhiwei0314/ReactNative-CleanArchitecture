import {dateFormat} from "./dateFormat";

export function timestampToDate(timestamp) {
    return dateFormat(new Date(parseInt(timestamp)), 'yyyy-MM-dd hh:mm');
    // return new Date(parseInt(timestamp)).toLocaleString().replace(/:\d{1,2}$/,' ');
}

export function timestampToDate1(timestamp) {
    return dateFormat(new Date(parseInt(timestamp)), 'yyyy年MM月dd日 hh:mm:ss');
    // return new Date(parseInt(timestamp)).toLocaleString().replace(/:\d{1,2}$/,' ');
}

export function getStamp() {
    return Date.parse(new Date());
}

export function get24HoursAgoTimestamp() {
    let oneDayTimestamp = 24 * 60 * 60 * 1000;//24小时的时间戳 单位：秒
    return new Date().getTime() - oneDayTimestamp;
}

export function getStampByData(date) {
    date = date.substring(0, 19);
    date = date.replace(/-/g, '/');
    var timestamp = new Date(date).getTime();
    return timestamp
}
