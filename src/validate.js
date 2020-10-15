const validate = {
  tips: {},
  defaultFormat: {},
  init(){
    this.getFormat();
  },
  getFormat(){
    if (window._chexcelFormat) {
      this.defaultFormat = window._chexcelFormat;
    } else if (globalThis._chexcelFormat) {
      this.defaultFormat = globalThis._chexcelFormat;
    } else {
      this.defaultFormat = {
        // TODO: 增加默认 format 正则
        number: /^[0-9]+$/,
      };
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
      throw new Error(
        `The validator attribute of the verification rule of ${column} is not a function`
      );
    }
  },
  required(cell, rule) {
    if (rule) {
      return cell == "" ? false : true;
    } else {
      return true;
    }
  },
  include(cell, rule) {
    if (!Array.isArray(rule)) {
      throw new Error(
        `The include attribute of the verification rule of ${column} is not an array`
      );
    }
    if (!rule.length) {
      throw new Error(
        `There is no value in the include array of the ${column} validation rule`
      );
    }
    return rule.include(cell);
  },
  pattern(cell, rule) {
    if (rule.constructor !== RegExp) {
      throw new Error(
        `The pattern attribute of the validation rule of ${column} is not an instance of the RegExp object`
      );
    }
    return rule.test(cell);
  },
  format(cell, rule) {
    if (this.defaultFormat[rule]) {
      return this.defaultFormat[rule].test(cell);
    } else {
      throw new Error(
        `The format attribute configuration of the validation rule of ${column} failed, it can only be one of ${Object.keys(
          this.defaultFormat
        ).join(",")}`
      );
    }
  },
  length(cell, rule) {
    if(typeof rule !== 'number'){
      throw new Error(
        `The length attribute configuration of the validation rule of ${column} is not a number`
      );
    }
    return (cell + "").length === rule;
  },
  minLength(cell, rule) {
    if (typeof rule !== "number") {
      throw new Error(
        `The minLength attribute configuration of the validation rule of ${column} is not a number`
      );
    }
    return (cell + "").length >= rule;
  },
  maxLength(cell, rule) {
    if (typeof rule !== "number") {
      throw new Error(
        `The maxLength attribute configuration of the validation rule of ${column} is not a number`
      );
    }
    return (cell + "").length <= rule;
  },
  min(cell, rule) {
    if (typeof rule !== "number") {
      throw new Error(
        `The min attribute configuration of the validation rule of ${column} is not a number`
      );
    }
    if (/^[0-9]+$/.test(cell)) {
      return Number(cell) >= rule;
    }else{
      return true
    }
  },
  max(cell, rule) {
    if (typeof rule !== "number") {
      throw new Error(
        `The max attribute configuration of the validation rule of ${column} is not a number`
      );
    }
    if (/^[0-9]+$/.test(cell)) {
      return Number(cell) <= rule;
    } else {
      return true;
    }
  },
};

export default validate;
