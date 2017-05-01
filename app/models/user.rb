class User < ApplicationRecord
  validates :email, presence: true

  has_secure_password
  has_many :sessions, dependent: :destroy

  def self.from_omniauth(data={})
    User.where(provider: data[:provider], uid: data[:uid]).first_or_create do |user|
      user.password = data[:info][:password]
      user.email = data[:info][:email]
      user.name = data[:info][:name]
      user.username = data[:info][:username]
      user.last_name = data[:info][:last_name]
    end
  end
end
