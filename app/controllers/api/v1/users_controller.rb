class Api::V1::UsersController < Api::V1::ApiController
  before_action :authenticate!, only: [:destroy, :update]

  def create
    if user_params[:email].nil?
      render json: { error: { user: 'email is missing' } }
    elsif user_params[:password].nil?
      render json: { error: { user: 'password is missing' } }
    else
      @user = User.new(user_params)
      if @user.save
        @session = @user.sessions.create()
        render template: 'api/v1/users/show', status: 200
      else
        render json: { error: { user: @user.errors.full_messages} }, status: :bad_request
      end
    end
  end

  def update
    if @current_user.update(user_update_params)
      render template: 'api/v1/users/show', status: 200
    else
      render json: { error: { user: @current_user.errors.full_messages } }, status: :unprocessable_entity
    end
  end

  def destroy
    if @current_user.destroy
      render json: { message: 'user deleted successfully' }, status: 200
    else
      render json: { error: { user: @current_user.errors.full_messages } }, status: :unprocessable_entity
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