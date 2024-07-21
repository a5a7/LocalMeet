/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("40l4s2g9tc19hu4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mcglwq3q",
    "name": "description",
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
  collection.schema.removeField("mcglwq3q")

  return dao.saveCollection(collection)
})
