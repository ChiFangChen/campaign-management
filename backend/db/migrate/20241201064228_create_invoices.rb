class CreateInvoices < ActiveRecord::Migration[8.0]
  def change
    create_table :invoices do |t|
      t.references :campaign, null: false, foreign_key: true
      t.decimal :adjustments
      t.decimal :total_amount

      t.timestamps
    end
  end
end
