var panorama, viewer, container;
var containerBaseWidth = 560;
var containerBaseHeight = 320;
var deltaSize = 100;

container = document.querySelector("#container");

panorama = new PANOLENS.ImagePanorama("StreetView360.jpg");

viewer = new PANOLENS.Viewer({ container: container });
viewer.add(panorama);
