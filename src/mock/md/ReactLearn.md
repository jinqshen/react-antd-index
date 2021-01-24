#### react（一切都用js）

#### 虚拟DOM的概念：（用js对象形式来模拟页面上的DOM嵌套关系，以JS对象形式存在）

- DOM:document object model浏览器中的概念，用js对象来表示页面上的元素，并提供了操作DOM对象的API
- 虚拟DOM:框架中的概念，是程序员用js对象来模拟页面上的DOM和DOM嵌套

- 为什么要用？=>实现DOM元素的高效更新（按需更新DOM）

- 如何实现按需渲染更新DOM？

  - 获取内存中的新旧两棵DOM树，进行对比，得到需要被按需更新的DOM（？都tm有新的DOM树了还不直接渲染新的就行？ 感觉是不是渲染页面最耗时间，这样对比之后就可以局部渲染）

  - 如何获取新旧DOM树进行对比？

    - 手动模拟：模拟一个元素`<div id="mydiv">jinqshen<p>shen</p></div>`

    - js对象模拟:

      ```js
      var = {
      		tagName:'div',
      		attrs:{
      			id:'mydiv'
      		},
      		childrens:[
      			'jinqshen',
      			{
      				tagName:'p',
      				attrs:{},
      				childrens:['shen']
      			}
      		]
      	}
      ```

- DOM树
  - 一个网页呈现的过程：
    1. 浏览器请求服务器获取页面HTML结构
    2. 浏览器要在内存中解析DOM结构，并在浏览器内存中，渲染出一棵DOM树
    3. 浏览器把DOM树呈现到页面上

#### Diff算法：（高效新旧DOM对比算法）

- tree diff:新旧两棵DOM树，逐层对比的过程
- component diff:在tree diff比对过程中，每一层中组件级别的对比，叫做component diff
- element diff:在进行component diff过程中，如果组件相同就进行元素级别的对比

#### 创建webpack4.x项目

1.  `npm init -y`
2.  项目下创建`src`源目录和`dist`产品目录
3.  在`src`下创建`index.html`
4. 安装`webpack`
   `cnpm install webpack -D -g --save`
   `cnpm install webpack-cli -D -g --save`
   `cnpm install webpack-dev-server -D -g --save`//热部署
5. 注意`webpack`提供了约定大于配置，目的是为了尽量减少配置文件的体积
   默认打包入口:`src->index.js`
   默认输出文件:`dist->main.js`
   4.x新增了`mode`选项(必选项):`development production`

#### webpack-dev-server的基本使用

- 安装`npm install webpack-dev-server`
- 在`package.json`中增加`"dev":webpack-dev-server --open(自动打开浏览器) --port 3000(设置端口) --hot --progress(打包进度) --compress(压缩)  --host 127.0.0.1(指定域名)` 
- `npm run dev`启动后，会在根目录(内存中)写`main.js`，所以要实现热部署需要在`index.html`引入根目录下的`main.js`(不可见)  写在内存的原因是因为内存快

#### html-webpack-plugin

作用是将指定文件生成在内存中，这里是将首页`index.html`生成在内存中

还会自动将生成的`main.js`插入到`index.html`中

- 安装`npm install html-webpack-plugin`

- 创建插件实例

  ```js
  const htmlPlugin = new HtmlWebPackPlugin({
      template: path.join(__dirname, './src/index.html'),//源文件
      filename: 'index.html'//生成的内存中首页的名曾称
  })
  ```

- 将生成的插件实例放到`plugins:[htmlPlugin]`

#### 项目中使用react

- 安装包`npm install react react-dom`
  - `react:`用于创建组件和DOM，同时组件的生命周期都在这个包中
  - `react-dom:`专门进行DOM操作，主要就是`render()`方法

- 在`index.html`页面中创建容器

  `<div id="app"></div>`

- 在`index.js`中导包
  - `import React from 'react'`
  - `import ReactDOM from 'react-dom'`

#### react创建，渲染虚拟DOM元素

- 方式一：`React.createElement()`方法

  参数说明：

  - 创建的元素类型，字符串，表示元素的名称
  - 对象或者`null`，表示元素的属性
  - 子节点(其它DOM节点 或者 文本子节点)
  - 其它子节点

  ```js
  const myh1 = React.createElement('h1', { id : 'myh1', title : 'this is my h1' }, '这是我的h1')
  ```

  渲染：`ReactDOM.render()`方法

  参数说明：

  - 虚拟DOM对象
  - DOM对象，当作一个容器

  ```js
  ReactDOM.render(myh1, document.getElementById('app'))
  ```

- 方式二：`jsx`是最好的方式(保持了html语言结构)，其本质也是转化为`React.createElement()`方法创建，`jsx`中使用`js`代码用`{}`包起来

  ```jsx
  const mytest = <div id="mydiv" title="this is mydiv">aaa</div>
  ```

  需要用`babel-loader`来解析`jsx`，实质作用是转换`jsx`为`React.createElement()`方法

  - 安装`babel`插件

    `npm install @babel/core babel-loader @babel/plugin-transform-runtime`

    `npm install @babel/preset-env @babel/preset-stage-0`

  - 安装能够识别`jsx`语法的包，负责转换`jsx`为`React.createElement()`方法

    `npm install @babel/preset-react`

  - 在`webpack.config.js`中加入

    ```json
    module: {//所有第三方的 模块配置规则
            rules: [//第三方匹配规则
              {//别忘记添加exclude排除项
                test: /\.m?js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env','@babel/preset-react']
                  }
                }
              }
            ]
        }
    ```

  渲染：`ReactDOM.render()`方法

  ```js
  ReactDOM.render(mytest, document.getElementById('app'));
  ```

#### jsx中使用js

在jsx控制区域内需要写js代码，需要用{}包住

- 渲染数字

```jsx
const a = 8;
const mydiv = <div>{ a }</div>;
```

- 渲染字符串

```jsx
const a = 'jinqshen';
const mydiv = <div>{ a }</div>;
```

- 渲染布尔值

```jsx
const bool = true;
const mydiv = <div>{ bool.toString() }</div>;
const mydiv2 = <div>{ bool ? '条件为真' : '条件为假' }</div>;
```

- 为属性绑定值

```jsx
const title = 'xiaoai';
const myp = <p title={ title }></p>;
```

- 渲染jsx元素

```jsx
const h1 = <h1>旭旭宝宝</h1>;
ReactDOM.render({ h1 }, document.getElementById('app'));
```

- 渲染jsx元素数组

```jsx
const arr = [<h1>旭旭宝宝</h1>, <h2>旭旭宝宝</h2>];
ReactDOM.render({ arr }, document.getElementById('app'));
```

- 渲染字符串数组

  方式一：forEach()方法，遍历数组每一项，无返回值

```jsx
const arrStr = ['毛利兰', '柯南', '新一', '灰原哀'];
const nameArr = [];
arrStr.forEach(item => {
	const temp = <h5>item</h5>;
	nameArr.push(temp);
});
ReactDOM.render({ nameArr }, document.getElementById('app'));
```

​		方式二：map()方法，遍历数组的每一项，生成一个新的数组，有返回值

```jsx
ReactDOM.render(
	{ arrStr.map(item => <h5> { item }</h5>) }, document.getElementById('app')
)
```

#### 循环中key的作用

作用：保持每个元素的状态

下面代码中：`:key = item.id`

如果不加，选中某`li`前的`checkbox`，再增加元素，`checkbox`不会随之前绑定的`li`而走动

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>webpack</title>
    <script src="vue.js"></script>
</head>
<body>
    <div id="app">
        <div>
            <input type="text" v-model="uname" />
            <button @click="add()">添加</button>
        </div>

        <ul>
            <li v-for="item in list" :key="item.id">
                <input type="checkbox">编号: {{ item.id }} ---姓名：{{ item.name }}
            </li>
        </ul>
    </div>
    <script>
        const vm = new Vue({
            el : '#app',
            data : {
                uname : '',
                list : [
                    { id : 0, name : '刘备' },
                    { id : 1, name : '关羽' },
                    { id : 2, name : '张飞' }
                ]
            }, 
            methods : {
                add() {
                    var newuser = { id : this.list.length, name : this.uname};
                    //this.list.push(newuser);
                    this.list.unshift(newuser);
                }
            }
        })
    </script>
</body>
</html>
```

React循环中增加key需要给被 forEach 或 map 或 for循环直接控制的元素

```jsx
const arrStr = ['毛利兰', '柯南', '新一', '灰原哀'];
const nameArr = [];
arrStr.forEach(item => {
	const temp = <h5 key={ item }>{ item }</h5>;{/* 加给h5 */}
	nameArr.push(temp);
});

ReactDOM.render(
	{ arrStr.map(item => <div key={ item }><h5>{ item }</h5></div>) }{/* 加给div */}, document.getElementById('app')
)
```

#### 关于jsx语法的注意事项

- 关键字冲突问题：
  - `class`属性 => `className`

  ```html
  <button className="btn btn-primary"></button>
  ```

  - `for`属性 => `htmlFor`

  ```html
  <label htmlFor="ooo"></label>
  ```

- 虚拟DOM的创建必须有唯一的根元素包裹

  ```jsx
  const myh1 = <div><h1>my h1</h1></div>;{ /* 由根元素div包裹，正确 */}
  
  const myh2 = <div></div><h1>my h1</h1>;{ /* 无根元素包裹，错误 */}
  ```

#### react创建组件(两种方式)

如果一个组件需要有私有数据，则用有状态组件，反之用无状态组件

React官网说：无状态组件效率会高一些，因为其无私有数据和生命周期函数

但为后期好维护，建议多用有状态组件

- function构造函数组件创建，必须返回一个合法的JSX虚拟DOM元素，可以返回null(无状态组件：无私有数据和生命周期函数，今后用得不多)

  - 创建组件，组件的首字母必须是大写  UpperCase

  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom';
  
  function Hello () {//组件的首字母必须是大写  UpperCase
      return <p>Hello World!</p>;
  };
  
  ReactDOM.render(
  	<Hello />, document.getElementById('app')
  );
  ```

  - 为组件传递数据，组件中接收外界传过来的参数，且组件中的参数永远都是只读的

  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom';
  
  function Hello (props) {//props形参，接收，只读
      return <p>Hello World!---{ props.name }---{ props.age }---{ props.gender }</p>;
  };
  
  const dog = {
      name : '柯园',
      age : 30,
      gender : '雌'
  };
  
  ReactDOM.render(
      {/* 外界参数传入 */}
      {/*<Hello name={ dog.name } age={ dog.age } gender={ dog.gender } />*/}
      <Hello {...dog}></Hello>, document.getElementById('app')
  );
  ```

  - 组件抽离为单独的`JSX`文件

    - 根目录的`src`目录下建立文件夹`components`
    - 在此目录下新建文件Hello.jsx

    ```jsx
    import React from 'react';
    
    export default function Hello(props){
        return <h1>我是抽离出来的JSX</h1>;
    }
    ```

    - 在`index.js`中

    ```jsx
    import React from 'react';
    import ReactDOM from 'react-dom';
    import Hello from '../components/Hello.jsx';
    
    ReactDOM.render(
    	<Hello />, document.getElementById('app')
    );
    ```

    - 如果需要省略.jsx后缀名的书写，在`webpack.config.js`中加入

    ```json
    resolve: {
          extensions: ['.js', '.jsx', '.json'] //表示这几个文件的后缀名可省略，与顺序有关
    }
    ```

    - 配置`webpack.config.js`中的`resolve.alias`属性来配置别名`@ : path.join(__dirname, './src')`

    ```json
    resolve: {
          extensions: ['.js', '.jsx', '.json'], //表示这几个文件的后缀名可省略，与顺序有关
          alias : {
            '@' : path.join(__dirname, './src')
          }
    }
    ```

- class创建组件(有状态组件：有私有数据和生命周期函数)

  - class语法糖

  ```js
  class Animal {
      //构造，无构造时有默认空参构造
  	constructor(name, age) {
          this.name = name;
          this.age = age;
      }
      //静态属性，挂载在Animal上
      static isMammal = true;
  	//实例方法，挂在到原型对象__proto__上
  	eat() {
          console.log('i can eat');
      }
  	//静态方法，挂在到Animal上
  	static run() {
      	console.log('i can run');
      }
  }
  ```

  - 继承

  ```js
  class Panda extends Animal {
  	//构造
      constructor(name, age, cute) {
          super(name, age);//使用继承时，需要手动调用父类构造函数
          this.cute = cute;//this关键字只能在super()之后使用
      }
      
      //挂载到实例的原型方法
      foods() {
          console.log('我是恰竹子的!');
      }
  }
  
  class monkey extends Animal {
      constructor(name, age, clever) {
          super(name, age);
          this.clever = clever;
      }
      
      like() {
          console.log('i like peach');
      }
  }
  ```

  - 基本的组件结构

  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom';
  
  class Movie extends React.Component {
      //必须要有render函数，作用时渲染当前组件所对应的虚拟DOM元素，需要有返回值(虚拟DOM or null)
      render() {
          return <div>这是class创建组件</div>;
      }
  }
  ```

  - 为组件传递数据，在`render()`函数内可以直接调用`this.props.paramName`使用参数，只读

  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom';
  
  class Movie extends React.Component {
      //必须要有render函数，作用时渲染当前组件所对应的虚拟DOM元素，需要有返回值(虚拟DOM or null)
      //数据传递可以直接使用
      render() {
          return <div><p>电影名:{ this.props.name }</p><p>导演:{ this.props.director }</p></div>;
      }
  }
  
  const movie = {
      name : '哪吒之魔童降世',
      director : '饺子'
  }
  //传入参数
  ReactDOM.render(<Movie {...movie} />, document.getElementById('movies'));
  ```

  - 私有数据  `this.state`，类似于Vue中的data，可读可写

  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom';
  
  class Movie extends React.Component {
      
      constructor() {
          super();//继承，必须手动调用父类构造
          this.state = {//私有数据，通过this.state.paramName调用，可读可写
              msg: '我是私有的数据'
          };
      }
      
      //必须要有render函数，作用时渲染当前组件所对应的虚拟DOM元素，需要有返回值(虚拟DOM or null)
      //数据传递可以直接使用，只读
      render() {
          //this.props.director = 'jinqshen';我不能被改变哦
          //this.state.msg = '我被改变了';我可以被改变
          return <div><p>电影名:{ this.props.name }</p><p>导演:{ this.props.director }</p>
          <p>this.state.msg</p>
          </div>;
      }
  }
  
  const movie = {
      name : '哪吒之魔童降世',
      director : '饺子'
  }
  //传入参数
  ReactDOM.render(<Movie {...movie} />, document.getElementById('movies'));
  ```

- 两种方式的比较

  - 使用class关键字创建的组件有props和自己的私有数据(this.state)和生命周期函数
  - 使用function创建的组件只有props，没有自己的私有数据(this.state)和生命周期函数

- 组件中`props`和`state/data(Vue)`之间的区别
  - props中的数据都是外界传递来的
  - state/data中的数据都是组件私有的(通过ajax获取回来的数据，一般都是私有数据)
  - state/data中的数据可读写，props中的数据只读

#### ES6展开运算符(...)

```js
var obj1 = {
	age : 18,
	address : 'chengdu',
	phone : '1008611'
};

var obj2 = {
	name : 'jinqshen',
	age : obj1.age,
	address : obj1.address,
	phone : obj1.phone
}
```

等价于

```js
var obj1 = {
	age : 18,
	address : 'chengdu',
	phone : '1008611'
};

var obj2 = {
	name : 'jinqshen',
	...obj1//将obj1的所有属性和值展开并浅拷贝
}
```

#### 将组件抽离为单独的jsx文件

- 将组件代码抽取出来作为一个单独的jsx文件
- 并在jsx文件中导入React包
- 要在主页中应用组件，需要导入jsx文件，默认不能省略.jsx后缀，可以通过配置webpack.config.js中的resolve.extensions属性来设置省略
- 配置webpack.config.js中的resolve.alias属性来配置别名@ : path.join(__dirname, './src')

#### JSX中写行内样式style

- 基本使用

​	不能为style设置字符串的值，应写成如下形式，命名采用驼峰式

```jsx
style={{ color:'red', fontSize:'20px' }}
```

​	如果样式的值不是数值类型，不能写成如下形式，所以值为字符串类型必须加引号

```jsx
style={{ color:red }}
style="color:red"
```

- css封装

  - 一次封装  js变量

  ```jsx
  const fontStyle = { color:'red', fontSize:'20px' };//封装
  style={ fontStyle }//使用
  ```

  - 二次封装 js对象

  ```jsx
  const custStyle = { 
      fontStyle: {color:'red', fontSize:'20px'},
      colorStyle: {color:'green'},
  };//封装
  style={ fontStyle.colorStyle }//使用
  ```

  - 三次封装 js模块

    - 在`components`目录下建立文件`style.js`
    - 在`style.js`中定义css

    ```jsx
    export default { 
        fontStyle: {color:'red', fontSize:'20px'},
        colorStyle: {color:'green'},
    };//封装
    
    import styles from '@/components/style.js';
    style={ styles.colorStyle }
    ```

  - 独立成为css文件

    1. 在`src`目录下新建目录`css`
    2. 在`css`目录下新建css文件：`cmtlist.css`
    3. 安装loader：`npm install style-loader css-loader --save`
    4. 配置loader：在`webpack.config.js`添加`rules`配置，`style-loader`须在`css-loader`之前
  
    ```json
    {//配置style-loader
        test: /\.css$/i,
        loader:'style-loader',
        options: {
    
        }
    },
    {//配置css-loader
        test: /\.css$/i,
        loader:'css-loader',
        options: {
            
        }
    }
    ```
  
    5. 引入css，`import cssobj from '@/css/cmtlist.css'`
    6. 使用className引用css类名
  
    - 问题处理，css作用域冲突
  
    问题：直接导入的css样式，默认是全局生效
  
    解决方式：通过modules参数启用css表模块化，配置
  
    ```json
    {//配置style-loader,css-loader可配置modules参数启用模块化
        test: /\.css$/i,
        use: [
            {
                loader:'style-loader',
                options: {
    
                }
            },
            {
                loader:'css-loader',
                options: {
                    
                }
            }
        ]
    }
    ```
  
    css模块化只针对“类选择器”和“id选择器”，其它不适用，此时引用方式变为`cssobj.title`
  
    ```jsx
    import React from 'react';
    import Css from '@/css/cmtlist.css'
    
    console.log(Css);
    
    //子组件
    export default function MovieList(props) {
        return <li className={Css.title}>id:{ props.id } name:{ props.name } director:{ props.director }</li>;
    }
    ```
  
    - css类名自定义
  
    更新webpack.config.js配置
  
    [path]:代表css文件的当前路径
    [name]:代表css文件名
    [local]:代表类名或者id
    [hash]:hash值，处理命名冲突
  
    ```json
    {//配置style-loader
        test: /\.css$/i,
        use: [
            {
                loader:'style-loader',
                options: {
    
                }
            },
            {
                loader:'css-loader',
                options: {
                    modules: {
                        localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    }
                }
            }
        ]
    }
    ```
  
    - 模块化之后的css样式可通过`:global(id选择器/类选择器)`变为全局，默认模块化后为`:local(id选择器/类选择器)`
  
    ```css
    .title {
        color : green
    }
    
    :global(.test) {
        font-style: italic
    }
    ```
  
  - 多个样式的拼接
  
  字符串拼接：
  
  ```jsx
  export default function MovieList(props) {
      return <li className={Css.title + ' test'}>id:{ props.id } name:{ props.name } director:{ props.director }</li>;
  }
  ```
  
  数组拼接：
  
  ```jsx
  export default function MovieList(props) {
      return <li className={[Css.title, 'test'].join(' ')}>id:{ props.id } name:{ props.name } director:{ props.director }</li>;
  }
  ```

- 运用第三方样式库，如BootStrap

  - 下载bootstrap，`cnpm i bootstrap --save`
  - 导入bootstrap，`import bootcss from '../../node_modules/_bootstrap@4.3.1@bootstrap/dist/css/bootstrap.css';`
  - 应用样式

  ```jsx
  <button className={ [bootcss.btn, bootcss['btn-primary']].join(' ') }>按钮</button>
  ```

  麻烦吗？嗯，麻烦，不能像之前那样直接用，非得搞个啥对象来加样式，蠢得一

  怎么样才能直接用呢？前面其实已经提到过，全局的css是可以直接用的，所以得出我们的解决方式

  - 解决方式

  自定义的css样式采用less或者scss来写，然后给这些文件定义css模块化，而第三方的css文件默认都是css文件，让这些css都全局化，这就不冲突了(React这个限制感觉就没Vue灵性)

  1. 配置less or scss loader

     - 下载，`cnpm i less less-loader --save`
     - 配置less-loader，注意，模块化是在css-loader中配置

     ```json
     {//配置less-loader，并启用模块化
         test: /\.less$/,
         use: [
             {
                 loader: 'style-loader',
             },
             {
                 loader: 'css-loader',
                 options: {
                     modules: {
                         localIdentName: '[path][name]__[local]--[hash:base64:5]',
                     }
                 },
             },
             {
                 loader: 'less-loader'
             },
         ],
     }
     ```

  2. 将自定义的css样式文件后缀改为less(注意同步更新导包信息)
  3. 改变公用css文件的导入为

  ```js
  import '_bootstrap@4.3.1@bootstrap/dist/css/bootstrap.css';
  ```

  4. 应用公用css样式和自定义less样式

  ```jsx
  {/* css引用 */}
  <button className="btn btn-primary">按钮</button>
  
  {/* less引用 */}
  <li className={[Css.title, 'test'].join(' ')}>id:{ props.id } name:{ props.name } director:{ props.director }</li>
  ```

#### 绑定事件

- React有一套自己的绑定事件命名，小驼峰

```
onclick => onClick  onchange => onChange ......
```

- 简单的点击事件demo

```jsx
bindok = () => {
    console.log('aaa');
}
```

此语法需要安装解析包@babel/plugin-proposal-class-properties

`cnpm i @babel/plugin-proposal-class-properties --save`

配置babel-loader

```json
options: {
    presets: ['@babel/preset-env','@babel/preset-react'],
    plugins: ['@babel/plugin-proposal-class-properties']
}
```

```jsx
import React from 'react';
import '_bootstrap@4.3.1@bootstrap/dist/css/bootstrap.css';
//父组件 
export default class Cmd extends React.Component {
    constructor() {
        super();
        this.state = {
            CmdList: [
                {id: '1', name: '哪吒之魔童降世', director: '饺子'},
                {id: '2', name: '流浪地球', director: '吴京'},
                {id: '3', name: '战狼2', director: '吴京'},
                {id: '4', name: '攀登者', director: '李仁港'}
            ]
        }
    }

    render() {
        return <div>
                <button className="btn btn-primary" onClick={ () => this.bindok() } >按钮</button>
                </div>;
    }
    {/* 定义一个实例方法，使用此语法需要安装解析包@babel/plugin-proposal-class-properties */}
    bindok = () => {
        console.log('aaa');
    }
}
```

- 箭头函数和普通的匿名函数区别，this关键字指向不同（不太清楚为什么要这样写，就因为怕this指错地方了吗）

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>test</title>
</head>
<body>
    <button id="btn">
        按钮
    </button>
    <script>
    	onload = function () {
            const btn = document.getElementById('btn');
            
            console.log(this);//this指向window
            
            btn.onclick = function () {
                this.style.backgroundColor = 'red';//谁调用它，this指向谁，这里指向btn
            }
            
            btn.onclick = ()=> {
                this.style.backgroundColor = 'red';//指向btn外层，这里指向window
            }
            
            btn.onclick = function() {
                //setTimeout是window对象的方法
                setTimeout(() => {
                    this.style.backgroundColor = 'red';//指向window外层，这里指向btn
                }, 1000);
            }
        }
    </script>
</body>
</html>
```

- state中数据的修改(this.setState()异步方法)

  - 单向数据流

  this.setState()方法只会把对应的数据更新，不会覆盖其它数据，然后会进入生命周期重新渲染页面

  ```jsx
  import React from 'react';
  import '_bootstrap@4.3.1@bootstrap/dist/css/bootstrap.css';
  
  export default class BindData extends React.Component {
  
      constructor(){
          super();
          this.state = {
              msg: 'hhhhh'
          }
      }
  
      changeMsg = (arg1, arg2) => {
          this.setState({
              msg: this.state.msg + arg1 + arg2
          });
      }
  
      render() {
          return <div>
                     <p>{ this.state.msg }</p>
                     <button className="btn btn-dark" onClick={ () => this.changeMsg('😀', '🆒') }>改变信息</button>
                 </div>;
      }
  }
  ```

  - 实现双向数据绑定

  如文本框的数据，为文本框绑定value值后，需要添加onChange()事件或者readOnly属性

  得到最新文本框的值(两种方法：1.通过事件参数e来获取  2.ref获取DOM元素引用)

  ```jsx
  import React from 'react';
  import '_bootstrap@4.3.1@bootstrap/dist/css/bootstrap.css';
  
  export default class BindInputValue extends React.Component {
  
      constructor() {
          super();
          this.state = {
              msg: '套你猴子'
          };
      }
  
      //得到最新文本框的值(两种方法：1.通过事件参数e来获取  2.ref获取DOM元素引用)
      //setState更新值
      //重新渲染页面
      changeValue = (e) => {
          /* this.setState({
              msg: e.target.value
          }); 事件参数e获取*/
          //ref引用
          this.setState({
              msg: this.refs.txt.value
          })
      }
  
  
      render() {
          return <div className="form-group">
                     <p>{ this.state.msg }</p>
                     <input className="from-control" type="text" value={this.state.msg} ref="txt" onChange={ (e) => this.changeValue(e) } />
                 </div>;
      }
  }
  ```

#### 生命周期

- Vue的生命周期

![Vue 实例生命周期](https://cn.vuejs.org/images/lifecycle.png)

- React的生命周期

#### React路由

- 下载路由组件

`cnpm i react-router-dom --save`

- 在组件中导入路由

`import {HashRouter, Route, Link} from 'react-router-dom'`

参数介绍：

HashRouter: 路由根容器，所有与路由相关的东西都需要包裹在里面，且里面最多只有一个根元素

Route: 路由规则，有两个重要属性 path，component

Link: 路由链接，类似于Vue中的<router-link to=""></router-link>

- 启用路由，使用HashRouter，其中只能由一个根元素

```jsx
return <HashRouter>
    <div className="form-group">
        <p>{ this.state.msg }</p>
        <input className="from-control" type="text" value={this.state.msg} ref="txt" onChange={ (e) => this.changeValue(e) } />
    </div>
</HashRouter>;
```

- 定义路由链接和路由规则

```jsx
render() {
    return <HashRouter>{/*启用路由*/}
        <div className="form-group">
            <p>{ this.state.msg }</p>
            <input className="from-control" type="text" value={this.state.msg} ref="txt" onChange={ (e) => this.changeValue(e) } />
        </div>
        <Link to="/home">首页</Link>{/* 创建链接 */}&nbsp;&nbsp;
        <Link to="/movie">电影</Link>&nbsp;&nbsp;
        <Link to="/about">关于</Link>
        {/*定义路由规则 path表示要匹配的路由 component表示要展示的组件
                    Route两种身份：定义路由和占位符
                    匹配规则：默认是模糊匹配  */}
        <Route path="/home" component={MovieList}></Route>
        <Route path="/movie" component={Movie}></Route>
        <Route path="/about" component={Cmd}></Route>
    </HashRouter>;
}
```

- 路由传参

  - 模糊匹配

  ```jsx
  render() {
          return <HashRouter>{/*启用路由*/}
                  <div className="form-group">
                      <p>{ this.state.msg }</p>
                      <input className="from-control" type="text" value={this.state.msg} ref="txt" onChange={ (e) => this.changeValue(e) } />
                  </div>
                  <Link to="/home">首页</Link>{/* 创建链接 */}&nbsp;&nbsp;
                  <Link to="/movie/top50/10">电影</Link>&nbsp;&nbsp;{/* 模糊匹配实例 */}
                  <Link to="/about">关于</Link>
                  {/*定义路由规则 path表示要匹配的路由 component表示要展示的组件
                      Route两种身份：定义路由和占位符
                      匹配规则：默认是模糊匹配  */}
                  <Route path="/home" component={MovieList}></Route>
                  <Route path="/movie" component={Movie}></Route>
                  <Route path="/about" component={Cmd}></Route>
                 </HashRouter>;
      }
  ```

  - 精确匹配，需给Route添加exact属性

  ```jsx
  render() {
      return <HashRouter>{/*启用路由*/}
          <div className="form-group">
              <p>{ this.state.msg }</p>
              <input className="from-control" type="text" value={this.state.msg} ref="txt" onChange={ (e) => this.changeValue(e) } />
          </div>
          <Link to="/home">首页</Link>{/* 创建链接 */}&nbsp;&nbsp;
          <Link to="/movie/top50/10">电影</Link>&nbsp;&nbsp;{/* 精确匹配，此时此链接无法匹配 */}
          <Link to="/about">关于</Link>
          {/*定义路由规则 path表示要匹配的路由 component表示要展示的组件
                      Route两种身份：定义路由和占位符
                      匹配规则：默认是模糊匹配，添加exact属性，变为精确匹配  */}
          <Route path="/home" component={MovieList}></Route>
          <Route path="/movie" component={Movie} exact></Route>
          <Route path="/about" component={Cmd}></Route>
      </HashRouter>;
  }
  ```

  - 添加参数

  ```jsx
  <HashRouter>
      <Link to="/movie/top50/10">电影</Link>&nbsp;&nbsp;
      <Route path="/movie/:type/:id" component={Movie} exact></Route>
  </HashRouter>
  ```

  参数的获取：this.props.match.param.<paramName>

  - 路由参数可将其转化为私有数据来运用

  ```jsx
  constructor(props){
      super(props);
      this.state = {
          routerParams: props.match.params
      }
  }
  ```

  

