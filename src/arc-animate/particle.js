const w = Math.PI * 0.6,
  r = 1.8;
const FOCUS_POSITION = 1200;
export default class Particle {
  constructor(center) {
    this.center = center;
    Object.assign(this, {
      _x: 0,
      _y: 0,
      _z: 0,
      x: center.x,
      y: center.y,
      z: 1200,
      _dX: 0,
      _dY: 0,
      _dZ: 0,

      _startTime: null
    });
  }
  setAxis({ x, y, z, color }) {
    this._x = this.x + this._x;
    this._y = this.y + this._y;
    this._z = this.z + this._z;
    /*  this.n_x = x;
    this.n_y = y;
    this.n_y = z; */
    this._dX = x - this._x;
    this._dY = y - this._y;
    this._dZ = z - this._z;

    this.color = color;
    this._startTime = null;
  }
  step() {
    let now = new Date();
    if (!this._startTime) {
      this._startTime = now;
    }
    let dTime = (now - this._startTime) / 1000;
    if (dTime == 0) {
      let a = 0;
    } else {
      let b = 0;
    }
    this.x = this._dX - damping(dTime, this._dX);
    this.y = this._dY - damping(dTime, this._dY);
    this.z = this._dZ - damping(dTime, this._dZ);
  }
  getAxis2D() {
    const t = FOCUS_POSITION / (FOCUS_POSITION + this.z);
    this.step();
    return {
      x: (this._x + this.x * t).toFixed(0),
      y: (this._y + this.y * t).toFixed(0),
      t: (t - 1) * 50 + 1
    };
  }
}

function damping(time, A = 1) {
  return A * Math.exp(-r * time) * Math.cos(w * time);
}
