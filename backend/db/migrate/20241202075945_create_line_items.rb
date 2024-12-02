class CreateLineItems < ActiveRecord::Migration[8.0]
  def change
    create_table :line_items do |t|
      t.string :name
      t.decimal :booked_amount
      t.decimal :actual_amount
      t.references :campaign, null: false, foreign_key: true

      t.timestamps
    end
  end
end
