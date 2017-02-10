/**
 * Created by Paul on 2017/1/15.
 */
import {fixNumLimit,random} from '../../common/util';
import {HP_PLAYER1,HP_ENEMY1,HP_ENEMY2,HP_ENEMY3,PLANE_ENEMY1_SCORE,
    PLANE_ENEMY2_SCORE,PLANE_ENEMY3_SCORE,SCREEN_WIDTH,SCREEN_HEIGHT,
    PLANE_PLAYER1_MAX_SPEED,PLANE_ENEMY1_MAX_SPEED,PLANE_ENEMY2_MAX_SPEED,PLANE_ENEMY3_MAX_SPEED,
    SHOOT_INTERVAL_PLANE_PLAYER1,SHOOT_INTERVAL_PLANE_PLAYER2} from '../../common/config';
import data from '../../';
import {POS,BULLET_TYPE_1} from '../../common/const';
import {DefaultCanvas} from '../default';
import {AnimateCanvas} from '../animate';
import {ShootCanvas} from '../shoot';

/**
 * 飞机原型
 * @constructor
 */
class Plane extends AnimateCanvas(DefaultCanvas) {
    constructor(x, y, hp) {
        super();
        this.x = 0;
        this.y = 0;
        this.hp = 1;//当前生命值
        this.maxHp = 1;//最大生命值
        //this.isAI = false; //是否机器人，后期玩家掉线拿机器人补上
        this.score = 0;
        this.bullet = null; //子弹
        this.crackImgIndex = 0; //已损坏帧数
        this.attckBy = null;//记录上一次被谁攻击
    }

    destroy() {// 损坏动画
        this._fixIndex('crackImgIndex', 'crackPos', false);
        this._drawImageFromMain(this.x, this.y, this.crackPos, this.crackImgIndex);
        //this.ctx.fillRect(this.x,this.y,this.pos[2],this.pos[3]);// FIXME test
    };

    isDestroy() {// 是否损坏
        return this.hp == 0
    };

    decreaseHP(damage, object) {// 受到攻击，没传damage视为爆炸（同归于尽）
        this.hp = (damage != void 0) ? fixNumLimit(this.hp - damage, this.maxHp, 0) : 0;
        this.attckBy = object;
    };

    isDestroyFinish() {// is损坏结束
        return this.animateOver;
    };
}

/**
 * 敌机基类
 * @constructor
 */
class PlaneEnemy extends Plane {
    constructor() {
        super();
        this.isDestroyScoreAdded = false;// 分数是否已经加入
    }

    draw() {
        this._drawImageFromMain(this.x, this.y, this.pos, 0);
        //this.ctx.fillRect(this.x,this.y,this.pos[2],this.pos[3]);// FIXME test
        this.move();
    };

    move() {
        this.y += this.speed + data.getSpeedLevel();
    };
}

/**
 * 我方战机
 * @constructor
 */
class PlaneSelf extends ShootCanvas(Plane) {
    constructor() {
        super();
        this.hp = HP_PLAYER1;
        this.maxHp = HP_PLAYER1;//最大生命值
        this.bulletType = BULLET_TYPE_1;
        this.pos = POS['self'];
        this.crackPos = POS['selfCrack'];
        this.x = (SCREEN_WIDTH - this.pos[2]) / 2;
        this.y = SCREEN_HEIGHT - this.pos[3];
        this.maxV = PLANE_PLAYER1_MAX_SPEED;
        this.shootInterval = SHOOT_INTERVAL_PLANE_PLAYER1;
        this.imgIndex = 0;
    }

    move(axes, val) {
        if (this.hp == 0)return;
        this[axes] += val;
        // 禁止移出屏幕
        if (axes == 'x') {
            this.x = fixNumLimit(this.x, SCREEN_WIDTH - this.pos[2], 0)
        } else {
            this.y = fixNumLimit(this.y, SCREEN_HEIGHT - this.pos[3], 0)
        }
    };
}

/**
 * plane-Player1
 * @param ctx
 * @constructor
 */
export class PlanePlayer1 extends PlaneSelf {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.shootInterval = SHOOT_INTERVAL_PLANE_PLAYER2;
    }

    draw() {
        this._fixIndex('imgIndex', 'pos', true);
        this._drawImageFromMain(this.x, this.y, this.pos, this.imgIndex);
        this._shoot(90);
    };
}

/**
 * plane-Player2
 * @param ctx
 * @constructor
 */
export class PlanePlayer2 extends PlaneSelf {
    constructor(ctx) {
        super();
        this.ctx = ctx;
    }

    draw() {
        this.ctx.globalAlpha = 0.6;
        this._fixIndex('imgIndex', 'pos', true);
        this._drawImageFromMain(this.x, this.y, this.pos, this.imgIndex);
        this._shoot(90);
        this.ctx.globalAlpha = 1;
    };
}

/**
 * 敌机1(敌机默认最快)
 * @param ctx
 * @constructor
 */
export class PlaneEnemy1 extends PlaneEnemy {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.hp = HP_ENEMY1;
        this.maxHp = HP_ENEMY1;
        this.score = PLANE_ENEMY1_SCORE;
        this.pos = POS['enemy1'];
        this.crackPos = POS['enemy1Crack'];
        this.x = random(SCREEN_WIDTH - this.pos[2], 0);
        this.y = -this.pos[3];// 初始在屏幕外面
        this.speed = PLANE_ENEMY1_MAX_SPEED;
    }
}

/**
 * 敌机2
 * @param ctx
 * @constructor
 */
export class PlaneEnemy2 extends PlaneEnemy {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.hp = HP_ENEMY2;
        this.maxHp = HP_ENEMY2;
        this.score = PLANE_ENEMY2_SCORE;
        this.pos = POS['enemy2'];
        this.crackPos = POS['enemy2Crack'];
        this.x = random(SCREEN_WIDTH - this.pos[2], 0);
        this.y = -this.pos[3];
        this.speed = PLANE_ENEMY2_MAX_SPEED;
    }
}

/**
 * 敌机3
 * @param ctx
 * @constructor
 */
export class PlaneEnemy3 extends PlaneEnemy {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.hp = HP_ENEMY3;
        this.maxHp = HP_ENEMY3;
        this.score = PLANE_ENEMY3_SCORE;
        this.pos = POS['enemy3'];
        this.crackPos = POS['enemy3Crack'];
        this.x = random(SCREEN_WIDTH - this.pos[2], 0);
        this.y = -this.pos[3];// 初始在屏幕外面
        this.speed = PLANE_ENEMY3_MAX_SPEED;
    }
}

