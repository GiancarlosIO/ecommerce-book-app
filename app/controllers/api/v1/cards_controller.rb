class Api::V1::CardsController < Api::V1::ApiController
  before_action :authenticate!
  before_action :valid_token?

  def index
    @cards = @current_user.cards
  end

  def create
    if @current_user.customer_id.nil?
      res = @current_user.set_customer_id(card_params[:token])
    else
      @card = @current_user.add_cards(card_params[:token])
      if @card.class === "String"
        render json: { error: { card: @card } }, status: :unprocessable_entity
      else
        render template: 'api/v1/cards/show', status: 200
      end
    end
  end

  def destroy
  end

  private
  def card_params
    params.require(:card).permit(:token)
  end
end