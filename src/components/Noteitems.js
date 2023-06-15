import React, {useContext} from 'react'
import noteContext from './context/notes/noteContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaEdit } from 'react-icons/fa';
import {MdDelete} from 'react-icons/md'
 

const Noteitems = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3 h-200">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        {/* <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i> */}
                        <MdDelete className='mx-2 fa-3x ' onClick={()=>{deleteNote(note._id)}} />
                        <FaEdit className='mx-2 fa-3x' onClick={()=>{updateNote(note)}}/>
                        {/* <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i> */}
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitems
