/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zl7z8s87617htzv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zmu0rrtg",
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
  const collection = dao.findCollectionByNameOrId("zl7z8s87617htzv")

  // remove
  collection.schema.removeField("zmu0rrtg")

  return dao.saveCollection(collection)
})
