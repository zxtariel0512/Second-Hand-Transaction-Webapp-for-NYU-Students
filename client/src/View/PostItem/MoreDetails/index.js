import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Container,
} from "@material-ui/core";
import ImgDropAndCrop from "../../../Components/ImgDropAndCrop/";
import { getLocalStorage, setLocalStorage } from "../../../Utils/localstorage";

export default function MoreDetails() {
  const [price, setPrice] = useState();
  const [deliveryMethod, setDeliveryMethod] = useState("shipping");

  useEffect(() => {
    const [savedPrice, savedDeliveryMethod] = [
      getLocalStorage("price"),
      getLocalStorage("deliveryMethod"),
    ];
    if (savedPrice) setPrice(savedPrice);
    if (savedDeliveryMethod) {
      setDeliveryMethod(savedDeliveryMethod);
    } else {
      // Default Value
      setLocalStorage("deliveryMethod", "shipping");
    }
  }, []);

  const onSetPrice = (e) => {
    setPrice(e.target.value);
    setLocalStorage("price", e.target.value);
  };

  const onSetDeliveryMethod = (e) => {
    setDeliveryMethod(e.target.value);
    setLocalStorage("deliveryMethod", e.target.value);
  };

  return (
    <Container>
      <Box name="price" py="20px" display="flex" justifyContent="left">
        <FormControl variant="outlined">
          <InputLabel htmlFor="price-input">Price</InputLabel>
          <OutlinedInput
            style={{ width: "200px" }}
            id="price-input"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
            inputProps={{
              style: {
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#15A08B",
              },
            }}
            value={price}
            onChange={(e) => onSetPrice(e)}
          />
        </FormControl>
      </Box>
      <Box
        py="20px"
        name="delivery-method"
        display="flex"
        justifyContent="left"
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">Delivery Method</FormLabel>
          <RadioGroup
            aria-label="delivery-method"
            name="delivery-method"
            row={true}
            value={deliveryMethod}
            onChange={(e) => onSetDeliveryMethod(e)}
          >
            <FormControlLabel
              value="shipping"
              control={<Radio color="primary" />}
              label="Shipping"
              style={{
                marginRight: "60px",
              }}
            />
            <FormControlLabel
              value="in-person"
              control={<Radio color="primary" />}
              label="In-person Delivery"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box name="imgUpload" py="20px" width="100%">
        <ImgDropAndCrop
          type="cover"
          label="Drop & Add Your Cover Here. Maximum 1 Allowed."
          maxNum={1}
        />
      </Box>
      <Box name="coverImgUpload" py="20px" width="100%">
        <ImgDropAndCrop
          type="skill"
          label="Drop & Add Your Photos Here. Maximum 5 Allowed."
          maxNum={5}
        />
      </Box>
    </Container>
  );
}
