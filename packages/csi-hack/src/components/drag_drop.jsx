import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { Box, Typography } from '@mui/material';

const DragDrop = ({setValue}) => {
    const [fileDisplayed, setFileDisplayed] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        if (!fileDisplayed) {
            const file = e.dataTransfer.files[0];
            handleFile(file);
        } else {
            console.log("Only one file can be dropped.");
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFile = (file) => {
        if (file && file.type === "application/pdf") {
            const reader = new FileReader();
            reader.onload = () => {
                const pdfElement = document.createElement("div");
                pdfElement.className = "flex justify-between items-center";
                pdfElement.innerHTML = `<span>📄 ${file.name}</span>`;
                const deleteButton = document.createElement("button");
                deleteButton.className = "ml-2 text-red-500";
                deleteButton.innerHTML = "✖";
                deleteButton.addEventListener("click", () => {
                    pdfElement.remove();
                    setFileDisplayed(false);
                });
                pdfElement.appendChild(deleteButton);
                const dropArea = document.getElementById("drop-area");
                dropArea.appendChild(pdfElement);
                setFileDisplayed(true);
                uploadFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBrowse = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const uploadFile = (file) => {
        console.log("Uploading file:", file.name);
        const fileRef = ref(storage, `files/${file.name + v4()}`);
        uploadBytes(fileRef, file).then(() => {
            getDownloadURL(fileRef).then((url) => {
                console.log("File uploaded successfully. URL:", url);
                setValue("resume", url);
            });
        });
    };

    return (
        <Box>
            <Box
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => !fileDisplayed && document.getElementById('file-input').click()}
                id="drop-area"
                sx={{
                    mt: 4,
                    p: 4,
                    border: '2px dashed gray',
                    borderRadius: '4px',
                    cursor: fileDisplayed ? 'not-allowed' : 'pointer',
                    textAlign: 'center'
                }}
            >
                <Typography>Drop your resume here or click to browse.</Typography>
            </Box>
            <input
                type="file"
                id="file-input"
                accept="application/pdf"
                onChange={handleBrowse}
                style={{ display: 'none' }}
            />
        </Box>
    );
};

export default DragDrop;
