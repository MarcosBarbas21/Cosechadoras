const areaCalculator = (data) => {
    const polygon = document.getElementById('polygon');
    const machineWidth = document.getElementById('machineWidth').value;
    
    let loft = JSON.parse(' [' + polygon.value + ']');
    for (let i = 0; i < loft.length; i++) {
      loft[i] = loft[i].reverse();
    }
    let latitude = 111132.954 / 1000;

    let inBetweenDifferenceLatitude = [];
    let inBetweenDifferenceLongitude = [];
    for (let i = 0; i < data.length - 1; i++) {
      inBetweenDifferenceLatitude.push(data[i][0] - data[i + 1][0]);
      inBetweenDifferenceLongitude.push(data[i][1] - data[i + 1][1]);
      if (inBetweenDifferenceLatitude[i] < 0) {
        inBetweenDifferenceLatitude[i] = -inBetweenDifferenceLatitude[i];
      }
      if (inBetweenDifferenceLongitude[i] < 0) {
        inBetweenDifferenceLongitude[i] = -inBetweenDifferenceLongitude[i];
      }
    }

    const reducer = (p, c) => p + c;
    let latitudeDistance = inBetweenDifferenceLatitude.reduce(reducer);
    let longitudeDistance = inBetweenDifferenceLongitude.reduce(reducer);

    let totalDistance = (longitudeDistance + latitudeDistance) * latitude;
    let totalArea = ((totalDistance * machineWidth) / 1000) * 0.6;

    let inBetweenDifferenceLoftBase = [];
    let inBetweenDifferenceLoftAltitude = [];

    let vectorsA = [[], []];
    let vectorsB = [[], []];
    for (let i = 1; i < loft.length - 1; i++) {
      vectorsA[0].push(loft[0][0] - loft[i][0]);
      vectorsA[1].push(loft[0][1] - loft[i][1]);
      console.log(i);
    }
    for (let i = 1; i < loft.length - 2; i++) {
      vectorsB[0].push(loft[i][0] - loft[i + 1][0]);
      vectorsB[1].push(loft[i][1] - loft[i + 1][1]);
      console.log(i);
    }
    console.log(vectorsA);
    console.log(vectorsB);
    console.log("----------------------------------------------------------------");
    let partialTriangles = [];
    let vectorModulesA = [];
    let vectorModulesB = [];
    for (let i = 0; i < vectorsA[0].length; i++) {
      vectorModulesA.push(
        Math.sqrt(vectorsA[0][i] ** 2 + vectorsA[1][i] ** 2) * latitude
      );
      console.log(vectorModulesA[i]);
    }
    console.log("----------------------------------------------------------------");
    for (let i = 0; i < vectorsB[0].length; i++) {
      vectorModulesB.push(
        Math.sqrt(vectorsB[0][i] ** 2 + vectorsB[1][i] ** 2) * latitude
      );
      console.log(vectorModulesB[i]);
    }

    let semiPerimeters = [];
    for (let i = 0; i < vectorModulesB.length; i++) {
      semiPerimeters.push(
        (vectorModulesA[i] + vectorModulesA[i + 1] + vectorModulesB[i]) / 2
      );
    }
    console.log(semiPerimeters);
    console.log("----------------------------------------------------------------");

    for (let i = 0; i < semiPerimeters.length; i++) {
      partialTriangles.push(
        Math.sqrt(
          semiPerimeters[i] *
            (semiPerimeters[i] - vectorModulesA[i]) *
            (semiPerimeters[i] - vectorModulesA[i + 1]) *
            (semiPerimeters[i] - vectorModulesB[i])
        )
      );
    }
    //sp = (a + b + c) / 2
    //Área = √sp(sp – a)(sp – b)(sp – c)
    console.log(partialTriangles);
    console.log("----------------------------------------------------------------");

    let polygonArea = 0;
    for (let i = 0; i < partialTriangles.length; i++) {
      polygonArea += partialTriangles[i];
    }
    console.log(polygonArea);

    let percentage = (totalArea / polygonArea) * 100;

    console.log(Math.round(percentage, 2) + " %");

    percentage = Math.round(percentage, 2) + " %";

    const result = document.getElementById('result'),

    return (
    result.innerHTML = ('<h2>Resultado: ' + percentage + '</h2>')
    )
}

export default areaCalculator;