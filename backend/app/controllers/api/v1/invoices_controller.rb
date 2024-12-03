class Api::V1::InvoicesController < ApplicationController
  def index
    invoices = Invoice.includes(:line_items, :campaign)
                      .page((params[:page_index].to_i || 0) + 1)
                      .per(params[:page_size] || 10)

    render json: {
      pagination: {
        current_page: invoices.current_page,
        total_pages: invoices.total_pages,
        total_count: invoices.total_count,
      },

      data: invoices.map { |invoice|
        total_amount = invoice.line_items.sum(&:actual_amount).to_f + invoice.adjustments.to_f

        {
          id: invoice.id,
          campaign: {
            id: invoice.campaign.id,
            name: invoice.campaign.name
          },
          line_items: invoice.line_items.map { |line_item| 
            {
              id: line_item.id,
              name: line_item.name
            }
          },
          total_amount: total_amount.round(2)
        }
      }
    }
  end
end