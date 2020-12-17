# chexcel 使用文档

# 打包

```shell
npx webpack --mode production  // 生产环境
```

或

```shell
npx webpack --mode development // 开发环境
```

# 使用

## demo

点击查看 [demo](https://six-u.gitee.io/project/chexcel-demo/index.html)，

## 引入

直接引入打包生成的 js 文件，实例挂载在 window 上。

```HTML
<script src="chexcel.js"></script>
```

## 调用

```javascript
chexcel.verify(file, option).then(res => {
  // 校验结果
});
```

### 参数

| key    | description           | default |
| ------ | --------------------- | ------- |
| file   | 需要校验的 excel 文件 | 无      |
| option | 校验规则配置，详见下  | 无      |

### option

完整 option 配置示例如下：

```javascript
{
Sheet1: { // sheet表名
    // column config
    columnName: {  // 列名
      required: true, // 是否必传，Boolean， 默认为undefined
      pattern: /^[A-Z]{1,2}[0-9]+$/,  // 自定校验正则，RegExp，默认为undefined
      minLength: 5, // 最小字符长度，Number，默认为undefined
      maxLength: 20, //最大字符长度，Number，默认为undefined
      length: undefined, // 字符长度，Number，默认为undefined
      min: undefined, // 最小值，Number，默认为undefined
      max: undefined, // 最大值，Number，默认为undefined
      format: undefined, // 使用默认正则，可通过chexcel.setFormat调用添加（暂未实现），String，默认为undefined
      validator: function (cell, validate) {
        if (!/^[A-Z]{1,2}[0-9]{3,7}$/.test(cell)) {
          validate.pattern = false;
        }
      }, // 自定义校验方法，若存在则不进行其他规则校验，Function，默认为undefined
      include: undefined, // 是否包含在给定的值中，需传入数组，Array，默认为undefined
      norepeat: true, // 列重复校验，Boolean，默认为undefined
      tips: "必填，接受5-20位字符，以1到2位大写字母开头后跟至少1位数字，且本列数据不可重复",  // 校验不通过时显示的提示信息，String，默认为undefined
    },
    // ...  // 其他列
  }
  // ... // 其他sheet表
}
```

#### validator

自定义校验函数，**尚不支持异步校验。**

| params   | type   | description    |
| -------- | ------ | -------------- |
| cell     | String | 当前单元格的值 |
| validate | Object | 校验结果       |

校验结果返回，只需设置 validate 对应的属性即可，true 表示校验通过或不需校验，false 表示校验不通过，默认均为 true

```javascript
validate = {
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
```

## 返回值

校验为异步校验，采用 promise 编写，需在 then 中接收校验结果。

**可能的情况：**

### 1.没有数据

```javascript
{
    code: -1,
    data: "no data",
    output: "no data",
}
```

### 2.配置 option 和文件表格列不匹配

```javascript
{
    code: -2,
    data: "Table column names do not match",
    output: "Table column names do not match",
}
```

### 3.校验通过

```javascript
{
    code: 0,
    data: {/* ... */},
    output: "All success",
}
```

### 4.校验不通过

```javascript
{
    code: 1,
    data: {/* ... */},
    output: {/* ... */},
}
```

#### data

返回校验结果原始数据，仅返回校验不通过的数据，示例：

```javascript
{
	sheet表名:[
        {
            column1:{
                // line: 3,  // 校验不通过的行号（暂未添加）
                format: true,
                include: true,
                length: true,
                max: true,
                maxLength: true,
                min: true,
                minLength: true,
                norepeat: true,
                pattern: true,
                required: false, // 表示必填验证未通过
                tips: "********"
            },
            // ... // 本行其他列
        },
        // ... // 其他行
	],
    // ... // 其他sheet表
}
```

#### output

返回校验结果组装了提醒语句的数据，仅返回校验不通过的数据，示例：

```javascript
{
	sheet表名:[
		{
			line: 3, // 校验不通过的行号
			tips:[ // 校验不通过的列及tips提示
				{
					column: "columnName"
                	tips: "********"
				},
				// ... // 本行其他列
			]
		},
        // ... // 其他行
	]，
    // ... // 其他sheet表
}
```

## 其他方法

### chexcel.setTips(tips)

自定义 default tips，当校验不通过时，用于提示用户。

chexcel 内置有默认提示，但比较简单，即 tips 默认值，如下：

```javascript
baseTips = {
  required: "必填",
  pattern: "正则验证不通过",
  minLength: "长度不够",
  maxLength: "超出长度限制",
  length: "长度不对",
  min: "小于接受的最小值",
  max: "超出接受的最大值",
  include: "值没有包含在",
  format: "format验证不通过",
  norepeat: "重复数据",
};
```

setTips 传入的 config 与默认对象采用 Object.assign(baseTips,tips)的形式合并。

优先级：chexcel.verify 传入的 tips > chexcel.setTips 传入的 tips > default tips

### chexcel.setFormat(format)

用于设置默认正则，对应 chexcel.verify 传入的 option 中的 format

chexcel 内置基础 format，即：

```javascript
defaultFormat = {
  number: /^[0-9]+$/,
  email: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  tel: /^1[3456789]\d{9}$/,
  url: /^[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9]+\.[A-Za-z0-9-_%&\?\/=]+$/,
};
```

setFormat 传入的 format 与默认对象采用 Object.assign(defaultFormat,format)的形式合并。

#### 使用 format

在调用 chexcel.verify 时，设置需要的各列的 format 值为对应的正则的 key 即可，如

```javascript
format: "number";
```

表示使用 正则：**/^[0-9]+$/** 去校验该列的值
