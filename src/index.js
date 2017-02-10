/**
 * Created by Paul on 2017/1/15.
 */
import {cloneDeep} from 'lodash'
import style from './index.less';
import {UNIT_TIME,SCREEN_WIDTH ,SCREEN_HEIGHT,GOD_MODE,PLANE_ENEMY1_TIME_INTERVAL,
    PLANE_ENEMY2_TIME_INTERVAL,PLANE_ENEMY3_TIME_INTERVAL,MAX_POWER,
    LEVEL_SCORE,LEVEL_SPEED} from './common/config';
import {GAME_STATE_INIT,GAME_STATE_PLAY,GAME_STATE_PAUSE,
    GAME_STATE_OVER,GAME_STATE_WIN,TYPE_STAGE,TYPE_MENU ,TYPE_BG} from './common/const';
import {isReachOut,isHit} from './common/util';
import Bg from './component/bg';
import Menu from './component/menu';
import {PlanePlayer1,PlanePlayer2,PlaneEnemy1,PlaneEnemy2,PlaneEnemy3} from './component/plane';

import './component/move/move.key.js';
/**
 * 数据
 */
// obj
var context = {};//三个画布对象，具体见const
var planeP1;
var planeP2;
var enemyArray = [];//敌机数组
var bulletArray = [];//子弹数组
var enemyBulletArray = [];// TODO 敌机子弹
var menu;
var bg;
var mainTimer;//游戏主定时器

// data
var gameType = 0;
var frames = 0;// 总帧数
var state = GAME_STATE_INIT;// 游戏状态
var mapOffset = 0;// 地图偏移
var speedLevel = 0;// 移动速度（地图，也可理解为战机初始速度）
var score = 0;// 两个玩家的分数和
var id = 0;// 最后一个对象的ID号递增
export default {
    getId(){
        return id;
    },
    setIdPlus(){
        return ++id;
    },
    getBulletArray(){
        return cloneDeep(bulletArray)
    },
    setBulletArrayPush(val){
        bulletArray.push(val);
    },
    getState(){
        return state
    },
    setState(val){
        state=val;
    },
    getSpeedLevel(){
        return speedLevel
    },
    getGameType(){
        return gameType
    },
    setGameType(val){
        gameType=val;
    },
    getPlaneP1(){
        return planeP1;
    }
};

// 连接服务器
var ws;

window.addEventListener('load',()=>{
    // 页面初始化
    var dom = document.getElementsByClassName('form')[0];
    var inputs = document.getElementsByClassName('input--kaede');
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');
    var loginUserBtn = document.getElementById('loginWithUser');
    var loginVisitorBtn = document.getElementById('loginWithVisitor');

    // 样式
    dom.style.width = SCREEN_WIDTH + 'px';
    dom.style.height = SCREEN_HEIGHT + 'px';
    for (let i = 0; i < inputs.length; i++) {
        let inputTemp = inputs[i];
        inputTemp.addEventListener('input', function (inputTemp) {
            return function (e) {
                if (e.target.value.length != 0) {
                    inputTemp.classList.add('input--filled');
                } else {
                    inputTemp.classList.remove('input--filled');
                }
            }
        }(inputTemp))
    }

    ws = new WebSocket("ws://localhost:3000/game/planeIo");
    ws.onopen = function (e) {
        console.log('Connection to server opened');

        // 登录
        loginUserBtn.removeEventListener('click', loginUserFn);
        loginUserBtn.addEventListener('click', loginUserFn);
        loginVisitorBtn.removeEventListener('click', loginVisitorFn);
        loginVisitorBtn.addEventListener('click', loginVisitorFn);

        function loginUserFn() {
            wsSend({
                type: 0,
                username: usernameInput.value,
                password: passwordInput.value
            })
        }

        function loginVisitorFn() {
            wsSend({
                type: 0
            });
        }

    };
    ws.onmessage = function (e) {
        var data = JSON.parse(e.data);
        console.log(data);
        switch (parseInt(data.type)) {
            case 0:
                if (data.code == 200) {
                    dom.style.opacity = 0;
                    init();
                    mainTimer = setInterval(game, UNIT_TIME);
                }
        }
    };
    ws.onclose = function (e) {
        console.log('与服务器断开连接，重连中。。。');
        reconnect();
    };

    function wsSend(data) {
        ws.send(JSON.stringify(data));
    }

    function reconnect() {
        ws = new WebSocket("ws://localhost:8080/game/planeIo")
        try {
            ws.send(Date.now());
        }
        catch (err) {
            err && console.log('服务器失去响应。。。')
        }
    }
});

// 初始化
function init() {
    // canvas
    initCanvas(TYPE_STAGE);
    initCanvas(TYPE_MENU);
    initCanvas(TYPE_BG);
    function initCanvas(type) {
        var c = document.getElementById(type + 'Canvas');
        context[type] = c.getContext('2d');
        c.width = SCREEN_WIDTH;
        c.height = SCREEN_HEIGHT;
    }

    //object
    bg = new Bg(context[TYPE_BG]);
    menu = new Menu(context[TYPE_MENU]);
    menu.resize();
    planeP1 = new PlanePlayer1(context[TYPE_STAGE]);
    //planeP2 = new PlanePlayer2(context[TYPE_STAGE]);

    // FIXME 结束游戏测试
    //planeP1.decreaseHP(MAX_POWER)
}

// 游戏主函数
function game() {
    frames++;
    score = planeP1.score;
    //score = planeP1.score+planeP2.score;
    for (var i = LEVEL_SCORE.length - 1; i >= 0; i--) {
        if (score > LEVEL_SCORE[i]) {
            speedLevel = LEVEL_SPEED[i];
            break;
        }
    }
    //state != GAME_STATE_PAUSE && (mapOffset += speedLevel+1);// FIXME 暂停
    mapOffset += speedLevel + 1;
    bg.draw(mapOffset);
    switch (state) {
        case GAME_STATE_INIT:
            menu.drawInit(gameType, Math.abs((frames % 100 - 50) / 5));
            break;
        case GAME_STATE_PLAY:
            menu.drawPlay(planeP1.score);
            stageDraw();
            break;
        case GAME_STATE_PAUSE:
            break;
        case GAME_STATE_OVER:
            break;
        case GAME_STATE_WIN:
            break;
    }
    if (mapOffset >= SCREEN_HEIGHT)mapOffset = 0;

    // FIXME 防止内存溢出
    frames == 7200000 && (frames = 0);
}

// 渲染战场
function stageDraw() {
    if (!planeP1.isDestroy()) {
        clearStage();
        //planeP2.draw();
        planeP1.draw();
        bulletArrayDraw();
    } else if (planeP1.isDestroyFinish()) {
        clearInterval(mainTimer);
        return;
    } else {
        clearStage();
        planeP1.destroy();
        bulletArrayDraw();
    }
    function clearStage() {
        context['stage'].clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    }

    // 渲染子弹
    function bulletArrayDraw() {
        var bulletTemp;
        for (var i = bulletArray.length - 1; i >= 0; i--) {
            bulletTemp = bulletArray[i];
            !isReachOut(bulletTemp.x, bulletTemp.y, bulletTemp.pos[2], bulletTemp.pos[3]) ? bulletTemp.draw() : bulletArray.splice(i, 1)
        }
    }


    // 渲染敌机
    (function () {
        var enemyArrayTemp, time = frames * UNIT_TIME;
        // 派出敌机
        if (time % PLANE_ENEMY3_TIME_INTERVAL == 0) {
            enemyArray.push(new PlaneEnemy3(context[TYPE_STAGE]))
        } else if (time % PLANE_ENEMY2_TIME_INTERVAL == 0) {
            enemyArray.push(new PlaneEnemy2(context[TYPE_STAGE]))
        } else if (time % PLANE_ENEMY1_TIME_INTERVAL == 0) {
            enemyArray.push(new PlaneEnemy1(context[TYPE_STAGE]))
        }
        // 检查所有敌机状态
        for (var i = enemyArray.length - 1; i >= 0; i--) {
            enemyArrayTemp = enemyArray[i];
            //是否溢出屏幕
            if (!isReachOut(enemyArrayTemp.x, enemyArrayTemp.y, enemyArrayTemp.pos[2], enemyArrayTemp.pos[3])) {
                if (!enemyArrayTemp.isDestroy()) {
                    enemyArrayTemp.draw();
                } else if (enemyArrayTemp.isDestroyFinish()) {
                    enemyArray.splice(i, 1)
                } else {
                    // 加入分数
                    if (!enemyArrayTemp.isDestroyScoreAdded) {
                        enemyArrayTemp.attckBy.score += enemyArrayTemp.score;
                        enemyArrayTemp.isDestroyScoreAdded = true;
                    }
                    // 渲染爆炸
                    enemyArrayTemp.destroy();
                }
            } else {
                enemyArray.splice(i, 1)
            }
            !(enemyArrayTemp.isDestroy()) && enemyIsHit(enemyArrayTemp);
        }

        /**
         * 碰撞判断----敌机
         * @param enemyItem
         */
        function enemyIsHit(enemyItem) {
            // 子弹
            var bulletTemp;
            for (var i = bulletArray.length - 1; i >= 0; i--) {
                bulletTemp = bulletArray[i];
                if (isHit(bulletTemp, enemyItem)) {
                    enemyItem.decreaseHP(bulletTemp.power, bulletTemp.owner);
                    bulletArray.splice(i, 1);
                }
            }
            // player
            if (isHit(planeP1, enemyItem)) {
                !GOD_MODE && planeP1.decreaseHP();
                enemyItem.decreaseHP(MAX_POWER, planeP1);
            }
            //if (isHit(planeP2, enemyItem)) {
            //    !GOD_MODE && planeP2.decreaseHP();
            //    enemyItem.decreaseHP(MAX_POWER, planeP2);
            //}
        }
    }());
}