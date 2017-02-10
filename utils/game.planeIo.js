/**
 * Created by Paul on 2017/2/6.
 */
module.exports = {
    games: {},
    gameCount: 0,
    waitGameCount: 0,
    findGame(ws){
        console.log('try to find a game...');
        // 是否有人在匹配队列中
        if (this.waitGameCount) {
            //TODO join game
            console.log('coming little boy...');
            this.waitGameCount--;
        } else {
            //TODO new game
            console.log('create a new game for you,and wait for someone come in');
            this.waitGameCount++;
        }
    }
};