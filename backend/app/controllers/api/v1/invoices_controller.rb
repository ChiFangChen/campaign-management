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
          created_at: invoice.created_at.strftime('%Y-%m-%d %H:%M:%S'),
          updated_at: invoice.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
          total_amount: total_amount.round(2)
        }
      }
    }
  end

  def show
    invoice = Invoice.includes(:line_items).find(params[:id])
    total_amount = invoice.line_items.sum(:actual_amount).to_f + invoice.adjustments.to_f

    render json: {
      id: invoice.id,
      adjustments: invoice.adjustments.round(2),
      line_items: invoice.line_items.map do |line_item|
        {
          id: line_item.id,
          name: line_item.name,
          actual_amount: line_item.actual_amount.round(2),
          booked_amount: line_item.booked_amount.round(2)
        }
      end,
      created_at: invoice.created_at.strftime('%Y-%m-%d %H:%M:%S'),
      updated_at: invoice.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
      total_amount: total_amount.round(2)
    }
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Invoice not found' }, status: :not_found
  end
end