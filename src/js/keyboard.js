window.addEventListener('keyup', function(event) {  Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

export var Key = {
  _pressed: {},

  A: 65,
  W: 87,
  D: 68,
  F : 70,
  G : 71,
  S: 83,
  SPACE: 32,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.key.toUpperCase()] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.key.toUpperCase()];
  }
};


