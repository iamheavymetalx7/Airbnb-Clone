import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function ImageInput() {
  const name = "image";
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="mb-2 capitalize">
        Image
      </Label>
      <Input
        id={name}
        name={name}
        type="file"
        required
        accept="image/*"
        className="max-w-xs"
      ></Input>
    </div>
  );
}

export default ImageInput;
