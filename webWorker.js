//使用async无法解决大量数据计算
let a = () => {
  var jobData = [];//假设是一个数组。里面有1000万个数据。
  for (let index = 0; index < 10000000; index++) {
    const element = Math.random() * 100 + 20;
    jobData.push(element)
  }
  let result = 0
  jobData.forEach((element) => {
    result += element
  })
  return result
}
// 通过监听message来接受主线程中的消息
addEventListener('message', function(res) {
  // 子线程向主线程中发生消息
  console.log(res)
  console.time('test')
  let result = a()
  console.timeEnd('test')
  this.postMessage('已收到主线程的消息。。。' + res.data + result);
})