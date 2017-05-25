class Cart < ApplicationRecord
  belongs_to :user
  has_many :cart_items

  before_save :default_values

  private
  def default_values
    self.discount ||= 0.00
  end
end
