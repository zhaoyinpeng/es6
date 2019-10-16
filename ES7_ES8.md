# es7
## 具体地址 [url link](https://www.jianshu.com/p/a138a525c287) 

### ES7 特性：
1.Array.prototype.includes
2.Exponentiation Operator(求幂运算)

### Array.prototype.includes
Array.prototype.includes用法都容易和简单。它是一个替代indexOf，开发人员用来检查数组中是否存在值，indexOf是一种尴尬的使用，因为它返回一个元素在数组中的位置或者-1当这样的元素不能被找到的情况下。所以它返回一个数字，而不是一个布尔值。开发人员需要实施额外的检查。在ES6，要检查是否存在值你需要做一些如下图所示小技巧，因为他们没有匹配到值，Array.prototype.indexOf返回-1变成了true（转换成true），但是当匹配的元素为0位置时候，该数组包含元素，却变成了false
```
let arr = ['react', 'angular', 'vue']

// WRONG
if (arr.indexOf('react')) { // 0 -> evaluates to false, definitely as we expected
  console.log('Can use React') // this line would never be executed
}

// Correct
if (arr.indexOf('react') !== -1) {
  console.log('Can use React')
}
```

在ES7中使用includes代码如下:

```
let arr = ['react', 'angular', 'vue']

// Correct
if (arr.includes('react')) {
  console.log('Can use React')
}
```

includes也可以在NaN(非数字)使用。最后 ，includes第二可选参数fromIndex，这对于优化是有好处的，因为它允许从特定位置开始寻找匹配。
更多例子：
```
console.log([1, 2, 3].includes(2)) // === true)
console.log([1, 2, 3].includes(4)) // === false)
console.log([1, 2, NaN].includes(NaN)) // === true)
console.log([1, 2, -0].includes(+0)) // === true)
console.log([1, 2, +0].includes(-0)) // === true)
console.log(['a', 'b', 'c'].includes('a')) // === true)
console.log(['a', 'b', 'c'].includes('a', 1)) // === false)
```

### Exponentiation Operator(求幂运算)
求幂运算大多数是为开发者做一些数学计算，对于3D，VR，SVG还有数据可视化非常有用。在ES6或者早些版本，你不得不创建一个循环，创建一个递归函数或者使用Math.pow,如果你忘记了什么是指数,当你有相同数字（基数）自相相乘多次（指数）。例如，7的3次方是7*7*7
```
//所以在ES6/2015ES，你能使用Math.pow创建一个短的递归箭头函数
calculateExponent = (base, exponent) => base*((--exponent>1)?calculateExponent(base, exponent):base)
console.log(calculateExponent(7,12) === Math.pow(7,12)) // true
console.log(calculateExponent(2,7) === Math.pow(2,7)) // true

//现在在ES7 /ES2016，以数学向导的开发者可以使用更短的语法:
let a = 7 ** 12
let b = 2 ** 7
console.log(a === Math.pow(7,12)) // true
console.log(b === Math.pow(2,7)) // true

//开发者还可以操作结果:
let a = 7
a **= 12
let b = 2
b **= 7
console.log(a === Math.pow(7,12)) // true
console.log(b === Math.pow(2,7)) // true
```

# es8

## 异步函数

众所周知，JavaScript语言的执行环境是“单线程”的，那么异步编程对JavaScript语言来说就显得尤为重要。以前我们大多数的做法是使用回调函数来实现JavaScript语言的异步编程。回调函数本身没有问题，但如果出现多个回调函数嵌套，例如：进入某个页面，需要先登录，拿到用户信息之后，调取用户商品信息，代码如下：

```
this.$http.jsonp('/login', (res) => {
  this.$http.jsonp('/getInfo', (info) => {
    // do something
  })
})
```
假如上面还有更多的请求操作，就会出现多重嵌套。代码很快就会乱成一团，这种情况就被称为“回调函数地狱”（callback hell）。

于是，我们提出了Promise，它将回调函数的嵌套，改成了链式调用。写法如下：

```
var promise = new Promise((resolve, reject) => {
  this.login(resolve)
})
.then(() => this.getInfo())
.catch(() => { console.log("Error") })
```

从上面可以看出，Promise的写法只是回调函数的改进，使用then方法，只是让异步任务的两段执行更清楚而已。Promise的最大问题是代码冗余，请求任务多时，一堆的then，也使得原来的语义变得很不清楚。此时我们引入了另外一种异步编程的机制：Generator。

Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。一个简单的例子用来说明它的用法：

```
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

```
var Ajax = {
  get: function (url, fn) {
      // XMLHttpRequest对象用于在后台与服务器交换数据
      var xhr = new XMLHttpRequest();
      //每当readyState改变时就会触发onreadystatechange函数
      //0: 请求未初始化
      //1: 服务器连接已建立
      //2: 请求已接收
      //3: 请求处理中
      //4: 请求已完成，且响应已就绪
      xhr.open('GET', url, true)
      xhr.onreadystatechange = function () {
          //readyStatus == 4说明请求已经完成
          if(xhr.readyState == 4 && xhr.status ==200) {
              //从服务器获得数据
              fn.call(this, xhr.responseText);
          }
      };
      //发送数据
      xhr.send();
  },
  // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
  post: function (url, data, fn) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      // 添加http头，发送信息至服务器时内容编码类型
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
              fn.call(this, xhr.responseText);
          }
      };
      //发送数据
      xhr.send(data);
  }

}
```