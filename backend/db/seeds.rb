require "json"

file_path = Rails.root.join("db", "data", "placements_teaser_data.json")
data = JSON.parse(File.read(file_path))

ActiveRecord::Base.transaction do
  InvoiceLineItem.destroy_all
  Invoice.destroy_all
  LineItem.destroy_all
  Campaign.destroy_all

  data.each do |entry|
    campaign = Campaign.find_or_create_by(
      id: entry["campaign_id"],
      name: entry["campaign_name"],
    )

    line_item = LineItem.find_or_create_by(
      id: entry["id"],
      name: entry["line_item_name"],
      booked_amount: entry["booked_amount"],
      actual_amount: entry["actual_amount"],
      campaign: campaign,
    )

    invoice = Invoice.create!(adjustments: entry["adjustments"])
    invoice.line_items << line_item
  end

  # Create some data to an invoice
  target_invoice = Invoice.first
  campaigns = Campaign.limit(10)
  line_items = LineItem.where(campaign_id: campaigns.pluck(:id))

  existing_line_item_ids = InvoiceLineItem.where(invoice: target_invoice).pluck(:line_item_id)
  line_items_to_add = line_items.where.not(id: existing_line_item_ids)

  line_items_to_add.each do |line_item|
    InvoiceLineItem.create!(invoice: target_invoice, line_item: line_item)
  end

  puts "Successfully associated #{line_items_to_add.count} line items from campaigns #{campaigns.pluck(:id)} to Invoice ##{target_invoice.id}"
end
