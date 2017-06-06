class Product < ApplicationRecord
  has_many :product_category
  has_many :categories, through: :product_category, dependent: :destroy
  has_many :cart_items
end
