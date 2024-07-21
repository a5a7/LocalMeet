/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("40l4s2g9tc19hu4")

  collection.listRule = "id = @request.auth.id"
  collection.createRule = "id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("40l4s2g9tc19hu4")

  collection.listRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
