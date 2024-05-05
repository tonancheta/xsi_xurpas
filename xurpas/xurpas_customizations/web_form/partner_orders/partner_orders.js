frappe.web_form.after_load = () => {
	// init script here
	console.log('web form loaded!')
	frappe.web_form.set_value('delivery_date', add_to_date(frappe.datetime.nowdate(), days = 10))
}
