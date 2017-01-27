function initMap() {
    console.log("mapssss");
}

function createMap() {
    var myLatLng = { lat: -25.363, lng: 131.044 };

    var map = new google.maps.Map(document.getElementById('Maps'), {
        zoom: 4,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });
}

var activeOrderVm = {
    activeOrders: ko.observableArray()
}

var addresses = [];

function initialize() {
    getActiveOrders();
    ko.applyBindings(activeOrderVm, document.getElementById("HeaderDiv"));

    
    //getGeoCodingInfo

   // createMap();
    
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
            console.log(data);

            
        },
        fail: function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        }
    })
}
