/* Global Variables */
const baseURL = "OpenWeatherMap.org";
const apiKey = "3b3adb3dcd7d0f29d88caa8c401cbae4&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;

document.getElementById("generate").addEventListener("click", performAction);
function performAction() {
  const zipCode = document.getElementById("zip").value;
  getApiData(baseURL, apiKey, zipCode);
}
const getApiData = async (baseURL, apiKey, zipCode) => {
  const request = await fetch(
    `https://api.${baseURL}/data/2.5/weather?zip=${zipCode},&appid=${apiKey}`
  );
  try {
    const data = await request.json();
    console.log("fetched data", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
