import {configureStore} from "@reduxjs/toolkit"
import accountReducer from "../features/BearerToken/account"
import BoxToDisplayReducer from "../features/BearerToken/BoxToDisplaySlice"
import chapAndCourseDisplayedReducer from "../features/BearerToken/chapAndCourseDisplayed"
import ChatBotReducer from "../features/BearerToken/ChatBotSlice"
import ConnexionReducer from "../features/BearerToken/ConnexionSlice"
import DisplayActivityReducer from "../features/BearerToken/DisplayActivitySlice"
import headerReducer from "../features/BearerToken/HeaderSlice"
import loadingReducer from "../features/BearerToken/LoadingSlice"
import NavBarReducer from "../features/BearerToken/NavBarSlice"
import PageActivityLoadedReducer from "../features/BearerToken/PageActivityLoadedSlice"
import quizzFormReducer from "../features/BearerToken/QuizzFormSlice"
import reponsesQuizzReducer from "../features/BearerToken/reponsesQuizzSlice"
import ThemeLoadedReducer from "../features/BearerToken/ThemeLoadedSlice"
import ThemeReducer from "../features/BearerToken/ThemesSlice"
import UserReducer from "../features/BearerToken/UserSlice"
import ExamenReducer from "../features/Examens/ExamenSlice"
const store = configureStore({
    reducer : {
        header : headerReducer,
        connexion : ConnexionReducer,
        displayActivity : DisplayActivityReducer,
        navBar : NavBarReducer,
        boxToDisplay : BoxToDisplayReducer,
        user : UserReducer,
        theme : ThemeReducer,
        themeLoaded : ThemeLoadedReducer,
        pageActivityLoaded : PageActivityLoadedReducer,
        chapAndCourseDisplayed : chapAndCourseDisplayedReducer,
        loading : loadingReducer,
        quizzForm  : quizzFormReducer,
        reponsesQuizz  : reponsesQuizzReducer,
        ChatBot  : ChatBotReducer,
        Examen  : ExamenReducer,
        account  : accountReducer,
    }
})
export default store