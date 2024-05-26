frappe.ready(function() {
    new DataTable('#main_table');
});


function open_order_form(e = event) {
    var order_name = e.document.currentTarget.getAttribute('order-name');
    var sales_partner = e.document.currentTarget.getAttribute('sales-partner');

    window.open('order-detail/index.html?order-name=' + order_name + '&sales-partner=' + sales_partner, '_self');
}