var panorama, viewer, container;
var containerBaseWidth = 560;
var containerBaseHeight = 320;
var deltaSize = 100;

container = document.querySelector("#container");

panorama = new PANOLENS.ImagePanorama("img/StreetView360.jpg");

viewer = new PANOLENS.Viewer({ container: container });
viewer.add(panorama);

var map = L.map("map").setView([42.8448576, -2.6791898, 3], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: "mapbox.streets",
}).addTo(map);

// coordinate of the photo
const photoCoordinate = { lat: 42.8332643935435, lng: -2.7008879184722905 };

const distanceDiff = 500;

function onMapClick(e) {
  console.log(e.latlng);
  checkCoordinates(photoCoordinate, e.latlng);

  // Add a marker at the clicked location
  L.marker(e.latlng).addTo(map);
}

map.on("click", onMapClick);

function checkCoordinates(coordinate1, coordinate2) {
  // Calculate the distance between the two coordinates in meters
  const R = 6371e3; // Earth's radius in meters
  const lat1 = (coordinate1.lat * Math.PI) / 180; // Convert latitudes to radians
  const lat2 = (coordinate2.lat * Math.PI) / 180;
  const deltaLat = ((coordinate2.lat - coordinate1.lat) * Math.PI) / 180;
  const deltaLng = ((coordinate2.lng - coordinate1.lng) * Math.PI) / 180;
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // Check if the distance is less than 100 meters
  if (distance < distanceDiff) {
    console.log(
      `The coordinates are within ${distanceDiff} meters of each other.`
    );
  } else {
    console.log(`The coordinates are more than ${distanceDiff} meters apart.`);
  }

  // Create a circle marker at the coordinate
  const circleMarker = L.circleMarker(photoCoordinate, {
    radius: 35, // Set the radius of the circle
    fillColor: "red", // Set the fill color of the circle
    fillOpacity: 0.5, // Set the fill opacity of the circle
    stroke: false, // Disable stroke of the circle
  }).addTo(map);

  L.marker(coordinate1).addTo(map);
}
