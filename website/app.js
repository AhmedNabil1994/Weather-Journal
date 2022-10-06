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
  getApiData(baseURL, apiKey, zipCode)
    .then((apiData) => {
      postData("/projectData", {
        apiData: apiData,
        content: feelings,
        date: newDate,
        temperature: apiData.main.temp,
        zipCode: zipCode,
      });
    })
    .then(() => {
      updateUI();
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
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async () => {
  const req = await fetch("/all");
  try {
    const allData = await req.json();
    console.log("Data retreived from the server:", allData);
    document.getElementById("date").innerHTML = `Date is ${allData.date}.`;
    document.getElementById("temp").innerHTML = `Temperature is ${Math.round(allData.temperature)} degrees.`;
    document.getElementById("content").innerHTML = `It is ${allData.content}.`;
    document.getElementById("weather").innerHTML = `Weather description is ${allData.apiData.weather[0].description}.`;
  } catch (error) {
    console.log("error", error);
  }
};
