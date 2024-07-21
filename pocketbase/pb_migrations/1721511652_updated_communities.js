/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("40l4s2g9tc19hu4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ndgyi0qy",
    "name": "name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("40l4s2g9tc19hu4")

  // remove
  collection.schema.removeField("ndgyi0qy")

  return dao.saveCollection(collection)
})
