json.user @user, :email, :username, :name, :uid, :provider, :last_name, :created_at, :updated_at if @user
json.user @current_user, :email, :username, :name, :uid, :provider, :last_name, :created_at, :updated_at if @current_user
json.session @session, :token, :expires_at if @session