/**
 * Author: six-u
 * Date: 2020/10/14
 * Des: Obtain Excel file data and convert to JSON data
 */

import XLSX from "xlsx/xlsx.mini.js";

/**
 * 获取数据
 * @param {file} file
 * @return Promise => jsonMap
 */
async function getExcelData2JSON(file) {
    let workbook = await readFile(file);
    let jsonMap = getJSON(workbook);
    return jsonMap
}


/**
 * 获取表格文件
 */
/**
 * 获取表格文件
 * @param {file} file 
 * @return Promise => workbook
 */
function readFile(file) {
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.onload = function (e) {
      let data = e.target.result;
      let workbook = XLSX.read(data, { type: "binary" });
      resolve(workbook);
    };
    reader.readAsBinaryString(file);
  });
}


/**
 * 将表格数据转为JSON数据
 * @param {Object} workbook 
 */
function getJSON(workbook){
  let jsonMap = new Map()
  var sheetNames = workbook.SheetNames;
  sheetNames.forEach(sheetName=>{
    let worksheet = workbook.Sheets[sheetName];
    jsonMap.set(sheetName.trim(), XLSX.utils.sheet_to_json(worksheet));
  })
  return jsonMap
}


export default getExcelData2JSON;