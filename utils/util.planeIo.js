/**
 * Created by Paul on 2017/2/8.
 */
var func={
    deleteFromArray(array,val){
        array.splice(array.findIndex((v)=>{return v==val}),1);
    }
};
module.exports=func;