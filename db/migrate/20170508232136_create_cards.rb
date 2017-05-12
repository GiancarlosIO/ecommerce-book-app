class CreateCards < ActiveRecord::Migration[5.1]
  def change
    create_table :cards do |t|
      t.string :last_four
      t.string :identifier
      t.string :fingerprint
      t.string :brand
      t.integer :exp_month
      t.integer :exp_year
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
