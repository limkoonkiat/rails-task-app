class Api::V1::NavigationController < ApplicationController
  before_action :authenticate_user!

  def search
    query = params[:query].downcase

    # Add tasks with matching name or description
    results = current_user.tasks.where('lower(name) LIKE ? OR lower(description) LIKE ?', "%#{query}%", "%#{query}%")

    # Add tasks with matching tags
    matching_tags = current_user.tags.where('lower(name) LIKE ?', "%#{query}%")
    tasks_from_tags = matching_tags.flat_map{|tag| tag.tasks}
    results += tasks_from_tags

    results = results.uniq
    results = results.map{|task| task.attributes.merge(tags: current_user.tasks.find(task.id).tags)} # Workaround for tasks not containing its tags
    render json: results
  end
end
