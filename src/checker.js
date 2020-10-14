/**
 * Author: six-u
 * Date: 2020/10/14
 * Des: Data validation
 */
import validate from "./validate";

let checkResult = {};
/**
 * 根据配置校验数据
 * @param {Map} excelMap 
 * @param {Object} configObj 
 */
function checker(excelMap,configObj){
  console.log("configObj:", configObj);
  for (let [sheetName, sheet] of excelMap){
    // console.log(sheetName, sheet);
    // console.log("configObj[" + sheetName + "]:", configObj[sheetName]);
    checkSheet(sheetName, sheet, configObj[sheetName]);
  }
  return checkResult
}

/**
 * 校验一张sheet
 * @param {Array} sheet 
 * @param {Object} rules 
 */
function checkSheet(sheetName, sheet, rules) {
  checkResult[sheetName]=[]
  sheet.forEach((row, i) => {
    checkResult[sheetName].push(checkRow(row, rules))
  });
}

/**
 * 校验一行
 * @param {Object} cell 
 * @param {Object} rule 
 */
function checkRow(row,rules) {
  // console.log("checkRow:", row, rules);
  let keys = Object.keys(row);
  let resultList = new Array(keys.length).fill(false)
  keys.forEach((column,i) => {
    // console.log(column);
    resultList[i] = checkCell(
      column.trim(),
      row[column.trim()],
      rules[column.trim()]
    );
  });
  return resultList;
}

/**
 * 校验单元格
 * @param {String} cell 
 * @param {Object} rule 
 */
function checkCell(column, cell, rule) {
  // console.log("column:", column, "cell:", cell, "rule:", rule);
  let validateResult = []

  // 初始化提示信息
  validate.getTips()

  if (rule.validator) {
    if (rule.validator){
      validateResult = rule.validator(cell)
    }else{
      throw new Error(
        `The validator attribute of the verification rule of ${column} is not a function`
      );
    }
    return validateResult;
  }
  if (rule.format) {
    //TODO: 常用校验定义
  }
  if (rule.required ?? rule.required) {
    validateResult = validate.required(cell, rule.required);
    return;
  }
  if (rule.include) {
    
  }
  if (rule.pattern) {
  }
  if (rule.length) {
  }
  if (rule.minLength) {
  }
  if (rule.maxLength) {
  }
  if (rule.min) {
  }
  if (rule.max) {
  }
}








export default checker