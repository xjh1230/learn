import StartPage from "../page/StartGame";
import GamePage from "../page/GamePage";
import EndPage from "../page/EndPage";



const map={
    "GamePage":GamePage,
    "EndPage":EndPage,
    "StartPage":StartPage,
}

export const getPage=(page)=>{
    if(map[page]){
        return map[page]
    }else{
        return map["StartPage"]
    }
}

