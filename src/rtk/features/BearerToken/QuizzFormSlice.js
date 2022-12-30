import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    listeQuestions : [
        {
            question : '',
            reponses : [
                {
                    titre : '',
                    img : ''
                },
            ],
            reponseValide : 1,
            explication : '',
            img : '',
        }
    ],
    selected : 0,

}

const quizzFormSlice = createSlice({
    name : 'quizzForm',
    initialState,
    reducers :{
        set : (state,data)=>{
            state.listeQuestions = data.payload
        },
        pushQuestion : (state)=>{ 
            state.listeQuestions.push({
                question : '',
                reponses : [
                    {
                        titre : '',
                        img : ''
                    },
                ],
                reponseValide : 0,
                explication : ''
            })
        },
        modifyQuestionName : (state ,data)=>{
            let indexQuestion = data.payload.indexQuestion
            let nom = data.payload.question
            state.listeQuestions[indexQuestion].question = nom
        },
        modifyExplication : (state,data)=>{
            let indexQuestion = data.payload.indexQuestion
            let explication = data.payload.explication
            state.listeQuestions[indexQuestion].explication = explication
        },
        modifyReponseValide : (state,data)=>{
            let indexQuestion = data.payload.indexQuestion
            let reponseValide = data.payload.reponseValide
            state.listeQuestions[indexQuestion].reponseValide = reponseValide
        },
        removeQuestion : (state,data)=>{ //il nous faut ici l'index de la question 
            let index = data.payload
            state.listeQuestions.splice(index,1)
        },
        pushResponse : (state , data)=>{ // l'index de la question 
            // objet attendu
            let indexQuestion = data.payload.indexQuestion
            let reponse = data.payload.response
            state.listeQuestions[indexQuestion].reponses.push(reponse)
        },
        addEmptyResponse : (state , data ) => {
            let indexQuestion = data.payload
            state.listeQuestions[indexQuestion].reponses.push({
                titre : '',
                img : ''
            })
        },
        removeResponse : (state , data)=>{// l'index de la question et l'index de la reponse
            let indexQuestion = data.payload.indexQuestion
            let indexReponse = data.payload.indexReponse

            state.listeQuestions[indexQuestion].reponses.splice(indexReponse , 1)
        },

        modifyResponse : (state , data)=>{
            let indexQuestion = data.payload.indexQuestion
            let indexReponse = data.payload.indexReponse
            let reponse = data.payload.reponse
            state.listeQuestions[indexQuestion].reponses[indexReponse].titre = reponse //.splice(indexReponse , 1 , reponse)
        },
        modifyQuestionImage : (state , data)=>{
            let indexQuestion = data.payload.indexQuestion
            state.listeQuestions[indexQuestion].img = data.payload.img
        },
        modifyResponseImage : (state ,data)=>{
            let indexQuestion = data.payload.indexQuestion
            let indexReponse = data.payload.indexReponse
            let img = data.payload.img
            // console.log(img)
            // console.log('indexQuestion', indexQuestion)
            // console.log('indexReponse', indexReponse)
            state.listeQuestions[indexQuestion].reponses[indexReponse].img = img
        },
        questionImageClear : (state , data)=>{
            state.listeQuestions[data.payload].img=''
        },
        responseImageClear : (state ,data)=>{
            let indexQuestion = data.payload.indexQuestion
            let indexReponse = data.payload.indexReponse
            state.listeQuestions[indexQuestion].reponses[indexReponse].img = ''
        },
        setSelected : (state , data)=> {
            state.selected = data.payload
        },
        clear:(state)=>{
            state.listeQuestions = [
                {
                    question : '',
                    reponses : [{
                        titre : '',
                        img : ''
                    },],
                    reponseValide : 0,
                    explication : ''
                }
            ]
            state.selected = 0
        }
    }
})
const quizzFormReducer = quizzFormSlice.reducer
export default quizzFormReducer
export const quizzFormActions = quizzFormSlice.actions