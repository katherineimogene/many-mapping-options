require 'spec_helper'

describe BootmapController do

  context '#index' do
    it 'is successful' do
      get :index
      expect(response).to be_success
    end
  end

  context '#boots' do
    it 'returns json' do
      get :boots
      boot_json = { boots: [] }.to_json
      expect(response.body).to eq boot_json
    end
  end
end
