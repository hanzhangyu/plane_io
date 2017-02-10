/**
 * Created by Paul on 2017/1/15.
 */
import bg from '../images/bg.png';
import img from '../images/img.png';

/**************画布ID前缀*****************/
export const  TYPE_STAGE='stage';//子弹飞机，还有以后的BUFF
export const  TYPE_MENU='menu';//所有菜单和状态
export const  TYPE_BG='bg';//B键已扣，不死不停的背景

/**************样式*****************/
export const  COLOR_MENU_FONT='#8c9293';

/**************文字（为国际化预留接口）*****************/
export const  LABEL_START_OFFLINE = "单人闯关";
export const  LABEL_START_ONLINE = "在线匹配";
export const  LABEL_SCORE = "分数：";

/**************图片资源*****************/
export const  BG_IMAGE = new Image();
BG_IMAGE.src = bg;
export const  MAIN_IMAGE = new Image();
MAIN_IMAGE.src = img;

/**************各个图块在图片中的位置*****************/
// Array[0],Array[1]相对于图片的坐标（坐标轴等同于css坐标轴）
// Array[2],Array[3]对应图块的width，height
// Array[4]包含图块数
// 如果以后要扩展的话注意sprity位置要同类型的向下靠
export const  POS={
    enemy3:[0,0,110,164,1],
    enemy3Crack:[0,165,110,169,6],
    enemy2:[67,1185,46,60,1],
    enemy2Crack:[67,1246,46,60,4],
    enemy1:[67,1490,34,24,1],
    enemy1Crack:[67,1515,34,24,4],
    self:[0,1185,66,80,2],
    selfCrack:[0,1347,66,82,3],
    bullet:[102,1490,6,14,1],
    selectBtn:[0,1596,24,20,2]
};
// 图片margin
export const  POS_MARGIN=1;

/**************按键编码*****************/
export const  KEYBOARD = {
    UP: 38,
    DOWN: 40,
    RIGHT: 39,
    LEFT: 37,
    SPACE: 32,
    TAB: 9,
    ENTER: 13,
    CTRL: 17,
    ALT: 18,
    Num0: 48,
    Num1: 49,
    Num2: 50,
    Num3: 51,
    Num4: 52,
    Num5: 53,
    Num6: 54,
    Num7: 55,
    Num8: 56,
    Num9: 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90
};

/**************单帧图片的时间*****************/
export const UNIT_TIME_PIC=160;

/**************游戏类型*****************/
export const  GAME_TYPE=['GAME_TYPE_OFFLINE','GAME_TYPE_ONLINE'];//这里使用数组主要考虑到切换游戏方式比较简单，++--就OK了

/**************游戏状态*****************/
export const  GAME_STATE_INIT = 0;
export const  GAME_STATE_PLAY = 1;
export const  GAME_STATE_PAUSE = 2;
export const  GAME_STATE_OVER = 3;
export const  GAME_STATE_WIN = 4;

/**************子弹类型*****************/
export const  BULLET_TYPE_1 = "bullet";//P1
export const  BULLET_TYPE_2 = "not found";//TODO P2

/**************TYPE对码表*****************/
export const  TYPE_LOGIN=0;
export const  TYPE_CONNECT=1;



