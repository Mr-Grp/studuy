# concurrent-model

让整体渲染的过程进行 优先级排比，并且可以中断，可以进行任务调度，更多的 cpu 性能优先运行优先级较高任务，空余时再运行优先级较低的任务
因为 js 单线程，运行 react 更新如果占用很长时间的进程，动画渲染没时间去做，导致动画卡顿，import 比较卡等

- ConcurrentMode 包裹的组件的更新都是低优先级的，但也有超时时间，后面会说具体实现
- flushSync 会立即执行，放到执行栈

* 在源码中 ConcurrentMode 只是个 Symbol

````
flushSync(() => {
  this.setState({
    num: newNum,
  })
})
```



问题：
浏览器 16-17ms 更新一次，事件循环如果比17ms少，会渲染吗
浏览器渲染是同步吗，会等渲染完再进行下次事件循环吗（感觉js单线程，但浏览器不是，渲染页面是不是另一个线程进行的啊）
````
