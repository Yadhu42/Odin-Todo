import {checkProject, insertNote} from "./project.js";
import {differenceInDays, formatDistanceStrict, isToday, isTomorrow, isYesterday, startOfDay, startOfToday} from "date-fns";

export class note {
    constructor (name, message, priority, dueDate){
        this.name = name,
        this.message = message,
        this.priority = priority,
        this.dueDate = dueDate,
        this.projName = `default`
        this.finished=false;
    }
    
    set projFile(_projName){
        this.projName = _projName;
    }

    set changeName(change){
        this.name = change;
    }

    set changeMessage(change){
        this.message = change;
    }

    set changeDueDate(change){
        this.dueDate=change;
    }

    set changePriority(change){
        this.priority = change;
    }

    get timeUntil(){
        let finalDate = new Date(this.dueDate);
        if(isToday(finalDate)){
            return "Today";
        }
        if(isTomorrow(finalDate)){
            return "Tomorrow";
        }
        if(isYesterday(finalDate)){
            return "Yesterday";
        }
        else{
            return formatDistanceStrict(finalDate, startOfToday(), {addSuffix: true, unit: 'day'});
        }
    }

    get duration(){
        let finalDate = startOfDay(new Date(this.dueDate)); 
        return differenceInDays(finalDate, startOfToday());
    }

    pushNote(){
        let found = checkProject(this.projName);
        if(found == true){
            insertNote(this);
        }
    }

    changeFinished(){
        this.finished= this.finished===false?true:false;
    }
}   