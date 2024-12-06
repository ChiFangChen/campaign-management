class ApplicationController < ActionController::API
  def format_amount(amount)
    amount.to_f.round(2)
  end
end
