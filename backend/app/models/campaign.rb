class Campaign < ApplicationRecord
  has_many :line_items, dependent: :destroy

  validates :name, presence: true
end
