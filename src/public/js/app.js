let data;
    const analyze = () => {
      //readFile();
      /*toJSON(data)
      .then(coords => {
        data = coords})
      .catch(console.error);*/
      let coordinates = getCoordinates(data);
      getValidatedCoordinates(data, coordinates);
      const fileButton = document.getElementById('generateMapButton');
      fileButton.style.visibility="hidden";
    }
    
    const readFile = (input) => {
        //const resultButton = document.getElementById('generateMapButton');
      let file = input.files[0]; 
      let fileReader = new FileReader(); 
      fileReader.readAsText(file);
      fileReader.onload = function() {
          data = fileReader.result;
      }; 
      fileReader.onerror = function() {
        alert(fileReader.error);
      };
    };
    
    const imp = (dat) => {
        console.log(dat);
    }
    
    const getCoordinates = (props) => {
        const newData = JSON.parse(props);
        const featuresLength = newData['features'].length;
        let coordinates = newData['features'][featuresLength-1]['geometry']['coordinates'];
        for (let i = 0; i < coordinates.length; i++){
          coordinates[i].pop([2]);
          coordinates[i] = coordinates[i].reverse();
        }
        return coordinates;
    };
    
    const getValidatedCoordinates = (props, coordinates) => {
        const newData = JSON.parse(props);
        const indexKey1 = '<b>';
        const indexKey2 = '</b>';
        const indexKey3 = '<br>';
        let b;
        let closeB;
    
          const regex = /(<b>).+?(<br>)/g;
          const regex2 = /(<\/b>).+?(<br>)/g;
          const regex3 = /(<b>).+?(<\/b>)/g;
          let br;
    
          const featuresLength = newData['features'].length;
          let descriptionArray = [[],[],[]];
          let description;
          for (let i = 0; i < featuresLength; i++) {
            description = newData['features'][i]['properties']['description'];
    
          while ((match = regex2.exec(description)) !== null) {
              descriptionArray[1].push(match[0]);
              regex.lastIndex -= 2;
              descriptionArray[2].push(i);
          }
    
          while ((match = regex3.exec(description)) !== null) {
              descriptionArray[0].push(match[0]);
              regex.lastIndex -= 2;
          }
    
          }
          for (let j = 0; j < descriptionArray[0].length; j++) {
              b =descriptionArray[0][j].indexOf(indexKey1) + indexKey1.length;
              closeB = descriptionArray[0][j].indexOf(indexKey2);
              descriptionArray[0][j] = descriptionArray[0][j].slice(b, closeB);
          }
    
    
          for (let j = 0; j < descriptionArray[1].length; j++) {
              closeB = descriptionArray[1][j].indexOf(indexKey2) + indexKey2.length;
              br = descriptionArray[1][j].indexOf(indexKey3);
              descriptionArray[1][j] = descriptionArray[1][j].slice(closeB, br);
          }
    
        let allDescriptions = [];
    
        const indexes = new Set(descriptionArray[2]);
    
        let descriptionIndexes = [...indexes];
    
        for (let i = 0; i < descriptionIndexes.length; i++ ){
          let count = 0;
          let partialDescriptions = [[],[],[],[],[]];
          for (let j = 0; j < descriptionArray[0].length; j++){
            if(descriptionArray[2][j] == descriptionIndexes[i]){
              partialDescriptions[count].push(descriptionArray[0][j]);
              partialDescriptions[count].push(descriptionArray[1][j]);
              count++;
            };
          }
          allDescriptions.push(partialDescriptions);
        }
    
        let validatedCoords = [];
        //let coords = JSON.parse(coordinates);
        let coords = coordinates;0
        //console.log(coords.length);
        for (let i = 0; i < allDescriptions.length; i++){
          if (allDescriptions[i][1][1] == ' En movimiento'){
            console.log(allDescriptions[i][2][1]);
            validatedCoords.push(coords[i]);
          }
        }
        //generateMap(validatedCoords);
        filterMap(validatedCoords);
        //console.log(validatedCoords)
    }
    
    const filterMap = (data) => {
        const polygon = document.getElementById('polygon');
        //imp(polygon.value);
        console.log(polygon);
        console.log(polygon.value);
        let loft = JSON.parse(' [' + polygon.value + ']');
        for (let i = 0; i < loft.length; i++) {
          loft[i] = loft[i].reverse();
        }
        console.log(loft)
    
        let minPointX = loft[0][1];
    
        for (let i = 0; i < loft.length; i++) {
          if (loft[i][1] < minPointX) {
            minPointX = loft[i][1];
          }
        }
        // We want the line in linear equation standard form: A*x + B*y + C = 0
    
        let aVariableLoft = [];
        let bVariableLoft = [];
        let cVariableLoft = [];
        for (let i = 0; i < loft.length - 1; i++) {
          aVariableLoft.push(-(loft[i + 1][1] - loft[i][1]));
          bVariableLoft.push(loft[i + 1][0] - loft[i][0]);
          cVariableLoft.push(
            -(loft[i + 1][0] * loft[i][1] - loft[i][0] * loft[i + 1][1])
          );
        }
    
        let aVariableCoord = [];
        let bVariableCoord = [];
        let cVariableCoord = [];
        for (let i = 0; i < data.length - 1; i++) {
          aVariableCoord.push(-(data[i + 1][1] - data[i][1]));
          bVariableCoord.push(data[i + 1][0] - data[i][0]);
          cVariableCoord.push(
            -(data[i + 1][0] * data[i][1] - data[i][0] * data[i + 1][1])
          );
        }
    
        let coincidentMap = [];
        for (let i = 0; i < data.length; i++) {
          let count = 0;
          let d1 = 0;
          let d2 = 0;
          for (let j = 0; j < aVariableLoft.length; j++) {
            let flag = 0;
            if (loft[j][0] > loft[j + 1][0]) {
              if (loft[j][0] >= data[i][0] && loft[j + 1][0] <= data[i][0]) {
                flag = 1;
              }
            } else {
              if (loft[j][0] <= data[i][0] && loft[j + 1][0] >= data[i][0]) {
                flag = 1;
              }
            }
    
            if (flag == 1) {
              d1 =
                bVariableLoft[j] * (minPointX - 1 / 10000) +
                aVariableLoft[j] * data[i][0] +
                cVariableLoft[j];
              d2 =
                bVariableLoft[j] * data[i][1] +
                aVariableLoft[j] * data[i][0] +
                cVariableLoft[j];
              if ((d1 < 0 && d2 < 0) || (d1 > 0 && d2 > 0)) {
              } else {
                count++;
              }
            }
          }
          if (count % 2 != 0 && count != 0) {
            coincidentMap.push(data[i]);
          }
        }
        console.log(coincidentMap);    
        generateMap(coincidentMap);
        areaCalculator(coincidentMap);
    }
    
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
    
        const result = document.getElementById('result');
        result.innerHTML = ('<h2>Resultado: ' + percentage + '</h2>');
    } 
    
    
    //modificacion de 
    const generateMap = (coords) => {
        let newMap = document.getElementById('map');
        if(newMap.style.width!=500 && newMap.style.height!=320){
          newMap.style.width = "50vw";
          newMap.style.height = "30vw";
        } 
        newMap.style.borderRadius = "8px";
        newMap.style.position = "relative";
        let averageLatitude = 0;
        let averageLongitude = 0;
        for (let i = 0; i < coords.length; i++){
            averageLatitude += coords[i][0];
            averageLongitude += coords[i][1];
        }
        averageLatitude = averageLatitude/coords.length;
        averageLongitude = averageLongitude/coords.length;
        var map = L.map("map").setView([averageLatitude,averageLongitude], 15);
        var tiles = L.tileLayer(
            "https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
            {
              maxZoom: 20,
              subdomains: ["mt0", "mt1", "mt2", "mt3"],
            }
        ).addTo(map);
        /*var marker = L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('<b>Hello world!</b><br />I am a popup.').openPopup();
    
      var circle = L.circle([51.508, -0.11], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
      }).addTo(map).bindPopup('I am a circle.');*/
      var polygon = L.polygon(coords).addTo(map);
      var popup = L.popup()
        .setLatLng([averageLatitude,averageLongitude])
        .openOn(map);
      function onMapClick(e) {
        popup
          .setLatLng(e.latlng)
          .setContent('You clicked the map at ' + e.latlng.toString())
          .openOn(map);
      }
        map.on('click', onMapClick);
    }