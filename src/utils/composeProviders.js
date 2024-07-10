import React from "react";

const composeProviders =
  (providers) =>
  ({ children }) =>
    providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );

export default composeProviders;
