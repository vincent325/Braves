# Baseball Statistics Visualization

[Live Demo](https://braves-web.onrender.com)

## Overview
This project is a full-stack web application that visualizes baseball statistics and provides video analysis capabilities. It allows users to explore batted ball data through an interactive baseball field visualization and search for specific player matchup videos.

## Features
- **Interactive Baseball Field Plot**
  - Visual representation of hit outcomes on a baseball field diagram
  - Color-coded hit types (Singles, Doubles, Triples, Home Runs, Outs)
  - Hover tooltips with detailed hit information
  - Distance markers and field dimensions

- **Video Search Interface**
  - Search functionality for batter-pitcher matchups
  - Detailed statistics for each at-bat
  - Direct links to video footage
  - Filterable by pitcher

- **Responsive Design**
  - Bootstrap-based UI components
  - Mobile-friendly layout
  - Tab-based navigation

## Technology Stack
### Frontend
- React.js
- D3.js for data visualization
- Bootstrap for styling
- Axios for API requests

### Backend
- Node.js
- Express.js
- XLSX for Excel file processing
- CORS for cross-origin resource sharing

## Project Structure
```
├── backend/
│   ├── BattedBallData.xlsx
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── BaseballFieldPlot.jsx
    │   │   └── VideoSearch.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Setup and Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Start the backend server:
```bash
cd backend
npm start
```

5. Start the frontend development server:
```bash
cd frontend
npm run dev
```

## Deployment
The application is deployed using Render:
- Backend API: [https://braves.onrender.com](https://braves.onrender.com)
- Frontend: [INSERT_FRONTEND_URL_HERE]

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
- Distance markers at 140ft and 325ft
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

## Future Enhancements
- Advanced filtering options
- Statistical analysis features
- Additional visualization types
- Player comparison tools
- Historical trend analysis

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Baseball data provided by [Your Data Source]
- Inspired by baseball analytics tools and visualization platforms