class Api::V1::InvoicesController < ApplicationController
  before_action :set_campaign

  def index
    invoices = @campaign.invoices
    render json: invoices
  end

  def create
    invoice = @campaign.invoices.new(invoice_params)
    if invoice.save
      render json: invoice, status: :created
    else
      render json: invoice.errors, status: :unprocessable_entity
    end
  end

  def update
    invoice = Invoice.find(params[:id])
    if invoice.update(invoice_params)
      render json: invoice
    else
      render json: invoice.errors, status: :unprocessable_entity
    end
  end

  def destroy
    invoice = Invoice.find(params[:id])
    invoice.destroy
    head :no_content
  end

  private

  def set_campaign
    @campaign = Campaign.find(params[:campaign_id])
  end

  def invoice_params
    params.require(:invoice).permit(:adjustments, :total_amount)
  end
end