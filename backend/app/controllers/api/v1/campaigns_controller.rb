class Api::V1::CampaignsController < ApplicationController
  def index
    campaigns = Campaign.includes(:line_items)
                        .page(params.fetch(:page_index, 0).to_i + 1)
                        .per(params.fetch(:page_size, 10))

    render json: {
      pagination: {
        current_page: campaigns.current_page,
        total_pages: campaigns.total_pages,
        total_count: campaigns.total_count,
      },
      data: campaigns.map do |campaign|
        {
          id: campaign.id,
          name: campaign.name,
          booked_total_amount: campaign.line_items.sum(:booked_amount).to_f.round(2),
          actual_total_amount: campaign.line_items.sum(:actual_amount).to_f.round(2),
          line_items_count: campaign.line_items.size,
          invoices_count: campaign.line_items.joins(:invoices).distinct.count("invoices.id"),
        }
      end,
    }
  end

  def show
    campaign = Campaign.includes(line_items: :invoices).find(params[:id])

    render json: {
      id: campaign.id,
      name: campaign.name,
      line_items: campaign.line_items.map do |line_item|
        {
          id: line_item.id,
          name: line_item.name,
          booked_amount: line_item.booked_amount.to_f.round(2),
          actual_amount: line_item.actual_amount.to_f.round(2),
          invoices: line_item.invoices.map do |invoice|
            {
              id: invoice.id,
              adjustments: invoice.adjustments.to_f.round(2),
              created_at: invoice.created_at.strftime("%Y-%m-%d %H:%M:%S"),
              updated_at: invoice.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
            }
          end,
        }
      end,
    }
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Campaign with id #{params[:id]} not found" }, status: :not_found
  end
end
