class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy]
  #before_action :authenticate_user!

  # GET /tasks
  # GET /tasks.json
  def index
    @tasks = Task.all #.order(created_at: :desc)
    render json: @tasks
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
    render json: @task
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = current_user.tasks.create!(task_params)
    render json: @task

    # respond_to do |format|
    #   if @task.save
    #     format.html { redirect_to @task, notice: 'Task was successfully created.' }
    #     format.json { render :show, status: :created, location: @task }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @task.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    @task.update(task_params)
    json render: @task
    # respond_to do |format|
    #   if @task.update(task_params)
    #     format.html { redirect_to @task, notice: 'Task was successfully updated.' }
    #     format.json { render :show, status: :ok, location: @task }
    #   else
    #     format.html { render :edit }
    #     format.json { render json: @task.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task.destroy
    render json: { message: 'Task was successfully deleted!' }
    # respond_to do |format|
    #   format.html { redirect_to tasks_url, notice: 'Task was successfully deleted.' }
    #   format.json { head :no_content }
    # end
  end

  def search
    @parameter = params[:search].downcase  
    @results = Task.all.where("lower(name) LIKE :search OR lower(description) LIKE :search", search: "%#{@parameter}%").uniq
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:name, :description, :date, :completed, :user_id, { tag_ids:[] })
    end
end
