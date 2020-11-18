import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import getOneListing from "../../Controller/Listing/getOneListing";
import MessageContext from "../../Context/MessageContext";

export default function Index(props) {
  const { setError } = useContext(MessageContext);
  const listingId = props.location.pathname.split("/")[2];
  const [listing, setListing] = useState("");

  useEffect(async () => {
    // let foundListing = await axios
    //   .get("http://localhost:4000/listings/" + listingId)
    //   .then((res) => res.data);

    // setListing(foundListing);

    const getListing = async () => {
      const res = await getOneListing(listingId);
      // show error if request is failed
      res.success ? setListing(res.data) : setError(res.message);
      console.log(res);
    };
    getListing();
  }, []);

  return (
    <div>
      <div>hello</div>
      <Link
        to={{
          pathname: "/chat/new",
          listingInfo: listing,
        }}
      >
        start chat
      </Link>
    </div>
  );
}
