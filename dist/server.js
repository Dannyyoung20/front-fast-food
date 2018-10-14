'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

const PORT = '3000' || process.env.PORT;

app.use(_routes2.default);
app.use(_express2.default.static(_path2.default.join(__dirname, '../views')));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});