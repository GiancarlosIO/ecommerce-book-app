class Api::V1::CardsController < Api::V1::ApiController
  before_action :authenticate!
  before_action :valid_token?

  def index
    @cards = @current_user.cards
  end

  def create
    res = @current_user.create_card(card_params[:customer_id], card_params[:token])
  end

  def destroy
  end

  private
  def card_params
    params.require(:card).permit(:customer_id, :token)
  end
end