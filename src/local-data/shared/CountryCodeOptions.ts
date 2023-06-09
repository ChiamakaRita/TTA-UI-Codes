import _ from "lodash";

export const countryCodeOptions = _.sortBy(
  [
    { text: "+234", value: "234" },
    { text: "+44", value: "44" },
  ],
  (c) => c.text
);
