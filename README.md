# chexcel

#### 介绍
一个读取校验Excel文件单元格内容的JavaScript函数。

chexcel函数需传入Excel文件以及文件对应的校验规则对象，详见demo/data/测试数据.xlsx，以及demo/js/checkConfig.js 文件。

chexcek函数返回一个校验结果对象，示例

```javascript
{
	Sheet1:[
		{
      line: 2,
      tips: [
        '层列正则验证不通过'
      ]
    },{
      line: 4,
      tips: [
        '库位号列正则验证不通过',
        '库位号列的长度不够'
      ]
    }
	],
  Sheet2:[
    line: 4,
      tips: [
      '层列正则验证不通过'
    ]
  ]
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

1.  通过chexcel(file,config)调用函数
2.  chexcel.setTips(tips) 设置提示内容（开发中，未完善）
3.  chexcel.setFormat(formatList)设置format校验规则（开发中，未完善）
4.  (规划)使用新的参数开启列数据查重
#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

## 鸣谢

感谢 [js-xlsx](https://github.com/protobi/js-xlsx) 及其开发者和其他所有贡献者，本函数读取Excel数据功能完全依赖于 [js-xlsx](https://github.com/protobi/js-xlsx) ，主要使用其read方法以及utils.sheet_to_json()方法。

