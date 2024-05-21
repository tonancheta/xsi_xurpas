import frappe
import datetime
import requests
from frappe.desk.reportview import get_match_cond
from frappe import _


def open_order_modal(order_name, sales_partner):
    if order_name == 'New':
        order = frappe.new_doc('Sales Order')
        order.sales_partner = sales_partner
        
    order = frappe.get_doc('Sales Order', order_name)

    modal_html =  '<div class="container-fluid px-2 py-2 border bg-light">'
    modal_html += '  <div class="row py-2">'
    modal_html += '    <label>' + order.customer + '</label><br />'
    modal_html += '    <input class="text-align-left bg-light" name="company" id="company">'
    modal_html += '  </div>'
    modal_html += '  <div class="row py-2">'
    modal_html += '    <div class="col">'
    modal_html += '      <label>' + order.transaction_date + '</label><br />'
    modal_html += '      <input class="text-align-left bg-light" name="transaction_date" id="transaction_date" type="date">'
    modal_html += '    </div>'
    modal_html += '  </div>'
    modal_html += '  <hr />'
    modal_html += '  <h6>' + _("Order Items") + '</h6>'
    modal_html += '  <table class="table table-sm table-striped" style="width: 100%"  id="order_items">'
    modal_html += '    <thead>'
    modal_html += '      <tr>'
    modal_html += '        <th>' + _('SKU') + '</th>'
    modal_html += '        <th>' + _('Description') + '</th>'
    modal_html += '        <th>' + _('UoM') + '</th>'
    modal_html += '        <th>' + _('Qty') + '</th>'a
    modal_html += '        <th>' + _('Amt') + '</th>'
    modal_html += '        <th>' + _('Actions') + '</th>'
    modal_html += '      </tr>'
    modal_html += '    </thead>'
    modal_html += '    <tbody>'

    # Add the order items
    for item in order.items:
        modal_html += '      <tr>'
        modal_html += '        <td>' + item.item_code + '</td>'
        modal_html += '        <td>' + item.item_name + '</td>'
        modal_html += '        <td>' + item.uom + '</td>'
        modal_html += '        <td>' + item.qty + '</td>'
        modal_html += '        <td>' + item.amount + '</td>'
        modal_html += '        <td class="text-center">'
        modal_html += '          <div class="badge badge-primary translate-middle-x" mode="Edit" role="button" id="btn_edit_order" onclick="open_item_modal()">' + _('Edit') + '</div>'
        modal_html += '          <div class="badge badge-primary translate-middle-x"> </div>'
        modal_html += '        </td>'
        modal_html += '      </tr>'

    modal_html += '    </tbody>'
    modal_html += '  </table>'
    modal_html += '</div>'

