json.user @user, :email, :username, :name, :uid, :provider, :last_name, :created_at, :updated_at, :customer_id if @user
json.user @current_user, :email, :username, :name, :uid, :provider, :last_name, :created_at, :updated_at, :customer_id if @current_user
json.cards @user.cards
json.session @session, :token, :expires_at if @session