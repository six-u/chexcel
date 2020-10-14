const validate = {
  tips: {},
  getTips() {
    if (window._chexcelTips) {
      this.tips = window._chexcelTips;
    } else if (globalThis._chexcelTips) {
      this.tips = globalThis._chexcelTips;
    } else {
      this.tips = {
        required: "为必传",
        pattern: "验证不通过",
        minLength: "长度不够",
        maxLength: "超出长度限制",
        length: "长度不对",
        min: "小于接受的最小值",
        max: "超出接受的最大值",
        // format: "",
        // validator: "",
        include: "没有包含在",
      };
    }
  },
  required(cell, rule) {
    return cell == "" ? "必传" : "pass";
  },
  pattern(cell, rule) {},
  minLength(cell, rule) {},
  maxLength(cell, rule) {},
  length(cell, rule) {},
  min(cell, rule) {},
  max(cell, rule) {},
  format(cell, rule) {},
  validator(cell, rule) {},
  include(cell, rule) {},
};

export default validate;
