class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
  end

  protected

  def authenticate!
    token_str = request.headers['access-token']
    if token_str.nil?
      render json: { error: 'Token is missing' }, status: :unauthorized
    else
      token = Session.find_by(token: token_str)
      if token.nil?
        render json: { error: 'Invalid token' }, status: :unauthorized
      else
        @token = token
        @current_user = token.user
      end
    end
  end

  def valid_token?
    if !@token.is_valid?
      @token.destroy!
      render json: { error: 'Token has expired, sign_in again for get a new token' }, status: :unauthorized
    end
  end
end
