import React from "react";
import { Text as Rawtext, TextProps } from "react-native";
import { REGULAR } from "../../constants/fontNames";

export const Text = ({
  children,
  style,
  props,
  fontFamily,
}: {
  children: React.ReactNode;
  props?: TextProps;
  style?: any;
  fontFamily?: any;
}) => {
  return (
    <Rawtext
      style={[{ ...style, fontFamily: fontFamily ? fontFamily : REGULAR }]}
      {...props}
    >
      {children}
    </Rawtext>
  );
};
