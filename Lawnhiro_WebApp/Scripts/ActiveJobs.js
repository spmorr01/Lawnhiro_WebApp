

var activeOrderVm = {
    activeOrders: ko.observableArray()
}

    function initialize() {
        getActiveOrders();
        ko.applyBindings(activeOrderVm, document.getElementById("HeaderDiv"));
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
            },
            fail: function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            }
        })
    }


