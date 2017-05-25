class CreateCarts < ActiveRecord::Migration[5.1]
  def change
    create_table :carts do |t|
      t.references :user, foreign_key: true
      t.integer :igv
      t.integer :discount
      t.integer :subtotal
      t.integer :total

      t.timestamps
    end
  end
end
