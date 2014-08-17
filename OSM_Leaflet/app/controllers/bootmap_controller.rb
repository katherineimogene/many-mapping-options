class BootmapController < ApplicationController

  def index
  end

  def boots
    boots = Boot.all
    render json: { boots: boots }.to_json
  end

end