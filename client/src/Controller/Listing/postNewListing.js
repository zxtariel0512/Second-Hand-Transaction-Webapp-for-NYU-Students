import { postNewListingModel } from "../../Model/Listing/listingModel";

async function postNewListing(coverPhoto, itemPhotos) {
  try {
    const res = await postNewListingModel({
      user_id: window.localStorage.getItem("netid"),
      status: "available",
      title: window.localStorage.getItem("itemTitle"),
      category: window.localStorage.getItem("itemCategory"),
      description: window.localStorage.getItem("itemDescription"),
      cover_image_url: coverPhoto,
      detail_image_urls: JSON.stringify(itemPhotos),
      original_price: window.localStorage.getItem("price"),
      created_date: Date.now(),
      expire_date: Date.now() + 86400000 * 60, // Expire in 60 days
      payment: "Credit Card",
      // TODO: add a field in the form to let user choose whether it's a request or listing
      listingtype: "sell",
      shipment: window.localStorage.getItem("deliveryMethod"),
    });
    return { success: true, data: res.data };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

export default postNewListing;
