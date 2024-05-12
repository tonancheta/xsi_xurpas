frappe.ui.form.on('Sales Partner', {
    onload: function(frm) {
        frm.set_query('user', 'custom_authorized_users', function() {
            return {
                // Allow all users with role as Partner to be shown
                query: 'xurpas.xurpas_customizations.lead_registration.user_query',
                filters: {enabled: 1}
            }
        });
    }
});