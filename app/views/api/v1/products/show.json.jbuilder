json.product do
   json.id @product.id
   json.name @product.name
   json.quantity @product.quantity
   json.price @product.price
   json.description @product.description
   json.image @product.image
   json.created_at @product.created_at
   json.updated_at @product.updated_at
   json.categories @product.categories
end