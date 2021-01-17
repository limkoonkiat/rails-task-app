class Api::V1::NavigationController < ApplicationController
  before_action :authenticate_user!

  def search
    query = params[:query].downcase
    results = Task.where('lower(name) LIKE ? OR lower(description) LIKE ?', "%#{query}%", "%#{query}%").uniq
    results = results.map{|task| task.attributes.merge(tags: Task.find(task.id).tags)} # Workaround for tasks not containing its tags
    render json: results
  end
end
