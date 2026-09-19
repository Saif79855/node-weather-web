const forecast = async (latitude, longitude, callback) => {
  const url = `https://api.weatherstack.com/current?access_key=7de6328fa3e6192f16fd7b27cf02084b&query=${latitude},${longitude}&units=f`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`Unable to find Location`);
    }

    const temp = data.current.temperature;
    const feelsLike = data.current.feelslike;

    callback(
      {
        temperature: temp,
        feelsLike: feelsLike,
      },
      undefined,
    );
  } catch (error) {
    callback(undefined, error);
  }
};

export default forecast;
