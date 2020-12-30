Rails.application.routes.draw do
  resources :tags
  resources :tasks
  devise_for :users

  get '/search' => 'tasks#search', :as => 'search_page'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'tasks#index'
end
