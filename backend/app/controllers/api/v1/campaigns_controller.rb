class Api::V1::CampaignsController < ApplicationController
  def index
    campaigns = Campaign.includes(line_items: { invoices: :line_items })
                        .page((params[:page_index].to_i || 0) + 1)
                        .per(params[:page_size] || 10)

    render json: {
      pagination: {
        current_page: campaigns.current_page,
        total_pages: campaigns.total_pages,
        total_count: campaigns.total_count,
      },

      data: campaigns.map { |campaign|
        booked_total_amount = campaign.line_items.sum(&:booked_amount).round(2)
        actual_total_amount = campaign.line_items.sum(&:actual_amount).round(2)
        line_items_count = campaign.line_items.size
        invoices_count = campaign.line_items.flat_map(&:invoices).uniq.size

        {
          id: campaign.id,
          name: campaign.name,
          booked_total_amount: booked_total_amount,
          actual_total_amount: actual_total_amount,
          line_items_count: line_items_count,
          invoices_count: invoices_count
        }
      }
    }
  end

  def show
    campaign = Campaign.includes(line_items: { invoices: :line_items }).find(params[:id])

    render json: {
      id: campaign.id,
      name: campaign.name,
      line_items: campaign.line_items.map do |line_item|
        {
          id: line_item.id,
          name: line_item.name,
          booked_amount: line_item.booked_amount,
          actual_amount: line_item.actual_amount
        }
      end,
      invoices: campaign.line_items.flat_map(&:invoices).uniq.map do |invoice|
        {
          id: invoice.id,
          adjustments: invoice.adjustments,
          line_items: invoice.line_items
        }
      end
    }
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Campaign not found' }, status: :not_found
  end
end