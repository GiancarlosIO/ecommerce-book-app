class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :username
      t.string :name
      t.string :last_name
      t.string :provider
      t.string :uid

      t.timestamps
    end
  end
end
