class InvoiceLineItem < ApplicationRecord
  belongs_to :invoice
  belongs_to :line_item
end
