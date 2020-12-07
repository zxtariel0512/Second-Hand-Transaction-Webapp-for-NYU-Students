function clearUploadCache() {
  const cacheKey = [
    "itemTitle",
    "firstCat",
    "secondCat",
    "itemDescription",
    "price",
    "Credit Card",
    "deliveryMethod",
    "savedCoverPhoto",
    "savedSkillPhoto",
  ];
  cacheKey.forEach((e) => window.localStorage.removeItem(e));
}

export default clearUploadCache;
