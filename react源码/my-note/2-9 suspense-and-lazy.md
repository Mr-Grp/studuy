# Suspense

- Suspense 下的组件
- 如果有 throw promise ，会等待 promise 结束，直到不 throw promise
- lazy，如果异步加载组件，也需要等待

* Suspense 下如果有多个组件，需要等待所有的 resolve，在此期间，组件显示 fallback

# lazy

```
const LazyComp = lazy(() => import('./lazy.js'))
```

# 源码

- Suspense 是个 Symbol

- lazy

```
export function lazy<T, R>( : () => Thenable<T, R>): LazyComponent<T> {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    // React uses these fields to store the result.
    _status: -1,
    _result: null,
  };
}
```

\_ctor： Thenable 像 Promise 一样的东西
\_status： 状态 pending -1
\_result：结果组件
