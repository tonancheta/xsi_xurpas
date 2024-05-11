frappe.ui.form.on('Authorized Users', {
    refresh: function(frm) {
        frm.set_query('user', function() {
            return {
                filters: {
                    // Allow all users to be shown
                    'user': ''
            }};
        });
    }
});