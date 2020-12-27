class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.text :description
      t.date :date
      t.boolean :completed

      t.timestamps
    end
  end
end
