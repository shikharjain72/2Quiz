import React,{useReducer} from "react";
import { Box, Stack, Typography,Button,TextField,Card, CardContent} from "@mui/material";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
export default function Quiz2(){

    const operatorArray=["+","-","*","/"];
    let val1=Math.floor(Math.random()*11);
    let val2=Math.floor(Math.random()*11);
    let c=Math.floor(Math.random()*4);;
    let operator=operatorArray[c];
    let currentAnswerByUser='';


    const initialState={
        quesIndex:-1,
        correctAnswers:new Map(),
        ScoreCard:0,
        questions:new Map(),
        correctMap:new Map()
    }

    const reduce =(currentState,action)=>{
        switch(action.type){
            case 'Start-Quiz':
                return {...currentState,quesIndex:currentState.quesIndex+1}
            case 'Add-User':
                return {...currentState,
                    correctAnswers:currentState.correctAnswers.set(`Q${currentState.quesIndex+1}`,action.answer),
                    quesIndex:currentState.quesIndex+1,
                    questions:currentState.questions.set(`Q${currentState.quesIndex+1}`,action.currentQuestion),
                    ScoreCard:action.newScoreCard,
                }
            case 'wrongAnswer':
                return {...currentState,correctMap:currentState.correctMap.set(`Q${currentState.quesIndex+1}`,false)}
            case 'rightAnswer':
                return {...currentState,correctMap:currentState.correctMap.set(`Q${currentState.quesIndex+1}`,true)}
            case 'retake':
                return {...initialState}
            default:
                return {...currentState}

        }
    }
    const[newState,dispatch]= useReducer(reduce,initialState)
    
    const calculateCorrectAnswer=(val1,val2,operator)=>{
        switch(operator){
            case "+":
                return val1+val2;
            case "-":
                return val1-val2;
            case "*":
                return val1*val2;
            case "/":
                return val1/val2;
            default:
                return '';
        }
    }

    const addUserAnswer=(e)=>{
        e.preventDefault();
        let answer=Math.floor(calculateCorrectAnswer(val1,val2,operator));
        let answerByUser=parseInt(currentAnswerByUser);
        let currentQuestion=`Q${newState.quesIndex+1}. What is the value of ${val1}${operator}${val2}?`;

        let newScoreCard=newState.ScoreCard;
        if(answer === answerByUser){
            newScoreCard=newScoreCard+1;
            dispatch({type:'rightAnswer'});
        }else{
            dispatch({type:'wrongAnswer'});
        }
        document.getElementById('inputOnChange').value='';
        dispatch({type:'Add-User',answer:answer,
        currentQuestion:currentQuestion,
        newScoreCard:newScoreCard
    })
    }

    const startQuiz=()=>{        
        dispatch({type:'Start-Quiz'});
    }
    return <Box sx={{height:'816px',
    width:'48%',
    border:'2px solid black',
    '&:hover':{
    backgroundColor:'light' }
    }}
    display='flex'
    justifyContent={'center'}  
    alignItems={'center'} 
    p={2}>
        {newState.quesIndex=== -1 ?
            <Stack spacing={2}>
             <Typography variant="h1" color={'green'}>Arithmetic Quiz</Typography>
             <Button variant="contained" color="success" size="large" endIcon={<ArrowForwardOutlinedIcon/>} onClick={()=>{startQuiz()}} disableFocusRipple >Start Quiz</Button> 
            </Stack>
            :
        newState.quesIndex <20?
        <div>
            <Typography variant="h3" color={'primary'}>Q{newState.quesIndex+1}. What is the value of {val1}{operator}{val2}?</Typography> 
            <form onSubmit={(e)=>{addUserAnswer(e)}}>
                <Stack spacing={6} direction="row" justifyContent={'space-between'}>
                    <TextField label="Only type Unit Values" helperText="0/0 is NaN.{AnyValue}/0 is Infinity" variant="filled" id='inputOnChange' onChange={(e)=>{currentAnswerByUser=e.target.value}}/>
                    <Button varirant="outlined" color="primary" type="submit">NextQuestion</Button>
                </Stack>
            </form>
            <Typography variant="h5" color={'primary'} >
                Score:{newState.ScoreCard}
            </Typography>
        </div>
        :
        <Stack direction={'column'}>
        <div style={{justifyContent:'space-between'}} >
            <div>
            <Button onClick={()=>{
                dispatch({type:'retake'})}} variant="outlined">Retake</Button>
            </div>
        </div>

        <Card>
            <CardContent >
                <Typography align="center" variant="h6">Total Score:{newState.ScoreCard}</Typography>
                {
                newState.questions.size ?
                 [...newState.questions.entries()].map(ele=>{
                        return <Typography variant="h6">
                            {newState.correctMap.get(ele[0]) ?  
                            <Typography variant="h6">                          
                            {ele[1]} Answer:- {newState.correctAnswers.get(ele[0])}
                            </Typography>                            
                            :
                            <Typography variant="h6" sx={{backgroundColor:'red'}}>                            
                            {ele[1]} Answer:- {newState.correctAnswers.get(ele[0])}
                            </Typography>
                            }
                        </Typography>
                    })
                :null
                }
            </CardContent>
        </Card>
        </Stack>
    }
    </Box>
}