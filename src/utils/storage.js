//                                     本地存储相关功能封装模块

export const getItem = (name) => {
  const data = window.localStorage.getItem(name)
  try {
    //   尝试把data转换为js对象（但data可能不是json格式，故放在try里
    return JSON.parse(data)
  } catch (err) {
    return data // 不是json原样返回
  }
}

export const setItem = (name, value) => {
  // 如果value是对象将其转换成json字符串再存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  //   不是对象
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
