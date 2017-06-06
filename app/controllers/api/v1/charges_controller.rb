class Api::V1::ChargesController < Api::V1::ApiController
  before_action :authenticate!
  before_action :valid_token?

  def index
    @carts = @current_user.carts
    render template: 'api/v1/charges/index'
  end

  def create
    cart = {
      cart_id: charge_params[:card_id],
      amount: charge_params[:total],
      currency: 'usd',
      igv: 0.18,
      discount: 0,
      subtotal: charge_params[:subtotal],
      total: charge_params[:total],
      products: charge_params[:products]
    }
    @charge = @current_user.create_charge(cart)
    if @charge
      render template: 'api/v1/charges/show', status: 200
    else
      render json: { error: { card: 'A error has ocurred try to refresh the page' } }
    end
  end

  private
  def charge_params
    params.require(:charge).permit(:card_id, :subtotal, :total, products: [:id, :price, :quantity] )
  end
end