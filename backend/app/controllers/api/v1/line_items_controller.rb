class Api::V1::LineItemsController < ApplicationController
  def show
    line_item = LineItem.includes(:invoices).find(params[:id])

    render json: {
      id: line_item.id,
      name: line_item.name,
      booked_amount: format_amount(line_item.booked_amount),
      actual_amount: format_amount(line_item.actual_amount),
      campaign: {
        id: line_item.campaign.id,
        name: line_item.campaign.name,
      },
      invoices: line_item.invoices.map { |invoice| format_invoice_data(invoice) },
    }
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Line item not found" }, status: :not_found
  end

  private

  def format_invoice_data(invoice)
    {
      id: invoice.id,
      created_at: invoice.created_at.strftime("%Y-%m-%d %H:%M:%S"),
      updated_at: invoice.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
    }
  end
end
