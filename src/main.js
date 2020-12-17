/**
 * Author: six-u
 * Date: 2020/10/13
 * name: chexcel
 * Des: Get Excel data and verify data
 */

 import getter from "./getter"
 import checker from "./checker"
 import output from "./output";
 import params from "./params";

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
    // 类型检查
    params.init(file, rules);

    return getter(file)
      .then((excelMap) => {
        // 空值检查
        let isNull = params.isNull(excelMap, rules);

        if (isNull === false) {
          return new Promise(function (resolve, reject) {
            resolve({
              code: -1,
              data: "no data",
              output: "no data",
            });
          });
        }

        //文件列名是否正确检查，至少有一列在校验对象中存在
        let flag = params.isFileCorrect(excelMap, rules);

        console.log(flag);

        if (!flag) {
          return new Promise(function (resolve, reject) {
            resolve({
              code: -2,
              data: "Table column names do not match",
              output: "Table column names do not match",
            });
          });
        }

        // 校验内容
        let checkResult = checker(excelMap, rules);
        // console.log("checkResult:", checkResult);

        let [outputData, errorData] = output(checkResult);
        if (Object.values(outputData).every((v) => v == "All Success")) {
          return new Promise(function (resolve, reject) {
            resolve({
              code: 0,
              data: errorData,
              output: "All success",
            });
          });
        }
        return new Promise(function (resolve, reject) {
          resolve({
            code: 1,
            data: errorData,
            output: outputData,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

}

/**
 * 设置默认提示
 * @param {Object} tips 
 */
Chexcel.prototype.setTips = function (tips) {
  this.defaultTips = {...tips}
};

/**
 * 设置默认format正则
 * @param {Object} format 
 */
Chexcel.prototype.setFormat = function (format) {
  this.defaultFormat = {...format}
};


/**
 * 挂载到全局
 */
(function () {
  if (window) {
    window.chexcel = new Chexcel();
  }
})();

var chexcel = new Chexcel();

export {chexcel};