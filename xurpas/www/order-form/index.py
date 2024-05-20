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
        try:
            sales_partner = frappe.get_doc('Sales Partner User', {'user': cur_user.name}).parent
        except:
            context.invalid_role = True

    # 2. welcome_text
    context.welcome_text = _('Welcome to the Partner Order Form for ' + sales_partner + '!' + \
        ' Click New Order to enter a new order or any of the Edit buttons to update an existing order.')
    
    # 3. orders
    context.orders = frappe.db.sql('''
        SELECT ROW_NUMBER() OVER ( ORDER BY name ) as row_num,
            name, customer_name, transaction_date, grand_total
        FROM `tabSales Order`
        WHERE sales_partner = %(sales_partner)s
        ''', {'sales_partner': sales_partner}, as_dict=True)

    # 4. sales partner
    context.sales_partner = sales_partner
    
    # 5. version
    context.version = get_version()
    pass