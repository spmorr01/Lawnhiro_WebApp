function initMap() {
    
}

var map;

function createMap() {
    var myLatLng = { lat: 40.8258, lng: -96.6852 };

    map = new google.maps.Map(document.getElementById('Maps'), {
        zoom: 12,
        center: myLatLng
    });

    //var marker = new google.maps.Marker({
    //    position: myLatLng,
    //    map: map,
    //    title: 'Hello World!'
    //});

    //var map;
    //var bounds = new google.maps.LatLngBounds();
    //var mapOptions = {
    //    mapTypeId: 'roadmap',//,
    //    center: new google.maps.LatLng(40.8258, 96.6852)
    ////center: new google.maps.LatLng(40.8258, 96.6852)
    //};

    // Display a map on the page
    //map = new google.maps.Map(document.getElementById("Maps"), mapOptions);
    map.setTilt(45);
}

function addMarkers(lat, lng) {
    var position = { lat: lat, lng: lng };
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(position);
    marker = new google.maps.Marker({
        position: position,
        map: map,
        zoomControl: true,
        scaleControl: true,
        title: "Order Number Here"
    });

    // Allow each marker to have an info window    
    //google.maps.event.addListener(marker, 'click', (function (marker, 0) {
    //    return function () {
    //        infoWindow.setContent(infoWindowContent[0][0]);
    //        infoWindow.open(map, marker);
    //    }
    //})(marker, 0));

    // Automatically center the map fitting all markers on the screen
    //map.fitBounds(bounds);
}

var activeOrderVm = {
    activeOrders: ko.observableArray()
}

var addresses = [];
var latLngList = [];

function initialize() {
    getActiveOrders();
    ko.applyBindings(activeOrderVm, document.getElementById("HeaderDiv"));

    
    //getGeoCodingInfo

   createMap();
    
}

function claimJob(orderId) {
    alert("You claimed order number: " + orderId);
}

function getActiveOrders() {
    $.ajax({
        url: '/api/Orders',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',

        success: function (data) {
            //alert(data);
            //showProducts(data);
            //$.each(data, function (item) {
            //    alert(item.PageName);
            //});
            activeOrderVm.activeOrders(data);
            ko.utils.arrayForEach(activeOrderVm.activeOrders(), function (values) {
                //console.log(values);
                var address = values.Address1 + ', ' + values.City + ', ' + values.State + ' ' + values.Zip
               // addresses.push(address);
                console.log(address);
                getGeoCodingInfo(address);
            });
        },
        fail: function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        }
    })
}

function getGeoCodingInfo(addressParam) {
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addressParam + '&key=AIzaSyATiMiFCSPiuHmHGwBrBhGOEmH3wadkXhM',
        type: 'GET',
        dataType: 'json',
        //contentType: 'application/json; charset=utf-8',

        success: function (data) {
            //alert(data);
            //showProducts(data);
            //$.each(data, function (item) {
            //    alert(item.PageName);
            //});

            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;

            addMarkers(lat, lng);

            //console.log(data.results[0].geometry.location.lat);
            //latLngList.push()
            
        },
        fail: function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        }
    })
}
