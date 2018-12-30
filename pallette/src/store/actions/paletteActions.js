import colors from 'nice-color-palettes';

export const addPalette = (palette) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database

            dispatch({ type: 'ADD_PALETTE', palette })
                     
    }
};
