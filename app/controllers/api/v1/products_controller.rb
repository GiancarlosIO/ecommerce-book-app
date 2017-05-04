class Api::V1::ProductsController < Api::V1::ApiController
  before_action :set_product, only: [:show]

  def index
    @categories = Category.all
    @products = Product.all
  end

  def show
  end


  private
  def set_product
    if Product.where(id: params[:id]).first.nil?
      render json: { error: 'Product not found' }, status: :not_found
    else
      @product = Product.find(params[:id])
    end
  end
end
