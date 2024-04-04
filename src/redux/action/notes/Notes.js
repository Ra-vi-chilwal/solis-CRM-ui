import axios from "axios";
import {
    NOTES_REQUEST,
    NOTES_FAIL,
    NOTES_SUCCESS,
    CREATE_NOTE_REQUEST,
    CREATE_NOTE_FAIL,
    CREATE_NOTE_SUCCESS,
    DELETE_FAIL,
    DELETE_SUCCESS,
    DELETE_REQUEST
} from "../../constant/Notes/Notes";
import config from '../../../config'

const fetchNotes = (token) => {
    return async (dispatch) => {
        try {
            dispatch({ type: NOTES_REQUEST });
            const data = await axios.get(`${config.API_URL}/notes/fetch`, { headers: { Authorization: `Bearer ${token}` } });
            const NotesData = data.data;
            dispatch({ type: NOTES_SUCCESS, payload: NotesData });
        } catch (err) {
            dispatch({ type: NOTES_FAIL, payload: err });

        }
    }
};


const createNote = (token, noteData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CREATE_NOTE_REQUEST });

            // Make a POST request to send the note data to your server
            const response = await axios.post(`${config.API_URL}/notes/create`, { notes: noteData }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Assuming your server returns the newly posted note data
            const postedNote = { notes: response.data };
            dispatch({ type: CREATE_NOTE_SUCCESS, payload: postedNote });
        } catch (err) {
            dispatch({ type: CREATE_NOTE_FAIL, payload: err });
        }
    };
};


const deleteNote= (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: DELETE_REQUEST });
            await axios.delete(`${config.API_URL}/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            const NotesData = data.data;
            dispatch({ type: DELETE_SUCCESS, payload: NotesData });
        } catch (err) {
            dispatch({ type: DELETE_FAIL, payload: err });

        }
    }
};

const deleteNotes = (id,token) => {
    return async (dispatch) => {
        try {
            dispatch({ type: DELETE_REQUEST });

            await axios.delete(`${config.API_URL}/notes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },

            });

            dispatch({ type: DELETE_SUCCESS });

        } catch (err) {
            dispatch({ type: DELETE_FAIL, payload: err });
        }
    };
};
export { fetchNotes, createNote, deleteNotes }