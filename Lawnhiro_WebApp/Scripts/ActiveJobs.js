function initMap() {
    //Waiting for document to be finished loading before creating map
}

var map;

function createMap() {
    var myLatLng = { lat: 40.8258, lng: -96.6852 };

    map = new google.maps.Map(document.getElementById('Maps'), {
        zoom: 12,
        center: myLatLng
    });
    map.setTilt(45);
}

function addMarkers(lat, lng, orderId) {
    var position = { lat: lat, lng: lng };
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(position);
    marker = new google.maps.Marker({
        position: position,
        map: map,
        zoomControl: true,
        scaleControl: true,
        title: orderId
    });
}

var activeOrderVm = {
    activeOrders: ko.observableArray()
}

var addresses = [];
var latLngList = [];

function initialize() {
    getActiveOrders();
    ko.applyBindings(activeOrderVm, document.getElementById("OrdersDiv"));
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
            activeOrderVm.activeOrders(data);
            ko.utils.arrayForEach(activeOrderVm.activeOrders(), function (values) {
                var address = values.Address1 + ', ' + values.City + ', ' + values.State + ' ' + values.Zip
                var orderId = String(values.OrderID);
                getGeoCodingInfo(address, orderId);
            });
        },
        fail: function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        }
    })
}

function getGeoCodingInfo(addressParam, orderId) {
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addressParam + '&key=AIzaSyATiMiFCSPiuHmHGwBrBhGOEmH3wadkXhM',
        type: 'GET',
        dataType: 'json',

        success: function (data) {
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;

            addMarkers(lat, lng, orderId);
        },
        fail: function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        }
    })
}
