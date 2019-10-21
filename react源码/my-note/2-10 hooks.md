# hooks >=16.7

```
import React, { useState, useEffect } from 'react'

export default () => {
  const [name, setName] = useState('jokcy')

  useEffect(() => {
    console.log('component update')

    return () => {
      console.log('unbind')
    }
  }, [])

  return (
    <>
      <p>My Name is: {name}</p>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </>
  )
}
```

- 拆分组件逻辑
- useEffect

```
  useEffect(() => {
    console.log('component update')

    return () => {
      console.log('unbind')
    }
  }, [])
```

- []传入哪个就会监听哪个

* const [name, setName] = useState('jokcy')

# 源码

- 返回 dispatcher 上对应的方法
- dispatcher 在 ReactCurrentOwner（实例） 上, 要等 dom 的时候才会赋值
