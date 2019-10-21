# 作用

祖孙组件传递

# 1.childContextType

- 父组件

```
  ...
  getChildContext() {
    return { value: this.state.childContext, a: 'aaaaa' }
  }
  ...
  Parent.childContextTypes = {
    value: PropTypes.string,
    a: PropTypes.string,
  }
```

- 子组件
  可以通过 构造函数第二参数 或者 this.context 拿到 context

```
  Child2.contextTypes = {
    value: PropTypes.string,
    a: PropTypes.string,
  }
  ...
  {this.context.value}
```

- 性能不好，每次更新会导致子组件全部完整渲染，后面会解释

# createContext

- 父组件

```
const { Provider, Consumer } = React.createContext('default')
<Provider value={this.state.newContext}>{this.props.children}</Provider>
```

- 子组件（函数组件）

```
<Consumer>{value => <p>newContext: {value}</p>}</Consumer>
```

# createContext 源码

参数
defaultValue
calculateChangedBits 计算新老 context 变化

```
const context: ReactContext<T> = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // These are circular
    Provider: (null: any),
    Consumer: (null: any),
  };
```

Consumer 指向 context 本身
Provider.context 指向 context 本身

- type
  <T> 泛型
  ?(a: T, b: T) => number 可以为 null
  calculateChangedBits？ 不可以为 null
