/**
 * Created by Paul on 2017/1/18.
 *
 * 因为以后可能想做出比较有意思的子弹所以还是继承吧
 */

import {POS,BULLET_TYPE_1} from '../../common/const';
import {BULLET1_SPEED,BULLET1_POWER} from '../../common/config';
import {DefaultCanvas} from '../default';
/**
 * 子弹基类(忽略地图速度)
 * @param kX 根据角度计算得出的余弦值
 * @param kY 根据角度计算得出的负正弦值
 * @constructor
 */
class Bullet extends DefaultCanvas{
    constructor(kX, kY) {
        super();
        this.kX = kX;
        this.kY = kY;
    }
    move() {
        this.x += this.kX * this.speed;
        this.y += this.kY * this.speed;
    }
}

/**
 * 默认子弹
 * @param ctx
 * @param owner
 * @param x
 * @param y
 * @param kX
 * @param kY
 * @constructor
 */
export class Bullet1 extends Bullet{
    constructor(ctx, owner, x, y, kX, kY) {
        super(kX, kY);
        this.ctx = ctx;
        this.owner = owner;// FIXME 此处实例化之后会浪费内存
        this.x = x;
        this.y = y;
        this.pos = POS[BULLET_TYPE_1];
        this.speed = BULLET1_SPEED;
        this.power = BULLET1_POWER;
    }

    // x,y子弹在x轴与y轴移动的方向，{-1,0,1}（坐标轴等同于css坐标轴）
    draw() {
        this._drawImageFromMain(this.x, this.y, this.pos, 0);
        this.move();
    };
}