# chexcel

#### 介绍

一个校验 Excel 文件单元格内容的 JavaScript 插件。

chexcel 函数需传入 Excel 文件以及文件对应的校验规则对象，详见 demo/data/测试数据.xlsx，以及 demo/js/checkConfig.js 文件。

chexcek 函数返回一个校验结果对象，包含三个属性 code、data 和 output，其中 data 为校验结果数据，其属性以 sheet 数组为单位，属性名为 sheet 表名。示例：

```javascript
// 传入的数据列名与配置列不匹配
{
    code: -2,
    data: "Table column names do not match",
    output: "Table column names do not match",
}
// 传入的文件除列名外（第二行开始）没有数据
{
    code: -1
    data: "no data"
    output: "no data"
}
// 校验通过
{
    code: 0
    data: "All success"
    output: "All success"
}
// 校验不通过
{
    code: 1
    data:{
        Sheet1:[
            {
                层:{
                    format: false
                    include: true
                    length: true
                    max: true
                    maxLength: true
                    min: true
                    minLength: true
                    norepeat: true
                    pattern: true
                    required: true
                    tips: undefined
                    validator: true
                }
            },
            // ...
        ]
        Sheet2:[]
    },
    output:{
        Sheet1:[
            {
                line: 2,
                tips: [
                    {
                        column: "层",
                        tips: "format验证不通过"
                    }
                ]
            }
            // ...
        ],
        Sheet2: [
            // ...
        ]
    }
}
```

#### 项目运行

1.  下载本库
2.  运行 npm i 安装依赖
3.  运行 npx webpack (需要全局 webpack webpack-cli 环境)
4.  生成 chexcel.js 文件 引入 index.html 即可

#### NPM 安装教程

尚未上传 npm

#### script 引入

1. 下载 demo/js/chexcel.js，使用<script>标签引入即可

#### 使用说明

1. 通过 chexcel.verify(file,config)调用函数

2. chexcel.setTips(tips) 设置提示内容（开发中，未完善）

3. chexcel.setFormat(formatList)设置 format 校验规则

   config 示例：

   ```javascript
   // file config
   let configObj = {
     // sheet config
     Sheet1: {
       // column config
       库位号: {
         required: true, // Boolean 是否必填
         pattern: /^[A-Z]{1,2}[0-9]+$/, // RegExp 正则表达式
         minLength: 5, // Number 字符最小长度
         maxLength: 20, // Number 字符最大长度
         length: undefined, // Number 限定字符长度
         min: undefined, // Number 最小值（转为数字校验,如转换不成功则不校验）
         max: undefined, // Number 最大值（转为数字校验,如转换不成功则不校验）
         format: undefined, // String 常用正则验证（可通过chexcel.setFormat(formatList)自定义），默认为 number/url/tel/email
         validator: undefined, // Function 自定义校验函数
         include: undefined, // Array 限定为给定值
         norepeat: true, // Boolean 是否开启列数据重复校验
         tips: "库位号错误",
       },
       区域: {
         required: true,
         pattern: /^[A-Z]{1,2}[0-9]*/,
         minLength: 2,
         maxLength: 20,
         length: undefined,
         min: 1,
         max: 9,
         format: undefined,
         validator: undefined,
         include: undefined,
         norepeat: undefined,
         tips: "区域错误",
       },
     },
   };
   ```

   其余示例，可参看 [demo](/project/chexcel-demo/index.html)

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

## 鸣谢

感谢 [js-xlsx](https://github.com/protobi/js-xlsx) 及其开发者和其他所有贡献者，本函数读取 Excel 数据功能完全依赖于 [js-xlsx](https://github.com/protobi/js-xlsx) ，主要使用其 read 方法以及 utils.sheet_to_json()方法。
