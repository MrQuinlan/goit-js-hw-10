export default function renderCard({ data, list, properties, listMarkup, propertiesMarkup }) {
  list.insertAdjacentHTML('beforeend', listMarkup(data));

  if (data.length === 1) {
    properties.insertAdjacentHTML('beforeend', propertiesMarkup(data));
  }
}
