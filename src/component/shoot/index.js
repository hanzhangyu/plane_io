/**
 * Created by Paul on 2017/2/10.
 */
import {UNIT_TIME} from '../../common/config';
import {POS,BULLET_TYPE_1} from '../../common/const';
import data from '../../index';
import {Bullet1} from '../bullet';
/**
 * 射击类
 * @constructor
 */
export var ShootCanvas = Base =>{
    if(!Base)Base=class {};
    return class extends Base {
        constructor() {
            super() ;
            this.shutTime = 0;// 距上次射击时间
        }
        /**
         * 射击函数（为以后多方向扩展预留接口）
         * @param angle 子弹相对于css中的X正半轴角度
         * @private
         */
        _shoot(angle) {
            this.shutTime += UNIT_TIME;
            if (this.shutTime >= this.shootInterval) {
                angle = angle * Math.PI / 180;
                var x, y, kX = Math.cos(angle), kY = -Math.sin(angle);
                // 两种射出方式，不会出现横向的子弹的,kY<0向上
                if (kY < 0) {
                    x = this.x + this.pos[2] / 2 - POS[this.bulletType][2] / 2;
                    y = this.y - POS[this.bulletType][3];
                } else {
                    x = this.x + this.pos[2] / 2 - POS[this.bulletType][2] / 2;
                    y = this.y + this.pos[3] / 2 + POS[this.bulletType][3];
                }
                switch (this.bulletType) {
                    case BULLET_TYPE_1:
                        data.setBulletArrayPush(new Bullet1(this.ctx, this, x, y, kX, kY));
                        break;
                }
                this.shutTime = 0;
            }
        }
    }
};