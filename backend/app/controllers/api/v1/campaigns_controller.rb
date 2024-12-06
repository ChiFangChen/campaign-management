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
      data: campaigns.map { |campaign| format_campaign_data(campaign) },
    }
  end

  def show
    campaign = Campaign.includes(line_items: :invoices).find(params[:id])
    render json: format_campaign_data(campaign, include_line_items: true)
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Campaign with id #{params[:id]} not found" }, status: :not_found
  end

  private

  def format_campaign_data(campaign, include_line_items: false)
    data = {
      id: campaign.id,
      name: campaign.name,
      booked_total_amount: format_amount(campaign.line_items.sum(:booked_amount)),
      actual_total_amount: format_amount(campaign.line_items.sum(:actual_amount)),
      line_items_count: campaign.line_items.size,
      invoices_count: campaign.line_items.joins(:invoices).distinct.count("invoices.id"),
    }

    if include_line_items
      data[:line_items] = campaign.line_items.map { |line_item| format_line_item_data(line_item) }
    end

    data
  end

  def format_line_item_data(line_item)
    {
      id: line_item.id,
      name: line_item.name,
      booked_amount: format_amount(line_item.booked_amount),
      actual_amount: format_amount(line_item.actual_amount),
      invoices: line_item.invoices.map { |invoice| format_invoice_data(invoice) },
    }
  end

  def format_invoice_data(invoice)
    {
      id: invoice.id,
      created_at: invoice.created_at.strftime("%Y-%m-%d %H:%M:%S"),
      updated_at: invoice.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
    }
  end
end
