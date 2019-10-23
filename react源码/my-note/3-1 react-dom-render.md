# 1. react-dom-render

words:

- legacy 遗留
- subtree 子树

问题:

- legacy 和 subtree 代表啥

#  2. 渲染  API

- ReactDOM.render || hydrate
- setState
- forceUpdate

# 3. ReactDOM.render

创建  ReactRoot
创建  FiberRoot 和 RootFiber
创建更新

#  4. 源码

- render  和  hydrate(用于  ssr)区别，hydrate  可复用  dom  节点

# 5. ReactDom

位置:

- react-dom/src/client/ReactDom

## 5.1 render

- 参数

  - element: classComponent
  - container:dom 节点
  - callback: 回调函数

- 返回
  - legacyRenderSubtreeIntoContainer 方法结果

## 5.2 legacyRenderSubtreeIntoContainer

- 参数

  - parentComponent:父节点（render 传入的是 null）
  - children:classComponent
  - container:dom 节点
  - forceHydrate:是否 Hydrate （render 传入 false）
  - callback:回掉

- 过程

  - 判断是否有效地 dom
  - 判断是否有 container 是否有 \_reactRootContainer 属性
  - 没有就创建一个赋值给变脸 root（通过调用  legacyCreateRootFromDOMContainer ）（返回一个  FiberRoot）
  - 执行 DOMRenderer.unbatchedUpdates （直接看回掉函数）
  - 判断是否有 parentComponent （render 进入为 null）
  - 没有则执行 root.render 方法

- 返回
  - DOMRenderer.getPublicRootInstance （还没看）

## 5.3 legacyCreateRootFromDOMContainer

- 参数

  - container:dom 节点
  - forceHydrate:是否 Hydrate （render 传入 false）

- 过程

  - 判断是否需要 shouldHydrate ，就算 Hydrate 为 false，还是会调用 legacyRenderSubtreeIntoContainer  判断一下
  - 把 container 子节点删掉

- 返回
  - ReactRoot()

## 5.4 ReactRoot

- 参数

  - isConcurrent:（legacyCreateRootFromDOMContainer 传入为 false）
  - container:dom 节点
  - hydrate: （render 传入 false）

- 过程

  - 创建了一个 FiberRoot（DOMRenderer.createContainer）
  - 赋值给自己的 \_internalRoot

- 返回
  - 无

## 5.5 ReactRoot.render

- 参数

  - children:classComponent
  - callback:回调

- 过程

  - 拿到自己的 FiberRoot
  - 创建一个 ReactWork 对象 work
  - work.then(callback)
  - 调用 DOMRenderer.updateContainer

- 返回
  work

# 6. DOMRenderer（用于调和和任务调度） 部分

位置:

- react-reconciler/inline.dom

## 6.1 createContainer

- 参数

  - isConcurrent:（legacyCreateRootFromDOMContainer 传入为 false）
  - containerInfo:dom 节点
  - hydrate:（render 传入 false）

- 过程

  - 调用 createFiberRoot 创建了一个  FiberRoot

- 返回
  - 返回  FiberRoot

## 6.2 updateContainer

- 参数

  - element:classComponent
  - container:FiberRoot
  - parentComponent:null
  - callback:回调 work.\_onCommit

- 过程

  - ...
  - computeExpirationForFiber  计算  ConcurrentModel  优先级任务更新时间
  - 调用 updateContainerAtExpirationTime

- 返回 updateContainerAtExpirationTime()

## 6.3 updateContainerAtExpirationTime

- 参数

  - element: classComponent
  - container: FiberRoot
  - parentComponent: null
  - expirationTime: 优先级任务更新时间
  - callback: 回调

- 过程

  - context  拿不到，不用管
  - ...

- 返回
    - 调用 scheduleRootUpdate

## 6.4 scheduleRootUpdate

- 参数

  - current: ,
  - element: classComponent,
  - expirationTime: 优先级任务更新时间,
  - callback: 回调,

- 过程
  -  通过  createUpdate  创建  update
  -  设置  update  属性
  -  调用  enqueueUpdate，把  update  加入到  Fiber  对象对应的  updateQueue  里，某一个节点会有多次更新产生
  -  调用  scheduleWork  开始进行任务调度（有优先级概念）

- 返回
  - expirationTime
