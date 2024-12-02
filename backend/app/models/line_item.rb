class LineItem < ApplicationRecord
  belongs_to :campaign
  has_many :invoice_line_items, dependent: :destroy
  has_many :invoices, through: :invoice_line_items
end
