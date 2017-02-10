/**
 * Created by Paul on 2017/1/16.
 */
import {SCREEN_WIDTH,SCREEN_HEIGHT} from '../common/config'
/**
 *  校正溢出范围的数字----极值
 * @param val
 * @param max
 * @param min
 * @returns {*}
 */
export function fixNumLimit(val, max, min) {
    return val < min ? min : (val > max ? max : val)
}

/**
 *  校正溢出范围的数字----循环
 * @param val
 * @param max
 * @param min
 * @returns {*}
 */
export function fixNumLoop(val, max, min) {
    var length = max - min + 1;
    return val > max ? (val - length) : (val < min ? (val + length) : val)
}

/**
 * 随机数
 * @param max
 * @param min
 * @returns {*}
 */
export function random(max, min) {
    return Math.random() * (max - min) + min
}

/**
 * 判断是否溢出屏幕
 * @param x 目标x坐标
 * @param y 目标y坐标
 * @param w 目标宽度
 * @param h 目标高度
 * @returns {boolean}
 */
export function isReachOut(x, y, w, h) {
    return (x > SCREEN_WIDTH + w) || (x < -w) || (y > SCREEN_HEIGHT + h) || (y < -h)
}

/**
 * 碰撞判断（暂时的想法是去两个中心点的坐标，计算两点与坐标轴形成的直角函数的两条直角边，都分别小于(w1+w1)/2，(h1+h2)/2肯定碰撞）
 * @param obj0
 * @param obj1
 * @returns {boolean}
 */
export function isHit(obj0, obj1) {
    var w0 = obj0.pos[2],
        h0 = obj0.pos[3],
        w1 = obj1.pos[2],
        h1 = obj1.pos[3];
    return Math.abs(obj0.x + w0 / 2 - obj1.x - w1 / 2) <= (w0 + w1) / 2 && Math.abs(obj0.y + h0 / 2 - obj1.y - h1 / 2) <= (h0 + h1) / 2
}
