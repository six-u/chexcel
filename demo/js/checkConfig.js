// file config
let configObj = {
  // sheet config
  Sheet1: {
    // column config
    库位号: {
      required: true,
      pattern: /^[A-Z]{1,2}[0-9]+$/,
      minLength: 5,
      maxLength: 20,
      // length: undefined,
      // min: undefined,
      // max: undefined,
      // format: undefined,
      // validator: undefined,
      // include: undefined,
      norepeat: true,
      tips:
        "(from config) 必填，接受5-20位字符，以1到2位大写字母开头后跟至少1位数字，且本列数据不可重复",
    },
    区域: {
      required: true,
      pattern: /^[A-Z]{1,2}[0-9]*/,
      minLength: 2,
      maxLength: 20,
      // length: undefined,
      // min: undefined,
      // max: undefined,
      // format: undefined,
      // validator: undefined,
      // include: undefined,
      // norepeat: undefined,
      tips: "(from config) 必填，接受2-20位字符，以1到2位大写字母开头后跟至少0位数字",
    },
    通道: {
      required: true,
      pattern: /[0-9A-Z]+/,
      minLength: 1,
      maxLength: 20,
      // length: undefined,
      // min: undefined,
      // max: undefined,
      // format: undefined,
      // validator: undefined,
      // include: undefined,
      // norepeat: undefined,
      tips: "(from config) 必填，接受1-20位大写字母或数字",
    },
    组: {
      required: true,
      pattern: /[0-9A-Z]+/,
      minLength: 1,
      maxLength: 20,
      // length: undefined,
      // min: undefined,
      // max: undefined,
      // format: undefined,
      // validator: undefined,
      // include: undefined,
      // norepeat: undefined,
      tips: "(from config) 必填，接受1-20位大写字母或数字",
    },
    层: {
      required: true,
      // pattern: undefined,
      minLength: 1,
      maxLength: 20,
      // length: undefined,
      // min: undefined,
      // max: undefined,
      format: "number",
      // validator: undefined,
      // include: undefined,
      // norepeat: undefined,
      // tips: "必填，接受1-20位数字",
    },
    状态: {
      required: true,
      // pattern: undefined,
      // minLength: undefined,
      // maxLength: undefined,
      // length: undefined,
      // min: undefined,
      // max: undefined,
      // format: undefined,
      // validator: undefined,
      include: ["启用", "停用"],
      // norepeat: undefined,
      tips: "(from config) 必填，只能填启用或停用",
    },
  },
  Sheet2: {
    // column config
    库位号: {
      required: true,
      pattern: /^[A-Z]{1,2}[0-9]+$/,
      minLength: 5,
      maxLength: 20,
      // length: undefined,
      // min: undefined,
      // max: undefined,
      // format: undefined,
      validator: function (cell, validate) {
        if (!/^[A-Z]{1,2}[0-9]{3,7}$/.test(cell)) {
          validate.pattern = false;
        }
      },
      // include: undefined,
      // norepeat: undefined,
      tips:
        "(from config) 自定义校验覆盖其他校验，接受4-9位字符，以1到2位大写字母开头后跟至少3位数字",
    },
    区域: {
      required: true,
      pattern: /^[A-Z]{1,2}[0-9]*/,
      minLength: 2,
      maxLength: 20,
      // length: undefined,
      // min: undefined,
      // max: undefined,
      // format: undefined,
      // validator: undefined,
      // include: undefined,
      // norepeat: undefined,
      tips: "(from config) 必填，接受2-20位字符，以1到2位大写字母开头后跟至少0位数字",
    },
    通道: {
      required: true,
      pattern: /[0-9A-Z]+/,
      minLength: 1,
      maxLength: 20,
      // length: undefined,
      // min: undefined,
      // max: undefined,
      // format: undefined,
      // validator: undefined,
      // include: undefined,
      // norepeat: undefined,
      tips: "(from config) 必填，接受1-20位大写字母和数字",
    },
    组: {
      required: true,
      pattern: /[0-9A-Z]+/,
      // minLength: undefined,
      // maxLength: undefined,
      length: 2,
      // min: undefined,
      // max: undefined,
      // format: undefined,
      // validator: undefined,
      // include: undefined,
      // norepeat: undefined,
      // tips: "必填，接受大写字母和数字共2位字符",
    },
    层: {
      required: true,
      pattern: /[0-9A-Z]+/,
      minLength: 1,
      maxLength: 20,
      // length: undefined,
      // min: undefined,
      // max: undefined,
      format: "number",
      // validator: undefined,
      // include: undefined,
      // norepeat: undefined,
      tips: "(from config) 必填，pattern优先级高于format，接受1-20位大写字母和数字",
    },
    状态: {
      required: true,
      // pattern: undefined,
      minLength: 1,
      maxLength: 20,
      // length: undefined,
      // min: undefined,
      // max: undefined,
      // format: undefined,
      // validator: undefined,
      include: ["启用", "停用"],
      // norepeat: undefined,
      tips: "(from config) 必填，include优先级高于minLength等长度验证，只能填启用或停用",
    },
  },
};