Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :tasks, except: [:new, :edit]
      resources :tags, except: [:new, :edit]
    end
  end

  #get '/search' => 'tasks#search', :as => 'search_page'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # try root 'api/v1/tasks#index' if no homepage
  root 'homepage#index'

  # For other paths
  get '/*path' => 'homepage#index'
end
