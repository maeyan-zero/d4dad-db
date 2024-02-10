export default {
  async beforeCreate(event) {
    const { data } = event.params;
    let collection = null;
    let item = null;

    console.log("Collection...", data.collection);

    if (data.collection.connect.length) {
      collection = data.collection.connect[0]

      console.log("Connect Collection...", collection);

      collection = await strapi.db.query('api::collection.collection').findOne({
        where: { id: collection.id }
      });

      console.log("Found Collection...", collection);
    }

    if (data.item.connect.length) {
      item = data.item.connect[0]

      console.log("Connect Item...", item);

      item = await strapi.db.query('api::item.item').findOne({
        where: { id: item.id }
      });

      console.log("Found Item...", item);
    }

    const collectionName = collection?.name ?? "missing"
    const itemName = item?.name ?? "missing";

    event.params.data.name = `[${collectionName}] ${itemName}`;
  },
  async beforeUpdate(event) {
    const { data } = event.params;
    let collection = null;
    let item = null;

    console.log("Collection...", data.collection);

    if (data.collection.connect.length) {
      collection = data.collection.connect[0]

      console.log("Connect Collection...", collection);

      collection = await strapi.db.query('api::collection.collection').findOne({
        where: { id: collection.id }
      });

      console.log("Found Collection...", collection);
    }

    if (data.item.connect.length) {
      item = data.item.connect[0]

      console.log("Connect Item...", item);

      item = await strapi.db.query('api::item.item').findOne({
        where: { id: item.id }
      });

      console.log("Found Item...", item);
    }

    if (collection === null || item === null) {
      let { id } = data;
      let existing = await strapi.query('api::collection-item.collection-item').findOne({
        where: { id: id },
        populate: { collection: true, item: true }
      });

      console.log("Found Existing...", existing);

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
