let data;
const analyze = () => { //FUNCION LANZADA POR EL BOTON 'VER RESULTADO'
  //readFile();
  /*toJSON(data)
  .then(coords => {
    data = coords})
  .catch(console.error);*/
  try {
    document.getElementById("generateMapButton").style.visibility = "hidden"; //ESCONDE EL BOTON 'VER RESULTADO DESPUES DE EJECUTAR'
    let coordinates = getCoordinates(data); //OBTIENE LAS COORDENADAS
    let filteredMap = getValidatedCoordinates(data, coordinates); //VALIDA LAS UTILES
    let loftArray = polygonsArray("polygons", "polygon");  //REVISA CUALES SON LOS LOTES
    generateMap(filteredMap); //GENERA EL MAPA
    areaCalculator(filteredMap, loftArray); //CALCULA LAS ARES
  } catch {
    alert('Error');           //CASO DE FALLO ALERTA Y ACTUALIZA PAGINA
    location.reload();
  }
};
/*const addVoid = () => {          
  addInput("voids", "void");
};*/
const addPolygon = () => {                ///FUNCION BOTON 'AGREGAR COORDENADAS'
  addInput("polygons", "polygon");
};

const addInput = (divId, childId) => {                   //FUNCION CREA MAS BOTONES CONSECUTIVAMENTE, PARAMETROS (DIV DEL HTML DONDE VA A IR, NOMBRE DEL INPUT HIJO)
  const getElementDiv = document.getElementById(divId);
  let inputNumber = getElementDiv.childElementCount - 1;          //CUENTA LOS HIJOS ACTUALES (ES CON -1 PORQUE EL BOTON CUENTA YA COMO UN HIJO)
  let voidField = `<input placeholder="Pegar coodenadas" type="text" id="${
    childId + inputNumber
  }"/>`;
  getElementDiv.insertAdjacentHTML("afterbegin", voidField);
};

const readFile = (input) => {             //FUNCION QUE LEE EL ARCHIVO
  let file = input.files[0];
  let fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onload = function () {
    data = fileReader.result;             //LA ALMACENA EN 'DATA' QUE ES UNA VARIABLE GLOBAL
  };
  fileReader.onerror = function () {
    alert(fileReader.error);
  };
};

const getCoordinates = (props) => {         //TOMA EL JSON (ARCHIVO) Y EXTRAE LAS COORDENADAS
  const newData = JSON.parse(props);
  const featuresLength = newData["features"].length;
  let coordinates =
    newData["features"][featuresLength - 1]["geometry"]["coordinates"];
  for (let i = 0; i < coordinates.length; i++) {
    coordinates[i].pop([2]);
    coordinates[i] = coordinates[i].reverse(); //INVIERTE EL ORDEN DE LAS COORDENADAS
  }
  return coordinates;
};

const getValidatedCoordinates = (props, coordinates) => { //TOMA LAS COORDENAS, LAS FILTRA CON LAS DESCRIPCIONES LIMPIAS Y VALIDA CUANDO ESTUVO EN MOVIMIENTO
  const newData = JSON.parse(props);
  const regex = /(<b>).+?(<br>)/g;
  const regex2 = /(<\/b>).+?(<br>)/g;
  const regex3 = /(<b>).+?(<\/b>)/g;
  const featuresLength = newData["features"].length;
  let descriptionArray = [[], [], []];
  for (let i = 0; i < featuresLength; i++) {
    let description = newData["features"][i]["properties"]["description"];
    getDescriptionArray(regex3, description, descriptionArray[0]);
    getDescriptionArray(regex2, description, descriptionArray[1]);
    while ((match = regex2.exec(description)) !== null) {
      regex.lastIndex -= 2;
      descriptionArray[2].push(i);
    }
  }
  let loftArray = polygonsArray("polygons", "polygon"); 
  let validatedCoords = sliceDescription(descriptionArray, coordinates);
  let filteredMap = filterMap(validatedCoords, loftArray);
  return filteredMap;
};

const sliceDescription = (descriptionArray, coordinates) => { //TOMA UN ARREGLO CON LAS DESCRIPCIONES DEL MAPA Y LAS COORDENADAS, DEVUELVE LAS COORDENADAS LIMPIAS
  const indexKey1 = "<b>";
  const indexKey2 = "</b>";
  const indexKey3 = "<br>";
  descriptionSlicer(descriptionArray[0], indexKey1, indexKey2);
  descriptionSlicer(descriptionArray[1], indexKey2, indexKey3);
  const indexes = new Set(descriptionArray[2]);
  let descriptionIndexes = [...indexes];
  let allDescriptions = unifyDescription(descriptionArray, descriptionIndexes);
  let validatedCoords = descriptionValidator(
    coordinates,
    allDescriptions,
    " En movimiento"
  );
  return validatedCoords;
}

const descriptionSlicer = (toSliceArray, firstKey, lastKey) => {    //SE ENCARGA DE LIMPIAR LAS DESCRIPCIONES
  for (let i = 0; i < toSliceArray.length; i++) {
    let from = toSliceArray[i].indexOf(firstKey) + firstKey.length;
    let to = toSliceArray[i].indexOf(lastKey);
    toSliceArray[i] = toSliceArray[i].slice(from, to);
  }
}

const getDescriptionArray = (regex, toSlice, saveInto) => {   //CON LAS EXPRESIONES REGULARES SEPARA EL STRING DEL JSON EN PARTES
  while ((match = regex.exec(toSlice)) !== null) {
    saveInto.push(match[0]);
    regex.lastIndex -= 2;
  }
}

const unifyDescription = (descriptionArray, descriptionIndexes) => {  //UNIFICA LAS DESCRIPCIONES SUELTAS EN ARREGLOS
  let unifiedDescriptions = [];
  for (let i = 0; i < descriptionIndexes.length; i++) {
    let count = 0;
    let partialDescriptions = [[], [], [], [], []];
    for (let j = 0; j < descriptionArray[0].length; j++) {
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

const descriptionValidator = (coords, descriptionArray, toCompare) => {     //COMPARA PA DESCRIPCION POR LO QUE SE LA PASA COMO PARAMETRO
  let validatedCoords = [];
  for (let i = 0; i < descriptionArray.length; i++) {
    if (descriptionArray[i][1][1] == toCompare) validatedCoords.push(coords[i]);
  }
  return validatedCoords;
};

const polygonsArray = (divName, childId) => {      //TOMA UN DIV Y EL ID DE HIJO (FORMATO ID-NUMERO) Y CREA UN ARREGLO CON LOS NOMBRES DE LOS MISMOS
  let polygonArray = [];
  let amount = document.getElementById(divName).childElementCount;
  for (let i = 0; i < amount - 1; i++) {
    let element = childId + i;
    polygonArray.push(element);
  }
  return polygonArray;
};

const filterMap = (data, toFilter) => {       //TOMA LAS COORDENADAS Y MIRA EL LOTE QUE SE DEBE FILTRAR
  let loftInnerCoords = [];
  for (let k = 0; k < toFilter.length; k++) {
    let loft = getLoft(toFilter, k);
    let minPointX = miniumPointX(loft);
    let loftLinearEquationComponents = linearEquationComponents(loft);
    loftInnerCoords.push(
      getCoincidentMap(
        data,
        loft,
        loftLinearEquationComponents[0],
        loftLinearEquationComponents[1],
        loftLinearEquationComponents[2],
        minPointX
      )
    );
  }
  return loftInnerCoords;
};

const getCoincidentMap = (  //TOMA LAS COORDENADAS, EL LOTE, LAS VARIABLES DE LA ECUACION LINEAL Y EL PUNTO MINIMO Y DEVULVE LOS PUNTOS QUE ESTAN DENTRO
  coords,
  polygon,
  aVariables,
  bVariables,
  cVariables,
  miniumPointX
) => {
  let coincidentMap = [];
  for (let i = 0; i < coords.length; i++) {
    let count = 0;
    let d1 = 0;
    let d2 = 0;
    for (let j = 0; j < aVariables.length; j++) {
      let flag = getFlagCondition(
        polygon[j][0],
        polygon[j + 1][0],
        coords[i][0]
      );
      if (flag) {
        d1 = linearEquationReplace(
          aVariables[j],
          bVariables[j],
          cVariables[j],
          coords[i][0],
          miniumPointX - 1 / 10000
        );
        d2 = linearEquationReplace(
          aVariables[j],
          bVariables[j],
          cVariables[j],
          coords[i][0],
          coords[i][1]
        );
        if (!((d1 < 0 && d2 < 0) || (d1 > 0 && d2 > 0))) count++;
      }
    }
    if (count % 2 != 0 && count != 0) coincidentMap.push(coords[i]);
  }
  return coincidentMap;
};

const miniumPointX = (coords) => {    //CALCULA EL PUNTO MINIMO
  let minPointX = coords[0][1];
  for (let i = 0; i < coords.length; i++) {
    if (coords[i][1] < minPointX) {
      minPointX = coords[i][1];
    }
  }
  return minPointX;
};

const getFlagCondition = (actualCoordX, nextCoordX, toCompareCoord) => {    //REVISA SI UN PUNTO ESTA ENTRE EL ACTUAL Y EL PROXIMO
  let flag = false;
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

const linearEquationComponents = (coords) => {    //TOMA LAS COORDENADAS Y DEVUELVE LAS VARIABLES DE LAS ECUACION LINEALES
  let aVariable = [];
  let bVariable = [];
  let cVariable = [];
  for (let i = 0; i < coords.length - 1; i++) {
    aVariable.push(-(coords[i + 1][1] - coords[i][1]));
    bVariable.push(coords[i + 1][0] - coords[i][0]);
    cVariable.push(
      -(coords[i + 1][0] * coords[i][1] - coords[i][0] * coords[i + 1][1])
    );
  }
  return [aVariable, bVariable, cVariable];
};

const linearEquationReplace = (   //SE REMPLAZAN PUNTOS EN LAS ECUACIONES LINEAS PARA SABER SI HUBO INTERSECCION
  aVariable,
  bVariable,
  cVariable,
  xVariable,
  yVariable
) => {
  const result = bVariable * yVariable + aVariable * xVariable + cVariable;
  return result;
};

const areaCalculator = (data, array) => {   //CALCULA LAS AREAS, POR MEDIO DE DATA EL AREA CUBIERTA POR LA COSECHADORA, Y POR ARRAY EL AREA DEL LOTE
  const latitude = 111132.954 / 1000;
  const machineWidth = document.getElementById("machineWidth").value;
  for (let i = 0; i < array.length; i++) {
    let loft = getLoft(array, i);
    let average = averageCoords(loft);
    let vectorsA = vectorsWithInitialPoint(loft, average, 0);
    let vectorsB = vectorsWithInitialPoint(loft, average, 1);
    let vectorModulesA = modules(vectorsA, latitude);
    let vectorModulesB = modules(vectorsB, latitude);
    let semiPerimeters = semiPerimeter(vectorModulesA, vectorModulesB);
    let partialTriangles = partialTriangle(
      semiPerimeters,
      vectorModulesA,
      vectorModulesB
    );
    let polyArea = polygonArea(partialTriangles);
    let totalDistance = machineCoveredArea(data[i], latitude);
    let totalArea = (totalDistance * machineWidth) / 1000;
    percentage(i, totalArea, polyArea);
  }
};

const getLoft = (array, index) => {       //TOMA DE LOS INPUT LOS ARREGLOS DE COORDENADAS DE LOTES Y DEVUELVE LOS LOTES EN ARREGLO 
  let polygon = document.getElementById(array[index]);
  let loft = JSON.parse(" [" + polygon.value + "]");
  for (let i = 0; i < loft.length; i++) {
    loft[i] = loft[i].reverse();
  }
  return loft;
};

const vectorsWithAveragePoint = (coords, firstIndex) => { //CREA VECTORES DEL CENTRO(COORDENADA PROMEDIO) A TODOS LOS EXTREMOS
  let averageCoords = averageCoords(coords);
  let vectors = [[], []];
  for (let i = firstIndex; i < coords.length; i++) {
    vectors[0].push(averageCoords[0] - coords[i][0]);
    vectors[1].push(averageCoords[1] - coords[i][1]);
  }
  return vectors;
};

const vectorsWithSelfInitialPoint = (coords, firstIndex) => { //CREA VECTORES DEL PRIMER PUNTO A TODOS LOS EXTREMOS
  let vectors = [[], []];
  for (let i = firstIndex; i < coords.length; i++) {
    vectors[0].push(coords[0][0] - coords[i][0]);
    vectors[1].push(coords[0][1] - coords[i][1]);
  }
  return vectors;
};

const vectorsWithInitialPoint = (coords, initialPoint, firstIndex) => { //CREA VECTORES DEL PUNTO PASADO POR PARAMETRO A TODOS LOS EXTREMOS
  let vectors = [[], []];
  for (let i = firstIndex; i < coords.length; i++) {
    vectors[0].push(initialPoint[0] - coords[i][0]);
    vectors[1].push(initialPoint[1] - coords[i][1]);
  }
  return vectors;
};

const modules = (vectors, latitude) => {    //CALCULA LOS MODULOS POR MEDIO DE LOS VECTORES, TAMBIEN TE PASA LO QUE VALE LA UNIDAD DE LATITUD
  let vectorModules = [];
  for (let i = 0; i < vectors[0].length; i++) {
    vectorModules.push(
      Math.sqrt(vectors[0][i] ** 2 + vectors[1][i] ** 2) * latitude
    );
  }
  return vectorModules;
};

const semiPerimeter = (vectorModulesA, vectorModulesB) => { //CREA LOS SEMIPERIMETROS POR MEDIO DE LOS MODULOS DE LOS VECTORES
  let semiPerimeters = [];
  for (let i = 0; i < vectorModulesB.length; i++) {
    semiPerimeters.push(
      (vectorModulesA[i] + vectorModulesA[i + 1] + vectorModulesB[i]) / 2
    );
  }
  return semiPerimeters;
};

const partialTriangle = (semiPerimeters, vectorModulesA, vectorModulesB) => {   //CALCULA A TRAVES DE LOS MODULOS Y LOS VECTORES, EL AREA DE UN TRIANGULO
  let partialTriangles = [];
  for (let i = 0; i < semiPerimeters.length; i++) {
    let a = semiPerimeters[i] - vectorModulesA[i];
    let b = semiPerimeters[i] - vectorModulesA[i + 1];
    let c = semiPerimeters[i] - vectorModulesB[i];
    let partialTriangle = Math.sqrt(semiPerimeters[i] * a * b * c);
    if (partialTriangle) partialTriangles.push(partialTriangle);
  }
  return partialTriangles;
};

const polygonArea = (partialTriangles) => { //CALCULA A TRAVES DE LOS TRIANGULOS, EL AREA FINAL DE LOTE
  let polygonArea = 0;
  for (let i = 0; i < partialTriangles.length; i++) {
    polygonArea += partialTriangles[i];
  }
  return polygonArea;
};

const percentage = (index, totalArea, polygonArea) => { //CALCULA EL PORCENTAJE POR CADA LOTE
  let percentage = (totalArea / polygonArea) * 100;
  if (percentage > 100) percentage = 100;
  percentage = Math.round(percentage, 2) + " %";
  const result = document.getElementById("result");
  result.insertAdjacentHTML(
    "beforeend",
    `<h2>Resultado mapa ${index + 1}: "${percentage}"</h2>`
  );
};

const machineCoveredArea = (data, latitude) => {    //CALUCLA LO QUE CUBRIO LA COSECHADORA DE LOTE
  let inBetweenDifferenceLatitude = [];
  let inBetweenDifferenceLongitude = [];
  for (let i = 0; i < data.length - 1; i++) {
    inBetweenDifferenceLatitude.push(data[i][0] - data[i + 1][0]);
    inBetweenDifferenceLongitude.push(data[i][1] - data[i + 1][1]);
    if (inBetweenDifferenceLatitude[i] < 0)
      inBetweenDifferenceLatitude[i] = -inBetweenDifferenceLatitude[i];
    if (inBetweenDifferenceLongitude[i] < 0)
      inBetweenDifferenceLongitude[i] = -inBetweenDifferenceLongitude[i];
  }
  let latitudeDistance = inBetweenDifferenceLatitude.reduce(reducer);
  let longitudeDistance = inBetweenDifferenceLongitude.reduce(reducer);
  let totalDistance = (longitudeDistance + latitudeDistance) * latitude;
  return totalDistance;
};

const reducer = (p, c) => p + c;  //FUNCION QUE CALUCULA EL ACUMULADO DE UN ARREGLO

const generateMap = (coords) => {     //GENERA EL MAPA EN HTML
  let newMap = document.getElementById("maps");
  newMap.style.width = "100vw";
  newMap.style.height = "50vw";
  newMap.style.borderRadius = "20px";
  newMap.style.position = "relative";
  var map = L.map(`maps`).setView(coords[0][0], 10);
  mapContainer(map, coords);
};

const mapContainer = (map, coords) => {   //MODIFICA LO QUE ESTA CONTENIDO DENTRO DEL MAPA
  for (let i = 0; i < coords.length; i++) {
    let color = ['aqua','brown','chocolate','darkmagenta','yellow','springgreen','blue'];
    console.log(color)
    var tiles = L.tileLayer(
      "https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    ).addTo(map);

    var polygon = L.polygon(coords[i], {
      color: `${color[i]}`,
    }).addTo(map);

    var popup = L.popup()
      .setLatLng(averageCoords(coords[i]))
      .setContent("Map " + (i + 1))
      .addTo(map);
  }
};

const averageCoords = (coords) => { //CALCULA EL PROMEDIO DE LAS COORDENADAS
  let averageLatitude = 0;
  let averageLongitude = 0;
  for (let i = 0; i < coords.length; i++) {
    averageLatitude += coords[i][0];
    averageLongitude += coords[i][1];
  }
  averageLatitude /= coords.length;
  averageLongitude /= coords.length;

  return [averageLatitude, averageLongitude];
};
