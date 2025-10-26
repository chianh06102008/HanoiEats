export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  // Radius of the Earth in kilometers
  const earthRadius = 6371; // in kilometers

  // Convert latitude and longitude from degrees to radians
  const radiansLat1 = (lat1 * Math.PI) / 180;
  const radiansLon1 = (lon1 * Math.PI) / 180;
  const radiansLat2 = (lat2 * Math.PI) / 180;
  const radiansLon2 = (lon2 * Math.PI) / 180;

  // Differences in latitude and longitude
  const dLat = radiansLat2 - radiansLat1;
  const dLon = radiansLon2 - radiansLon1;

  // Haversine formula
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radiansLat1) * Math.cos(radiansLat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance
  const distance = earthRadius * c;

  return distance;
}

export function formatNumberToCurrency(
  number: number,
  currencySymbol: string
  // decimalSeparator = ".",
  // thousandsSeparator = ","
) {
  if (isNaN(number)) {
    return "Invalid number";
  }

  const options = {
    // minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const formattedNumber = new Intl.NumberFormat(undefined, options).format(
    number
  );

  return `${currencySymbol} ${formattedNumber}`;
}

export const getStatus = (open: string, close: string) => {
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}`;
  if (open < time && time < close) {
    return "Open";
  } else {
    return "Closed";
  }
};

export const getDMY = (timestamp: any) => {
  const date = new Date(timestamp.seconds * 1000);
  const d = date.getDay();
  const m = date.getMonth();
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};
