Authenticate with full name
    
  rails g migration AddFullNameToUser fullname:string
  
  rake db:migrate
  
  model User
  
  Rajouter:
  validates :fullname, presence: true, length: {maximum: 50}
    
  app/controller/application_controller
  
  Rajouter:
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  protected
  
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(sign_up)  <<  :fullname
    devise_parameter_sanitizer.for(account_update)  <<  :fullname
  end
  
