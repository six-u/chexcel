/**
 * Author: six-u
 * Date: 2020/10/14
 * Des: Data validation
 */
import validate from "./validate";

/**
 * 根据配置校验数据
 * @param {Map} excelMap 
 * @param {Object} configObj 
 */
function checker(excelMap,configObj){
  // console.log("configObj:", configObj);

  let checkResult = {};
  for (let [sheetName, sheet] of excelMap){
    // console.log(sheetName, sheet);
    // console.log("configObj[" + sheetName + "]:", configObj[sheetName]);
    checkResult[sheetName] = checkSheet(sheetName, sheet, configObj[sheetName]);
  }
  // console.log("checkResult:", checkResult);
  return checkResult
}

/**
 * 校验一张sheet
 * @param {Array} sheet 
 * @param {Object} rules 
 */
function checkSheet(sheetName, sheet, rules) {
  // 查重暂存数据
  let repeatObj = {};
  Object.keys(rules).forEach((key) => {
    if (rules[key].norepeat) {
      repeatObj[key.trim()] = new Map();
    }
  });
  
  let checkSheetResult = [];
  sheet.forEach((row, i) => {
    checkSheetResult.push(checkRow(row, rules, repeatObj));
  });
  // console.log(checkSheetResult);
  return checkSheetResult;
}

/**
 * 校验一行
 * @param {Object} cell 
 * @param {Object} rule 
 */
function checkRow(row, rules, repeatObj) {
  // console.log("checkRow:", row, rules);

  let resultList = {};
  Object.keys(row).forEach((column) => {
    resultList[column.trim()] = checkCell(
      column.trim(), // 列名
      row[column.trim()], // 单元格数据
      rules[column.trim()], // 单元格校验规则
      repeatObj // 查重Map
    );
  });
  // console.log("repeatObj:", repeatObj);
  // console.log("checkRowResult:", resultList);
  return resultList;
}

/**
 * 校验单元格
 * @param {String} cell 
 * @param {Object} rule 
 */
function checkCell(column, cell, rule, repeatObj) {
  // console.log("column:", column, "cell:", cell, "rule:", rule, "repeatObj:", repeatObj);

  let validateResult = {
    validator: true,
    required: true,
    include: true,
    pattern: true,
    format: true,
    length: true,
    minLength: true,
    maxLength: true,
    min: true,
    max: true,
    norepeat: true,
  };

  // 初始化校验信息
  validate.init();

  // 查重
  if (rule.norepeat) {
    validateResult.norepeat = validate.norepeat(cell, repeatObj, column);
    if (!validateResult.norepeat) {
      return validateResult;
    }
  }
  
  // 存在自定义校验方法则单独处理，传入cell值，需返回validateResult对象
  // TODO: 引入类型系统，使用typescript或者Flow
  if (rule.validator) {
    let resultObj = validate.validator(cell, rule.validator);
    return { isValidator: true, validateResult: resultObj };
  }
  
  // 其他校验规则
  let keys = [
    "require",
    "include",
    "pattern",
    "format",
    "length",
    "minLength",
    "maxLength",
    "min",
    "max",
  ];
  keys.forEach((key) => {
    if (rule[key]) {
      validateResult[key] = validate[key](cell, rule[key]);
      if (!validateResult[key]) {
        return validateResult;
      }
    }
  });

  return validateResult;
}


export default checker