class CreateRates < ActiveRecord::Migration[5.2]
  def change
    create_table :rates do |t|
      t.integer :rate
      t.string :comment
      t.string :text

      t.timestamps
    end
  end
end
