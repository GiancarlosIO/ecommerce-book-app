# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Product.destroy_all
Category.destroy_all
ProductCategory.destroy_all

category_ids = [];
10.times do |t|
  category = Category.create(name: Faker::Book.unique.genre)
  category_ids.push(category.id)
end

category_ids.each do |id|
  20.times do |t|
    product = Product.create(name: Faker::Book.title, price: Faker::Number.decimal(2, 2), quantity: Faker::Number.between(1, 30), description: Faker::Lorem.paragraph(2), image: Faker::LoremPixel.image("250x350", false, 'business'));
    product.categories << Category.find(id);
  end
end