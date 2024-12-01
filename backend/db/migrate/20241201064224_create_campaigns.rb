class CreateCampaigns < ActiveRecord::Migration[8.0]
  def change
    create_table :campaigns do |t|
      t.string :name
      t.string :client_name
      t.decimal :total_budget
      t.string :status

      t.timestamps
    end
  end
end
