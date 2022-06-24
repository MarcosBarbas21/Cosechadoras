"use strict";

var Joi = require('joi');

var id = Joi.number().integer();
var name = Joi.string();
var coords = Joi.any();
var area = Joi.number();
var userId = Joi.number().integer();
var createLoteSchema = Joi.object({
  name: name.required(),
  coords: coords.required(),
  area: area.required(),
  userId: userId.required()
});
var updateLoteSchema = Joi.object({
  name: name,
  coords: coords,
  area: area
});
var getLoteSchema = Joi.object({
  id: id.required()
});
var getParsedKMZ = Joi.object({
  coords: coords.required()
});
module.exports = {
  createLoteSchema: createLoteSchema,
  updateLoteSchema: updateLoteSchema,
  getLoteSchema: getLoteSchema,
  getParsedKMZ: getParsedKMZ
};