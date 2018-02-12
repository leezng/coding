import { Waterfall } from 'src/waterfall'

export default {
  template: '<div id="container"></div>',
  created () {
    const waterfall = new Waterfall({
      container: document.getElementById('container'),
      grid: 5
    });
    let pictures = [];
    for (var i = 0; i <= 11; i++) {
      i < 10 && (i = `0${i}`);
      pictures.push(`./static/P_0${i}.jpg`);
    }

    function append () {
      waterfall.append(pictures);
    }

    append();
    // window.waterfall = waterfall;
    // window.append = append;
  }
}
