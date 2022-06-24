"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('sequelize'),
    Model = _require.Model,
    DataTypes = _require.DataTypes,
    Sequelize = _require.Sequelize;

var _require2 = require('./user.model'),
    USER_TABLE = _require2.USER_TABLE;

var LOTE_TABLE = 'lotes';
var LoteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  coords: {
    allowNull: false,
    type: DataTypes.TEXT,
    field: 'coords'
  },
  area: {
    allowNull: false,
    type: DataTypes.FLOAT,
    field: 'area'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

var Lote =
/*#__PURE__*/
function (_Model) {
  _inherits(Lote, _Model);

  function Lote() {
    _classCallCheck(this, Lote);

    return _possibleConstructorReturn(this, _getPrototypeOf(Lote).apply(this, arguments));
  }

  _createClass(Lote, null, [{
    key: "associate",
    value: function associate(models) {
      this.belongsTo(models.User, {
        as: 'user'
      });
      this.hasMany(models.LoteFiltrado, {
        as: 'lotesFiltrados',
        foreignKey: 'loteId'
      });
    }
  }, {
    key: "config",
    value: function config(sequelize) {
      return {
        sequelize: sequelize,
        tableName: LOTE_TABLE,
        modelName: 'Lote',
        timestamps: false
      };
    }
  }]);

  return Lote;
}(Model);

module.exports = {
  Lote: Lote,
  LoteSchema: LoteSchema,
  LOTE_TABLE: LOTE_TABLE
};