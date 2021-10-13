import React, { Component } from 'react'
import QrScan from 'react-qr-reader'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

class Scanner extends Component {

    state = {
        qrscan: '',
        today: '',
        open: false,
        error: false,
        count: 0
    }

    componentDidMount = async () => {
        const date = new Date();
        const today = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        await this.setState({ today: today })
    }

    handleScan = async data => {
        if (data) {
            await this.setState({ count: this.state.count + 1 })
            await this.setState({ qrscan: data })
            if (this.state.count === 1) {
                await this.handleAxios()
            }
        }
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleCloseError = () => {
        this.setState({ error: false })
    }

    handleAxios = async () => {

        const data = {
            token: this.state.qrscan,
            today: this.state.today
        }

        axios.post('https://backendtransportsystem.herokuapp.com/inspector/scanQrCode', data).then(res => {
            if (res.data.success) {
                this.setState({ open: true })
                window.location = '/'
            } else {
                this.setState({ error: true })
            }
        })
    }

    handleError = err => {
        console.error(err)
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <h2 style={{ textAlign: 'center', marginTop: '10px' }}>QR Scanner</h2>
                <center>
                    <div style={{ marginTop: 30 }}>
                        <QrScan
                            delay={300}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            style={{ height: 240, width: 320 }}
                        />
                    </div>
                </center>
                <div >
                    <Snackbar style={{ width: '100%' }} open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                        <Alert style={{ width: '50%', margin: 'auto' }} onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
                            scanned Successfully
                        </Alert>
                    </Snackbar>
                    <Snackbar style={{ width: '100%' }} open={this.state.error} autoHideDuration={3000} onClose={this.handleCloseError}>
                        <Alert style={{ width: '50%', margin: 'auto' }} onClose={this.handleCloseError} severity="error" sx={{ width: '100%' }}>
                            Invalid Ticket !
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        );
    }
}

export default Scanner;
