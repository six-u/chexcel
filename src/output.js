/**
 * Author: six-u
 * Date: 2020/10/15
 * Des: Output verification result
 */

/**
 * 校验结果输出
 * @param {Object} checkResult 
 * @param {Object} configObj 
 */
function output(checkResult, configObj) {
  // console.log(checkResult);
  //init
  let baseTips = {};
  getTips();

  let outputObj = {};
  let sheetNames = Object.keys(checkResult);
  sheetNames.forEach((sheetName) => {
    outputObj[sheetName]  = []
    checkResult[sheetName].forEach((row, index) => {
      let temp = getRowTip(row, sheetName);
      if(temp.length!=0){
        let outputLine = {
          line: index + 2,
          tips: temp,
        };
        outputObj[sheetName].push(outputLine);
      }
    });
  });
  return outputObj;

  /**
   * 获取行校验信息
   * @param {String} sheetName
   * @param {Object} row
   */
  function getRowTip(row, sheetName) {
    // console.log("row:", row);
    let rowTips = [];
    Object.keys(row).forEach((column) => {
      let temp = []
      if (row[column].isValidator) {
        temp = getColunmTip(row[column].validateResult, sheetName, column);
      } else {
        temp = getColunmTip(row[column], sheetName, column);
      }
      if(Array.isArray(temp)){
        rowTips = rowTips.concat(temp);
      }
    });
    // console.log("rowTips:",rowTips);
    return rowTips;
  }

  /**
   * 获取单元格校验信息
   * @param {Object} columnCheck 
   * @param {String} sheetName 
   * @param {String} column 
   */
  function getColunmTip(columnCheck, sheetName, column) {
    // console.log(columnCheck, sheetName, column, line);
    if (Object.values(columnCheck).every((v) => v)) {
      return true;
    } else {
      let columnTips = [];
      Object.keys(columnCheck).forEach((rule) => {
        if (columnCheck[rule] === false) {
          let str = "";
          if (rule != "include") {
            str = column + baseTips[rule];
          } else {
            str =
              column +
              baseTips[rule] + "< " +
              configObj[sheetName][column][rule].join(", ")+" >";
          }
          columnTips.push(str);
        }
      });
      // console.log(columnTips);
      return columnTips;
    }
  }

  /**
   * 获取错误提示信息
   */
  function getTips() {
    if (window.__chexcelTips__) {
      baseTips = window.__chexcelTips__;
    } else if (globalThis.__chexcelTips__) {
      baseTips = globalThis.__chexcelTips__;
    } else {
      baseTips = {
        required: "列为必传项",
        pattern: "列正则验证不通过",
        minLength: "列的长度不够",
        maxLength: "列超出长度限制",
        length: "列的长度不对",
        min: "列小于接受的最小值",
        max: "列超出接受的最大值",
        include: "列的值没有包含在",
        format: "列format验证不通过",
        norepeat: "列重复",
      };
    }
  }

}





export default output;

