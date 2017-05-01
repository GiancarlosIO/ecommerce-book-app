class Api::V1::UsersController < Api::V1::ApiController
  before_action :authenticate!, only: [:destroy, :update]

  def create
    if user_params[:email]
      render json: { error: { user: 'email is missing' } }
    elsif user_params[:password]
      render json: { error: { user: 'password is missing' } }
    else
      data = {
        provider: user_params[:email],
        uid: user_params[:email],
        info: {
          password: user_params[:password],
          email: user_params[:email],
          username: user_params[:username],
          name: user_params[:name],
          last_name: user_params[:last_name]
        }
      }
      @user = User.from_omniauth(data)
      if @user
        @session = @user.sessions.create()
        render template: 'api/v1/users/show', status: 200
      else
        render json: { error: { user: @user.errors} }, status: :bad_request
      end
    end
  end

  def update
    if @current_user.update(user_update_params)
      render template: 'api/v1/users/show', status: 200
    else
      render json: { error: { user: @current_user.errors } }, status: :unprocessable_entity
    end
  end

  def destroy
    if @current_user.destroy
      render json: { message: 'user deleted successfully' }, status: 200
    else
      render json: { error: { user: @current_user.errors } }, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :username, :name, :last_name)
  end

  def user_update_params
    params.require(:user).permit(:email, :username, :name, :last_name)
  end

end