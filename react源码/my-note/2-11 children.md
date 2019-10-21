# 很少操作 Children

- 建议直接用 React.Children 而不是 this.props.children

- this.props.children 可能是一个 ReactElement 或者一个 数组

* React.Children.map(props.children, c => [c, [c, c]]);
  会返回展开的数组

关注 map forEach 方法
- map 有图