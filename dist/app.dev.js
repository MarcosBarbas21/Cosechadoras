"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var data;
var lotes = [];
var allLotes = [];
var allUsers = [];
var allLotesFiltradosPorLote = [];
var lote = {
  name: null,
  coords: null,
  area: null,
  userId: null
};
var lotesFiltrados = [];
var loteFiltrado = {
  name: null,
  coords: null,
  area: null,
  loteId: null
};
var user = {
  name: null,
  password: null
};

var mainMenu = function mainMenu() {
  var response;
  return regeneratorRuntime.async(function mainMenu$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          document.getElementById('app').innerHTML = "\n  <input type=\"text\" placeholder=\"Ingrese su usuario\" id=\"user\"/>\n  <input type=\"password\" placeholder=\"Ingrese su contrasena\" id=\"password\"/>\n  <input type=\"button\" value=\"Ingresar\" onclick=\"loginButton()\"/>";
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/api/users'));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          allUsers = _context.sent;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

var menuMapas = function menuMapas() {
  return regeneratorRuntime.async(function menuMapas$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          document.getElementById('app').innerHTML = "\n  <input type=\"button\" value=\"Analizar nuevos lotes\" onclick=\"menuAnalizarMapa()\"/>\n  <input type=\"button\" value=\"Visualizar mapas ya analizados\" onclick=\"menuMapasAnalizados()\"/>";

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var menuAnalizarMapa = function menuAnalizarMapa() {
  document.getElementById('app').innerHTML = "\n    <input value=\"asd\" type=\"file\" onChange=\"readFile(this)\" />\n    </br>\n    <h3>Seleccione el lote</h3>\n    <div>\n      <select id=\"lotes\" name=\"select\" onClick=\"selectLoft()\">\n      </select>\n    </div>\n    <input value=\"Agregar nuevo lote:\" type=\"button\" onClick=\"addPolygon()\"/>\n    <div id=\"polygons\">\n    </div>\n    </br>\n    <div>\n      <ul id=\"selectedLofts\"></ul>\n    </div>\n    </br>\n    <label for=\"machineWidth\">\n      Ancho de la maquina:<br>\n    <input type=\"number\" id=\"machineWidth\"/>\n    </label><br>\n    <input value=\"Ver resultado\" type=\"button\" id=\"generateMapButton\" onClick=\"analyze()\"/>\n    <div id=\"maps\">\n    </div>\n    <div id=\"result\">\n    </div>\n    <input type=\"button\" value=\"Probar con otro\" onclick=\"menuAnalizarMapa()\"/>\n    <input type=\"button\" value=\"Volver\" onclick=\"menuMapas()\"/>";
  showLofts();
};

var menuMapasAnalizados = function menuMapasAnalizados() {
  document.getElementById('app').innerHTML = "\n  <h3>Seleccione los lotes analizados</h3>\n  <div>\n    <select id=\"lotesTodosFiltrados\" name=\"select\" onClick=\"selectLoftBeenFiltered()\">\n    </select>\n  </div>\n  <div id=\"FilteredComboBox\">\n    <select id=\"lotesFiltrados\" name=\"selectFiltered\" onClick=\"selectFilteredLoft()\">\n    </select>\n  </div>\n  <div>\n    <ul id=\"selectedFilteredLofts\"></ul>\n  </div>\n  <input value=\"Mostrar lotes\" type=\"button\" id=\"generateMapButtonFiltered\" onClick=\"generateMapFiltered()\"/>\n  <div id=\"maps2\"></div>\n  <div id=\"result2\">\n  </div>\n  <input type=\"button\" value=\"Probar con otro\" onclick=\"menuMapasAnalizados()\"/>\n  <input type=\"button\" value=\"Volver\" onclick=\"menuMapas()\"/>";
  showLoftsBeenFiltered();
};

var loginButton = function loginButton() {
  var usuario = document.getElementById('user').value;
  var pass = document.getElementById('password').value;
  var count = 0;

  for (var i = 0; i < allUsers.length; i++) {
    console.log(allUsers, usuario, pass);

    if (allUsers[i].name == usuario && pass == allUsers[i].password) {
      user.id = allUsers[i].id;
      console.log(allUsers[i].id);
      menuMapas();
    } else {
      count++;
    }
  }

  if (allUsers.length == count) alert('Usuario o contrasena no valido');
};

var showLofts = function showLofts() {
  var field, response, lofts, i, _i, option, _option;

  return regeneratorRuntime.async(function showLofts$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          field = document.getElementById('lotes');
          field.innerHTML = '';
          _context3.next = 4;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/api/lotes'));

        case 4:
          response = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          lofts = _context3.sent;

          if (allLotes) {
            for (i = 0; i < allLotes.length; i++) {
              allLotes.pop();
            }
          }

          allLotes = _toConsumableArray(lofts);

          for (_i = 0; _i < lofts.length; _i++) {
            if (lofts[_i].userId == 1) {
              option = "<option value=\"".concat(lofts[_i].name, "\">").concat(lofts[_i].name, "</option>");
              field.insertAdjacentHTML('beforeend', option);
            }
          }

          if (allLotes.length == 0) {
            _option = "<option>No hay lotes cargados</option>";
            field.insertAdjacentHTML('beforeend', _option);
          }

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var selectFilteredLoft = function selectFilteredLoft() {
  var selected = document.getElementById('lotesFiltrados').value;
  console.log(allLotesFiltradosPorLote.length);

  for (var i = 0; i < allLotesFiltradosPorLote.length; i++) {
    console.log(allLotesFiltradosPorLote[i].name, selected);

    if (allLotesFiltradosPorLote[i].name == selected) {
      lotesFiltrados.push(allLotesFiltradosPorLote[i]);
    }
  }

  console.log(lotesFiltrados);
  selectedFilteredLofts();
};

var selectedFilteredLofts = function selectedFilteredLofts() {
  var ul = document.getElementById('selectedFilteredLofts');
  ul.innerHTML = '';

  for (var i = 0; i < lotesFiltrados.length; i++) {
    console.log(lotesFiltrados);
    var li = "<li onclick=\"eraseLoteFiltrado(".concat(i, ")\">").concat(lotesFiltrados[i].name, "</li>");
    ul.insertAdjacentHTML('beforeend', li);
  }
};

var generateMapFiltered = function generateMapFiltered() {
  var coordenadas, i, j;
  return regeneratorRuntime.async(function generateMapFiltered$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          document.getElementById('generateMapButtonFiltered').style.visibility = 'hidden';
          coordenadas = []; //const response = await fetch('http://localhost:3000/api/filtrados');
          //const lofts = await response.json();

          for (i = 0; i < lotesFiltrados.length; i++) {
            coordenadas.push(JSON.parse(allLotesFiltradosPorLote[i].coords));
            console.log(allLotesFiltradosPorLote, allLotes);

            for (j = 0; j < allLotes.length; j++) {
              console.log(allLotesFiltradosPorLote[i].id, allLotes[j]);

              if (allLotesFiltradosPorLote[i].id == allLotes[j].id) {
                percentage('result2', i, allLotesFiltradosPorLote[i].area, allLotes[j].area, lotesFiltrados);
              }
            }
          }

          console.log(coordenadas);
          generateMap('maps2', coordenadas, lotesFiltrados);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var showLoftsBeenFiltered = function showLoftsBeenFiltered() {
  var field, response, lofts, i, option, _i2, _option2, _option3;

  return regeneratorRuntime.async(function showLoftsBeenFiltered$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          field = document.getElementById('lotesTodosFiltrados');
          field.innerHTML = '';
          _context5.next = 4;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/api/lotes'));

        case 4:
          response = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          lofts = _context5.sent;

          if (allLotes) {
            for (i = 0; i < allLotes.length; i++) {
              allLotes.pop();
            }
          } else {
            option = "<option>No hay lotes disponibles</option>";
            field.insertAdjacentHTML('beforeend', option);
          }

          allLotes = _toConsumableArray(lofts);

          for (_i2 = 0; _i2 < lofts.length; _i2++) {
            if (allLotes[_i2].userId == 1) {
              _option2 = "<option value=\"".concat(allLotes[_i2].name, "\">").concat(allLotes[_i2].name, "</option>");
              field.insertAdjacentHTML('beforeend', _option2);
            }
          }

          if (allLotes.length == 0) {
            _option3 = "<option>No hay lotes disponibles</option>";
            field.insertAdjacentHTML('beforeend', _option3);
          }

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var showFilteredLoftByLoft = function showFilteredLoftByLoft(index) {
  var field, response, loftsFiltrados, i, _i3, option, _option4;

  return regeneratorRuntime.async(function showFilteredLoftByLoft$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          field = document.getElementById('lotesFiltrados');
          field.innerHTML = '';
          _context6.next = 4;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/api/filtrados'));

        case 4:
          response = _context6.sent;
          _context6.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          loftsFiltrados = _context6.sent;

          if (allLotesFiltradosPorLote) {
            for (i = 0; i < allLotesFiltradosPorLote.length; i++) {
              allLotesFiltradosPorLote.pop();
            }
          }

          allLotesFiltradosPorLote = _toConsumableArray(loftsFiltrados);

          for (_i3 = 0; _i3 < loftsFiltrados.length; _i3++) {
            console.log(loftsFiltrados[_i3].id, index);

            if (loftsFiltrados[_i3].id == index) {
              option = "<option value=\"".concat(loftsFiltrados[_i3].name, "\">").concat(loftsFiltrados[_i3].name, "</option>");
              field.insertAdjacentHTML('beforeend', option);
              jindex = _i3;
            }
          }

          if (allLotesFiltradosPorLote.length == 0) {
            _option4 = "<option>No hay lotes disponibles</option>";
            field.insertAdjacentHTML('beforeend', _option4);
          }

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  });
};

var selectLoftBeenFiltered = function selectLoftBeenFiltered() {
  var selected = document.getElementById('lotesTodosFiltrados').value;
  var index;

  for (var i = 0; i < allLotes.length; i++) {
    console.log(allLotes[i].name, selected, index);

    if (allLotes[i].name == selected) {
      index = i + 1;
    }
  }

  showFilteredLoftByLoft(index);
};

var selectLoft = function selectLoft() {
  var selected = document.getElementById('lotes').value;

  for (var i = 0; i < allLotes.length; i++) {
    if (allLotes[i].name == selected) {
      lotes.push(allLotes[i]);
    }
  }

  selectedLofts();
};

var eraseLoteFiltrado = function eraseLoteFiltrado(index) {
  lotesFiltrados.splice(index, 1);
  selectedFilteredLofts();
};

var eraseLote = function eraseLote(index) {
  lotes.splice(index, 1);
  selectedLofts();
};

var selectedLofts = function selectedLofts() {
  var ul = document.getElementById('selectedLofts');
  ul.innerHTML = '';

  for (var i = 0; i < lotes.length; i++) {
    var li = "<li onclick=\"eraseLote(".concat(i, ")\">").concat(lotes[i].name, "</li>");
    ul.insertAdjacentHTML('beforeend', li);
  }
};

var analyze = function analyze() {
  var coordinates, filteredMap;
  return regeneratorRuntime.async(function analyze$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          try {
            document.getElementById('generateMapButton').style.visibility = 'hidden'; //ESCONDE EL BOTON 'VER RESULTADO DESPUES DE EJECUTAR'

            coordinates = getCoordinates(data); //OBTIENE LAS COORDENADAS

            filteredMap = getValidatedCoordinates(data, coordinates); //VALIDA LAS UTILES

            generateMap('maps', filteredMap, lotes); //GENERA EL MAPA

            areaCalculator(filteredMap); //CALCULA LAS AREAS
          } catch (_unused) {
            alert('Error'); //CASO DE FALLO ALERTA Y ACTUALIZA PAGINA
            //location.reload();
          }

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
};

var addPolygon = function addPolygon() {
  ///FUNCION BOTON 'AGREGAR LOTE'
  var getElementDiv = document.getElementById('polygons');
  var inputNumber = getElementDiv.childElementCount; //CUENTA LOS HIJOS ACTUALES (ES CON -1 PORQUE EL BOTON CUENTA YA COMO UN HIJO)

  getElementDiv.innerHTML = '';

  if (inputNumber < 2) {
    var fileField = "<input value=\"asd\" type=\"file\" multiple onChange=\"readFile(this)\" />";
    var confirmButton = "<input value=\"Confirmar\" type=\"button\" onClick=confirmLote() id=\"confirmLote\"/>";
    getElementDiv.insertAdjacentHTML('beforeend', fileField);
    getElementDiv.insertAdjacentHTML('beforeend', confirmButton);
  }
};

var confirmLote = function confirmLote() {
  var kml, _loop, i, _ret;

  return regeneratorRuntime.async(function confirmLote$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          kml = {
            coords: null
          };

          _loop = function _loop(i) {
            var url, toJson, newLote, loftCoords, loftArea, loftName, postLote;
            return regeneratorRuntime.async(function _loop$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    kml.coords = data[i] + ' ';
                    console.log(JSON.stringify(kml));
                    url = 'http://localhost:3000/api/lotes/kml/1';

                    toJson = function toJson() {
                      var resp;
                      return regeneratorRuntime.async(function toJson$(_context8) {
                        while (1) {
                          switch (_context8.prev = _context8.next) {
                            case 0:
                              _context8.next = 2;
                              return regeneratorRuntime.awrap(fetch(url, {
                                method: 'PATCH',
                                body: JSON.stringify(kml),
                                headers: {
                                  'Content-type': 'application/json'
                                }
                              }).then(function (response) {
                                return response.json();
                              }).then(function (json) {
                                return resp = json;
                              })["catch"](function (err) {
                                return console.log(err);
                              }));

                            case 2:
                              return _context8.abrupt("return", resp);

                            case 3:
                            case "end":
                              return _context8.stop();
                          }
                        }
                      });
                    };

                    _context10.next = 6;
                    return regeneratorRuntime.awrap(toJson());

                  case 6:
                    newLote = _context10.sent;
                    _context10.prev = 7;
                    loftCoords = JSON.stringify(newLote.features[0].geometry.coordinates[0]);
                    loftArea = Number(newLote.features[0].properties.Area);
                    loftName = newLote.features[0].properties.Lote;

                    if (!(loftCoords && loftArea && loftName)) {
                      _context10.next = 19;
                      break;
                    }

                    lote.userId = 1;
                    lote.coords = loftCoords;
                    lote.name = loftName;
                    lote.area = loftArea;

                    postLote = function postLote() {
                      return regeneratorRuntime.async(function postLote$(_context9) {
                        while (1) {
                          switch (_context9.prev = _context9.next) {
                            case 0:
                              fetch('http://localhost:3000/api/lotes', {
                                method: 'POST',
                                body: JSON.stringify(lote),
                                headers: {
                                  'Content-type': 'application/json;charset=UTF-8'
                                }
                              }).then(function (response) {
                                return response.json();
                              }).then(function (json) {
                                return console.log(json);
                              })["catch"](function (err) {
                                return console.log(err);
                              });
                              document.getElementById('polygons').innerHTML = '<h2>Agregado</h2>';

                            case 2:
                            case "end":
                              return _context9.stop();
                          }
                        }
                      });
                    };

                    _context10.next = 19;
                    return regeneratorRuntime.awrap(postLote());

                  case 19:
                    _context10.next = 24;
                    break;

                  case 21:
                    _context10.prev = 21;
                    _context10.t0 = _context10["catch"](7);
                    return _context10.abrupt("return", "continue");

                  case 24:
                  case "end":
                    return _context10.stop();
                }
              }
            }, null, null, [[7, 21]]);
          };

          i = 0;

        case 3:
          if (!(i < data.length)) {
            _context11.next = 12;
            break;
          }

          _context11.next = 6;
          return regeneratorRuntime.awrap(_loop(i));

        case 6:
          _ret = _context11.sent;

          if (!(_ret === "continue")) {
            _context11.next = 9;
            break;
          }

          return _context11.abrupt("continue", 9);

        case 9:
          i++;
          _context11.next = 3;
          break;

        case 12:
          _context11.next = 14;
          return regeneratorRuntime.awrap(showLofts());

        case 14:
        case "end":
          return _context11.stop();
      }
    }
  });
};

var readFile = function readFile(input) {
  //FUNCION QUE LEE EL ARCHIVO
  var allFiles = input.files;
  var allLofts = [];

  var _loop2 = function _loop2(i) {
    var file = input.files[i];
    var fileReader = new FileReader();
    fileReader.readAsText(file);

    fileReader.onload = function () {
      allLofts.push(fileReader.result); //LA ALMACENA EN 'DATA' QUE ES UNA VARIABLE GLOBAL
    };

    fileReader.onerror = function () {
      alert(fileReader.error);
    };
  };

  for (var i = 0; i < allFiles.length; i++) {
    _loop2(i);
  }

  data = allLofts;
  console.log(data);
};

var getCoordinates = function getCoordinates(props) {
  //TOMA EL JSON (ARCHIVO) Y EXTRAE LAS COORDENADAS
  var newData = JSON.parse(props);
  var featuresLength = newData['features'].length;
  var coordinates = newData['features'][featuresLength - 1]['geometry']['coordinates'];

  for (var i = 0; i < coordinates.length; i++) {
    coordinates[i].pop([2]);
    coordinates[i] = coordinates[i].reverse(); //INVIERTE EL ORDEN DE LAS COORDENADAS
  }

  return coordinates;
};

var getValidatedCoordinates = function getValidatedCoordinates(props, coordinates) {
  //TOMA LAS COORDENAS, LAS FILTRA CON LAS DESCRIPCIONES LIMPIAS Y VALIDA CUANDO ESTUVO EN MOVIMIENTO
  var newData = JSON.parse(props);
  var regex = /(<b>).+?(<br>)/g;
  var regex2 = /(<\/b>).+?(<br>)/g;
  var regex3 = /(<b>).+?(<\/b>)/g;
  var featuresLength = newData['features'].length;
  var descriptionArray = [[], [], []];

  for (var i = 0; i < featuresLength; i++) {
    var description = newData['features'][i]['properties']['description'];
    getDescriptionArray(regex3, description, descriptionArray[0]);
    getDescriptionArray(regex2, description, descriptionArray[1]);

    while ((match = regex2.exec(description)) !== null) {
      regex.lastIndex -= 2;
      descriptionArray[2].push(i);
    }
  }

  var validatedCoords = sliceDescription(descriptionArray, coordinates);
  var filteredMap = filterMap(validatedCoords, lotes);
  loteFiltrado.coords = JSON.stringify(filteredMap);
  return filteredMap;
};

var sliceDescription = function sliceDescription(descriptionArray, coordinates) {
  //TOMA UN ARREGLO CON LAS DESCRIPCIONES DEL MAPA Y LAS COORDENADAS, DEVUELVE LAS COORDENADAS LIMPIAS
  var indexKey1 = '<b>';
  var indexKey2 = '</b>';
  var indexKey3 = '<br>';
  descriptionSlicer(descriptionArray[0], indexKey1, indexKey2);
  descriptionSlicer(descriptionArray[1], indexKey2, indexKey3);
  var indexes = new Set(descriptionArray[2]);

  var descriptionIndexes = _toConsumableArray(indexes);

  var allDescriptions = unifyDescription(descriptionArray, descriptionIndexes);
  var validatedCoords = descriptionValidator(coordinates, allDescriptions, ' En movimiento');
  return validatedCoords;
};

var descriptionSlicer = function descriptionSlicer(toSliceArray, firstKey, lastKey) {
  //SE ENCARGA DE LIMPIAR LAS DESCRIPCIONES
  for (var i = 0; i < toSliceArray.length; i++) {
    var from = toSliceArray[i].indexOf(firstKey) + firstKey.length;
    var to = toSliceArray[i].indexOf(lastKey);
    toSliceArray[i] = toSliceArray[i].slice(from, to);
  }
};

var getDescriptionArray = function getDescriptionArray(regex, toSlice, saveInto) {
  //CON LAS EXPRESIONES REGULARES SEPARA EL STRING DEL JSON EN PARTES
  while ((match = regex.exec(toSlice)) !== null) {
    saveInto.push(match[0]);
    regex.lastIndex -= 2;
  }
};

var unifyDescription = function unifyDescription(descriptionArray, descriptionIndexes) {
  //UNIFICA LAS DESCRIPCIONES SUELTAS EN ARREGLOS
  var unifiedDescriptions = [];

  for (var i = 0; i < descriptionIndexes.length; i++) {
    var count = 0;
    var partialDescriptions = [[], [], [], [], []];

    for (var j = 0; j < descriptionArray[0].length; j++) {
      if (descriptionArray[2][j] == descriptionIndexes[i]) {
        partialDescriptions[count].push(descriptionArray[0][j]);
        partialDescriptions[count].push(descriptionArray[1][j]);
        count++;
      }
    }

    unifiedDescriptions.push(partialDescriptions);
  }

  return unifiedDescriptions;
};

var descriptionValidator = function descriptionValidator(coords, descriptionArray, toCompare) {
  //COMPARA PA DESCRIPCION POR LO QUE SE LA PASA COMO PARAMETRO
  var validatedCoords = [];

  for (var i = 0; i < descriptionArray.length; i++) {
    if (descriptionArray[i][1][1] == toCompare) validatedCoords.push(coords[i]);
  }

  return validatedCoords;
};

var filterMap = function filterMap(data, lofts) {
  //TOMA LAS COORDENADAS Y MIRA EL LOTE QUE SE DEBE FILTRAR
  var loftInnerCoords = [];

  for (var k = 0; k < lotes.length; k++) {
    var loft = getOneLoft(lofts[k].coords);
    var minPointX = miniumPointX(loft);
    var loftLinearEquationComponents = linearEquationComponents(loft);
    loftInnerCoords.push(getCoincidentMap(data, loft, loftLinearEquationComponents[0], loftLinearEquationComponents[1], loftLinearEquationComponents[2], minPointX));
  }

  return loftInnerCoords;
};

var getCoincidentMap = function getCoincidentMap( //TOMA LAS COORDENADAS, EL LOTE, LAS VARIABLES DE LA ECUACION LINEAL Y EL PUNTO MINIMO Y DEVULVE LOS PUNTOS QUE ESTAN DENTRO
coords, polygon, aVariables, bVariables, cVariables, miniumPointX) {
  var coincidentMap = [];

  for (var i = 0; i < coords.length; i++) {
    var count = 0;
    var d1 = 0;
    var d2 = 0;

    for (var j = 0; j < aVariables.length; j++) {
      var flag = getFlagCondition(polygon[j][0], polygon[j + 1][0], coords[i][0]);

      if (flag) {
        d1 = linearEquationReplace(aVariables[j], bVariables[j], cVariables[j], coords[i][0], miniumPointX - 1 / 10000);
        d2 = linearEquationReplace(aVariables[j], bVariables[j], cVariables[j], coords[i][0], coords[i][1]);
        if (!(d1 < 0 && d2 < 0 || d1 > 0 && d2 > 0)) count++;
      }
    }

    if (count % 2 != 0 && count != 0) coincidentMap.push(coords[i]);
  }

  return coincidentMap;
};

var miniumPointX = function miniumPointX(coords) {
  //CALCULA EL PUNTO MINIMO
  var minPointX = coords[0][1];

  for (var i = 0; i < coords.length; i++) {
    if (coords[i][1] < minPointX) {
      minPointX = coords[i][1];
    }
  }

  return minPointX;
};

var getFlagCondition = function getFlagCondition(actualCoordX, nextCoordX, toCompareCoord) {
  //REVISA SI UN PUNTO ESTA ENTRE EL ACTUAL Y EL PROXIMO
  var flag = false;

  if (actualCoordX > nextCoordX) {
    if (actualCoordX >= toCompareCoord && nextCoordX <= toCompareCoord) {
      flag = true;
    }
  } else {
    if (actualCoordX <= toCompareCoord && nextCoordX >= toCompareCoord) {
      flag = true;
    }
  }

  return flag;
};

var linearEquationComponents = function linearEquationComponents(coords) {
  //TOMA LAS COORDENADAS Y DEVUELVE LAS VARIABLES DE LAS ECUACION LINEALES
  var aVariable = [];
  var bVariable = [];
  var cVariable = [];

  for (var i = 0; i < coords.length - 1; i++) {
    aVariable.push(-(coords[i + 1][1] - coords[i][1]));
    bVariable.push(coords[i + 1][0] - coords[i][0]);
    cVariable.push(-(coords[i + 1][0] * coords[i][1] - coords[i][0] * coords[i + 1][1]));
  }

  return [aVariable, bVariable, cVariable];
};

var linearEquationReplace = function linearEquationReplace( //SE REMPLAZAN PUNTOS EN LAS ECUACIONES LINEAS PARA SABER SI HUBO INTERSECCION
aVariable, bVariable, cVariable, xVariable, yVariable) {
  var result = bVariable * yVariable + aVariable * xVariable + cVariable;
  return result;
};

var loftAreaCalculator = function loftAreaCalculator(coords) {
  //CALCULA LAS AREAS POR EL ARREGLO DE COORDENADAS
  var latitude = 111132.954 / 1000;
  var loft = getOneLoft(coords);
  var average = averageCoords(loft);
  var vectorsA = vectorsWithInitialPoint(loft, average, 0);
  var vectorsB = vectorsWithInitialPoint(loft, average, 1);
  var vectorModulesA = modules(vectorsA, latitude);
  var vectorModulesB = modules(vectorsB, latitude);
  var semiPerimeters = semiPerimeter(vectorModulesA, vectorModulesB);
  var partialTriangles = partialTriangle(semiPerimeters, vectorModulesA, vectorModulesB);
  var polyArea = polygonArea(partialTriangles);
  return polyArea;
};

var areaCalculator = function areaCalculator(data) {
  var latitude, machineWidth, i, polyArea, totalDistance, totalArea, date, fecha, postFiltrado;
  return regeneratorRuntime.async(function areaCalculator$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          //CALCULA LAS AREAS, POR MEDIO DE DATA EL AREA CUBIERTA POR LA COSECHADORA, Y POR ARRAY EL AREA DEL LOTE
          latitude = 111132.954 / 1000;
          machineWidth = document.getElementById('machineWidth').value;
          i = 0;

        case 3:
          if (!(i < lotes.length)) {
            _context13.next = 21;
            break;
          }

          /*(async () => {
            fetch('http://localhost:3000/api/filtrados', {
              method: 'POST',
              body: JSON.stringify(loteFiltrado),
              //mode: 'no-coors',
              headers: { 'Content-type': 'application/json;charset=UTF-8' },
            })
              .then((response) => response.json())
              .then((json) => console.log(json))
              .catch((err) => console.log(err));
          })();
          (async () => {
            fetch('http://localhost:3000/api/filtrados', {
              method: 'GET',
              //mode: 'no-coors',
              //headers: { 'Content-type': 'application/json;charset=UTF-8' },
            })
              .then((response) => response.json())
              .then((json) => console.log(json))
              .catch((err) => console.log(err));
          })();*/
          polyArea = lotes[i].area;
          totalDistance = machineCoveredArea(data[i], latitude);
          totalArea = totalDistance * machineWidth / 1000;
          date = new Date(Date.now());
          fecha = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
          loteFiltrado.area = totalArea;
          loteFiltrado.name = 'Lote ' + lotes[i].name + ' con Fecha ' + fecha;
          console.log(loteFiltrado.name);
          loteFiltrado.loteId = lotes[i].id;
          loteFiltrado.coords = JSON.stringify(data[i]);
          /*(async () => {
            fetch('http://localhost:3000/api/filtrados', {
              method: 'POST',
              body: JSON.stringify(loteFiltrado),
              //mode: 'no-coors',
              headers: { 'Content-type': 'application/json;charset=UTF-8' },
            })
              .then((response) => response.json())
              .then((json) => console.log(json))
              .catch((err) => console.log(err));
          })();*/

          postFiltrado = function postFiltrado() {
            return regeneratorRuntime.async(function postFiltrado$(_context12) {
              while (1) {
                switch (_context12.prev = _context12.next) {
                  case 0:
                    fetch('http://localhost:3000/api/filtrados', {
                      method: 'POST',
                      body: JSON.stringify(loteFiltrado),
                      headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                      }
                    }).then(function (response) {
                      return response.json();
                    }).then(function (json) {
                      return console.log(json);
                    })["catch"](function (err) {
                      return console.log(err);
                    });

                  case 1:
                  case "end":
                    return _context12.stop();
                }
              }
            });
          };

          _context13.next = 17;
          return regeneratorRuntime.awrap(postFiltrado());

        case 17:
          percentage('result', i, totalArea, polyArea, lotes);

        case 18:
          i++;
          _context13.next = 3;
          break;

        case 21:
        case "end":
          return _context13.stop();
      }
    }
  });
};

var getOneLoft = function getOneLoft(coords) {
  //TOMA DE LOS INPUT DEL HTML Y DEVUELVE UN ARREGLO DE LAS MISMAS
  var loft = JSON.parse(' [' + coords + ']');

  for (var i = 0; i < loft.length; i++) {
    loft[i] = loft[i].reverse();
  }

  return loft;
};

var getLoft = function getLoft(array, index) {
  //TOMA DE LOS INPUT LOS ARREGLOS DE COORDENADAS DE LOTES Y DEVUELVE LOS LOTES EN ARREGLO
  var polygon = lotes[index].coords;
  var loft = JSON.parse(' [' + polygon.value + ']');

  for (var i = 0; i < loft.length; i++) {
    loft[i] = loft[i].reverse();
  }

  return loft;
};

var vectorsWithAveragePoint = function vectorsWithAveragePoint(coords, firstIndex) {
  //CREA VECTORES DEL CENTRO(COORDENADA PROMEDIO) A TODOS LOS EXTREMOS
  var averageCoords = averageCoords(coords);
  var vectors = [[], []];

  for (var i = firstIndex; i < coords.length; i++) {
    vectors[0].push(averageCoords[0] - coords[i][0]);
    vectors[1].push(averageCoords[1] - coords[i][1]);
  }

  return vectors;
};

var vectorsWithSelfInitialPoint = function vectorsWithSelfInitialPoint(coords, firstIndex) {
  //CREA VECTORES DEL PRIMER PUNTO A TODOS LOS EXTREMOS
  var vectors = [[], []];

  for (var i = firstIndex; i < coords.length; i++) {
    vectors[0].push(coords[0][0] - coords[i][0]);
    vectors[1].push(coords[0][1] - coords[i][1]);
  }

  return vectors;
};

var vectorsWithInitialPoint = function vectorsWithInitialPoint(coords, initialPoint, firstIndex) {
  //CREA VECTORES DEL PUNTO PASADO POR PARAMETRO A TODOS LOS EXTREMOS
  var vectors = [[], []];

  for (var i = firstIndex; i < coords.length; i++) {
    vectors[0].push(initialPoint[0] - coords[i][0]);
    vectors[1].push(initialPoint[1] - coords[i][1]);
  }

  return vectors;
};

var modules = function modules(vectors, latitude) {
  //CALCULA LOS MODULOS POR MEDIO DE LOS VECTORES, TAMBIEN TE PASA LO QUE VALE LA UNIDAD DE LATITUD
  var vectorModules = [];

  for (var i = 0; i < vectors[0].length; i++) {
    vectorModules.push(Math.sqrt(Math.pow(vectors[0][i], 2) + Math.pow(vectors[1][i], 2)) * latitude);
  }

  return vectorModules;
};

var semiPerimeter = function semiPerimeter(vectorModulesA, vectorModulesB) {
  //CREA LOS SEMIPERIMETROS POR MEDIO DE LOS MODULOS DE LOS VECTORES
  var semiPerimeters = [];

  for (var i = 0; i < vectorModulesB.length; i++) {
    semiPerimeters.push((vectorModulesA[i] + vectorModulesA[i + 1] + vectorModulesB[i]) / 2);
  }

  return semiPerimeters;
};

var partialTriangle = function partialTriangle(semiPerimeters, vectorModulesA, vectorModulesB) {
  //CALCULA A TRAVES DE LOS MODULOS Y LOS VECTORES, EL AREA DE UN TRIANGULO
  var partialTriangles = [];

  for (var i = 0; i < semiPerimeters.length; i++) {
    var a = semiPerimeters[i] - vectorModulesA[i];
    var b = semiPerimeters[i] - vectorModulesA[i + 1];
    var c = semiPerimeters[i] - vectorModulesB[i];

    var _partialTriangle = Math.sqrt(semiPerimeters[i] * a * b * c);

    if (_partialTriangle) partialTriangles.push(_partialTriangle);
  }

  return partialTriangles;
};

var polygonArea = function polygonArea(partialTriangles) {
  //CALCULA A TRAVES DE LOS TRIANGULOS, EL AREA FINAL DE LOTE
  var polygonArea = 0;

  for (var i = 0; i < partialTriangles.length; i++) {
    polygonArea += partialTriangles[i];
  }

  return polygonArea;
};

var percentage = function percentage(where, index, totalArea, polygonArea, resultArray) {
  //CALCULA EL PORCENTAJE POR CADA LOTE
  var percentage = totalArea / polygonArea * 100;
  if (percentage > 100) percentage = 100;
  percentage = Math.round(percentage, 2) + ' %';
  var result = document.getElementById(where);
  result.insertAdjacentHTML('beforeend', "<h2>Resultado del lote ".concat(resultArray[index].name, ": \"").concat(percentage, "\"</h2>"));
};

var machineCoveredArea = function machineCoveredArea(data, latitude) {
  //CALUCLA LO QUE CUBRIO LA COSECHADORA DE LOTE
  var inBetweenDifferenceLatitude = [];
  var inBetweenDifferenceLongitude = [];

  for (var i = 0; i < data.length - 1; i++) {
    inBetweenDifferenceLatitude.push(data[i][0] - data[i + 1][0]);
    inBetweenDifferenceLongitude.push(data[i][1] - data[i + 1][1]);
    if (inBetweenDifferenceLatitude[i] < 0) inBetweenDifferenceLatitude[i] = -inBetweenDifferenceLatitude[i];
    if (inBetweenDifferenceLongitude[i] < 0) inBetweenDifferenceLongitude[i] = -inBetweenDifferenceLongitude[i];
  }

  var latitudeDistance = inBetweenDifferenceLatitude.reduce(reducer);
  var longitudeDistance = inBetweenDifferenceLongitude.reduce(reducer);
  var totalDistance = (longitudeDistance + latitudeDistance) * latitude;
  return totalDistance;
};

var reducer = function reducer(p, c) {
  return p + c;
}; //FUNCION QUE CALUCULA EL ACUMULADO DE UN ARREGLO


var generateMap = function generateMap(where, coords, resultArray) {
  //GENERA EL MAPA EN HTML
  var newMap = document.getElementById(where); //newMap.innerHTML = '';

  newMap.style.width = '100vw';
  newMap.style.height = '50vw';
  newMap.style.borderRadius = '20px';
  newMap.style.position = 'relative';
  console.log(coords);
  var map = L.map(where).setView(coords[0][0], 15);
  console.log(coords[0][0]);
  mapContainer(map, coords, resultArray);
};

var mapContainer = function mapContainer(map, coords, resultArray) {
  //MODIFICA LO QUE ESTA CONTENIDO DENTRO DEL MAPA
  for (var i = 0; i < coords.length; i++) {
    var color = ['aqua', 'brown', 'chocolate', 'darkmagenta', 'yellow', 'springgreen', 'blue'];
    var tiles = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);
    var polygon = L.polygon(coords[i], {
      color: "".concat(color[i])
    }).addTo(map);
    var popup = L.popup().setLatLng(averageCoords(coords[i])).setContent("".concat(resultArray[i].name)).addTo(map);
  }
};

var averageCoords = function averageCoords(coords) {
  //CALCULA EL PROMEDIO DE LAS COORDENADAS
  var averageLatitude = 0;
  var averageLongitude = 0;

  for (var i = 0; i < coords.length; i++) {
    averageLatitude += coords[i][0];
    averageLongitude += coords[i][1];
  }

  averageLatitude /= coords.length;
  averageLongitude /= coords.length;
  return [averageLatitude, averageLongitude];
};

var app = function app() {
  return regeneratorRuntime.async(function app$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(menuMapas());

        case 2:
        case "end":
          return _context14.stop();
      }
    }
  });
};

app();