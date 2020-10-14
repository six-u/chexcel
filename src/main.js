/**
 * 设计思路
 * 功能：校验excel文件单元格是否符合要求
 * 1. excel文件来源：本地上传
 * 2. 获取数据：xlsx
 * 3. 传入配置：
 * 4. 校验内容记录结果
 * 5. 返回校验结果
 * 6. 返回表格数据
 * 使用方法： CheckExcel(file,[configOfSheetOne,configOfSheetTwo,...])
 *      
 */

/**
 * Author: six-u
 * Date: 2020/10/13
 * name: chexcel
 * Des: Get Excel data and verify data
 */

 import getter from "./getter"
 import checker from "./checker"

/**
 * chexcel主入口
 * @param {file} file 
 * @param {Object} configObj 
 */
function CheckExcel(file,configObj){

  // if (!configObj|| Object.keys(configObj).legnth==0) {
  //   throw new Error(`configObj is required`);
  //   return
  // }
  let excelMap = {}
  getter(file).then(jsonMap=>{
    excelMap = jsonMap
    console.log("excel:",excelMap)
    checker(excelMap,configObj)
  }).catch(err=>{
    console.log(err)
  })
}

CheckExcel.setTips = function (tips) {
  if (window) {
    window._chexcelTips = { ...tips };
  } else {
    globalThis._chexcelTips = { ...tips };
  }
};


/**
 * 挂载到全局
 */
(function () {
  if (window) {
    window.chexcel = CheckExcel;
  } else {
    globalThis.chexcel = CheckExcel;
  }
})();


export default CheckExcel;