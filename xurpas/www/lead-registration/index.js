frappe.ready(function() {
    new DataTable('#main_table');

    $('#modal_action_primary').on('click', function(e) {
        lead_name = e.currentTarget.getAttribute('lead-name');

        frappe.call({
            method: 'xurpas.xurpas_customizations.lead_registration.submit_lead',
            args: {
                'lead_name': lead_name
            },

            callback: function(r) {
                if (r.message == 'success') {
                    // Go back to the main page
                    location.reload();
                } else {
                    alert(r.message);
                }
            }
        });
    });
});


function update_lead(e) {
    // Get input values
    company = document.getElementById('company').value;
    contact = document.getElementById('contact').value;
    designation = document.getElementById('designation').value;
    start_date = document.getElementById('start_date').value;
    deal_amount = document.getElementById('deal_amount').value;
    deal_stage = document.getElementById('deal_stage').value;
    description = document.getElementById('description').value; 
    sales_partner = document.getElementById('save_new_button').getAttribute('sales-partner');
    lead_name = document.getElementById('save_new_button').getAttribute('lead-name');

    // Create a new planner
    frappe.call({
        method: 'xurpas.xurpas_customizations.lead_registration.update_lead',
        args: {
            'company': company,
            'contact': contact,
            'designation': designation,
            'start_date': start_date,
            'deal_amount': deal_amount,
            'deal_stage': deal_stage,
            'description': description,
            'sales_partner': sales_partner,
            'lead_name': lead_name
        },
        callback: function(r) {
            // Reload the page
            location.reload();
        }
    })
}


function open_lead_modal(e = event) {
    document.getElementById('company').readOnly = false;
    document.getElementById('contact').readOnly = false;
    document.getElementById('designation').readOnly = false;
    document.getElementById('start_date').readOnly = false;
    document.getElementById('deal_amount').readOnly = false;
    document.getElementById('deal_stage').readOnly = false;
    document.getElementById('description').readOnly = false;

    // Set font color for company and contact to black
    document.getElementById('company').style.color = 'black';
    document.getElementById('contact').style.color = 'black';
    document.getElementById('designation').style.color = 'black';
    document.getElementById('start_date').style.color = 'black';
    document.getElementById('deal_amount').style.color = 'black';
    document.getElementById('deal_stage').style.color = 'black';
    document.getElementById('description').style.color = 'black';

    deal_stage_html  = '<option value="Discovery Session">Discovery Session</option>'
    deal_stage_html += '<option value="Evaluate Solution">Evaluate Solution</option>'
    deal_stage_html += '<option value="Evaluate Proposal">Evaluate Proposal</option>'
    deal_stage_html += '<option value="Endorsement (If Won)">Endorsement (If Won)</option>'
    deal_stage_html += '<option value="Feedback (If Lost)">Feedback (If Lost)</option>'
    document.getElementById('deal_stage').innerHTML = deal_stage_html;

    // Enable the Save button
    document.getElementById('save_new_button').disabled = false;
    
    if (e.currentTarget.getAttribute('mode') == 'New') {
        // Set the values of the modal
        document.getElementById('staticBackdropLabel').innerHTML = 'New Lead';
        document.getElementById('company').value = '';
        document.getElementById('contact').value = '';
        document.getElementById('designation').value = '';
        document.getElementById('start_date').value = '';
        document.getElementById('deal_amount').value = '';
        document.getElementById('deal_stage').value = '';
        document.getElementById('description').value = '';
        document.getElementById('save_new_button').setAttribute('lead-name', 'New');
        
    } else {
        // Get the Lead ID
        lead_name = e.currentTarget.getAttribute('lead-name');
        document.getElementById('save_new_button').setAttribute('lead-name', lead_name);

        // Get the Lead details
        frappe.call({
            method: 'xurpas.xurpas_customizations.lead_registration.get_lead',
            args: {
                'name': lead_name
            },
            callback: function(r) {
                // Set the values of the modal
                document.getElementById('staticBackdropLabel').innerHTML = 'Edit Lead';
                document.getElementById('company').value = r.message.company;
                document.getElementById('contact').value = r.message.contact;
                document.getElementById('designation').value = r.message.designation;
                document.getElementById('start_date').value = r.message.expected_start_date;
                document.getElementById('deal_amount').value = r.message.estimated_deal_amount;
                document.getElementById('description').value = r.message.deal_description;

                deal_stage_html  = '<option value="' + r.message.deal_stage + '">' + r.message.deal_stage + '</option>'
                if (r.message.deal_stage !== 'Discovery Session') {deal_stage_html += '<option value="Discovery Session">Discovery Session</option>';}
                if (r.message.deal_stage !== 'Evaluate Solution') {deal_stage_html += '<option value="Evaluate Solution">Evaluate Solution</option>';}
                if (r.message.deal_stage !== 'Evaluate Proposal') {deal_stage_html += '<option value="Evaluate Proposal">Evaluate Proposal</option>';}
                if (r.message.deal_stage !== 'Endorsement (If Won)') {deal_stage_html += '<option value="Endorsement (If Won)">Endorsement (If Won)</option>';}
                if (r.message.deal_stage !== 'Feedback (If Lost)') {deal_stage_html += '<option value="Feedback (If Lost)">Feedback (If Lost)</option>';}
                document.getElementById('deal_stage').innerHTML = deal_stage_html;       

                // Set company and contact to readonly
                document.getElementById('company').readOnly = true;
                document.getElementById('contact').readOnly = true;

                // Set font color for company and contact to gray
                document.getElementById('company').style.color = 'gray';
                document.getElementById('contact').style.color = 'gray';
                
                if (r.message.docstatus > 0) {
                    document.getElementById('designation').readOnly = true;
                    document.getElementById('designation').style.color = 'gray';

                    if (r.message.docstatus == 2) {
                        // Disable rest of the fields if cancelled/rejected
                        document.getElementById('start_date').readOnly = true;
                        document.getElementById('deal_amount').readOnly = true;
                        document.getElementById('deal_stage').readOnly = true;
                        document.getElementById('description').readOnly = true;
                        document.getElementById('save_new_button').disabled = true;
                        
                        document.getElementById('start_date').style.color = 'gray';
                        document.getElementById('deal_amount').style.color = 'gray';
                        document.getElementById('deal_stage').style.color = 'gray';
                        document.getElementById('description').style.color = 'gray';

                    } else {
                        // Enable the rest of the fields
                        document.getElementById('start_date').readOnly = false;
                        document.getElementById('deal_amount').readOnly = false;
                        document.getElementById('deal_stage').readOnly = false;
                        document.getElementById('description').readOnly = false;
                        document.getElementById('save_new_lead').disabled = false;

                        // Set font color for the rest of the fields to black
                        document.getElementById('start_date').style.color = 'black';
                        document.getElementById('deal_amount').style.color = 'black';
                        document.getElementById('deal_stage').style.color = 'black';
                        document.getElementById('description').style.color = 'black';
                    }

                }
            }

        });
    }

    var modal_lead = new bootstrap.Modal(document.getElementById('modal_new_lead'), {
        keyboard: true
    })

    modal_lead.show();
}


function submit_lead(e = event) {
    lead_name = e.currentTarget.getAttribute('lead-name');
    lead = frappe.get_doc('Partner Lead', lead_name);

    var action_modal_title = document.getElementById('modal_action_title');
    var action_modal_body = document.getElementById('modal_action_body');
    var action_modal_primary = document.getElementById('modal_action_primary');
    var action_modal_secondary = document.getElementById('modal_action_secondary');

    action_modal_title.innerHTML = __('Submit Lead');
    action_modal_body.innerHTML = __('Are you sure you want to submit this lead? You will no longer be able to edit this once submitted.');
    action_modal_primary.innerHTML = __('Submit');
    action_modal_secondary.innerHTML = __('Cancel');
    action_modal_primary.setAttribute('lead-name', lead_name);

    $('#modal_action').modal('show');
}