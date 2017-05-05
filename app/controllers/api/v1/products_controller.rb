class Api::V1::ProductsController < Api::V1::ApiController
  before_action :set_product, only: [:show]

  def index
    @categories = Category.all
    per_page = 12
    @pages = Product.count % per_page > 0 ? (Product.count / 12) + 1 : Product.count
    @products = Product.all.paginate(page: params[:page], per_page: per_page)
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
