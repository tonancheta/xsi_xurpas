# Lead Registration Page
import frappe
import datetime
import requests
from frappe import _

no_cache = 1

def get_context(context):
    # Variables to set
    # 1. invalid_role
    cur_user = frappe.get_user()
    cur_roles = cur_user.get_roles()
    context.invalid_role = 'Partner' not in cur_roles

    # 2. welcome_text
    context.welcome_text = _('Welcome to the Lead Registration Page! Please fill out the form below to register a new lead.')

    # 3. leads
    context.leads = frappe.get_all('Partner Lead', \
        fields=['company', 'contact_person', 'designation', 'expected_start_date', 'deal_description'], \
        filters={'lead_owner': cur_user.name})

    # 4. open_lead_detail()
    # 5. version
    pass