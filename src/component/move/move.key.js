/**
 * Created by Paul on 2017/1/20.
 *
 * 通过键盘控制
 */
import {UNIT_TIME,SCREEN_WIDTH ,SCREEN_HEIGHT} from '../../common/config';
import {GAME_TYPE,GAME_STATE_INIT,GAME_STATE_PLAY,GAME_STATE_PAUSE,
    GAME_STATE_OVER,GAME_STATE_WIN,TYPE_STAGE,TYPE_MENU ,TYPE_BG,KEYBOARD} from '../../common/const';
import data from '../../index';
// 键盘处理事件，减速采用骤停机制，不然就像溜冰一样了，真的不好玩
window.addEventListener('load', ()=> {
    let {getState,setState,getSpeedLevel,getGameType,setGameType,getPlaneP1}=data;
    var a = 0.2;//加速度
    var t = 0;//加速引擎启动时间
    var upTimer = 0, downTimer = 0, leftTimer = 0, rightTimer = 0, tTimer;// 各个方向的速度，持续按住加速，等于0表示按键没有被按下
    function posCompute(type, dir) {
        var speedLevel = getSpeedLevel(),
            planeP1 = getPlaneP1();
        var v = speedLevel + a * t;// 最终速度，单位时间位移等于速度
        v > planeP1.maxV && (v = planeP1.maxV);
        planeP1.move(type, v * dir);
    }

    document.addEventListener('keydown', function (e) {
        switch (getState()) {
            case GAME_STATE_INIT:
                let gameTypeTemp = getGameType();
                if (e.keyCode == KEYBOARD.ENTER) {
                    setState(GAME_STATE_PLAY);
                } else {
                    if (e.keyCode == KEYBOARD.DOWN) {
                        gameTypeTemp++;
                        if (gameTypeTemp >= GAME_TYPE.length)gameTypeTemp = 0;
                    } else if (e.keyCode == KEYBOARD.UP) {
                        gameTypeTemp--;
                        if (gameTypeTemp < 0)gameTypeTemp = GAME_TYPE.length - 1
                    }
                    setGameType(gameTypeTemp);
                }
                break;
            case GAME_STATE_PLAY:
                if (e.keyCode == KEYBOARD.UP) {
                    upTimer == 0 && (upTimer = setInterval(posCompute.bind(undefined, 'y', -1), UNIT_TIME));
                } else if (e.keyCode == KEYBOARD.DOWN) {
                    downTimer == 0 && (downTimer = setInterval(posCompute.bind(undefined, 'y', 1), UNIT_TIME));
                } else if (e.keyCode == KEYBOARD.LEFT) {
                    leftTimer == 0 && (leftTimer = setInterval(posCompute.bind(undefined, 'x', -1), UNIT_TIME));
                } else if (e.keyCode == KEYBOARD.RIGHT) {
                    rightTimer == 0 && (rightTimer = setInterval(posCompute.bind(undefined, 'x', 1), UNIT_TIME));
                }
                (t == 0 && (upTimer != 0 || downTimer != 0 || leftTimer != 0 || rightTimer != 0)) && (tTimer = setInterval(function () {
                    t++;
                }, UNIT_TIME));
                break;
            case GAME_STATE_PAUSE:
                break;
            case GAME_STATE_WIN:
            case GAME_STATE_OVER:
                break;
        }
    });
    document.addEventListener('keyup', function (e) {
        switch (getState()) {
            case GAME_STATE_INIT:
                break;
            case GAME_STATE_PLAY:
                if (e.keyCode == KEYBOARD.UP) {
                    clearInterval(upTimer);
                    upTimer = 0;
                } else if (e.keyCode == KEYBOARD.DOWN) {
                    clearInterval(downTimer);
                    downTimer = 0;
                } else if (e.keyCode == KEYBOARD.LEFT) {
                    clearInterval(leftTimer);
                    leftTimer = 0;
                } else if (e.keyCode == KEYBOARD.RIGHT) {
                    clearInterval(rightTimer);
                    rightTimer = 0;
                }
                if (upTimer == 0 && downTimer == 0 && leftTimer == 0 && rightTimer == 0) {
                    clearInterval(tTimer);
                    t = 0;
                }
                break;
            case GAME_STATE_PAUSE:
                break;
            case GAME_STATE_WIN:
            case GAME_STATE_OVER:
                break;
        }
    });
});