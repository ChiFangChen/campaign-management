class Api::V1::CampaignsController < ApplicationController
  def index
    campaigns = Campaign.all
    render json: campaigns
  end

  def show
    campaign = Campaign.find(params[:id])
    render json: campaign, include: [:line_items, :invoices]
  end

  def create
    campaign = Campaign.new(campaign_params)
    if campaign.save
      render json: campaign, status: :created
    else
      render json: campaign.errors, status: :unprocessable_entity
    end
  end

  def update
    campaign = Campaign.find(params[:id])
    if campaign.update(campaign_params)
      render json: campaign
    else
      render json: campaign.errors, status: :unprocessable_entity
    end
  end

  def destroy
    campaign = Campaign.find(params[:id])
    campaign.destroy
    head :no_content
  end

  private

  def campaign_params
    params.require(:campaign).permit(:name, :client_name, :total_budget, :status)
  end
end