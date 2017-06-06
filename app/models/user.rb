require 'stripe_helper'

class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true

  has_secure_password
  has_many :sessions, dependent: :destroy
  has_many :cards, dependent: :destroy
  has_many :carts

  def self.from_omniauth(data={})
    User.where(provider: data[:info][:email]).first_or_create do |user|
      user.password = data[:info][:password]
      user.email = data[:info][:email]
      user.name = data[:info][:name]
      user.username = data[:info][:username]
      user.last_name = data[:info][:last_name]
    end
  end

  def set_customer_id(token)
    res = StripeHelper.create_customer(self.email, token)
    card = res.sources.data[0]
    if self.update(customer_id: res.id)
      self.cards.create(
        last_four: card.last4,
        identifier: card.id,
        fingerprint: card.fingerprint,
        brand: card.brand,
        exp_month: card.exp_month,
        exp_year: card.exp_year,
        default: self.cards.length === 0
      )
    end
  end

  def add_cards(token)
    res = StripeHelper.create_card(self.customer_id, token)
    if res.class === "String"
      res
    else
      self.cards.create(
        last_four: res.last4,
        identifier: res.id,
        fingerprint: res.fingerprint,
        brand: res.brand,
        exp_month: res.exp_month,
        exp_year: res.exp_year,
        default: self.cards.length === 0
      )
    end
  end

  def set_default_card(card_id)
    card = self.cards.find(card_id)
    StripeHelper.update_customer(self.customer_id, {default_source: card.identifier})
    self.cards.map do |c|
      if c.id == card_id
        c.update(default: true)
      else
        c.update(default: false)
      end
    end
  end

  def delete_card(card_id)
    StripeHelper.delete_card(self.customer_id, card_id)
    card = self.cards.find_by(identifier: card_id)
    card.destroy
    if card.default
      if self.cards.count > 1
        return self.cards.last.update(default: true)
      elsif self.cards.count == 1
        return self.cards.first.update(default: true)
      end
    end
    return true
  end

  # Create charges - payments
  def create_charge(cart)
    StripeHelper.create_charge(self.customer_id, cart[:card_id], cart[:amount], cart[:currency])
    user_cart = self.carts.create(
      igv: cart[:igv],
      discount: cart[:discount],
      subtotal: cart[:subtotal],
      total: cart[:total]
    )
    cart[:products].each do |product|
      user_cart.cart_items.create(product_id: product[:id], quantity: product[:quantity], cost: product[:price] )
    end
    return user_cart
  end
end
