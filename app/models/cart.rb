class Cart < ApplicationRecord
  belongs_to :user
  has_many :cart_items

  before_save :default_values

  def get_subtotal
    '%.2f' % self.subtotal.truncate(2).to_f
  end

  def get_total
    '%.2f' % self.total.truncate(2).to_f
  end

  def get_discount
    '%.2f' % self.discount.truncate(2).to_f
  end

  private
  def default_values
    self.discount ||= 0.00
  end
end
