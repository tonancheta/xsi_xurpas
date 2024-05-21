frappe.ready(function() {
    new DataTable('#main_table');
});


function open_order_modal(e = event) {
    var order_name = e.document.currentTarget.getAttribute('order-name');
    var sales_partner = e.document.currentTarget.getAttribute('sales-partner');

    frappe.call({
        method: 'xurpas.xurpas_customizations.lead_registration.open_order_modal',
        args: {
            'order_name': order_name,
            'sales_partner': sales_partner,
        },
        callback: function(r) {
            if (r.message) {
                var modal_lead = new bootstrap.Modal(document.getElementById('modal_new_order'), {
                    keyboard: true
                })

                var order_modal_body = document.getElementById('modal-body');
                order_modal_body.innerHTML = r.message;
                
                new DataTable('#order_items');
            
                modal_lead.show();
            }
        }
    });

}