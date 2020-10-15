/**
 * 功能：校验excel文件单元格是否符合要求
 * 1. excel文件来源：本地上传
 * 2. 获取数据：xlsx
 * 3. 传入配置：
 * 4. 校验内容记录结果
 * 5. 返回校验结果
 * 使用方法： chexcel(file,[configOfSheetOne,configOfSheetTwo,...])
 */

/**
 * Author: six-u
 * Date: 2020/10/13
 * name: chexcel
 * Des: Get Excel data and verify data
 */

 import getter from "./getter"
 import checker from "./checker"
 import output from "./output";

/**
 * chexcel主入口
 * @param {file} file 
 * @param {Object} configObj 
 */
function chexcel(file,configObj){
  // TODO: 入参校验
  // if (!configObj|| Object.keys(configObj).legnth==0) {
  //   throw new Error(`configObj is required`);
  //   return
  // }
  return getter(file).then(jsonMap=>{
    let excelMap = jsonMap;
    // console.log("excel:",excelMap)
    let checkResult = checker(excelMap,configObj)
    let outputObj = output(checkResult, configObj);
    console.log("chexcel:", outputObj);
    return new Promise(function(resolve,reject){
      resolve(outputObj);
    });
  }).catch(err=>{
    console.log(err)
  })
}

chexcel.setTips = function (tips) {
  if (window) {
    window._chexcelTips = { ...tips };
  } else {
    globalThis._chexcelTips = { ...tips };
  }
};

chexcel.setFormat = function (format) {
  if (window) {
    window._chexcelFormat = { ...format };
  } else {
    globalThis._chexcelFormat = { ...format };
  }
};


/**
 * 挂载到全局
 */
(function () {
  if (window) {
    window.chexcel = chexcel;
  } else {
    globalThis.chexcel = chexcel;
  }
})();


export default chexcel;