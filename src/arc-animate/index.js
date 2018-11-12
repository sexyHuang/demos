import Particle from './particle';

const BUILD_FUNCTIONS = {
  text(data, width, height) {
    let fullText = data.reduce((prev, curr) => prev + curr.text, ''),
      default_font_size = 10,
      lineHeight = 8,
      maxRatio = 0.8;
    const offScreenCanvas = document.createElement('canvas'),
      offScreenCanvasCtx = offScreenCanvas.getContext('2d'),
      c_width = 200,
      c_height = 0 | ((200 * height) / width);
    //document.body.append(offScreenCanvas);
    offScreenCanvas.setAttribute('width', c_width);
    offScreenCanvas.setAttribute('height', c_height);
    offScreenCanvasCtx.fillStyle = '#000';
    offScreenCanvasCtx.font = `bold ${default_font_size}px Arial`;
    offScreenCanvasCtx.textBaseline = 'middle';

    let textWidth = offScreenCanvasCtx.measureText(fullText).width;
    const fontSize = Math.min(
      ((maxRatio * c_height) / lineHeight) * default_font_size,
      ((maxRatio * c_width) / textWidth) * default_font_size
    );
    lineHeight *= fontSize / default_font_size;
    offScreenCanvasCtx.font = `bold ${fontSize}px Arial`;
    let textMetrics = offScreenCanvasCtx.measureText(fullText);
    let left = (c_width - textMetrics.width) / 2,
      top = c_height / 2;
    let output = [];
    data.forEach(val => {
      offScreenCanvasCtx.clearRect(0, 0, c_width, c_height);
      offScreenCanvasCtx.fillStyle = val.color || '#000';
      offScreenCanvasCtx.fillText(val.text, left, top);
      left += offScreenCanvasCtx.measureText(val.text).width;
      let imgData = offScreenCanvasCtx.getImageData(0, 0, c_width, c_height);
      let rgba = [];
      let _points = [];
      imgData.data.forEach((val, idx) => {
        rgba.push(val);
        if (rgba.length === 4) {
          if (val) {
            let point_idx = (idx - 3) / 4;
            _points.push({
              x: (point_idx % imgData.width) / imgData.width,
              y: point_idx / imgData.width / imgData.height,
              color: rgbToHsl(...rgba)
            });
          }
          rgba = [];
        }
      });
      output.push(_points);
    });
    return output;
  },
  img: (data, width, height) => {
    const offscreenCanvas = document.createElement('canvas');
    const offscreenCanvasCtx = offscreenCanvas.getContext('2d'),
      c_width = 200,
      c_height = 0 | ((200 * height) / width);
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    return new Promise((resolve, reject) => {
      img.onload = () => {
        const imgWidth = c_width * 0.6;
        const imgHeight = (imgWidth / img.naturalWidth) * img.naturalHeight;
        let _points = [];
        let rgba = [];
        offscreenCanvas.width = c_width;
        offscreenCanvas.height = c_height;
        offscreenCanvasCtx.drawImage(
          img,
          c_width * 0.2,
          (c_height - imgHeight) / 2,
          imgWidth,
          imgHeight
        );
        let imgData = offscreenCanvasCtx.getImageData(0, 0, c_width, c_height);

        imgData.data.forEach((val, idx) => {
          rgba.push(val);
          if (rgba.length === 4) {
            if (val) {
              let point_idx = (idx - 3) / 4;
              _points.push({
                x: (point_idx % imgData.width) / imgData.width,
                y: point_idx / imgData.width / imgData.height,
                color: rgbToHsl(...rgba)
              });
            }
            rgba = [];
          }
        });
        resolve([_points]);
      };
      img.onerror = e => {
        reject(e);
      };
      img.src = data.imgUrl;
    });
  }
};
const PARTICLE_COUNTS = 0.8 * 1e4;
class Sence {
  constructor(canvas, width, height) {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
    this.init(width, height);
  }
  init(width, height, backgroundStyle = 'rgba(255, 247, 240,0.3)') {
    let dpr = window.devicePixelRatio || 1;
    this._canvas.width = width * dpr;
    this._canvas.height = height * dpr;
    this._ctx.scale(dpr, dpr);
    this._width = width;
    this._height = height;
    this._graghs = [];
    this._actionIndex = -1;
    this._point_indexs = {};
    this._backgroundStyle = backgroundStyle;
    this._ArcCanvas = {};
    this._center = {
      x: width / 2,
      y: height / 2
    };
    this._particles = [];
    for (let index = 0; index < PARTICLE_COUNTS; index++) {
      this._particles.push(new Particle(this._center));
    }
    this.clear();
    cancelAnimationFrame(this.raf);
  }
  buildGragh(data, mode) {
    return BUILD_FUNCTIONS[mode](data, this._width, this._height);
  }
  nextAction() {
    this._actionIndex++;
    this._actionIndex >= this._actions.length && (this._actionIndex = 0);
    this._actionGragh = this._graghs[this._actionIndex];
    this._tick = 0;
    this.setParticle();
  }
  setParticle() {
    const gragh_counts = this._actionGragh.length;
    this._particles.forEach((particle, index) => {
      if (!this._point_indexs[this._actionIndex])
        this._point_indexs[this._actionIndex] = [];

      let target_pragh = this._actionGragh[index % gragh_counts];
      if (!this._point_indexs[this._actionIndex][index])
        this._point_indexs[this._actionIndex][index] =
          0 | (Math.random() * target_pragh.length);
      let _idx = this._point_indexs[this._actionIndex][index];
      let target_point = target_pragh[_idx];
      particle.setAxis({
        x: target_point.x * this._width,
        y: target_point.y * this._height,
        z: 0 | (Math.random() * 30 - 15 + 1200),
        color: target_point.color
      });
    });
  }
  renderParticles() {
    const offScreenCanvas = document.createElement('canvas'),
      offScreenCanvasCtx = offScreenCanvas.getContext('2d');
    offScreenCanvas.width = this._canvas.width;
    offScreenCanvas.height = this._canvas.height;

    this._particles.forEach(particle => {
      let arc_r = 1;
      const positions = particle.getAxis2D();
      // let arcCanvas = this._getArcCanvas(`hsla(${particle.color.join(',')})`);
      offScreenCanvasCtx.fillStyle = `hsla(${particle.color.join(',')})`;
      offScreenCanvasCtx.fillRect(
        positions.x,
        positions.y,
        1 * positions.t,
        1 * positions.t
      );
    });
    this._ctx.drawImage(offScreenCanvas, 0, 0);
  }
  _getArcCanvas(color) {
    if (!this._ArcCanvas[color]) {
      const arcCanvas = document.createElement('canvas'),
        arcCtx = arcCanvas.getContext('2d');
      arcCanvas.width = 40;
      arcCanvas.height = 40;
      arcCtx.fillStyle = color;
      arcCtx.arc(20, 20, 20, 0, 2 * Math.PI);
      arcCtx.fill();
      this._ArcCanvas[color] = arcCanvas;
    }
    return this._ArcCanvas[color];
  }
  async build(actions) {
    this._actions = actions;
    this._graghs = [];
    for (let val of actions) {
      this._graghs.push(await this.buildGragh(val.data, val.mode));
    }
    this._graghs.length && this.nextAction();
    return this;
  }
  clear() {
    this._ctx.fillStyle = this._backgroundStyle;
    this._ctx.fillRect(0, 0, this._width, this._height);
  }
  draw() {
    this._tick++;
    this._tick >= this._actions[this._actionIndex].lifeTime &&
      this.nextAction();
    this.clear();
    this.renderParticles();
    this.raf = requestAnimationFrame(this.draw.bind(this));
  }
}

function rgbToHsl(r, g, b, a) {
  (r /= 255), (g /= 255), (b /= 255), (a /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h =
      60 *
      // red is largest
      (r > b && r > g
        ? (g - b) / d
        : // green is largest
        g > b && g > r
        ? 2 + (b - r) / d
        : // blue is largest
          4 + (r - g) / d);

    h < 0 && (h += 360);
  }
  h = h.toFixed(0);
  s = (s * 100).toFixed(0) + '%';
  l = (l * 100).toFixed(0) + '%';
  a = a.toFixed(3);
  return [h, s, l, 1];
}

function hexRgba2RgbaArr(hexRgba) {
  let reg = /([^#]{2})/g;
  let output = [];
  hexRgba.replace(reg, (...args) => {
    output.push(parseInt(`0x${args[1]}`));
  });
  return output;
}

export default Sence;
