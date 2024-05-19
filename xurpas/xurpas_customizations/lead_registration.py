import frappe
import datetime
import requests
from frappe.desk.reportview import get_match_cond
from frappe import _


@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs
def user_query(doctype, txt, searchfield, start, page_len, filters):
    print('** user_query **')

    return frappe.db.sql('''
        SELECT name
        FROM `tabUser`
        WHERE name IN (SELECT parent FROM `tabHas Role` WHERE role = 'Partner')
            AND {key} LIKE %(txt)s
            AND name NOT IN (SELECT user FROM `tabSales Partner User`)
            {mcond}
        ORDER BY
            IF(LOCATE(%(_txt)s, name), LOCATE(%(_txt)s, name), 99999)
        LIMIT %(start)s, %(page_len)s
    '''.format(**{
            'key': searchfield,
            'mcond': get_match_cond(doctype)
        }), {
        'txt': '%{}%'.format(txt),
        '_txt': txt.replace('%', ''),
        'start': start,
        'page_len': page_len
    })


@frappe.whitelist()
def update_lead(company, contact, designation, start_date, deal_amount, deal_stage, description, sales_partner, lead_name = 'New'):
    print('** update_lead **')

    if lead_name == 'New':
        lead = frappe.new_doc('Partner Lead')
    else:
        lead = frappe.get_doc('Partner Lead', lead_name)

    lead.company = company
    lead.contact = contact
    lead.designation = designation
    lead.expected_start_date = start_date
    lead.estimated_deal_amount = deal_amount
    lead.deal_stage = deal_stage
    lead.deal_description = description
    lead.sales_partner = sales_partner

    if lead_name is None:
        lead.insert()
    else:
        lead.save()

    return lead.name


@frappe.whitelist()
def get_lead(name):
    return frappe.get_doc('Partner Lead', name)


@frappe.whitelist()
def submit_lead(lead_name):
    lead = frappe.get_doc('Partner Lead', lead_name)
    lead.docstatus = 1
    lead.workflow_state = 'Pending'
    lead.save()

    return 'success'