var map = L.map('map').setView([39.8283459, -98.6556974], 4);

// Define tile layers
var darkLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
});

var lightLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Add default dark layer to the map
darkLayer.addTo(map);

// Load GeoJSON from an external file for major cities
var cityMarkerOptions = {
    radius: 2,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

$.getJSON("https://raw.githubusercontent.com/th3tom13/Project1/main/USA_Major_Citi_FeaturesToJSO.geojson", function (data) {
    // Add GeoJSON layer to the map once the file is loaded
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            var marker = L.circleMarker(latlng, cityMarkerOptions);
            if (feature.properties && feature.properties.CLASS) {
                marker.bindPopup(feature.properties.CLASS);
            }
            return marker;
        }
    }).addTo(map);
});

// Load GeoJSON from an external file for states
$.getJSON("https://raw.githubusercontent.com/th3tom13/Project1/main/states_FeaturesToJSON.geojson", function (data) {
    // Add GeoJSON layer to the map once the file is loaded
    L.geoJson(data, {
        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.STATE_NAME) {
                layer.bindPopup(feature.properties.STATE_NAME);
            }
        }
    }).addTo(map);
});

// Create a layer control widget
var baseLayers = {
    "Dark Layer": darkLayer,
    "Light Layer": lightLayer
};

L.control.layers(baseLayers).addTo(map);