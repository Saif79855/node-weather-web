const geoCode = async (city, callback) => {
  const geoCodeURL = `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${encodeURIComponent(city)}&format=jsonv2&limit=1&countrycodes=in`;

  try {
    const response = await fetch(geoCodeURL, {
      headers: {
        "User-Agent": "NodeLearningApp/1.0 (your-email@gmail.com)",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      throw new Error(" Unable to find location");
    }

    const result = data[0];

    const location = {
      city: city,
      latitude: result.lat,
      longitude: result.lon,
      location: result.display_name,
    };

    callback(location, undefined);
  } catch (error) {
    callback(undefined, error);
  }
};

export default geoCode;
