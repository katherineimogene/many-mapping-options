class Boot < ActiveRecord::Base

  validates :name, presence: true

  geocoded_by :current_location
  unless Rails.env.test?
    after_validation :geocode,
    :if => lambda{ |user| user.current_location_changed? }
  end

end


