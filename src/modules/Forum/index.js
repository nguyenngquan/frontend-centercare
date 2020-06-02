import React, { Component, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Forum() {
  const styles = {
    width: 300,
    marginBottom: 10,
    marginLeft: 500,
  };
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
  });
  const { register, watch, setValue } = methods;
  // const [hocViens, setHocViens] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:3300/api/hocviens/")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setValue("taikhoanHV", data?.data[0]?.taikhoanHV);
  //       setValue("ten", data?.data[0]?.ten);
  //       // setHocViens(data?.data);
  //     });
  // }, []);
  console.log(watch());
  return <div></div>;
}
export default Forum;
