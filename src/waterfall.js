import { EventEmitter } from './eventEmitter'

export class Waterfall extends EventEmitter {
  /**
   * @param  {HTMLDivElement} container 容器
   * @param  {Number} grid 列数
   * @param  {Number} gutter 沟槽
   */
  constructor ({ container, grid = 4, gutter = 20 }) {
    if (typeof grid !== 'number' || typeof gutter !== 'number') {
      throw new Error('grid && gutter must be a number.')
    } else if (!container) {
      throw new Error('container must be defined.')
    }
    super();

    this.container = container;
    this.grid = grid;
    this.gridWidth = this.container.offsetWidth / this.grid;
    this.heightArr = []; // 保存当前所有列的高度
    this.gutter = gutter;
    this.containerInit();
  }

  containerInit () {
    this.container.style = 'position: relative; height: 100%; overflow: auto';
  }

  /**
   * 追加图片
   * @param  {Array} imgs 图片列表的URL数组
   */
  append (imgs) {
    imgs.forEach((item, index) => this.createBoxDom(item));
  }

  /**
   * 单个图片加载成功回调
   * @param  {HTMLDivElement} box 包裹图片的盒子dom
   * @param  {HTMLImageElement} image 图片<img>
   */
  onload (box, image) {
    let { left, top } = this.getPosition();
    box.style.position = 'absolute';
    box.style.left = `${left}px`;
    box.style.top = `${top}px`;
    box.style.width = this.gridWidth + 'px';
    box.style.boxSizing = 'border-box';
    box.style.padding = `${this.gutter / 2}px`;

    this.container.appendChild(box);
    this.increaseHeightArr(image.height + this.gutter, left / this.gridWidth);
  }

  /**
   * 获取当前图片的定位坐标
   * @return {Object} { left左偏移量, top顶部偏移量 }
   */
  getPosition () {
    const isRowOne = this.heightArr.length < this.grid // 若数组长度还未达到列数，说明此时还应排在第一行
    const minBoxHeight = isRowOne ? 0 : Math.min(...this.heightArr);
    return {
      left: this.gridWidth * (isRowOne ? this.heightArr.length : this.heightArr.indexOf(minBoxHeight)),
      top: minBoxHeight
    };
  }

  /**
   * 生成当前图片的dom
   * @param  {String} src 当前图片URL
   * @return {HTMLDivElement}
   */
  createBoxDom (src) {
    let box = document.createElement('div');
    let img = new Image();
    box.setAttribute('class', 'box');
    box.appendChild(img);
    img.onload = () => this.onload(box, img);
    img.onerror = () => {}
    img.src = src;
    img.style.width = '100%';
    img.style.height = 'auto';
    return box;
  }

  /**
   * 每次有新图片加载, 更新高度记录的数据
   * @param  {Number} height 图片完整高度, 包含上下边距
   * @param  {Number} index  需更新的数组成员索引
   */
  increaseHeightArr (height, index) {
    if (typeof this.heightArr[index] !== 'number') {
      this.heightArr[index] = +height;
    } else {
      this.heightArr[index] += +height
    }
  }

  /**
   * 判断是否到底部(表示需执行加载更多)
   */
  assertLoadMore () {

  }
}
