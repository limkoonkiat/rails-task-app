class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  # GET /tasks
  # GET /tasks.json
  def index
    @tasks = current_user.tasks.order(created_at: :desc)
    @tasks = @tasks.map{|task| task.attributes.merge(tags: task.tags)} # Workaround for tasks not containing its tags
    render json: @tasks
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
    render json: {task: @task, task_tags: @task.tags}
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = current_user.tasks.create!(task_params)
    render json: @task
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    @task.update(task_params)
    render json: @task
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task.destroy
    render json: { message: 'Task was successfully deleted!' }, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = current_user.tasks.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:name, :description, :date, :completed, :user_id, tag_ids: [] )
    end
end
