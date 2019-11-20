////adding map

var map = L.map('map').setView([47.615428, -122.334145], 11);

//adding tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 100,
    id: 'mapbox.streets',
    accessToken:'pk.eyJ1Ijoic3VmZmlhbmc5NiIsImEiOiJjazJqb3V4cXAwbXN1M2N0cmNlMDB0ODdyIn0.bSVgjiBLodS46nfCU1cKMw'
}).addTo(map);

map.createPane("polygonPane");
map.createPane("linePane");

$.getJSON("hazZones.geojson",function(shakeData){
L.geoJson(shakeData, {
  pane:"polygonPane",
  style: function(feature){
    var fillColor,
      percent = feature.properties.PERCENT_G;
    if ( percent === "110-145" ) fillColor = '#800026';
    else if ( percent === '80-110' ) fillColor = '#BD0026';
    else if ( percent === '60-80' ) fillColor = '#E31A1C';
    else if ( percent === '50-60' ) fillColor = '#FC4E2A';
    else if ( percent === '40-50' ) fillColor = '#FD8D3C';
    else if ( percent === '30-40' ) fillColor = '#FEB24C';
    else if ( percent === '20-30' ) fillColor = '#FED976';
    else fillColor === '#FFFFFF';
    return {color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };

    },

      onEachFeature: function( feature, layer ){
        layer.bindPopup( "<strong>" + feature.properties.PERCENT_G + "</strong><br/>" + feature.properties.PERCENT_G + "% shaking hazard" )
      }
    }).addTo(map);
  });

//load GeoJSON
$.getJSON("Faults.zip.geojson",function(faultData){
  L.geoJson (faultData, {
 pane: "linePane",
 style: function(feature){
   return { color: 'black',
          dashArray: '6',
          weight: 2.5 ,
          fillOpacity: 0.7 };
 },
 onEachFeature: function( feature, layer ){
   layer.bindPopup( feature.properties.slip_sense + " type fault" )
 }
  }).addTo(map);
});
