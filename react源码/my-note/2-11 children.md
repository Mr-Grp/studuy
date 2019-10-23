# 很少操作 Children （多看源码）

```
React.Children.map(props.children, c => {
    return [c, [c, c]];
  });
```

- 建议直接用 React.Children 而不是 this.props.children

- this.props.children 可能是一个 ReactElement 或者一个 数组

* React.Children.map(props.children, c => [c, [c, c]]);
  会返回展开的数组

关注 map forEach 方法

- map 有图

* mapIntoWithKeyPrefixInternal

从缓冲池获取 contenxt 调用 traverseAllChildren

- getPooledTraverseContext

缓冲池获取 Context 对象，为了防止每次都要创建新的，长度为 10

逻辑上看，回调函数上有几层就需要几个

- traverseAllChildrenImpl
  先判断是否为单个节点
  不是则调用自身

如果是且有效，调用 callback （mapSingleChildIntoContext）

- mapSingleChildIntoContext
  调用 func 回调，判断结果是否为单个节点，是创建一个新节点 push 到 result
  否则 调用 mapIntoWithKeyPrefixInternal

* map 回调也不会执行多次（有几个几次），因为如果回调返回多层，第二层就变成了 c => c,不然死循环

- forEach

  传入的 callback 没有递归，也没有返回 result
