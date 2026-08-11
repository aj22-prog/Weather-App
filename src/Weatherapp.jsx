import SearchBox from './searchbox'
import Box from '@mui/material/Box';


export default function InfoBox({ WeatherInfo }) {
     
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Weather App </h2>

            <SearchBox />


          
        </div>
    )
    
}