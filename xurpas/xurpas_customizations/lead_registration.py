import frappe
import datetime
import requests
from frappe.desk.reportview import get_match_cond
from frappe import _

# searches for leads which are not converted
@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs
def user_query(doctype, txt, searchfield, start, page_len, filters):
    return frappe.db.sql('''
        SELECT name
        FROM `tabUser`
        WHERE name IN (SELECT parent FROM `tabHas Role` WHERE parent = name AND role = 'Partner')
            AND {key} LIKE %(txt)s
            {mcond}
        ORDER BY
            IF(LOCATE(%(_txt)s, name), LOCATE(%(_txt)s, name), 99999),
            name
        LIMIT %(start)s, %(page_len)s
    '''.format(**{
            'key': searchfield,
            'mcond':get_match_cond(doctype)
        }), {
        'txt': '%{}%'.format(txt),
        '_txt': txt.replace('%', ''),
        'start': start,
        'page_len': page_len
    })
