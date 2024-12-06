class Invoice < ApplicationRecord
  has_many :invoice_line_items, dependent: :destroy
  has_many :line_items, through: :invoice_line_items

  validates :adjustments, presence: true, numericality: true
end
