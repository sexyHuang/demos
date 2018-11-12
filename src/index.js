import Sence from './arc-animate';

let actions = [
  {
    mode: 'text',
    lifeTime: 90,
    data: [
      {
        text: 'Listen',
        color: '#cccccc'
      }
    ]
  },
  {
    mode: 'text',
    lifeTime: 60,
    data: [
      {
        text: '3',
        color: '#660000'
      }
    ]
  },
  {
    mode: 'text',
    lifeTime: 60,
    data: [
      {
        text: '2',
        color: '#880000'
      }
    ]
  },
  {
    mode: 'text',
    lifeTime: 60,
    data: [
      {
        text: '1',
        color: '#990000'
      }
    ]
  },
  {
    mode: 'text',
    lifeTime: 120,
    data: [
      {
        text: '你好',
        color: '#cccccc'
      },
      {
        text: '骚',
        color: '#990000'
      },
      {
        text: '啊',
        color: '#cccccc'
      }
    ]
  }
];
async function load() {
  let canvas = document.querySelector('#mycanvas'),
    canvasWidth = window.innerWidth,
    canvasHeight = window.innerHeight;
  let scene = new Sence(canvas, canvasWidth, canvasHeight);
  await scene.build(actions);
  scene.draw();
}
window.addEventListener('load', load);
