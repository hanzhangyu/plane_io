/**
 * Created by Paul on 2017/2/7.
 */
import {SCREEN_WIDTH,SCREEN_HEIGHT} from '../../common/config';
import {COLOR_MENU_FONT,MAIN_IMAGE,POS_MARGIN} from '../../common/const';
import data from '../../index';
/**
 * 画板基类，出此以外的两个辅助类都是超类
 * @constructor
 */
export class DefaultCanvas {
    constructor() {
        this.id = data.getId();// 使用全局递增ID赋值
        data.setIdPlus();
    }
    _defaultStyle() {//size[,color],pX,pY
        var size, color, pX, pY, i = 0;
        size = arguments[i++] || 35;
        color = (arguments[1] && arguments[1].indexOf('#') == 0) ? arguments[i++] : COLOR_MENU_FONT;
        pX = arguments[i++] || "center";
        pY = arguments[i] || "middle";
        this.ctx.font = "bold " + size + "px 幼圆,Arial";
        this.ctx.fillStyle = color;
        this.ctx.textAlign = pX;
        this.ctx.textBaseline = pY;
        return this;
    };

    _clear() {
        this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        return this;
    };

    /**
     * sprity是纵向排序的
     * @param x  坐标
     * @param y
     * @param pos POS对应项
     * @param crossIndex 纵向序列
     */
    _drawImageFromMain(x, y, pos, crossIndex) {
        this.ctx.drawImage(MAIN_IMAGE, pos[0], pos[1] + crossIndex * (pos[3] + POS_MARGIN), pos[2], pos[3], x, y, pos[2], pos[3]);
        return this;
    }
}

