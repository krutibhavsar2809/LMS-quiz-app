import React from 'react';
import { InputLabel, Select, MenuItem, TextField, Button, Grid } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


const Question = ({ questionsData, handleQuestionsData, handleAddOptions, removeOptions }) => (
    <>
        <InputLabel id="select-question-type">Question Type</InputLabel>
        <Select
            labelId="select-question-type"
            id="question-type"
            value={questionsData.questionType}
            label="Question type"
            onChange={(e) => handleQuestionsData(e,'questionType')}
        >
            <MenuItem value='boolean'>Boolean</MenuItem>
            <MenuItem value='multichoice'>Multichoice</MenuItem>
            <MenuItem value='radio'>Radio</MenuItem>
        </Select>
        <TextField variant='outlined' label='Question' style={{ marginTop: '10px' }} value={questionsData.question} onChange={(e) => handleQuestionsData(e, 'question')} />
        <TextField variant='outlined' label='Answer' style={{ marginTop: '10px' }} value={questionsData.answer} onChange={(e) => handleQuestionsData(e, 'answer')} />
        {questionsData.options.map((singleOption, index) => (
            <Grid container spacing={2} key={index}>
                <Grid item xs>
                    <TextField variant='outlined' label={`Option ${index + 1}`} style={{ marginTop: '10px', width: '100%' }} value={singleOption.option} name="option" onChange={(e) => handleQuestionsData(e, 'options', index)} />
                </Grid>
                <Grid item xs={2}>
                    {questionsData.options.length !== 1 && index !== questionsData.options.length - 1 &&
                        <Button onClick={() => removeOptions(index)} style={{ marginTop: '12px' }}>
                            <HighlightOffIcon style={{ fontSize: '40px' }} />
                        </Button>
                    }
                    {index === questionsData.options.length - 1 &&
                        <Button onClick={handleAddOptions} style={{ marginTop: '12px' }}>
                            <ControlPointIcon style={{ fontSize: '40px' }} />
                        </Button>
                    }
                </Grid>
            </Grid>
        ))}
    </>
)

export default Question;