class RegistrationsController < Devise::RegistrationsController

    def create
      @user = User.new(user_params)
      if @user.save
        render json: @user
      else
        warden.custom_failure!
        if User.find_by_email(user_params[:email])
          render :json=> @user.errors, status: 409
        else 
          render :json=> @user.errors, status: :unprocessable_entity
        end
      end
    end
  
    def update
      @user = User.find_by_email(user_params[:email])
  
      if @user.update_attributes(user_params)
        render json: @user
      else
        warden.custom_failure!
        render :json=> @user.errors, :status=>422
      end
   end
  
    def destroy
      @user = User.find_by_email(user_params[:email])
      if @user.destroy
        render :json=> { success: 'user was successfully deleted' }, :status=>201
      else
        render :json=> { error: 'user could not be deleted' }, :status=>422
      end
    end
  
    private
  
    def user_params
       params.require(:user).permit(:email, :password, :password_confirmation)
    end
  end
