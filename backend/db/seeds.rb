require 'json'

file_path = Rails.root.join('db', 'data', 'placements_teaser_data.json')
data = JSON.parse(File.read(file_path))

InvoiceLineItem.destroy_all
Invoice.destroy_all
LineItem.destroy_all
Campaign.destroy_all

data.each do |entry|
  campaign = Campaign.find_or_create_by(
    id: entry["campaign_id"],
    name: entry["campaign_name"]
  )

  line_item = LineItem.find_or_create_by(
    id: entry["id"],
    name: entry["line_item_name"],
    booked_amount: entry["booked_amount"],
    actual_amount: entry["actual_amount"],
    campaign: campaign
  )

  invoice = Invoice.create!(adjustments: entry["adjustments"])
  invoice.line_items << line_item
end