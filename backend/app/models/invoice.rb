class Invoice < ApplicationRecord
  belongs_to :campaign
  has_many :invoice_line_items, dependent: :destroy
  has_many :line_items, through: :invoice_line_items
end
