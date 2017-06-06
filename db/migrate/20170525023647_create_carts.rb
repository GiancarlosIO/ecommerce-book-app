class CreateCarts < ActiveRecord::Migration[5.1]
  def change
    create_table :carts do |t|
      t.references :user, foreign_key: true
      t.decimal :igv
      t.decimal :discount
      t.decimal :subtotal
      t.decimal :total

      t.timestamps
    end
  end
end
