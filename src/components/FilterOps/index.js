const filterOps = (productsList, selectedSubFilter, selectedMainFilters) => {
  let subFilteredlist;

  switch (selectedSubFilter) {
    case 'RECOMMENDED':
      subFilteredlist = [...productsList].sort((a, b) => a.id - b.id);
      break;
    case 'NEWEST FIRST':
      subFilteredlist = [...productsList].sort(
        (a, b) => a.rating.count - b.rating.count
      );
      break;
    case 'POPULAR':
      subFilteredlist = [...productsList].sort(
        (a, b) => b.rating.count - a.rating.count
      );
      break;
    case 'PRICE: HIGH TO LOW':
      subFilteredlist = [...productsList].sort((a, b) => b.price - a.price);
      break;
    case 'PRICE: LOW TO HIGH':
      subFilteredlist = [...productsList].sort((a, b) => a.price - b.price);
      break;
    default:
      subFilteredlist = [...productsList];
  }

  let selectedMainFiltersList = Object.values(selectedMainFilters).flat();

  if (selectedMainFiltersList.length === 0) {
    return subFilteredlist;
  }

  // ✅ AND condition: product must match ALL selected filters
  let finalFilteredPoductslist = subFilteredlist.filter((product) =>
    selectedMainFiltersList.every(
      (filter) =>
        product.category.toLowerCase().includes(filter.toLowerCase()) ||
        product.title.toLowerCase().includes(filter.toLowerCase()) ||
        product.description.toLowerCase().includes(filter.toLowerCase())
    )
  );

  return finalFilteredPoductslist;
};

export default filterOps;
