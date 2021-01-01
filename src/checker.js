/**
 * Author: six-u
 * Date: 2020/10/14
 * Des: Data validation
 */
import validate from "./validate";

/**
 * 根据配置校验数据
 * @param {Map} excelMap 
 * @param {Object} rules 
 */
function checker(excelMap,rules){
  // console.log("rules:", rules);
  let checkResult = {};
  Object.keys(rules).forEach(sheetName=>{
    if (excelMap.has(sheetName) && excelMap.get(sheetName).length>0) {
      checkResult[sheetName] = checkSheet(
        excelMap.get(sheetName),
        rules[sheetName]
      );
    } else {
      checkResult[sheetName] = "no data";
    }
  })
  // console.log("checkResult:", checkResult);
  return checkResult
}

/**
 * 校验一张sheet
 * @param {Array} sheet 
 * @param {Object} rules 
 */
function checkSheet(sheet, rules) {
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

  Object.keys(rules).forEach(rule=>{
    resultList[rule.trim()] = checkCell(
      rule.trim(), // 列名
      row[rule.trim()], // 单元格数据
      rules[rule.trim()], // 单元格校验规则
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
  // console.log("rule:", rule);
  let newCell = typeof cell == 'string' ? cell.trim(): cell

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

  if (!rule) {
    return validateResult;
  }

  // 初始化校验信息
  validate.init();
    if (rule.norepeat) {
      // 查重
      validateResult.norepeat = validate.norepeat(newCell, repeatObj, column);
      if (!validateResult.norepeat) {
        validateResult.tips = rule.tips
        return validateResult;
      }
    }
  // 存在自定义校验方法则单独处理，传入cell值，需返回validateResult对象
  // TODO: 引入类型系统，使用typescript或者Flow
  if (rule.validator) {
    let resultObj = validate.validator(newCell, rule.validator);
      resultObj.tips = rule.tips
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
  let skipPattern = false, skipLength = false

  for(let i=0,len=keys.length;i<len;i++){
    let key = keys[i];
    // 若非必填，且值为空，不再执行其他校验
    if (
      key == "required" &&
      !rule[key] &&
      (newCell == "" || newCell == undefined || newCell == null)
    ) {
      return validateResult;
    }
    if (rule[key]) {
      if (key == "format" && skipPattern) {
        continue;
      }
      if ((key == "minLength" || key == "maxLength") && skipLength) {
        continue;
      }

      validateResult[key] = validate[key](newCell, rule[key]);

      if (!validateResult[key] || key == "include") {
        validateResult.tips = rule.tips;
        return validateResult;
      }

      if (key == "pattern") {
        skipPattern = true;
      }
      if (key == "length") {
        skipLength = true;
      }
    }
  }
  validateResult.tips = rule.tips;
  return validateResult;
}


export default checker