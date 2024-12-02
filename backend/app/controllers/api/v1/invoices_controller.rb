class Api::V1::InvoicesController < ApplicationController
  def index
    invoices = Invoice.includes(:line_items, :campaign).all

    render json: invoices.map { |invoice|
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
  end
end