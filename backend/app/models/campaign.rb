class Campaign < ApplicationRecord
  has_many :line_items, dependent: :destroy
  has_many :invoices, dependent: :destroy
end
