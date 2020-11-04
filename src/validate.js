/**
 * Author: six-u
 * Date: 2020/10/15
 * Des: validate function
 */

const validate = {
  defaultFormat: {
    number: /^[0-9]+$/,
    email: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    tel: /^1[3456789]\d{9}$/,
    url: /^[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9]+\.[A-Za-z0-9-_%&\?\/=]+$/,
  },
  init() {
    this.getFormat();
  },
  getFormat() {
    if (window.__chexcelFormat__) {
      this.defaultFormat = Object.assign(
        this.defaultFormat,
        window.__chexcelFormat__
      );
    }
    if (globalThis.__chexcelFormat__) {
      this.defaultFormat = Object.assign(
        this.defaultFormat,
        globalThis.__chexcelFormat__
      );
    }
  },
  validator(cell, rule) {
    if (typeof rule == "function") {
      let validateResult = {
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
      rule(cell, validateResult);
      return validateResult;
    } else {
      console.error(
        `chexcel Error: The validator attribute of the verification rule of ${column} is not a function`
      );
      throw new Error(
        `chexcel Error: The validator attribute of the verification rule of ${column} is not a function`
      );
    }
  },
  required(cell, rule) {
    console.log(cell, rule)
    if (rule) {
     return (cell == "" ||
        cell == undefined ||
        cell == null)
        ? false
        : true;
    } else {
      return true;
    }
  },
  include(cell, rule) {
    if (!Array.isArray(rule)) {
      console.error(
        `chexcel Error: The include attribute of the verification rule of ${column} is not an array`
      );
      throw new Error(
        `chexcel Error: The include attribute of the verification rule of ${column} is not an array`
      );
    }
    if (!rule.length) {
      console.error(
        `chexcel Error: There is no value in the include array of the ${column} validation rule`
      );
      throw new Error(
        `chexcel Error: There is no value in the include array of the ${column} validation rule`
      );
    }
    return rule.includes(cell);
  },
  pattern(cell, rule) {
    if (rule.constructor !== RegExp) {
      console.error(
        `chexcel Error: The pattern attribute of the validation rule of ${column} is not an instance of the RegExp object`
      );
      throw new Error(
        `chexcel Error: The pattern attribute of the validation rule of ${column} is not an instance of the RegExp object`
      );
    }
    return rule.test(cell);
  },
  format(cell, rule) {
    if (this.defaultFormat[rule]) {
      return this.defaultFormat[rule].test(cell);
    } else {
      console.error(
        `chexcel Error: The format attribute configuration of the validation rule of ${column} failed, it can only be one of ${Object.keys(
          this.defaultFormat
        ).join(",")}`
      );
      throw new Error(
        `chexcel Error: The format attribute configuration of the validation rule of ${column} failed, it can only be one of ${Object.keys(
          this.defaultFormat
        ).join(",")}`
      );
    }
  },
  length(cell, rule) {
    if (typeof rule !== "number") {
      console.error(
        `chexcel Error: The length attribute configuration of the validation rule of ${column} is not a number`
      );
      throw new Error(
        `chexcel Error: The length attribute configuration of the validation rule of ${column} is not a number`
      );
    }
    return (cell + "").length === rule;
  },
  minLength(cell, rule) {
    if (typeof rule !== "number") {
      console.error(
        `chexcel Error: The minLength attribute configuration of the validation rule of ${column} is not a number`
      );
      throw new Error(
        `chexcel Error: The minLength attribute configuration of the validation rule of ${column} is not a number`
      );
    }
    return (cell + "").length >= rule;
  },
  maxLength(cell, rule) {
    if (typeof rule !== "number") {
      console.error(
        `chexcel Error: The maxLength attribute configuration of the validation rule of ${column} is not a number`
      );
      throw new Error(
        `chexcel Error: The maxLength attribute configuration of the validation rule of ${column} is not a number`
      );
    }
    return (cell + "").length <= rule;
  },
  min(cell, rule) {
    if (typeof rule !== "number") {
      console.error(
        `chexcel Error: The min attribute configuration of the validation rule of ${column} is not a number`
      );
      throw new Error(
        `chexcel Error: The min attribute configuration of the validation rule of ${column} is not a number`
      );
    }
    if (/^[0-9]+$/.test(cell)) {
      return Number(cell) >= rule;
    } else {
      return true;
    }
  },
  max(cell, rule) {
    if (typeof rule !== "number") {
      console.error(
        `chexcel Error: The max attribute configuration of the validation rule of ${column} is not a number`
      );
      throw new Error(
        `chexcel Error: The max attribute configuration of the validation rule of ${column} is not a number`
      );
    }
    if (/^[0-9]+$/.test(cell)) {
      return Number(cell) <= rule;
    } else {
      return true;
    }
  },
  norepeat(cell, repeatObj, column) {
    if (repeatObj[column]) {
      if (repeatObj[column].has(cell)) {
        return false;
      } else {
        repeatObj[column].set(cell, 1);
        return true;
      }
    } else {
      return true;
    }
  },
};

export default validate;
