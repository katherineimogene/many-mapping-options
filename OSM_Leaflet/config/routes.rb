Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  root 'bootmap#index'

  get 'boots', to: 'bootmap#boots'
end
