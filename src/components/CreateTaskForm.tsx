
import React, {useEffect, useState} from 'react';
import './CreateTaskForm.css';
import APIManager from "../apimanager/APIManager";
import DOMPurify from 'dompurify';

const CreateTaskDialog: React.FC = () => {
    const [data,setData] = useState('');
    const [error,setError] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const titleSanitized = DOMPurify.sanitize(title.trim());
        const descriptionSanitized = DOMPurify.sanitize(description.trim());
        if(submitted) {
            const params = { "title" : titleSanitized,
                "Description" : descriptionSanitized
            }
            APIManager.createTask(params)
                .then((json) => setData(json))
                .catch((err) => setError(err.message));
        }
    }, [submitted]);

    const handleSubmit = (e: React.FormEvent) => {

        setSubmitted(true);
        e.preventDefault();
        // handle form submission
        alert('Form submitted');
        setShowDialog(false);
    };

    return (
        <div>
            <button onClick={() => setShowDialog(true)}>Create Task</button>

            {showDialog && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Enter Details</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required  />
                            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}required />
                            <input type="text" placeholder="Status" required />
                            <input type="date" placeholder="StartDate" required />
                            <input type="date" placeholder="EndDate" required />
                            <div>
                                <button type="submit">Submit</button>
                                <button type="button" onClick={() => setShowDialog(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTaskDialog;