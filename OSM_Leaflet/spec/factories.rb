FactoryGirl.define do
  factory :boot do
    name { Faker::Company.name }
    github_profile_link { Faker::Internet.url }
    twitter_profile_link { Faker::Internet.url }
    facebook_profile_link { Faker::Internet.url }
    linked_in_profile_link { Faker::Internet.url }
    blog_link { Faker::Internet.url }
    current_location { Faker::Address.city }
    latitude { Faker::Address.latitude }
    longitude { Faker::Address.longitude }
    created_at { "2014-04-25" }
    updated_at { "2014-04-25" }
  end
end
