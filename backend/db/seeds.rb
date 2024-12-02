# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'json'

file_path = Rails.root.join('db', 'data', 'placements_teaser_data.json')
data = JSON.parse(File.read(file_path))

InvoiceLineItem.destroy_all
Invoice.destroy_all
LineItem.destroy_all
Campaign.destroy_all

data.each do |entry|
  campaign = Campaign.find_or_create_by!(id: entry["campaign_id"], name: entry["campaign_name"])

  line_item = campaign.line_items.create!(
    id: entry["id"],
    name: entry["line_item_name"],
    booked_amount: entry["booked_amount"],
    actual_amount: entry["actual_amount"],
  )
  
  invoice = campaign.invoices.create!(
    id: entry["id"],
    adjustments: entry["adjustments"],
  )

  InvoiceLineItem.create!(invoice: invoice, line_item: line_item)
end