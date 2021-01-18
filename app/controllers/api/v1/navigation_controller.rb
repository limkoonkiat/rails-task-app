class Api::V1::NavigationController < ApplicationController
  before_action :authenticate_user!

  def search
    query = params[:query].downcase

    # Add tasks with matching name or description
    results = current_user.tasks.where('lower(name) LIKE ? OR lower(description) LIKE ?', "%#{query}%", "%#{query}%")

    results = results.uniq
    results = results.map{|task| task.attributes.merge(tags: current_user.tasks.find(task.id).tags)} # Workaround for tasks not containing its tags
    render json: results
  end
end
