/**
 * Created by Paul on 2017/1/15.
 * 菜单及分数
 */
import {POS,LABEL_SCORE,COLOR_MENU_FONT,LABEL_START_OFFLINE,LABEL_START_ONLINE} from '../../common/const';
import {SCREEN_WIDTH ,SCREEN_HEIGHT} from '../../common/config';
import {DefaultCanvas} from '../default';
export default class Menu extends DefaultCanvas {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.pos = POS['selectBtn'];
    }
    resize() {
        var o = 50;//按钮离中心的距离
        var l = 200;//文字长度
        var imgWidth = this.pos[2];//左右图片同等大小
        var imgHeight = this.pos[3];
        var cX = SCREEN_WIDTH / 2;//中心点坐标
        var cY = SCREEN_HEIGHT / 2;

        // 计算固定值
        this._draw = this._draw.bind(this, cX, cY - o,
            cY + o, l, cX - l / 2 - imgWidth / 2, cX + l / 2 - imgWidth / 2,
            cY - o - imgHeight / 2 + 3, cY + o - imgHeight / 2 + 3, o)
    };
    //bfx buttonFlyX
    _draw(cX, btnY1, btnY2, l, bfx1, bfx2, bfy1, bfy2, o, a, b, gType,offsetX) {
        // 两个按钮
        this._defaultStyle();
        this.ctx.fillText(a, cX, btnY1, l);
        this.ctx.fillText(b, cX, btnY2, l);

        //选择ICON
        switch (gType){
            case 0:
                this._drawImageFromMain(bfx1-offsetX,bfy1,this.pos,0);
                this._drawImageFromMain(bfx2+offsetX,bfy1,this.pos,1);
                break;
            case 1:
                this._drawImageFromMain(bfx1-offsetX,bfy2,this.pos,0);
                this._drawImageFromMain(bfx2+offsetX,bfy2,this.pos,1);
                break;
        }
        return this;
    };
    _drawPlay(score){
        // 分数
        this._defaultStyle(18,"left","top");
        this.ctx.fillText(LABEL_SCORE+score,10,10);

        // 暂停按钮
        this.ctx.lineWidth=3;
        this.ctx.beginPath();
        this.ctx.moveTo(SCREEN_WIDTH-25,10);
        this.ctx.lineTo(SCREEN_WIDTH-25,30);
        this.ctx.moveTo(SCREEN_WIDTH-15,10);
        this.ctx.lineTo(SCREEN_WIDTH-15,30);
        this.ctx.strokeStyle=COLOR_MENU_FONT;
        this.ctx.stroke();
    };
    drawInit(gType,offsetX) {
        this._clear()._draw(LABEL_START_OFFLINE, LABEL_START_ONLINE, gType,offsetX);
    };
    drawPlay(score){
        this._clear()._drawPlay(score);
    }
};