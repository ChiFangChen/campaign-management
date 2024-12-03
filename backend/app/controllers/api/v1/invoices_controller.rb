class Api::V1::InvoicesController < ApplicationController
  def index
    invoices = Invoice.includes(:line_items)
                      .page((params[:page_index].to_i || 0) + 1)
                      .per(params[:page_size] || 10)

    render json: {
      pagination: {
        current_page: invoices.current_page,
        total_pages: invoices.total_pages,
        total_count: invoices.total_count,
      },

      data: invoices.map { |invoice|
        total_amount = invoice.line_items.sum(:actual_amount).to_f + invoice.adjustments.to_f

        {
          id: invoice.id,
          created_at: invoice.created_at,
          updated_at: invoice.updated_at,
          total_amount: total_amount.round(2)
        }
      }
    }
  end
end