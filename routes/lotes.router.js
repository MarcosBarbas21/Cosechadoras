const express = require('express');
const multer = require('multer');
const fs = require('fs');
const LoteService = require('../services/lote.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createLoteSchema,
  updateLoteSchema,
  getLoteSchema,
} = require('../schemas/lotes.schema');

const router = express.Router();
const service = new LoteService();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './dist');
  },
  filename: function (req, file, cb) {
    //cb('-' + ) );
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post('/parse', upload.single('file'), async (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Ingrese un archivo');
    error.httpStatusCode = 400;
    return next(error);
  }
  const ext = file.filename.slice(file.filename.length - 3, file.filename.length);
  console.log(ext);
  let newJson;
  const coords = file.path;
  if (ext == 'kmz') {newJson = await service.parseKmz(coords)}
  else if (ext == 'kml') {newJson = await service.parseKml(coords)}
  else {
    const error = new Error('Formato archivo no valido');
    error.httpStatusCode = 400;
    return next(error);
  }
  try {
    fs.unlinkSync(coords);
  } catch(err) {
    console.error(err)
  }
  res.json(newJson);
});

router.get('/', async (req, res, next) => {
  try {
    const lotes = await service.find();
    res.json(lotes);
  } catch (error) {
    next(error);
  }
});

/*router.patch(
  '/kmz/:coords',
  //validatorHandler(getParsedKMZ, 'params'),
  async (req, res, next) => {
    const { coords } = req.file;
    console.log(coords);
    //const newJson = await service.parseKmz(coords);
    res.json(coords);
    //res.json(newJson);
  }
);*/
//?name=tom

router.get(
  '/id/:id',
  validatorHandler(getLoteSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const lote = await service.findOne(id);
      res.json(lote);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createLoteSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newLote = await service.create(body);
      res.status(201).json(newLote);
    } catch (error) {
      next(error);
    }
  }
);

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
router.delete(
  '/:id',
  validatorHandler(getLoteSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
