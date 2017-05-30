json.charge do
  json.id @charge.id
  json.discount @charge.get_discount
  json.subtotal @charge.get_subtotal
  json.total @charge.get_total
  json.created_at @charge.created_at
  json.items @charge.cart_items
end