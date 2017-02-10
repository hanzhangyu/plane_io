/**
 * Created by Paul on 2017/1/16.
 */
import {SCREEN_WIDTH ,SCREEN_HEIGHT} from '../../common/config';
import {BG_IMAGE} from '../../common/const';
export default class Bg {
    constructor(ctx) {
        this.ctx = ctx;
    }

    draw(y) {
        this.ctx.drawImage(BG_IMAGE, 0, y - SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT);
        this.ctx.drawImage(BG_IMAGE, 0, y, SCREEN_WIDTH, SCREEN_HEIGHT)
    }
};