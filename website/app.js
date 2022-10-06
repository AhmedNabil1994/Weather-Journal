/* Global Variables */
const baseURL = "OpenWeatherMap.org";
const apiKey = "3b3adb3dcd7d0f29d88caa8c401cbae4&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

document.getElementById("generate").addEventListener("click", performAction);
function performAction() {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getApiData(baseURL, apiKey, zipCode).then((apiData) => {
    postData("/projectData", {
      apiData:apiData,
      content: feelings,
      date: newDate,
      temperature: apiData.main.temp,
      zipCode: zipCode,
    });
  });
}

const getApiData = async (baseURL, apiKey, zipCode) => {
  const request = await fetch(
    `https://api.${baseURL}/data/2.5/weather?zip=${zipCode},&appid=${apiKey}`
  );
  try {
    const data = await request.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const postData = async (url, data = {}) => {
  const res = await fetch(url, {
    method: "post",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const sentData = await res.json();
    console.log("Data sent to the server:",sentData);
    return sentData;
  } catch (error) {
    console.log("error", error);
  }
};
