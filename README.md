# Baseball Statistics Visualization

## Fully deployed backend and frontend. Click here: [braves-web.onrender.com](https://braves-web.onrender.com)

## Overview
This project is a full-stack web application that visualizes baseball statistics of different batters. 
1) It allows users to explore batted ball data through an interactive baseball field visualization 
2) It allows users to filter down to a specific video given batter and pitcher name

## Features
- **Interactive Baseball Field Plot**
  - Visual representation of hit outcomes on a baseball field diagram
  - Color-coded hit types (Singles, Doubles, Triples, Home Runs, Outs)
  - Hover tooltips with detailed hit information
  - Distance markers and field dimensions

- **Video Search Interface**
  - Dropdown functionality for batter-pitcher matchups
  - Detailed statistics for each at-bat
  - Direct links to video footage
  - The only pitchers shown are those that have played against selected batters

- **Responsive Design**
  - Bootstrap-based UI components
  - Tab-based navigation

- **Cloud Deployment**
  - Backend deployed as web service on Render
  - Frontend deployed as static site on Render

## Technology Stack
### Frontend
- React.js
- D3.js and SVG for data visualization
- Bootstrap for styling
- Axios for API requests

### Backend
- Express.js
- XLSX for Excel file processing
- CORS for cross-origin resource sharing

## API Endpoints
- `GET /api/batters`: Returns a list of all batters
- `GET /api/search?batter=[name]`: Returns all batting data for specified batter

## Data Structure
The application uses batted ball data with the following key metrics:
- Exit Speed (mph)
- Launch Angle (degrees)
- Hit Distance (feet)
- Exit Direction
- Play Outcome
- Game Date
- Batter/Pitcher information
- Video Links (when available)

## Features in Detail

### Baseball Field Plot
- SVG-based baseball field diagram
- Interactive data points showing hit locations
- Distance markers at 215ft and 400ft
- Detailed tooltips showing hit information
- Color-coded legend for hit outcomes

### Video Search
- Dropdown selection for batters
- Dynamic pitcher filtering based on selected batter
- Detailed at-bat information including:
  - Exit velocity
  - Launch angle
  - Hit distance
  - Play outcome
  - Game date
  - Video link

