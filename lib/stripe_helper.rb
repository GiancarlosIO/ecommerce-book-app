require 'stripe'
# encoding: utf-8
# StripeHelper
module StripeHelper
  def self.test
    puts "ENVIROMENT VARIABLE #{ENV["stripe_api_key"]}"
  end
end