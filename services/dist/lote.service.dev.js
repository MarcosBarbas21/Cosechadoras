"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var boom = require('@hapi/boom');

var parseKMZ = require("parse2-kmz");

var tj = require("@tmcw/togeojson"); // node doesn't have xml parsing or a dom. use xmldom


var DOMParser = require("xmldom").DOMParser;

var parser = require("kml-to-json");

var _require = require('./../libs/sequelize'),
    models = _require.models;

var LoteService =
/*#__PURE__*/
function () {
  function LoteService() {
    _classCallCheck(this, LoteService);
  }

  _createClass(LoteService, [{
    key: "create",
    value: function create(data) {
      var newLote;
      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(models.Lote.create(data));

            case 2:
              newLote = _context.sent;
              return _context.abrupt("return", newLote);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "find",
    value: function find() {
      var rta;
      return regeneratorRuntime.async(function find$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(models.Lote.findAll());

            case 2:
              rta = _context2.sent;
              return _context2.abrupt("return", rta);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "parseKml",
    value: function parseKml(coords) {
      var kml, rta;
      return regeneratorRuntime.async(function parseKml$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              kml = new DOMParser().parseFromString(coords);
              rta = tj.kml(kml);
              return _context3.abrupt("return", rta);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "parseKmz",
    value: function parseKmz(coords) {
      var kmz;
      return regeneratorRuntime.async(function parseKmz$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              //const kml = new DOMParser().parseFromString(coords);
              kmz = parseKMZ.toJson(coords); //const rta = tj.kml(kml);

              return _context4.abrupt("return", kmz);

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "findOne",
    value: function findOne(id) {
      var lote;
      return regeneratorRuntime.async(function findOne$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(models.Lote.findByPk(id));

            case 2:
              lote = _context5.sent;

              if (lote) {
                _context5.next = 5;
                break;
              }

              throw boom.notFound('Lote not found');

            case 5:
              return _context5.abrupt("return", lote);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "update",
    value: function update(id, changes) {
      var lote, rta;
      return regeneratorRuntime.async(function update$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.findOne(id));

            case 2:
              lote = _context6.sent;
              _context6.next = 5;
              return regeneratorRuntime.awrap(lote.update(changes));

            case 5:
              rta = _context6.sent;
              return _context6.abrupt("return", rta);

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "parse2",
    value: function parse2(changes) {
      var rta;
      return regeneratorRuntime.async(function parse2$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(parser.kmlToJson(changes));

            case 2:
              rta = _context7.sent;
              return _context7.abrupt("return", rta);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      });
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var lote;
      return regeneratorRuntime.async(function _delete$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.findOne(id));

            case 2:
              lote = _context8.sent;
              _context8.next = 5;
              return regeneratorRuntime.awrap(lote.destroy());

            case 5:
              return _context8.abrupt("return", {
                id: id
              });

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }]);

  return LoteService;
}();

module.exports = LoteService;