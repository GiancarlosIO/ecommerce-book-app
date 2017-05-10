require 'stripe_helper'

class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true

  has_secure_password
  has_many :sessions, dependent: :destroy
  has_many :cards, dependent: :destroy

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
    self.cards.last.update(default: true) if card.default
    card.destroy
  end
end
