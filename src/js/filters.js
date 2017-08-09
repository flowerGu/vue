//手机号格式化
let formats = value=>{
    // return value.toString().replace(/(\d{3})(\d{4})(\d{4})/,'$1****$3')
     value = value.toString().split('');
     value.splice(3,4,'*'.repeat(4));
     return value.join('');
}
//千位分隔符
let separator =(value)=>{
    var value = value.toString().split('').reverse().join('').replace(/(\d{3})/g,"$1,").replace(/\,$/,'').split('').reverse().join('');
    return value;
}
//保留数字
let replaceChinese =value=>{
    if(typeof value!='number' && value.match(/^[0-9]+\.?[0-9]*/)){
        return value.match(/^[0-9]+\.?[0-9]*/)[0] 
    }else{
        return value
    }               
}
//保留两位小数
let decimal=value=>{
    return typeof value=='number' && value/10000
}
export default{
    formats,
    decimal,
    separator,
    replaceChinese,
    decimal
}