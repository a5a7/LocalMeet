/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zl7z8s87617htzv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sj8ckgrj",
    "name": "community",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "40l4s2g9tc19hu4",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zl7z8s87617htzv")

  // remove
  collection.schema.removeField("sj8ckgrj")

  return dao.saveCollection(collection)
})
