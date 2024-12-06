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

# Create some data(Line Items in Campaign ID 3 & 4) to Invoice ID 7988
ActiveRecord::Base.transaction do
  target_invoice = Invoice.find(7988)

  line_items = LineItem.where(campaign_id: [3, 4])

  line_items.each do |line_item|
    InvoiceLineItem.find_or_create_by(invoice: target_invoice, line_item: line_item)
  end
end