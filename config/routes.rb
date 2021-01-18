Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }

  namespace :api do
    namespace :v1 do
      resources :tasks, except: [:new, :edit]
      resources :tags, except: [:new, :edit]
      
      get 'search' => 'navigation#search'
      get 'logged_in' => 'currentuser#index'
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'homepage#index'

  get '/*path' => 'homepage#index'
end
