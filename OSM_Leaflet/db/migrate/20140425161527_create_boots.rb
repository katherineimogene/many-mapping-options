class CreateBoots < ActiveRecord::Migration
  def change
    create_table :boots do |t|
      t.string :name
      t.text :github_profile_link
      t.text :twitter_profile_link
      t.text :facebook_profile_link
      t.text :linked_in_profile_link
      t.text :blog_link
      t.string :current_location
      t.float :latitude
      t.float :longitude
      t.timestamps
    end
  end
end

