import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, IconButton } from '@mui/material';
import { CloudUpload, Close } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { ADD_EVALUATOR } from '../queries';
import { success, failure } from '../utils/snackbar';
import Papa from 'papaparse';

const CsvUploader = ({ open, onClose, refetch }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [addEvaluator] = useMutation(ADD_EVALUATOR, {
        onError: (error) => failure(error.message)
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/csv') {
            setSelectedFile(file);
        } else {
            failure('Please select a valid CSV file');
        }
    };

    const handleFileDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type === 'text/csv') {
            setSelectedFile(file);
        } else {
            failure('Please select a valid CSV file');
        }
    };

    const handleFileRemove = () => setSelectedFile(null);
    const handleClose = () => {
        setSelectedFile(null);
        onClose();
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            failure("Please select a CSV file");
            return;
        }

        setLoading(true);
        
        Papa.parse(selectedFile, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                try {
                    const evaluators = results.data.map(row => {
                        if (!row.Name || !row.Email || !row.Phone_number) return null;

                        return {
                            name: row.Name.trim(),
                            email: row.Email.trim(),
                            phone_no: row.Phone_number.trim(),
                            password: "rohan",
                            roles: "evaluator",
                            domain: row.Domain ? row.Domain.trim() : "",
                            type: row.Type ? row.Type.trim() : "",
                            metadata: {
                                years_of_exp: parseInt(row["Years of experience"], 10) || 0,
                                current_company: row.Company ? row.Company.trim() : ""
                            }
                        };
                    }).filter(Boolean);

                    await Promise.all(
                        evaluators.map(evaluator => addEvaluator({ variables: evaluator }))
                    );

                    success("All evaluators added successfully");
                    if (typeof refetch === 'function') {
                        refetch();
                    }
                    handleClose();
                } catch (error) {
                    failure("Error processing CSV file");
                    console.error(error);
                }
                setLoading(false);
            }
        });
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Upload CSV File</DialogTitle>
            <DialogContent>
                <Box
                    border={2}
                    borderRadius={1}
                    borderColor="grey.300"
                    p={3}
                    textAlign="center"
                    onDrop={handleFileDrop}
                    onDragOver={(e) => e.preventDefault()}
                    sx={{ cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }}
                >
                    <input
                        type="file"
                        accept=".csv"
                        style={{ display: 'none' }}
                        id="csv-upload"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="csv-upload">
                        <CloudUpload fontSize="large" />
                        <Typography variant="body1">Drag and drop a file here or click to upload</Typography>
                    </label>
                </Box>
                {selectedFile && (
                    <Box display="flex" alignItems="center" mt={2}>
                        <Typography variant="body2">{selectedFile.name}</Typography>
                        <IconButton onClick={handleFileRemove}><Close /></IconButton>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!selectedFile || loading}>
                    {loading ? 'Uploading...' : 'Submit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CsvUploader;
