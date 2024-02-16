export default {
  async beforeCreate(event) {
    const { data } = event.params;
    let collection = null;
    let item = null;

    if (data.collection.connect.length) {
      collection = data.collection.connect[0]
      collection = await strapi.db.query('api::collection.collection').findOne({
        where: { id: collection.id }
      });
    }

    if (data.item.connect.length) {
      item = data.item.connect[0]
      item = await strapi.db.query('api::item.item').findOne({
        where: { id: item.id }
      });
    }

    const collectionName = collection?.name ?? "missing"
    const itemName = item?.name ?? "missing";

    event.params.data.name = `[${collectionName}] ${itemName}`;
  },
  async beforeUpdate(event) {
    const { data } = event.params;
    let collection = null;
    let item = null;

    if (data.collection.connect.length) {
      collection = data.collection.connect[0]
      collection = await strapi.db.query('api::collection.collection').findOne({
        where: { id: collection.id }
      });
    }

    if (data.item.connect.length) {
      item = data.item.connect[0]
      item = await strapi.db.query('api::item.item').findOne({
        where: { id: item.id }
      });
    }

    if (collection === null || item === null) {
      let { id } = data;
      let existing = await strapi.query('api::collection-item.collection-item').findOne({
        where: { id: id },
        populate: { collection: true, item: true }
      });

      if (collection === null && data.collection.disconnect.length === 0) {
        collection = existing.collection;
      }

      if (item === null && data.item.disconnect.length === 0) {
        item = existing.item;
      }
    }

    const collectionName = collection?.name ?? "missing"
    const itemName = item?.name ?? "missing";

    event.params.data.name = `[${collectionName}] ${itemName}`;
  }
}
