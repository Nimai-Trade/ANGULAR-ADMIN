export const validation = Object();

validation.pincodeRegex = /^\d{6}$/;
validation.entity = /^[a-zA-Z,]+(\s{0,1}[a-zA-Z, ])*$/;
validation.known = "^([a-zA-Z'-.]+(?:\ [a-zA-Z'-.]+)?)$";
validation.address = /^[a-zA-Z0-9\s,'-]*$/;
validation.singleKnown = /^[a-zA-Z]*$/;
validation.mobile = /^(\+91|\+91\-|0)?[789]\d{9}$/;
validation.email = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
validation.phone = /(^(1?)(\s?)([\s]?)((\(\d{3}\))|(\d{3}))([\s]?)([\s-]?)(\d{3})([\s-]?)(\d{4})+$)/;
validation.letterNumber = /^[0-9a-zA-Z]+$/;
validation.binNumber = /^\d{6}$/;
validation.binDescription = "/^[a-zA-Z0-9\s,'-]*$/";
validation.alphaNumAt = /^[a-zA-Z0-9@]*$/;
validation.alphanumericvalid6 = /^.*(?=.{6,})[a-zA-Z0-9]+$/;
validation.threeNumber = /^\d{3}$/;
validation.onlyNumber = /^[0-9]*$/;
validation.onlyPercentage = /^[1-9]?[0-9]{1}$|^100$/;