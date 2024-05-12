# Lead Registration Page
import frappe
import datetime
import requests
from frappe import _
from xurpas.__init__ import get_version

no_cache = 1

def get_context(context):
    # Variables to set
    # 1. invalid_role
    cur_user = frappe.get_user()
    cur_roles = cur_user.get_roles()
    sales_partner = ''

    context.invalid_role = 'Partner' not in cur_roles

    # Search for the Sales Partner based on the current user
    if not context.invalid_role:
        sales_partner = frappe.get_doc('Sales Partner User', {'user': cur_user.name}).parent

    # 2. welcome_text
    context.welcome_text = _('Welcome to the Lead Registration Page for ' + sales_partner + '! Please fill out the form below to register a new lead.')
    
    # 3. leads
    context.leads = frappe.get_all('Partner Lead', \
        fields=['company', 'contact_person', 'designation', 'expected_start_date', 'deal_description'], \
        filters={'sales_partner': sales_partner})

    # 4. open_lead_detail()
    
    # 5. version
    context.version = get_version()
    pass