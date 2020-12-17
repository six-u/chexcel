/**
 * Author: six-u
 * Date: 2020/10/15
 * Des: Output verification result
 */

import chexcel from "./main";

/**
 * 校验结果输出
 * @param {Object} checkResult
 * @param {Object} configObj 
 */
function output(checkResult, configObj) {
  // console.log(checkResult);

  let baseTips = getTips();

  let outputData = {},
    errorData = {};

  let sheetNames = Object.keys(checkResult);

  sheetNames.forEach((sheetName) => {
    
    outputData[sheetName] = [];
    errorData[sheetName] = []

    
    if (typeof checkResult[sheetName] == "string") {
      outputData[sheetName] = checkResult[sheetName];
      errorData[sheetName] = checkResult[sheetName];
    }else{
      checkResult[sheetName].forEach((row, index) => {
        let [temp, info] = getRowTip(row, sheetName);
        if (temp.length != 0) {
          let outputLine = {
            line: index + 2,
            tips: temp,
          };
          outputData[sheetName].push(outputLine);
        }
        if (Object.keys(info).length != 0) {
          errorData[sheetName].push(info);
        }
      });
    }
    if (outputData[sheetName].length == 0) {
      outputData[sheetName] = "All Success";
    }
  });
  
  return [outputData, errorData];

  /**
   * 获取行校验信息
   * @param {Object} row
   * @param {String} sheetName
   */
  function getRowTip(row, sheetName) {
    // console.log("row:", row);
    let rowTips = [],
      info = {};
    Object.keys(row).forEach((column) => {
      let temp = "",
        infoItem = [];
      // 自定义校验
      if (row[column].isValidator) {
        [temp, infoItem] = getColunmTip(
          row[column].validateResult,
          sheetName,
          column
        );
        if (!infoItem) {
          info[column] = row[column].validateResult;
        }
      } else {
        [temp, infoItem] = getColunmTip(row[column], sheetName, column);
        if (!infoItem) {
          info[column] = row[column];
        }
      }

      if (typeof temp == "string") {
        rowTips.push({ column: column, tips: temp });
      }
    });
    return [rowTips, info];
  }

  /**
   * 获取单元格校验信息
   * @param {Object} columnCheck
   * @param {String} sheetName
   * @param {String} column
   */
  function getColunmTip(columnCheck, sheetName, column) {
    // console.log(columnCheck);
    let checkObj = { ...columnCheck };
    delete checkObj.tips;
    if (Object.values(checkObj).every((v) => v)) {
      return [true, true];
    } else {
      if (columnCheck.tips) {
        return [columnCheck.tips, false];
      } else {
        let keys = Object.keys(checkObj),
          len = keys.length,
          i = 0;
        let tips = "";
        while (i < len) {
          let rule = keys[i];
          if (columnCheck[rule] === false) {
            if (rule != "include") {
              tips = baseTips[rule];
            } else {
              tips =
                baseTips[rule] +
                "< " +
                configObj[sheetName][column][rule].join(", ") +
                " >";
            }
            break;
          }
          i++
        }
        return [tips, false];
      }
    }
  }

  /**
   * 获取错误提示信息
   */
  function getTips() {
    let baseTips = {
      required: "必填",
      pattern: "正则验证不通过",
      minLength: "长度不够",
      maxLength: "超出长度限制",
      length: "长度不对",
      min: "小于接受的最小值",
      max: "超出接受的最大值",
      include: "值没有包含在",
      format: "format验证不通过",
      norepeat: "重复数据",
    };

    if (window.chexcel.defaultTips) {
      baseTips = Object.assign(baseTips, window.chexcel.defaultTips);
    }
    return baseTips;
  }
}





export default output;

