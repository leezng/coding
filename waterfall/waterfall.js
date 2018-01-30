class Waterfall {
  constructor (container, grid = 4) {
    this.container = container;
    this.grid = grid;
    this.gridWidth = this.container.offsetWidth / this.grid;
    this.heightArr = []; // 保存当前所有列的高度
  }

  append (imgs) {
    imgs.forEach((item, index) => this.createBoxDom(item));
  }

  onload (box, image) {
    let index
    box.style.width = this.gridWidth + 'px';
    if (this.heightArr.length === this.grid) {
      let { left, top } = this.getPosition();
      box.style.position = 'absolute';
      box.style.left = `${left}px`;
      box.style.top = `${top}px`;
      index = left / this.gridWidth;
    }
    this.container.appendChild(box);
    this.increaseHeightArr(image.height + 20, index);
  }

  getPosition () {
    let minBoxHeight = Math.min(...this.heightArr);
    return {
      left: this.heightArr.indexOf(minBoxHeight) * this.gridWidth,
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
    return box;
  }

  increaseHeightArr (height, index) {
    if (index === undefined) {
      this.heightArr.push(height);
    } else {
      this.heightArr[index] += height
    }
  }
}
