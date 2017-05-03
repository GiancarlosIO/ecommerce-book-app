class Api::V1::SessionsController < Api::V1::ApiController
  before_action :authenticate!, only: [:sign_out, :password]
  before_action :valid_token?, only: [:password]

  def sign_in
    if session_params[:email].nil?
      render json: { error: { user: 'email is missing' } }
    elsif session_params[:password].nil?
      render json: { error: { user: 'password is missing' } }
    else
      @user = User.find_by(email: session_params[:email])
      if @user.nil?
        render json: { error: { user: 'User not exists' } }, status: :unauthorized
      else
        if @user.authenticate(session_params[:password])
          @session = @user.sessions.create()
          render template: 'api/v1/users/show', status: 200
        else
          render json: { error: { user: 'incorrect password' } }, status: :unauthorized
        end
      end
    end
  end

  def sign_out
    session = @current_user.sessions.find_by(token: request.headers['access-token'])
    if session.nil?
      render json: { error: { user: 'session not found' } }, status: :bad_request
    else
      session.destroy
      render json: { message: 'sign_out successfully' }, status: 200
    end
  end

  def password
    if @current_user.update(password_params)
      render template: 'api/v1/users/show', status: 200
    else
      render json: { user: @current_user.errors }, status: :bad_request
    end
  end

  private
  def session_params
    params.require(:user).permit(:password, :email)
  end

  def password_params
    params.require(:user).permit(:password, :new_password)
  end

end