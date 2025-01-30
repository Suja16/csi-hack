import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, IconButton, List, ListItem, ListItemText, ListItemIcon, Tooltip } from '@mui/material';
import { CloudUpload, Close, CheckCircle, Error } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { ADD_EVALUATOR } from '../queries';
import Papa from 'papaparse';

const CsvUploader = ({ open, onClose, refetch }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    const [addEvaluator] = useMutation(ADD_EVALUATOR);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/csv') {
            setSelectedFile(file);
        } else {
            alert('Please select a valid CSV file');
        }
    };

    const handleFileDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type === 'text/csv') {
            setSelectedFile(file);
        } else {
            alert('Please select a valid CSV file');
        }
    };

    const handleFileRemove = () => setSelectedFile(null);
    const handleClose = () => {
        setSelectedFile(null);
        setResults([]);
        onClose();
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            alert("Please select a CSV file");
            return;
        }

        setLoading(true);
        
        Papa.parse(selectedFile, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                const evaluators = results.data.map(row => {
                    if (!row.Name || !row.Email || !row.Phone_number) return null;

                    const emailPrefix = row.Email.split('@')[0];
                    const phoneDigit = row.Phone_number.trim().slice(-1);
                    const generatedPassword = emailPrefix + phoneDigit;

                    return {
                        name: row.Name.trim(),
                        email: row.Email.trim(),
                        phone_no: row.Phone_number.trim(),
                        password: generatedPassword,
                        roles: "evaluator",
                        domain: row.Domain ? row.Domain.trim() : "",
                        type: row.Type ? row.Type.trim() : "",
                        metadata: {
                            years_of_exp: parseInt(row["Years of experience"], 10) || 0,
                            current_company: row.Company ? row.Company.trim() : ""
                        }
                    };
                }).filter(Boolean);

                const uploadResults = await Promise.all(
                    evaluators.map(async evaluator => {
                        try {
                            await addEvaluator({ variables: evaluator });
                            return { name: evaluator.name, success: true };
                        } catch (error) {
                            return { name: evaluator.name, success: false, error: error.message };
                        }
                    })
                );

                setResults(uploadResults);
                setLoading(false);
                if (typeof refetch === 'function') {
                    refetch();
                }
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
                {results.length > 0 && (
                    <List>
                        {results.map((result, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={result.name} />
                                <ListItemIcon>
                                    {result.success ? (
                                        <CheckCircle color="success" />
                                    ) : (
                                        <Tooltip title={result.error || "Error"}>
                                            <Error color="error" />
                                        </Tooltip>
                                    )}
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                )}
            </DialogContent>
            <DialogActions>
                {results.length > 0 && results.every(result => result.success || result.error) ? (
                    <Button onClick={handleClose} variant="contained" color="primary">Close</Button>
                ) : (
                    <>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!selectedFile || loading}>
                            {loading ? 'Uploading...' : 'Submit'}
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default CsvUploader;
