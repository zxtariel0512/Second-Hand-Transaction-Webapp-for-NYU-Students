import React, { useEffect } from "react";
import emailjs, { init } from "emailjs-com";

/**
 * Send Email Using Email JS
 */
export default function SendEmail(props) {
  const SERVICE_ID = "service_w5od5lt";
  const BUYER_TEMP = "template_yebpnco";
  const SELLER_TEMP = "template_1021nqa";

  const sendEmailToBuyer = () => {
    const params = {
      buyer_email: props.buyerEmail,
      item_name: props.itemName,
      buyer_name: props.buyerName,
      seller_name: props.sellerName,
      item_price: props.price,
      item_purchase_date: new Date().toISOString().slice(0, 10),
      reply_to: "second.hand.nyu@gmail.com",
    };

    emailjs.send(SERVICE_ID, BUYER_TEMP, params).then(
      (result) => {
        console.log("BUYER EMAIL STATUS: " + result.text);
      },
      (error) => {
        console.error(error.text);
      }
    );
  };

  const sendEmailToSeller = () => {
    const params = {
      buyer_email: props.buyerEmail,
      seller_email: props.sellerEmail,
      item_name: props.itemName,
      buyer_name: props.buyerName,
      seller_name: props.sellerName,
      item_price: props.price,
      item_purchase_date: new Date().toISOString().slice(0, 10),
      reply_to: "second.hand.nyu@gmail.com",
    };

    emailjs.send(SERVICE_ID, SELLER_TEMP, params).then(
      (result) => {
        console.log("SELLER EMAIL STATUS: " + result.text);
      },
      (error) => {
        console.error(error.text);
      }
    );
  };

  useEffect(() => {
    init("user_iCPsRnKFbEikmYL4BmI5u");
    sendEmailToBuyer();
    sendEmailToSeller();
  }, []);

  return <></>;
}
