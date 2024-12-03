class CreateInvoiceLineItems < ActiveRecord::Migration[8.0]
  def change
    create_table :invoice_line_items do |t|
      t.references :invoice, null: false, foreign_key: true
      t.references :line_item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
