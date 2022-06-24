"use strict";

var express = require('express');

var LoteService = require('../services/lote.service');

var validatorHandler = require('../middlewares/validator.handler');

var _require = require('../schemas/lotes.schema'),
    createLoteSchema = _require.createLoteSchema,
    updateLoteSchema = _require.updateLoteSchema,
    getLoteSchema = _require.getLoteSchema,
    getParsedKMZ = _require.getParsedKMZ;

var router = express.Router();
var service = new LoteService();
/*router.get('/',
  validatorHandler(getParsedKMZ, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newParsed = await service.parse2(body);
      res.status(201).json(newParsed);
    } catch (error) {
      next(error);
    }
  }
);*/

router.get('/', function _callee(req, res, next) {
  var lotes;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(service.find());

        case 3:
          lotes = _context.sent;
          res.json(lotes);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.patch('/kml/:coords', validatorHandler(getParsedKMZ, 'params'), function _callee2(req, res, next) {
  var coords, newJson;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          coords = req.body.coords;
          _context2.next = 3;
          return regeneratorRuntime.awrap(service.parseKml(coords));

        case 3:
          newJson = _context2.sent;
          res.json(newJson);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.patch('/kmz/:coords', validatorHandler(getParsedKMZ, 'params'), function _callee3(req, res, next) {
  var coords, newJson;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          coords = req.body.coords;
          _context3.next = 3;
          return regeneratorRuntime.awrap(service.parseKmz(coords));

        case 3:
          newJson = _context3.sent;
          res.json(newJson);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //?name=tom

router.get('/id/:id', validatorHandler(getLoteSchema, 'params'), function _callee4(req, res, next) {
  var id, lote;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(service.findOne(id));

        case 4:
          lote = _context4.sent;
          res.json(lote);
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.post('/', validatorHandler(createLoteSchema, 'body'), function _callee5(req, res, next) {
  var body, newLote;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          body = req.body;
          _context5.next = 4;
          return regeneratorRuntime.awrap(service.create(body));

        case 4:
          newLote = _context5.sent;
          res.status(201).json(newLote);
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
/*router.patch('/:id',
  validatorHandler(getLoteSchema, 'params'),
  validatorHandler(updateLoteSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const lote = await service.update(id, body);
      res.json(lote);
    } catch (error) {
      next(error);
    }
  }
);
*/

router["delete"]('/:id', validatorHandler(getLoteSchema, 'params'), function _callee6(req, res, next) {
  var id;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(service["delete"](id));

        case 4:
          res.status(201).json({
            id: id
          });
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;