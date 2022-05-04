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

export default getCoordinates;