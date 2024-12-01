class Api::V1::LineItemsController < ApplicationController
  before_action :set_campaign

  def index
    line_items = @campaign.line_items
    render json: line_items
  end

  def create
    line_item = @campaign.line_items.new(line_item_params)
    if line_item.save
      render json: line_item, status: :created
    else
      render json: line_item.errors, status: :unprocessable_entity
    end
  end

  def update
    line_item = LineItem.find(params[:id])
    if line_item.update(line_item_params)
      render json: line_item
    else
      render json: line_item.errors, status: :unprocessable_entity
    end
  end

  def destroy
    line_item = LineItem.find(params[:id])
    line_item.destroy
    head :no_content
  end

  private

  def set_campaign
    @campaign = Campaign.find(params[:campaign_id])
  end

  def line_item_params
    params.require(:line_item).permit(:name, :booked_amount, :actual_amount)
  end
end