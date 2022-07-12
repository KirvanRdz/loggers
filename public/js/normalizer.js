const {schema, denormalize} = normalizr;
const author = new schema.Entity('author', {}, { idAttribute: 'id' });

const msge = new schema.Entity(
  'mensajes',
  {
    author: author,
  },
  { idAttribute: '_id' }
);

export const finalSchema = new schema.Array(msge);


export function denormalizeData (data) {
  
	const denormalizedData = denormalize(data.result, finalSchema, data.entities);

	return denormalizedData;
}
