import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function ZipCode({zipCode, setZipCode, findZip, location, locationLoading}) {
    return (
        <>
            <div>please input the zip code of your primary residence:</div>
            <Paper
                component="form"
                style={{ padding: '4px', display: 'flex', alignItems: 'center', width: '30%' }}
            >
                <InputBase
                    value={zipCode} 
                    onChange={e => setZipCode(e.target.value)}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Zip Code"
                />
                <IconButton 
                    onClick={findZip}
                    type="button" 
                    style={{ padding: '10px' }} 
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
            <div className='searching' style={{opacity: locationLoading}}>
                {!location && <span>searching...</span>}
                {location && <span>{location}</span> }
            </div>
        </>
    )
}