class Api::V1::DashboardController < ApplicationController
  def index
    render json: {
      total_campaigns: Campaign.count,
      total_line_items: LineItem.count,
      total_adjustments: format_amount(Invoice.sum(:adjustments)),
      amount: {
        total_booked_amount: format_amount(LineItem.sum(:booked_amount)),
        total_actual_amount: format_amount(LineItem.sum(:actual_amount)),
        comparison_data: formatted_comparison_data
      }
    }
  end

  private

  def base_campaign_query
    Campaign.includes(:line_items)
            .references(:line_items)
            .select("campaigns.name AS campaign_name, SUM(line_items.booked_amount) AS total_booked, SUM(line_items.actual_amount) AS total_actual")
            .group("campaigns.name")
  end

  def formatted_comparison_data
    base_campaign_query.map do |record|
      {
        campaign_name: record.campaign_name,
        total_booked: format_amount(record.total_booked),
        total_actual: format_amount(record.total_actual)
      }
    end
  end
end