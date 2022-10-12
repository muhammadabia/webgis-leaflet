var osmMap = L.tileLayer.provider('OpenStreetMap.Mapnik');
var imageryMap = L.tileLayer.provider('Esri.WorldImagery');
var esriTerrainMap = L.tileLayer.provider('Esri.WorldTerrain');

var baseMaps = {
    OSM: osmMap,
    'Esri World Imagery': imageryMap,
    'Esri World Terrain': esriTerrainMap
}

//Memanggil data dari geoserver ke Map
    //Memanggil file administrasi kecamatan (polygon yang sudah diatur simbol)
    var kecBdgName = L.tileLayer.wms("http://localhost:8080/geoserver/sanitasi/wms", {
        layers: 'sanitasi:Administrasi Kecamatan',
        format: 'image/png',
        transparent: true,
        version: '1.1.0',
    });
    //Memanggil file batas kecamatan (garis)
    var kecBdgLine = L.tileLayer.wms("http://localhost:8080/geoserver/sanitasi/wms", {
        layers: 'sanitasi:Batas Kecamatan',
        format: 'image/png',
        transparent: true,
        version: '1.1.0',
    });

//Simbologi Layer

var simbolPengamanPantai = {
    radius: 6,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var simbolEmbung = {
    radius: 6,
    fillColor: "#aeff33",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var simbolBendungan = {
    radius: 6,
    fillColor: "#01F6F1",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var simbolDanau = {
    radius: 6,
    fillColor: "#0117F6",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

//Memanggil data GeoJSON dan setting Popup

var pengamanPantai = $.getJSON("https://gis.pusair-pu.go.id/api/v1/papua/infrastructure?id=12", function(data){
    L.geoJSON(data, {
        pointToLayer: function (Feature, coordinates) {
            return L.circleMarker(coordinates, simbolPengamanPantai);
        }
    }).bindPopup(function (layer){
                return "<h3> Keterangan </h3>" + "Nama Objek    : " + layer.feature.properties.name +
        "<br>" + "Jenis Aset    : "+ layer.feature.properties.type_name +
        "<br>" + "Wilayah Sungai    : "+ layer.feature.properties.ws_name +
        "<br>" + "Nama DAS    : "+ layer.feature.properties.das_name +
        "<br>" + "Pengelola    : "+ layer.feature.properties.pengelola_name +
        "<br>" + "Kelurahan    : "+ layer.feature.properties.kelurahan +
        "<br>" + "Kecamatan    : "+ layer.feature.properties.kecamatan +
        "<br>" + "Kabupaten    : "+ layer.feature.properties.kabupaten +
        "<br>" + "Provinsi    : "+ layer.feature.properties.provinsi ;         
    }).addTo(map);
})

var embung = $.getJSON("https://gis.pusair-pu.go.id/api/v1/papua/infrastructure?id=5", function(data){
    L.geoJSON(data, {
        pointToLayer: function (Feature, coordinates) {
            return L.circleMarker(coordinates, simbolEmbung);
        }
    }).bindPopup(function (layer){
                return "<h3> Keterangan </h3>" + "Nama Objek    : " + layer.feature.properties.name +
        "<br>" + "Jenis Aset    : "+ layer.feature.properties.type_name +
        "<br>" + "Wilayah Sungai    : "+ layer.feature.properties.ws_name +
        "<br>" + "Nama DAS    : "+ layer.feature.properties.das_name +
        "<br>" + "Pengelola    : "+ layer.feature.properties.pengelola_name +
        "<br>" + "Kelurahan    : "+ layer.feature.properties.kelurahan +
        "<br>" + "Kecamatan    : "+ layer.feature.properties.kecamatan +
        "<br>" + "Kabupaten    : "+ layer.feature.properties.kabupaten +
        "<br>" + "Provinsi    : "+ layer.feature.properties.provinsi ;    
    }).addTo(map);
})

var bendungan = $.getJSON("https://gis.pusair-pu.go.id/api/v1/papua/infrastructure?id=4", function(data){
    L.geoJSON(data, {
        pointToLayer: function (Feature, coordinates) {
            return L.circleMarker(coordinates, simbolBendungan);
        }
    }).bindPopup(function (layer){
        return "<h3> Keterangan </h3>" + "Nama Objek    : " + layer.feature.properties.name +
        "<br>" + "Jenis Aset    : "+ layer.feature.properties.type_name +
        "<br>" + "Wilayah Sungai    : "+ layer.feature.properties.ws_name +
        "<br>" + "Nama DAS    : "+ layer.feature.properties.das_name +
        "<br>" + "Pengelola    : "+ layer.feature.properties.pengelola_name +
        "<br>" + "Kelurahan    : "+ layer.feature.properties.kelurahan +
        "<br>" + "Kecamatan    : "+ layer.feature.properties.kecamatan +
        "<br>" + "Kabupaten    : "+ layer.feature.properties.kabupaten +
        "<br>" + "Provinsi    : "+ layer.feature.properties.provinsi ; 
    }).addTo(map);
})

var danau = $.getJSON("https://gis.pusair-pu.go.id/api/v1/papua/infrastructure?id=2", function(data){
    L.geoJSON(data, {
        pointToLayer: function (Feature, coordinates) {
            return L.circleMarker(coordinates, simbolDanau);
        }
    }).bindPopup(function (layer){
        return "<h3> Keterangan </h3>" + "Nama Objek    : " + layer.feature.properties.name +
        "<br>" + "Jenis Aset    : "+ layer.feature.properties.type_name +
        "<br>" + "Wilayah Sungai    : "+ layer.feature.properties.ws_name +
        "<br>" + "Nama DAS    : "+ layer.feature.properties.das_name +
        "<br>" + "Pengelola    : "+ layer.feature.properties.pengelola_name +
        "<br>" + "Kelurahan    : "+ layer.feature.properties.kelurahan +
        "<br>" + "Kecamatan    : "+ layer.feature.properties.kecamatan +
        "<br>" + "Kabupaten    : "+ layer.feature.properties.kabupaten +
        "<br>" + "Provinsi    : "+ layer.feature.properties.provinsi ;
    }).addTo(map);
})

//Grup data vektor yang dipanggil    
var overlayMaps = {
    "Administrasi Kecamatan": kecBdgName,
    "Batas Kecamatan": kecBdgLine
};

//Body peta dari html
var map = L.map("map", {
    center: [-4.0747407425756945, 137.04231179214614],
    zoom: 7,
    layers:[osmMap]//Command untuk memunculkan peta secara otomatis
});

//Pemanggilan tools layer control
var mapLayers = L.control.layers(baseMaps).addTo(map);
// var mapLayers = L.control.layers(baseMaps).addTo(map);

//Memanggil plugin measure
var ctlMeasure = L.control.polylineMeasure({
    position: "topleft",
    measureControlTitle: "Measure Length"
}).addTo(map);

// var myIcon = L.icon{
//     iconUrl: 'resources/images'
// }

//Add point marker
// var pointMarker = L.marker([-6.9104147728080845, 107.62082856584969],{
//     draggable: true
// }).addTo(map);