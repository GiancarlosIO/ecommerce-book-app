Rails.application.routes.draw do

  namespace :api, defaults: { format: 'json'} do
    namespace :v1 do
      resources :products
      resources :cards, only: [:index, :create, :update, :destroy]
      resources :charges, only: [:index, :create]
      scope 'users' do
        post '/', to: 'users#create'
        delete '/', to: 'users#delete'
        put '/', to: 'users#update'
        put '/password', to: 'users#password'
        post '/sign_in', to: 'sessions#sign_in'
        delete '/sign_out', to: 'sessions#sign_out'
      end
    end
  end

  get '*path', to: 'application#index'
  get'/', to: 'application#index'
end
