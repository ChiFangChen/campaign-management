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
      data: invoices.map { |invoice| format_invoice_summary(invoice) },
    }
  end

  def show
    invoice = Invoice.includes(line_items: :campaign).find(params[:id])
    render json: format_invoice_detail(invoice)
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Invoice not found" }, status: :not_found
  end

  def update
    invoice = Invoice.find(params[:id])

    if invoice.update(adjustments: params[:adjustments])
      render json: {
        message: "Invoice updated successfully",
        invoice: format_invoice_summary(invoice),
      }, status: :ok
    else
      render json: { errors: invoice.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Invoice not found" }, status: :not_found
  end

  private

  def format_invoice_summary(invoice)
    total_amount = invoice.line_items.sum(:actual_amount).to_f + invoice.adjustments.to_f

    {
      id: invoice.id,
      created_at: invoice.created_at.strftime("%Y-%m-%d %H:%M:%S"),
      updated_at: invoice.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
      total_amount: format_amount(total_amount),
    }
  end

  def format_invoice_detail(invoice)
    {
      id: invoice.id,
      campaigns: invoice.line_items.map(&:campaign).uniq.map { |campaign| format_campaign_data(campaign, invoice.id) },
      adjustments: format_amount(invoice.adjustments),
      total_actual_amount: format_amount(invoice.line_items.sum(:actual_amount)),
      created_at: invoice.created_at.strftime("%Y-%m-%d %H:%M:%S"),
      updated_at: invoice.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
    }
  end

  def format_campaign_data(campaign, invoice_id)
    filtered_line_items = campaign.line_items.joins(:invoice_line_items)
      .where(invoice_line_items: { invoice_id: invoice_id })

    {
      id: campaign.id,
      name: campaign.name,
      total_amount: filtered_line_items.sum(:actual_amount).to_f.round(2),
      line_items: filtered_line_items.map { |line_item| format_line_item_data(line_item) },
    }
  end

  def format_line_item_data(line_item)
    {
      id: line_item.id,
      name: line_item.name,
      actual_amount: line_item.actual_amount.to_f.round(2),
    }
  end
end
