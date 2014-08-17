all_boots = DBC::User.all

all_boots.each do |boot|
  Boot.create(
    id: boot.id,
    name: boot.name,
    github_profile_link: boot.profile[:github],
    twitter_profile_link: boot.profile[:twitter],
    facebook_profile_link: boot.profile[:facebook],
    linked_in_profile_link: boot.profile[:linked_in],
    blog_link: boot.profile[:blog],
    current_location: boot.profile[:current_location]
    )
end

