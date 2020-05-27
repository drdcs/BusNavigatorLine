var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGlwdGlyYW5qYW5lbGUiLCJhIjoiY2thb242NDY3MDZkZzJybzU3Y3ZuZTBoZSJ9.r-oEh6s03N2NbocNcgAMYQ'
}).addTo(mymap);


mapMarkers1 = [];

var source = new EventSource('/topic/busline');
source.addEventListener('message', function (e) {
        console.log('Message');
        obj = JSON.parse(e.data);
        console.log(obj)

        if (obj.busline == '00001'){
            for(var i=0; i< mapMarkers1.length; i++){
                mymap.removeLayer(mapMarkers1[i])
            }
            marker1 = L.marker([obj.latitude, obj.longitude]).addTo(mymap)
            mapMarkers1.push(marker1)
        }
    }, false);

