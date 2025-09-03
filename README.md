# 🌤️ Weather-Now

A simple, user-friendly weather web application built as part of a **Take-Home Challenge**.  
This app lets users search for any city and get live weather data with auto-suggestions for locations.

---

## 📝 Challenge Overview

This project was created in response to the following **Take-Home Challenge Instructions**:

> You are provided with a set of user needs representing different small applications.  
> Your task is to choose one of these user needs and develop a web application that addresses it.

The goals were to:

- Understand and interpret user requirements.
- Design a simple, effective solution.
- Implement the solution using the specified technology stack.
- Demonstrate coding practices and problem-solving skills.

---

## 🛠️ Technology Stack

- **Framework:** React.js
- **Styling:** Bootstrap + custom CSS
- **Data Fetching:** Public APIs (no authentication or registration required):
  - [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/) — Location auto-suggestions
  - [Open-Meteo](https://open-meteo.com/) — Live weather data
- **State Management:** React's built-in `useState` and `useEffect`

---

## 🚀 Features

- 🔎 **Auto-suggestions:** Type a city name and get location suggestions in real time.
- 🌡️ **Live weather data:** Fetches temperature, windspeed, and time for the selected location.
- 🖼️ **Dynamic background:** Background image updates based on temperature and day/night.
- ⚡ **No API keys required:** Uses fully public APIs.

---

## 📂 Project Structure
<img width="416" height="416" alt="image" src="https://github.com/user-attachments/assets/4b72a25d-1d07-41d8-87ef-fc4f7ee94423" />

## 🧩 Challenge Requirements & Deliverables

| Level | Requirement                                       | Status |
|-------|---------------------------------------------------|--------|
| 1     | Working with AI: share ChatGPT conversation link  | ✅ Done |  ( Link - https://chatgpt.com/share/68b842a6-d868-8002-9522-9e9400c9e160 )
| 2     | Working application: deploy on free hosting       | ✅ Done |  ( Link - https://weathernowo.netlify.app/ )
| 3     | Code sharing: share code with notes and README    | ✅ Done |  ( Link - https://github.com/prateekSri1110/Weather-Now/ )

---

## 🧠 Development Notes

Auto-suggestions are debounced by 300ms to avoid unnecessary API calls.
* The background image selection is based on:
  -> Temperature ranges (cold, mild, warm, hot, night)
* Day/Night detection via Open-Meteo's is_day field
* All API calls are client-side since no private credentials are used.

## Reference Video & Images of the working application : 

video Link : https://drive.google.com/file/d/1inQXVTkVdCMrMUBnDzLyuGMgDLz7adgu/view?usp=sharing

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/550c8eec-0b05-4adc-8d2f-a364c96bd44c" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d8a60396-bf13-463d-bf88-3a8f942a9a29" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/033288dd-3316-4a53-9b6e-ee6eae976423" />
