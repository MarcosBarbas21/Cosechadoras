const boom = require('@hapi/boom');
const parseKMZ = require('parse2-kmz');
const tj = require("@tmcw/togeojson");
const fs = require('fs');
// node doesn't have xml parsing or a dom. use xmldom
const DOMParser = require("xmldom").DOMParser;

const parser = require("kml-to-json");
const { models } = require('./../libs/sequelize');

class LoteService {

  constructor() {}

  async create(data) {
    const newLote = await models.Lote.create(data);
    return newLote;
  }

  async find() {
    const rta = await models.Lote.findAll();
    return rta;
  }

  async parseKml(coords) {
    const kml = new DOMParser().parseFromString(fs.readFileSync(coords, "utf8"));
    const rta = tj.kml(kml);
    return rta;
  }

  async parseKmz(coords) {
    const kmz = parseKMZ.toJson(coords);
    return kmz;
  }

  async findOne(id) {
    const lote = await models.Lote.findByPk(id);
    if (!lote) {
      throw boom.notFound('Lote not found');
    }
    return lote;
  }

  async update(id, changes) {
    const lote = await this.findOne(id);
    const rta = await lote.update(changes);
    return rta;
  }

  async parse2(changes) {
    //let coords = changes.flat();
    let rta = await parser.kmlToJson(changes);
    //const rta = await lote.update(changes);
    return rta;
  }

  async delete(id) {
    const lote = await this.findOne(id);
    await lote.destroy();
    return { id };
  }

}

module.exports = LoteService;
