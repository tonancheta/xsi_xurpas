frappe.ready(function() {
    new DataTable('#main_table');
    
    order_name = getQueryVariable('order-name').replace(/%20/g, ' ');  // remove %20s
    sales_partner = getQueryVariable('sales-partner').replace(/%20/g, ' ');  // remove %20s
});


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    } 
    alert('Query Variable ' + variable + ' not found');
}

