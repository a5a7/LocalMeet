/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zl7z8s87617htzv")

  collection.listRule = "id = @request.auth.id"
  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zl7z8s87617htzv")

  collection.listRule = null
  collection.createRule = "id = @request.auth.id"

  return dao.saveCollection(collection)
})
