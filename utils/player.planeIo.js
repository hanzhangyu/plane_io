/**
 * Created by Paul on 2017/2/6.
 */
var func=require('./util.planeIo.js');
module.exports = {
    player: {},
    playerID: [],
    playerWaitID: [],
    playerPlayingID: [],
    playerConnected(id,ws){
        this.player[id]=ws;
        this.playerID.push(id);
    },
    playSearchGame(id){
        this.playerWaitID.push(id);
    },
    playerPlaying(id){
        func.deleteFromArray(this.playerWaitID,id);
        this.playerPlayingID.push(id);
    },
    playerGameOver(id){
        func.deleteFromArray(this.playerPlayingID,id);
        this.playerWaitID.push(id);
    }
};