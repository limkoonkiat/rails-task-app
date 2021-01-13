class Api::V1::TagsController < ApplicationController
  before_action :set_tag, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  # GET /tags
  # GET /tags.json
  def index
    @tags = Tag.all
    render json: @tags
  end

  # GET /tags/1
  # GET /tags/1.json
  def show
    render json: @tag
  end

  # POST /tags
  # POST /tags.json
  def create
    @tag = current_user.tags.create!(tag_params)
    render json: @tag
  end

  # PATCH/PUT /tags/1
  # PATCH/PUT /tags/1.json
  def update
    @tag.update(tag_params)
    render json: @tag
  end

  # DELETE /tags/1
  # DELETE /tags/1.json
  def destroy
    @tag.destroy
    render json: { message: 'Tag was successfully deleted!' }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tag
      @tag = Tag.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def tag_params
      params.require(:tag).permit(:name, :user_id)
    end
end
