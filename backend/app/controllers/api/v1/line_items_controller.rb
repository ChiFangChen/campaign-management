class Api::V1::LineItemsController < ApplicationController
  def index
    line_items = LineItem.includes(:campaign, :invoices).all

    render json: line_items.map { |line_item|
      {
        id: line_item.id,
        name: line_item.name,
        booked_amount: line_item.booked_amount.round(2),
        actual_amount: line_item.actual_amount.round(2),
        campaign: {
          id: line_item.campaign.id,
          name: line_item.campaign.name
        },
        invoices_count: line_item.invoices.size
      }
    }
  end
end