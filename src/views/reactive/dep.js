export default class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }
  // 删除一个依赖
  removeSub(sub) {
    remove(this.subs, sub);
  }
  // 添加一个依赖
  depend() {
    if (indow.target) {
      this.addSub(window.target);
    }
  }
  // 通知所有依赖更新
  notify() {
    const subs = this.subs.slice();
    console.log(subs);
    /* for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        } */
  }
}

function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}