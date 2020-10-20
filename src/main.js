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
 * chexcel
 */
function Chexcel(){

  /**
   * 校验方法
   * @param {File} file 
   * @param {Object} rules 
   */
  this.verify = function (file, rules) {
    return getter(file)
      .then((jsonMap) => {
        let excelMap = jsonMap;

        // console.log("excelMap:", excelMap);
        // console.log("rules:", rules);

        // TODO: 入参校验，
        paramsCheck(excelMap, rules);

        let checkResult = checker(excelMap, rules);

        // console.log("checkResult:", checkResult);

        let [outputData, errorData] = output(checkResult);

        return new Promise(function (resolve, reject) {
          resolve({
            data: errorData,
            output: outputData,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function paramsCheck(excelMap, rules) {
    let rst=[]
    for (let [sheetName, sheet] of excelMap){
      rst[0] = Object.keys(rules).includes(sheetName) ? true : false;
      Object.keys(sheet[0]).forEach(column=>{
        rst[2] = Object.keys(rules[sheetName]).includes(column) ? true : false;
      });
    }
    Object.keys(rules).forEach(rule=>{
      rst[1] = excelMap.has(rule)? true : false

      Object.keys(rules[rule]).forEach((column) => {
        rst[3] = Object.keys(excelMap.get(rule)[0]).includes(column) ? true : false;
      });
    })
    // console.log(rst)
    if(rst.every(v=>v)){
      return true
    }else{
      throw new Error( `The Excel file column name does not match the configuration file field` );
      return false
    }
  }
}

/**
 * 设置默认提示
 * @param {Object} tips 
 */
Chexcel.prototype.setTips = function (tips) {
  if (window) {
    window.__chexcelTips__ = { ...tips };
  } else {
    globalThis.__chexcelTips__ = { ...tips };
  }
};

/**
 * 设置默认format正则
 * @param {Object} format 
 */
Chexcel.prototype.setFormat = function (format) {
  if (window) {
    window.__chexcelFormat__ = { ...format };
  } else {
    globalThis.__chexcelFormat__ = { ...format };
  }
};


/**
 * 挂载到全局
 */
(function () {
  if (window) {
    window.chexcel = new Chexcel();
  } else {
    globalThis.chexcel = new Chexcel();
  }
})();

var chexcel = new Chexcel();

// export default chexcel ;
export {chexcel};
// module.exports = chexcel;