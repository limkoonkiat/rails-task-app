Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :tasks, except: [:new, :edit]
      resources :tags, except: [:new, :edit]
      
      get 'search' => 'navigation#search'
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'homepage#index'

  get '/*path' => 'homepage#index'
end
