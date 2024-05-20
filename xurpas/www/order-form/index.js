frappe.ready(function() {
    new DataTable('#main_table');
});


function open_order_modal() {
    var modal_lead = new bootstrap.Modal(document.getElementById('modal_new_order'), {
        keyboard: true
    })

    new DataTable('#order_items');

    modal_lead.show();
}