import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ons from '../../core/Ons';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { StoreStateType } from '../../types/store';

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    height: 200,
    bgcolor: 'background.paper',
    border: '2px solid #66bb6a',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const btnStyle = {
    position: 'absolute',
    left: '60%',
}

function CustomAlert() {
    const refBtn = useRef<HTMLButtonElement>(null);
    let { showAlertMessage, showAlertOptions } = useSelector((state: StoreStateType) => {
        return {
            showAlertMessage: state.view.showAlertMessage,
            showAlertOptions: state.view.showAlertOptions
        }
    })

    useEffect(() => {
        setTimeout(() => {
            refBtn.current?.focus();
        }, 100);
    }, [showAlertMessage]);

    return (
        <div>
            <Modal
                open={(showAlertMessage === '') ? false : true}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                color={(showAlertOptions.color)}>
                    
                <Box sx={{ ...boxStyle, width: 300 }}>
                    <h2 id="parent-modal-title">{(showAlertOptions?.title) ? showAlertOptions.title : ''}</h2>
                    <p id="parent-modal-description">
                        {showAlertMessage}
                    </p>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <Button sx={btnStyle} ref={refBtn} onClick={() => {
                        ons.alert('hide');
                        if (showAlertOptions?.callbackFunc) showAlertOptions.callbackFunc();
                    }}>{showAlertOptions.confirm}</Button>
                </Box>
            </Modal>
            
        </div>
    );
}

export default CustomAlert;