/**
 * Created by Paul on 2017/1/16.
 *
 * 所有时间单位均为MS，单位时间UNIT_TIME只是起到修正FPS的功能
 *
 * 暂时不做config的修改接口
 */
/**************单位时间（为后期预留，适配低端设配，降低FPS）*****************/
export const UNIT_TIME = 20;

/**************屏幕大小*****************/
export const SCREEN_WIDTH = 458; //屏幕宽
export const SCREEN_HEIGHT = 568;//屏幕高

/**************测试及作弊*****************/
export const GOD_MODE=true;//上帝模式(不会掉血)

/**************关卡属性*****************/
export const LEVEL_SCORE=[1000,10000,50000,100000];//关卡分数分水岭
export const LEVEL_SPEED=[1,2,3,4];//关卡速度

/**************射速（射击间隔）*****************/
export const SHOOT_INTERVAL_PLANE_PLAYER1 = 100;
export const SHOOT_INTERVAL_PLANE_PLAYER2 = 100;

/**************子弹强度*****************/
export const BULLET1_POWER = 1;
export const MAX_POWER = 999;// 很大的一个伤害，爆炸伤害

/**************血量*****************/
export const HP_PLAYER1 = 1;
export const HP_ENEMY1 = 1;
export const HP_ENEMY2 = 6;
export const HP_ENEMY3 = 12;

/**************战机与子弹最大速度*****************/
export const PLANE_PLAYER1_MAX_SPEED = 5;
export const PLANE_ENEMY1_MAX_SPEED = 5;
export const PLANE_ENEMY2_MAX_SPEED = 3;
export const PLANE_ENEMY3_MAX_SPEED = 1;
export const BULLET1_SPEED = 10;

/**************敌机间隔*****************/
export const PLANE_ENEMY1_TIME_INTERVAL=600;
export const PLANE_ENEMY2_TIME_INTERVAL=3000;
export const PLANE_ENEMY3_TIME_INTERVAL=8000;

/**************敌机分数*****************/
export const PLANE_ENEMY1_SCORE=100;
export const PLANE_ENEMY2_SCORE=500;
export const PLANE_ENEMY3_SCORE=1000;