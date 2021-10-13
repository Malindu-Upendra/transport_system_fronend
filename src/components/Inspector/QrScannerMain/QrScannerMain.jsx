import { Component } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link } from "react-router-dom";
import { mdiQrcodeScan } from '@mdi/js';
import Icon from '@mdi/react'
import Typography from '@mui/material/Typography';
import ScannedPassengers from "../scannedPassengers/scannedPassengers";

class QrScannerMain extends Component {

    render() {
        return (
            <div>
                <Typography style={{ margin: 30, textAlign: 'center' }} variant="h2">
                    Scan QR Code
                </Typography>
                <Box style={{ width: '100%', marginTop: '20px' }}>
                    <Grid style={{ margin: 'auto', width: 230 }}>
                        <Link to="/qr_scanner">
                            <Button variant="contained" size="large" color="primary" >
                                <Icon
                                    style={{ height: 240, width: 200 }}
                                    path={mdiQrcodeScan}
                                    title="QR Scanner"
                                    color="white"
                                />
                            </Button>
                        </Link>
                    </Grid>
                </Box>
                <div style={{marginTop:'40px'}}>
                <div style={{width:'80%',margin:'auto'}}>
                    <ScannedPassengers />
                </div>
                </div>
            </div>
        )
    }

}

export default QrScannerMain