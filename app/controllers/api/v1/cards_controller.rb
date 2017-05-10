class Api::V1::CardsController < Api::V1::ApiController
  before_action :authenticate!
  before_action :valid_token?
  before_action :set_card, only: [:update, :destroy]

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

  def update
    if @current_user.set_default_card(@card.id)
      render json: { message: 'Credit card updated successfully' }, status: 200
    else
      render json: { error: { card: 'Can\'t update the card' } }, status: :unprocessable_entity
    end
  end

  def destroy
    if @current_user.delete_card(@card.identifier)
      render json: { message: 'Credit card deleted' }, status: 200
    else
      render json: { error: { card: 'Can\'t delete the card' } }, status: :unprocessable_entity
    end
  end

  private
  def card_params
    params.require(:card).permit(:token)
  end

  def set_card
    if @current_user.cards.where(id: params[:id]).first.nil?
      render json: { error: { card: "Card not found" } }, status: :not_found
    else
      @card = @current_user.cards.find(params[:id])
    end
  end

end