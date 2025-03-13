export const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    default:
      return currency;
  }
};

export const getShippingCostDetails = (id) => {
  switch (id) {
    case "USD":
      return "UK delivery (Royal Mail) | 1 - 2 business days | £3.25";
    case "shr_1Qvm2JLUXmDaRfFYkVMN5yOr":
      return "Europe delivery (Royal Mail) | 2 - 4 business days | £5.00";
    default:
      return "TBD";
  }
};

export const extractIdFromRequest = (authHeader: string) => {
  try {
    const token = authHeader.split(" ")[1];
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Session expired");
    }

    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));

    return payload["sub"];
  } catch (error) {
    return null;
  }
};
