import { note } from "./note.js";
import { format, addDays} from "date-fns";

let allProjects = [];
class project{
    constructor(name){
        this.name = name;
        this.array = [];
    }

    addNote(note){
        this.array.push(note);
        console.log(`note added to ${this.name}`);
    }

    deleteNote(note){
        const check = this.array.findIndex((el) => el === note);
        this.array.splice(check,1);
        console.log(`note has been deleted from ${this.name}`, this.array);
    }

    set newProjName(change){
        this.name=change;
    }

}

let defaultProject = new project(`default`);
let today = new project(`Today`);
let upcoming = new project(`Upcoming`);
let delay = new project(`Overdue`);
let everyNote = new project(`All Notes`);

function addProject(title){
    let obj = new project(title);
    allProjects.push(obj);
}

function getAllProjects(){
    return allProjects;
}

function getSpecificProject(name){
    let proj = allProjects.find((project) => project.name === name);    
    return proj;
}

function checkProject(title){
    if(title === `default`){
        return true;
    }
    else{
        const check =  allProjects.find((arr) =>{
        return arr.name === title;
        });
        if(check === undefined){
            addProject(title);
            return true;
        }
        else{
            return true;
        }
    }
}

function insertNote(note){
    if(note.projName === `default`){
        defaultProject.addNote(note);
    }
    else{
        allProjects.find((arr) =>{
                if(arr.name === note.projName){
                    arr.addNote(note);
                };
            });    
    }        
}

function settingPriority(schedule){
    let scheduleReturn = schedule.trim().toLowerCase();
    today.array=[],delay.array=[],upcoming.array=[],everyNote.array=[];
    allProjects.forEach((project) =>{
        project.array.forEach((note) =>{
            let days = note.duration;
            if(days<0){
                delay.array.push(note); 
            }
            else if(days===0){
                today.array.push(note);
            }
            else if(days>0){
                upcoming.array.push(note);
            }
            everyNote.array.push(note);
        });
    });
    if(scheduleReturn===`today`){
        return today;
    }
    else if(scheduleReturn===`upcoming`){
        return upcoming;
    }
    else if(scheduleReturn===`overdue`){
        return delay;
    }
    else if(scheduleReturn===`allnote`){
        return everyNote;
    }
}

function delProject(name){
    let find = allProjects.findIndex((project) => project.name === name);
    allProjects.splice(find,1);
}

function defaultNotes(){
    let current = new Date();
    let today = format(current, "yyyy-MM-dd");
    let tomorrow = format(addDays(current,1),"yyyy-MM-dd");
    let fewDays = format(addDays(current,3),"yyyy-MM-dd");
    let future = format(addDays(current,10), "yyyy-MM-dd");
    let past = format(addDays(current,-7), "yyyy-MM-dd");

    let todo = new note(`Add`,`Hit the floating + Icon on the bottom right`,`high`,`${fewDays}`);
    let shop = new note(`Open Menu`,`Open menu (top left of screen) and you can view your logs and create new projects`,`low`,`${tomorrow}`);
    let mail = new note(`Sort`,`Sort notes by priority or by schedule by pressing "Recent/Due" and "All/High/Med/Low" tags `,`med`,`${today}`);
    let print = new note(`Edit/Del`,`View/Edit/Delete notes by hitting the icons`,`med`,`${future}`);
    let task = new note(`Back`,`Hit the back button (next to notes) to go to projects window`,`high`,`${past}`);


    todo.projFile = `Demo`;
    shop.projFile = `Demo`;
    mail.projFile = `Demo`;
    print.projFile = `Demo`;
    task.projFile = `Demo`;
    
    task.pushNote();
    print.pushNote();
    shop.pushNote();
    mail.pushNote();
    todo.pushNote();
    
    saveToLocalStorage();
}

function saveToLocalStorage(){
    const stringy = JSON.stringify(allProjects);
    localStorage.setItem(`projectData`,stringy);
}

function loadFromLocalStorage(){
    const data = localStorage.getItem(`projectData`);
    if(!data || JSON.parse(data).length===0){
        defaultNotes();
    }
    else{
        const parsed = JSON.parse(data);
        allProjects=[];

        parsed.forEach((projData) =>{
            const _project = new project(projData.name);

            projData.array.forEach((noteData) =>{
                const Note = new note(noteData.name,noteData.message,noteData.priority,noteData.dueDate);
                Note.projFile = noteData.projName;
                
                _project.addNote(Note);
            });

            allProjects.push(_project);
        });
    }
}


export {addProject, checkProject, getAllProjects, getSpecificProject, insertNote, settingPriority, delProject, saveToLocalStorage, loadFromLocalStorage}
