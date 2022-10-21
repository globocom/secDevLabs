Rails.application.routes.draw do
  resources :rates
  root 'rates#index'
end
