const API_KEY = 'baedc2f2f31b7b3303e5d42d88d283c3';

async function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    throw error;
  }
}
