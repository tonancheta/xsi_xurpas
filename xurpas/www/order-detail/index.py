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

    # 2. page title
    order_name = frappe.form_dict.get('order-name')
    sales_partner = frappe.form_dict.get('sales-partner')
    
    if order_name == 'New':
        context.page_title = _('New Order')
        context.docstatus = 0
    else:
        context.page_title = _('Order No. ') + order_name
        context.order = frappe.get_doc('Sales Order', order_name)
        context.docstatus = context.order.docstatus

    # 3. customers
    context.customers = frappe.db.sql('''
        SELECT name
        FROM `tabCustomer`
        WHERE default_sales_partner = %(sales_partner)s
        ORDER BY name
        ''', {'sales_partner': sales_partner}, as_dict=True)
    
    # 4. leads
    context.items = frappe.db.sql('''
        SELECT ROW_NUMBER() OVER ( ORDER BY name ) as row_num,
            name, item_code, description, qty, uom, base_rate, amount
        FROM `tabSales Order Item`
        WHERE parent = %(order_name)s
        ''', {'order_name': order_name}, as_dict=True)

    # 5. sales partner
    context.sales_partner = sales_partner

    # 6. today's date
    context.today = datetime.date.today()
    
    # 7. version
    context.version = get_version()
