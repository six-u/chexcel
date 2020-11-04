/**
 * Author: six-u
 * Date: 2020/10/22
 * Des: Parameter correctness verification
 */

 const paramsCheck = {
  /**
  * 值校验
  * @param {Map} excelMap
  */
  isNull(excelMap) {
    if (Array.from(excelMap).length === 0) {
      console.error(`chexcel Error: Excel file has no data or failed to read`);
      throw new Error(
        `chexcel Error: Excel file has no data or failed to read`
      );
    } else {
      let flag = false;
      Array.from(excelMap).forEach((item) => {
        if (item[1].length != 0) {
          flag = true;
        }
      });
      if (!flag) {
        return false;
      }
    }
  },
  /**
   * 类型校验
   * @param {File} file 
   * @param {Object} rules 
   */
  init(file, rules){
    if (!(file instanceof File)) {
      console.error(`chexcel Error: The first parameter is not a file`);
      throw new Error(`chexcel Error: The first parameter is not a file`);
    }
    if (
      !rules ||
      Object.prototype.toString.call(rules) !== "[object Object]" ||
      Object.keys(rules).length==0 ) {
      console.error(
        `chexcel Error: The second parameter is empty or an unacceptable type, expected to be an object`
      );
      throw new Error(
        `chexcel Error: The second parameter is empty or an unacceptable type, expected to be an object`
      );
    }
  },
  /**
  * 校验文件列名是否与校验规则有对应
  * @param {Map} excelMap 
  * @param {Object} rules 
  */
  isFileCorrect(excelMap, rules) {
    //  console.log(excelMap);
    let flag = false
    for (let [key, value] of excelMap) {
      if(rules[key]){
        Object.keys(value[0]).forEach(v=>{
          // console.log(Object.keys(rules[key]), v);
          if (Object.keys(rules[key]).includes(v)) {
            flag = true
          }
        });
      }
    }
    return flag;
  },
 };



export default paramsCheck;