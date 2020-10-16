# chexcel

#### 介绍
一个读取校验Excel文件单元格内容的JavaScript插件。

chexcel函数需传入Excel文件以及文件对应的校验规则对象，详见demo/data/测试数据.xlsx，以及demo/js/checkConfig.js 文件。

chexcek函数返回一个校验结果对象，包含两个属性data和defaultTips，其中data为校验结果数据，其属性以sheet数组为单位，属性名为sheet表名。示例：

```javascript
{
    "data": {
        "Sheet1": [
            {
                "库位号": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "区域": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "通道": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "组": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "层": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": false,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "状态": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                }
            },
            {
                "库位号": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "区域": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "通道": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "组": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "层": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "状态": {
                    "validator": true,
                    "required": true,
                    "include": false,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                }
            },
            {
                "库位号": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": false,
                    "format": true,
                    "length": true,
                    "minLength": false,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "区域": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "通道": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "组": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "层": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "状态": {
                    "validator": true,
                    "required": true,
                    "include": false,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                }
            },
            {
                "库位号": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": false
                },
                "区域": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "通道": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "组": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "层": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "状态": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                }
            }
        ],
        "Sheet2": [
            {
                "库位号": {
                    "isValidator": true,
                    "validateResult": {
                        "required": true,
                        "include": true,
                        "pattern": false,
                        "format": true,
                        "length": true,
                        "minLength": true,
                        "maxLength": true,
                        "min": true,
                        "max": true
                    }
                },
                "区域": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "通道": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "组": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "层": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "状态": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                }
            },
            {
                "库位号": {
                    "isValidator": true,
                    "validateResult": {
                        "required": true,
                        "include": true,
                        "pattern": true,
                        "format": true,
                        "length": true,
                        "minLength": true,
                        "maxLength": true,
                        "min": true,
                        "max": true
                    }
                },
                "区域": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "通道": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "组": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": false,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "层": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "状态": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                }
            },
            {
                "库位号": {
                    "isValidator": true,
                    "validateResult": {
                        "required": true,
                        "include": true,
                        "pattern": true,
                        "format": true,
                        "length": true,
                        "minLength": true,
                        "maxLength": true,
                        "min": true,
                        "max": true
                    }
                },
                "区域": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "通道": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "组": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "层": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": false,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                },
                "状态": {
                    "validator": true,
                    "required": true,
                    "include": true,
                    "pattern": true,
                    "format": true,
                    "length": true,
                    "minLength": true,
                    "maxLength": true,
                    "min": true,
                    "max": true,
                    "norepeat": true
                }
            }
        ]
    },
    "defaultTips": {
        "Sheet1": [
            {
                "line": 2,
                "tips": [
                    "层****列format验证不通过****"
                ]
            },
            {
                "line": 3,
                "tips": [
                    "状态****列的值不是****< 启用, 停用 >"
                ]
            },
            {
                "line": 4,
                "tips": [
                    "库位号****列正则验证不通过****",
                    "库位号****列的长度不够****",
                    "状态****列的值不是****< 启用, 停用 >"
                ]
            },
            {
                "line": 5,
                "tips": [
                    "库位号****列重复****"
                ]
            }
        ],
        "Sheet2": [
            {
                "line": 2,
                "tips": [
                    "库位号****列正则验证不通过****"
                ]
            },
            {
                "line": 3,
                "tips": [
                    "组****列的长度不对****"
                ]
            },
            {
                "line": 4,
                "tips": [
                    "层****列format验证不通过****"
                ]
            }
        ]
    }
}
```



#### NPM安装教程

1.  下载本库
2.  运行 npm i 安装依赖
3.  运行 npx webpack (需要全局webpack webpack-cli 环境)
4.  生成 chexcel.js 文件 引入index.html 即可

#### Script教程

1. 下载demo/js/chexcel.js，使用<script>标签引入即可

#### 使用说明

1. 通过chexcel.verify(file,config)调用函数

2. chexcel.setTips(tips) 设置提示内容（开发中，未完善）

3. chexcel.setFormat(formatList)设置format校验规则

   config 示例：

   ```javascript
   // file config
   let configObj = {
     // sheet config
     Sheet1: {
       // column config
       库位号: {
         required: true,    // Boolean 是否必填
         pattern: /^[A-Z]{1,2}[0-9]+$/,  // RegExp 正则表达式
         minLength: 5, // Number 字符最小长度
         maxLength: 20, // Number 字符最大长度
         length: undefined, // Number 限定字符长度
         min: undefined, // Number 最小值（转为数字校验,如转换不成功则不校验）
         max: undefined, // Number 最大值（转为数字校验,如转换不成功则不校验）
         format: undefined, // String 常用正则验证（可通过chexcel.setFormat(formatList)自定义），默认为 number/url/tel/email
         validator: undefined, // Function 自定义校验函数
         include: undefined, // Array 限定为给定值
         norepeat: true, // Boolean 是否开启列数据重复校验
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
       },
     }
   }
   ```

   其余示例，可参看 [demo](/project/chexcel-demo/index.html)

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

## 鸣谢

感谢 [js-xlsx](https://github.com/protobi/js-xlsx) 及其开发者和其他所有贡献者，本函数读取Excel数据功能完全依赖于 [js-xlsx](https://github.com/protobi/js-xlsx) ，主要使用其read方法以及utils.sheet_to_json()方法。

