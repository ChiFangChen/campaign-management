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

data.group_by { |record| record["campaign_id"] }.each do |campaign_id, records|
  campaign_name = records.first["campaign_name"]
  campaign = Campaign.create!(name: campaign_name)

  records.each do |record|
    line_item = LineItem.create!(
      campaign: campaign,
      name: record["line_item_name"],
      booked_amount: record["booked_amount"],
      actual_amount: record["actual_amount"]
    )

    Invoice.create!(
      campaign: campaign,
      adjustments: record["adjustments"],
      total_amount: line_item.actual_amount + record["adjustments"]
    )
  end
end