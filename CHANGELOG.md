#### v 1.1.7 (2017-04-21)

- 【优化】 qrcode 组件，更新生成二维码支持中文

#### v 1.1.6 (2017-04-18)

- 【优化】 picker 组件重写

#### v 1.1.5 (2017-04-09)

- 【优化】 优化组件代码，更改参数中函数的 this 指向组件自身，若使用箭头函数 this 则指向当前 page
- 【优化】 rater 组件，增加配置项 text 提示文字、defaultTextColor 提示的默认文字颜色，callack 回调函数增加三个参数 value 组件的当前 star 数、data 组件的 data、text 组件的提示文字

#### v 1.1.4 (2017-04-04)

- 【增强】 增加 button 组件
- 【增强】 增加 calendar 组件

#### v 1.1.3 (2017-03-31)

- 【增强】 增加 notification 组件
- 【优化】 隔离所有组件样式表 components/styles
- 【优化】 actionsheet 组件，增加配置项 theme 菜单皮肤 iOS/wx

#### v 1.1.2 (2017-03-24)

- 【优化】 toptips 组件，更新入场与离场动画效果
- 【优化】 dialog 组件，增加配置项 verticalButtons 垂直按钮布局、buttons[].bold 是否加粗按钮的文字
- 【优化】 xnumber 组件，增加配置项 longpress 禁用长按
- 【增强】 增加 seats 组件

#### v 1.1.1 (2017-03-08)

- 【修复】 toast 组件，未触发回调函数

#### v 1.1.0 (2017-03-02)

- 【优化】 优化所有组件，增加参数说明文档

#### v 1.0.4 (2017-02-20)

- 【优化】 refresher 组件，更新 onPulling 事件在正确条件下的触发
- 【增强】 增加 refresher 组件

#### v 1.0.3 (2017-02-18)

- 【增强】 增加 countdown 组件
- 【优化】 countup 组件工厂函数使用es6重写

#### v 1.0.2 (2017-02-16)

- 【优化】 dialog 组件，增加 open、confirm、alert、propmt 快速调用方法
- 【优化】 gallery 组件，更新动画方式为 slideRight
- 【修复】 actionsheet 组件，延时 hide 调用之后二次调用会触发组件隐藏

#### v 1.0.1 (2017-02-15)

- 【增强】 增加 barcode 组件

#### v1.0.0 (2017-02-15)

第一版发布

- Initial release