import React from "react";

export default function Label(props: any) {
  return (
    <label htmlFor="" className={`${props.className}`}>
      {props.name}
    </label>
  );
}
