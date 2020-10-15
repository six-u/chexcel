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
  let checkSheetResult = [];
  sheet.forEach((row, i) => {
    checkSheetResult.push(checkRow(row, rules));
  });
  // console.log(checkSheetResult);
  return checkSheetResult;
}

/**
 * 校验一行
 * @param {Object} cell 
 * @param {Object} rule 
 */
function checkRow(row,rules) {
  // console.log("checkRow:", row, rules);
  let keys = Object.keys(row);
  let resultList = {}
  keys.forEach((column) => {
    // console.log(column);
    resultList[column.trim()] = checkCell(
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
  };

  // 初始化校验信息
  validate.init();

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