class CreateInvoices < ActiveRecord::Migration[8.0]
  def change
    create_table :invoices do |t|
      t.decimal :adjustments

      t.timestamps
    end
  end
end
