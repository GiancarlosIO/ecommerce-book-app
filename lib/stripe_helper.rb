require 'stripe'
# encoding: utf-8
# StripeHelper
module StripeHelper
  Stripe.api_key = EcommerceApp::Application.secrets["stripe_api_key"];

  # Customer
  def self.create_customer(email, token)
    Stripe::Customer.create(
      description: "A customer for #{email}",
      email: email,
      source: token
    )
  end

  def self.update_customer(customer_id, data={})
    cu = Stripe::Customer.retrieve(customer_id)
    data.each do |att, val|
      cu["#{att}"] = val
    end
    cu.save
  end

  # Cards
  def self.create_card(customer_id, token)
    cu = Stripe::Customer.retrieve(customer_id)
    fingerprint = self.get_fingerprint(token)
    cards = cu.sources.data
    valid_card = true
    cards.each{ |card| card.fingerprint == fingerprint && valid_card = false }
    if (valid_card)
      cu.sources.create(source: token)
    else
      "the card has already taken"
    end
  end

  def self.delete_card(customer_id, card_id)
    cu = Stripe::Customer.retrieve(customer_id)
    cu.sources.retrieve(card_id).delete()
  end

  # charges
  def self.create_charge(customer_id, card_id, amount, currency)
    Stripe::Charge.create(
      amount: (amount*100),
      currency: currency,
      source: card_id,
      customer: customer_id
    )
  end

  private

  def self.get_fingerprint(token)
    token = Stripe::Token.retrieve(token)
    token.card.fingerprint
  end
end