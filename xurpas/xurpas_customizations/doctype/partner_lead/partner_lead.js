// Copyright (c) 2024, Xurpas Software, Inc. and contributors
// For license information, please see license.txt

frappe.ui.form.on("Partner Lead", {
	refresh(frm) {
        frm.add_custom_button(__('Create Customer'), () => {
            if (frm.doc.workflow_state == 'Draft' || frm.doc.workflow_state == 'Pending') {
                // Warn that the Partner Lead is still in draft mode
                frappe.msgprint(
                    msg = __('This Lead must be Approved before it can be saved as a Customer.'),
                    title = __('Partner Lead not Approved')
                );
                return;

            } else if (frm.doc.docstatus == 2) {
                frappe.msgprint(
                    msg = __('This Partner Lead has been rejected. You may not create a Customer from this Lead.'),
                    title = __('Partner Lead is Rejected')
                );
                return;

            } else {
                // Confirm if the user wants to create a Customer
                frappe.confirm(
                    msg = __('Are you sure you want to create a Customer from this Partner Lead?'),
                    action = () => {
                        frappe.call({
                            method: 'xurpas.xurpas_customizations.lead_registration.create_customer',
                            args: {
                                'lead_name': frm.doc.name
                            },
                            callback: (r) => {
                                if (r.message) {
                                    show_alert(__('Customer ' + r.message + ' created successfully.'), 5);
                                }
                            }
                        });
                    }
                );
            }
        });
	}
});
