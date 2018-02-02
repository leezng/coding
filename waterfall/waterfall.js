class Waterfall {
  constructor (container, grid = 4) {
    this.container = container;
    this.grid = grid;
    this.gridWidth = this.container.offsetWidth / this.grid;
    this.heightArr = []; // 保存当前所有列的高度
    this.gutter = 20
  }

  append (imgs) {
    imgs.forEach((item, index) => this.createBoxDom(item));
  }

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

  getPosition () {
    const isRowOne = this.heightArr.length < this.grid // 若数组长度还未达到列数，说明此时还应排在第一行
    const minBoxHeight = isRowOne ? 0 : Math.min(...this.heightArr);
    return {
      left: this.gridWidth * (isRowOne ? this.heightArr.length : this.heightArr.indexOf(minBoxHeight)),
      top: minBoxHeight
    };
  }

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

  increaseHeightArr (height, index) {
    if (isNaN(this.heightArr[index])) {
      this.heightArr[index] = height;
    } else {
      this.heightArr[index] += height
    }
  }
}
