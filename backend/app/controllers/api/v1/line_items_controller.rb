class Api::V1::LineItemsController < ApplicationController
  def index
    line_items = LineItem.includes(:campaign, :invoices).page(params[:page]).per(params[:per_page] || 10)

    render json: {
      current_page: line_items.current_page,
      total_pages: line_items.total_pages,
      total_count: line_items.total_count,

      data: line_items.map { |line_item|
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
    }
  end
end