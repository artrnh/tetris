// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({7:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Field = /** @class */function () {
    function Field(width, height) {
        var _this = this;
        this.width = width;
        this.height = height;
        this.clear = function () {
            _this.matrix.forEach(function (row) {
                return row.fill(0);
            });
        };
        this.collides = function (piece, position) {
            return piece.matrix.some(function (row, y) {
                return row.some(function (cell, x) {
                    return cell && (_this.matrix[y + position.y] && _this.matrix[y + position.y][x + position.x]) !== 0;
                });
            });
        };
        this.merge = function (piece, position) {
            piece.matrix.forEach(function (row, y) {
                row.forEach(function (cell, x) {
                    if (cell) _this.matrix[y + position.y][x + position.x] = cell;
                });
            });
        };
        this.sweep = function (player) {
            var rowCount = 1;
            for (var y = _this.matrix.length - 1; y > 0; y--) {
                if (_this.matrix[y].every(function (cell) {
                    return cell !== 0;
                })) {
                    var row = _this.matrix.splice(y, 1)[0].fill(0);
                    _this.matrix.unshift(row);
                    y += 1;
                    player.score += rowCount * 10;
                    rowCount *= 2;
                }
            }
        };
        var matrix = [];
        while (height--) {
            matrix.push(new Array(width).fill(0));
        }
        this.matrix = matrix;
    }
    return Field;
}();
exports.default = Field;
},{}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var colors = [null, '#e5282e', '#f8d517', '#df2384', '#274696', '#ef7e18', '#5cad2c', '#2cb099'];
var Game = /** @class */function () {
    function Game(context, player, field) {
        var _this = this;
        this.context = context;
        this.player = player;
        this.field = field;
        this.lastTime = 0;
        this.run = function (time) {
            if (time === void 0) {
                time = 0;
            }
            var deltaTime = time - _this.lastTime;
            _this.lastTime = time;
            _this.player.dropCounter += deltaTime;
            if (_this.player.dropCounter > Game.dropInterval) {
                _this.player.drop();
            }
            _this.draw();
            requestAnimationFrame(_this.run);
        };
        this.draw = function () {
            _this.context.fillStyle = '#000';
            _this.context.fillRect(0, 0, _this.context.canvas.width, _this.context.canvas.height);
            _this.drawMatrix(_this.field.matrix, { x: 0, y: 0 });
            _this.drawMatrix(_this.player.piece.matrix, _this.player.position);
        };
        this.drawMatrix = function (matrix, position) {
            matrix.forEach(function (row, y) {
                row.forEach(function (cell, x) {
                    if (cell) {
                        _this.context.fillStyle = colors[cell];
                        _this.context.fillRect(x + position.x, y + position.y, 1, 1);
                    }
                });
            });
        };
        player.game = this;
        player.reset();
        player.updateScore();
    }
    Game.dropInterval = 1000;
    return Game;
}();
exports.default = Game;
},{}],10:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Direction = exports.Direction = undefined;
(function (Direction) {
    Direction[Direction["Left"] = -1] = "Left";
    Direction[Direction["Right"] = 1] = "Right";
})(Direction || (exports.Direction = Direction = {}));
var KeyCode = exports.KeyCode = undefined;
(function (KeyCode) {
    KeyCode[KeyCode["Space"] = 32] = "Space";
    KeyCode[KeyCode["Left"] = 37] = "Left";
    KeyCode[KeyCode["Up"] = 38] = "Up";
    KeyCode[KeyCode["Right"] = 39] = "Right";
    KeyCode[KeyCode["Down"] = 40] = "Down";
    KeyCode[KeyCode["W"] = 87] = "W";
    KeyCode[KeyCode["A"] = 65] = "A";
    KeyCode[KeyCode["S"] = 83] = "S";
    KeyCode[KeyCode["D"] = 68] = "D";
})(KeyCode || (exports.KeyCode = KeyCode = {}));
var Player = /** @class */function () {
    function Player(piece) {
        var _this = this;
        this.piece = piece;
        this.dropCounter = 0;
        this.position = { x: 0, y: 0 };
        this.score = 0;
        this.drop = function () {
            _this.position.y += 1;
            if (_this.game.field.collides(_this.piece, _this.position)) {
                _this.position.y -= 1;
                _this.game.field.merge(_this.piece, _this.position);
                _this.reset();
                _this.game.field.sweep(_this);
                _this.updateScore();
            }
            _this.dropCounter = 0;
        };
        this.inputController = function (e) {
            switch (e.keyCode) {
                case KeyCode.Left:
                case KeyCode.A:
                    _this.move(Direction.Left);
                    break;
                case KeyCode.Right:
                case KeyCode.D:
                    _this.move(Direction.Right);
                    break;
                case KeyCode.Down:
                case KeyCode.S:
                    _this.drop();
                    break;
                case KeyCode.Up:
                case KeyCode.W:
                case KeyCode.Space:
                    _this.rotate();
                default:
                    break;
            }
        };
        this.reset = function () {
            var type = Math.floor(_this.piece.typesCount * Math.random());
            _this.piece.matrix = _this.piece.createMatrix(type);
            _this.position.y = 0;
            _this.position.x = Math.floor(_this.game.field.width / 2) - Math.floor(_this.piece.matrix.length / 2);
            if (_this.game.field.collides(_this.piece, _this.position)) {
                _this.game.field.clear();
                _this.score = 0;
                _this.updateScore();
            }
        };
        this.updateScore = function () {
            document.getElementById('score').innerText = "Score: " + _this.score;
        };
        this.move = function (direction) {
            _this.position.x += direction;
            if (_this.game.field.collides(_this.piece, _this.position)) _this.position.x -= direction;
        };
        this.rotate = function () {
            var initialX = _this.position.x;
            var offset = 1;
            _this.piece.rotate(Direction.Right);
            while (_this.game.field.collides(_this.piece, _this.position)) {
                _this.position.x += offset;
                offset = -(offset > 0 ? offset + 1 : offset - 1);
                if (offset > _this.piece.matrix.length) {
                    _this.piece.rotate(Direction.Left);
                    _this.position.x = initialX;
                    return;
                }
            }
        };
    }
    return Player;
}();
exports.default = Player;
},{}],9:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Type = undefined;

var _Player = require("./Player");

var Type = exports.Type = undefined;
(function (Type) {
    Type[Type["I"] = 0] = "I";
    Type[Type["J"] = 1] = "J";
    Type[Type["L"] = 2] = "L";
    Type[Type["O"] = 3] = "O";
    Type[Type["S"] = 4] = "S";
    Type[Type["T"] = 5] = "T";
    Type[Type["Z"] = 6] = "Z";
})(Type || (exports.Type = Type = {}));
var Piece = /** @class */function () {
    function Piece() {
        var _this = this;
        this.createMatrix = function (type) {
            switch (type) {
                case Type.I:
                    return [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
                case Type.J:
                    return [[0, 2, 0], [0, 2, 0], [2, 2, 0]];
                case Type.L:
                    return [[0, 3, 0], [0, 3, 0], [0, 3, 3]];
                case Type.O:
                default:
                    return [[4, 4], [4, 4]];
                case Type.S:
                    return [[0, 5, 5], [5, 5, 0], [0, 0, 0]];
                case Type.T:
                    return [[6, 6, 6], [0, 6, 0], [0, 0, 0]];
                case Type.Z:
                    return [[7, 7, 0], [0, 7, 7], [0, 0, 0]];
            }
        };
        this.rotate = function (direction) {
            if (direction === void 0) {
                direction = _Player.Direction.Right;
            }
            var _a;
            for (var y = 0; y < _this.matrix.length; y++) {
                for (var x = 0; x < y; x++) {
                    _a = [_this.matrix[y][x], _this.matrix[x][y]], _this.matrix[x][y] = _a[0], _this.matrix[y][x] = _a[1];
                }
            }
            if (direction === _Player.Direction.Right) {
                _this.matrix.forEach(function (row) {
                    return row.reverse();
                });
            } else {
                _this.matrix.reverse();
            }
        };
        this.type = Math.floor(this.typesCount * Math.random());
        this.matrix = this.createMatrix(this.type);
    }
    Object.defineProperty(Piece.prototype, "typesCount", {
        get: function get() {
            return Object.keys(Type).length / 2;
        },
        enumerable: true,
        configurable: true
    });
    return Piece;
}();
exports.default = Piece;
},{"./Player":10}],4:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.context = undefined;

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

var _Piece = require('./Piece');

var _Piece2 = _interopRequireDefault(_Piece);

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('tetris');
var context = exports.context = canvas.getContext('2d');
context.scale(20, 20);
var field = new _Field2.default(12, 20);
var player = new _Player2.default(new _Piece2.default());
var game = new _Game2.default(context, player, field);
document.addEventListener('keydown', player.inputController);
game.run();
},{"./Field":7,"./Game":8,"./Piece":9,"./Player":10}],19:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '56246' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[19,4], null)
//# sourceMappingURL=/src.8f92a867.map