import React, { useEffect } from "react";
import emailjs, { init } from "emailjs-com";

/**
 * Send Email Using Email JS
 */
export default function SendEmail(props) {
  const params = {
    buyer_email: props.buyerEmail,
    item_name: props.itemName,
    buyer_name: props.buyerName,
    seller_name: props.sellerName,
    item_price: props.price,
    item_purchase_date: new Date().toISOString().slice(0, 10),
    reply_to: "second.hand.nyu@gmail.com",
  };

  const sendEmail = () => {
    emailjs.send("service_w5od5lt", "template_yebpnco", params).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.error(error.text);
      }
    );
  };

  useEffect(() => {
    init("user_iCPsRnKFbEikmYL4BmI5u");
    sendEmail();
  }, []);

  return <></>;
}
