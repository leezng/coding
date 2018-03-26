import { Waterfall } from 'src/waterfall'

export default {
  template: '<div id="container" style="height: 100%;"></div>',
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

    waterfall.on('load', function () {
      console.log('load')
      waterfall.append(pictures);
    })

    window.abc = waterfall;
    // window.append = append;
  }
}
