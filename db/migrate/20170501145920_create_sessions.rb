class CreateSessions < ActiveRecord::Migration[5.1]
  def change
    create_table :sessions do |t|
      t.datetime :expires_at
      t.references :user, foreign_key: true
      t.string :token

      t.timestamps
    end
  end
end
