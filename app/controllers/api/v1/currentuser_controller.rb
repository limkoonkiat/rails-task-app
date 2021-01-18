class Api::V1::CurrentuserController < ApplicationController
  def index
    if user_signed_in?
      render json: {logged_in: true, user: current_user.email}
    else
      render json: {logged_in: false, user: ""}
    end
  end
end
