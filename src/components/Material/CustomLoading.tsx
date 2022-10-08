import { useSelector } from 'react-redux';
import { StoreStateType } from '../../types/store';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Loading() {
    let { showLoadingType, showLoadingOptions } = useSelector((state: StoreStateType) => {
        return {
            showLoadingType: state.view.showLoadingType,
            showLoadingOptions: state.view.showLoadingOptions
        }
    })

    const style = {
        position: 'absolute',
        top: '60%',
        left: '45%',
    };

    return (
        <>
            {
                (['', 'hide'].includes(showLoadingType)) ? 
                '' : 
                <Box sx={style}>
                    <CircularProgress
                        color={showLoadingOptions.color}
                        disableShrink={showLoadingOptions.disableShrink}
                        size={showLoadingOptions.size}
                        thickness={showLoadingOptions.thickness}
                    />
                </Box>
            }
        </>
    )
}

export default Loading;
