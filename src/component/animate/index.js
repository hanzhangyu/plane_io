/**
 * Created by Paul on 2017/2/10.
 */
import {UNIT_TIME} from '../../common/config';
import {UNIT_TIME_PIC} from '../../common/const';
import {fixNumLoop} from '../../common/util';
/**
 * 动画类（配置好正确的index，回传渲染，需配合，动画开始改变分数，结束移除对象）
 * @constructor
 */
export var AnimateCanvas = Base =>{
    if(!Base)Base=class {};
    return class extends Base {
        constructor() {
            super() ;
            this.animateTime = 0;// 距上一帧图片动画时间
            this.animateOver = false; // 针对不loop的元素开放的结尾判断
        }
        _fixIndex(type, posType, isLoop) {
            this.animateTime += UNIT_TIME;
            // 到达动画帧开始渲染
            if (this.animateTime >= UNIT_TIME_PIC) {
                if (isLoop) {
                    this[type] = fixNumLoop(this[type] + 1, this[posType][4] - 1, 0);
                } else {
                    this[type] == (this[posType][4] - 1) ? (this.animateOver = true) : (this[type]++)
                }
                this.animateTime = 0;
            }
        }
    }
};