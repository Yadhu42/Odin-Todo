import { getAllProjects, getSpecificProject,saveToLocalStorage } from "./project.js";
import {note} from "./note.js";
import { pullProject,displaySideProject} from "./displayProject.js";

const plusNote = document.querySelector(`.notePlus`);
const closeDialog = document.querySelector(`.closeDialog`);
const radios = document.querySelectorAll(`input[name="projectSelect"]`);
const projSelectDiv = document.querySelector(`.projSelectDiv`);
const inputProj = document.querySelector(`.noteProjPreview`);
const submit = document.querySelector(`#submitDialog`);
const select = document.querySelector(`.noteProjSelect`);
const inputName = document.querySelector(`#noteName`);
const inputMsg = document.querySelector(`#noteMsg`);
const inputImp = document.querySelectorAll(`input[name="prior"]`);
const inputDate = document.querySelector(`#noteDate`);
const dialog = document.querySelector(`.createNoteDialog`);
const submitButtonDiv = document.querySelector(`.dialogButtons`);
const closeEditDialog = document.querySelector(`.closeEdit`);
const editButtonDialog = document.querySelector(`#editDialog`);
const editButtonDiv = document.querySelector(`.dialogButtonsEdit`);
const readOnlyElements = document.querySelectorAll(`.readOnlyEl`);
const saveButtonDiv = document.querySelector(`.dialogButtonsSave`);
const saveButtonDialog = document.querySelector(`#saveDialog`);
const cancelButtonDialog = document.querySelector(`.cancelEdit`);
const disableElements = document.querySelectorAll(`.lockOut`);

function addNote(){
    let imp;
    let inputProject;

    inputImp.forEach((selection) =>{
        if(selection.checked){
            imp = selection.value;
        }
    });

    let projSelect = document.querySelector(`input[name="projectSelect"]:checked`);
    
    if(!inputName.value||!inputMsg.value||!imp||!projSelect||!inputDate.value){
        console.log(`Invalid Input`);
        return;
    }

    if(projSelect.value==="existing"){
        inputProject = document.querySelector(`#dropDown`);
    }
    else if(projSelect.value === "new"){
        inputProject = document.querySelector(`#noteProject`);
    }

    if(!inputProject.value){
        console.log(`Invalid Input`);
        return;
    }
    
    takeUserInput(inputName.value,inputMsg.value,imp,inputDate.value,inputProject.value);
    dialog.close();
}

function getProjSelected(){
    let selected = document.querySelector(`input[name="projectSelect"]:checked`);
    select.innerHTML="";

    if(!selected){
        return;
    }
    else{
        if(selected.value==="existing"){
            let projList = getAllProjects();

            const dropDown = document.createElement(`select`);
            dropDown.setAttribute(`name`,`dropDownProject`);
            dropDown.setAttribute(`id`,`dropDown`);
            let defaultOption = document.createElement(`option`);
            defaultOption.setAttribute(`value`,"");
            defaultOption.innerText = "Select Project";
            defaultOption.selected=true;
            defaultOption.hidden=true;
            defaultOption.disabled=true;
            dropDown.appendChild(defaultOption);

            projList.forEach((obj)=>{
                let option = document.createElement(`option`);
                option.setAttribute(`value`,`${obj.name}`);
                option.innerText = obj.name;
                dropDown.appendChild(option);
            });
            select.appendChild(dropDown);
        }
        else if(selected.value === "new"){
            let inputProject = document.createElement(`input`);
            inputProject.setAttribute(`type`,`text`);
            inputProject.setAttribute(`id`,`noteProject`);
            inputProject.placeholder=`Enter new Project`;
            select.appendChild(inputProject);
        }

    }
}

function takeUserInput(name,msg,priority,due,proj){
    let nameC = name.charAt(0).toUpperCase() + name.slice(1);
    let projC = proj.charAt(0).toUpperCase() + proj.slice(1);

    let newNote = new note(nameC,msg,priority,due);
    newNote.projFile = projC;

    newNote.pushNote();
    saveToLocalStorage();
    displaySideProject();
    pullProject(`${projC}`);
}

function takeUserEdits(ogNote){
    let inputValue = inputName.value.trim();
    let noteName = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

    let oldName;
    let oldProjName;
    let imp;
    let inputProject;

    if(ogNote.name!==noteName){
        oldName = ogNote.name;
        ogNote.changeName=noteName;
    }

    if(ogNote.message!==inputMsg.value){
        ogNote.changeMessage = inputMsg.value;
    }

    inputImp.forEach((radio) =>{
        if(radio.checked){
            imp = radio.value;
        }
    });

    if(ogNote.priority!==imp){
        ogNote.changePriority = imp;
    }

    if(ogNote.dueDate!==inputDate.value){
        ogNote.changeDueDate=inputDate.value;
    }

    let projSelect = document.querySelector(`input[name="projectSelect"]:checked`);
    if(projSelect.value==="existing"){
        inputProject = document.querySelector(`#dropDown`);
    }
    else if(projSelect.value === "new"){
        inputProject = document.querySelector(`#noteProject`);
    }

    let inputP = inputProject.value.trim();
    let projectName = inputP.charAt(0).toUpperCase() + inputP.slice(1);

    if(ogNote.projName!==projectName){
        oldProjName = ogNote.projName;
        ogNote.projFile = projectName;
        ogNote.pushNote();

        let oldProj = getSpecificProject(oldProjName);
        if(oldName!=undefined){
            oldProj.deleteNote(oldName);
        }
        else{
            oldProj.deleteNote(ogNote.name);
        }
        
    }
    currentNote=null;
    directEdit=null;

    dialog.close();
    submitButtonDiv.classList.remove(`hidden`);
    saveButtonDiv.classList.add(`hidden`);
    saveToLocalStorage();
    displaySideProject();
    pullProject(`${ogNote.projName}`);
}

let currentNote;
function previewNote(note){
    currentNote=note;
    let inputProject;

    inputName.value=currentNote.name;
    inputMsg.value=currentNote.message;
    inputDate.value=currentNote.dueDate;
    inputProj.value=currentNote.projName;

    inputImp.forEach((selection) =>{
        if(note.priority===selection.value){
            selection.checked=true;
        }
    });

    radios.forEach((selection) =>{
        if(selection.value===`existing`){
            selection.checked=true;
        }
        getProjSelected();
        inputProject = document.querySelector(`#dropDown`);
        inputProject.value=currentNote.projName;
    })

    projSelectDiv.classList.add(`hidden`);
    inputProj.classList.remove(`hidden`);

    readOnlyElements.forEach((element) =>{
        element.classList.add(`editColor`);
        element.setAttribute(`readonly`,true);
    });
    
    disableElements.forEach((element) =>{
        element.setAttribute(`disabled`,true);
    });

    editButtonDiv.classList.remove(`hidden`);
    submitButtonDiv.classList.add(`hidden`);
    dialog.showModal();
}

let directEdit;
function editNote(pencil){
    directEdit = pencil;

    if(!dialog.open){
        let inputProject;

        inputName.value=directEdit.name;
        inputMsg.value=directEdit.message;
        inputDate.value=directEdit.dueDate;
        inputProj.value=directEdit.projName;

        inputImp.forEach((selection) =>{
            if(directEdit.priority===selection.value){
                selection.checked=true;
            }
        });

        radios.forEach((selection) =>{
            if(selection.value===`existing`){
                selection.checked=true;
            }
            getProjSelected();
            inputProject = document.querySelector(`#dropDown`);
            inputProject.value=directEdit.projName;
        })
        dialog.showModal();
    }

    console.log(`going into edit`);
    submitButtonDiv.classList.add(`hidden`);
    editButtonDiv.classList.add(`hidden`);
    saveButtonDiv.classList.remove(`hidden`);

    projSelectDiv.classList.remove(`hidden`);
    inputProj.classList.add(`hidden`);
}

export function initAddNote(){
    plusNote.addEventListener(`click`,()=>{
        
        readOnlyElements.forEach((element) =>{
            element.value="";
        });

        inputImp.forEach((radio)=>{
            radio.checked=false;
        });

        radios.forEach((radio)=>{
            radio.checked=false;
        });

        getProjSelected();
        dialog.showModal();
    });

    closeDialog.addEventListener(`click`,() =>{
        dialog.close();
    });

    radios.forEach((radio) => {
        radio.addEventListener('change', () => {
            getProjSelected();
        });
    });

    submit.addEventListener(`click`,() =>{
        addNote();
    });

    editButtonDialog.addEventListener(`click`,()=>{
        readOnlyElements.forEach((element) =>{
            element.classList.remove(`editColor`);
            element.removeAttribute(`readonly`);
        });

        disableElements.forEach((element) =>{
            element.removeAttribute(`disabled`);
        });

        editNote(currentNote);
    });

    saveButtonDialog.addEventListener(`click`,()=>{
        if(currentNote){
            takeUserEdits(currentNote);
        }
        if(directEdit){
            takeUserEdits(directEdit);
        }
    });

    cancelButtonDialog.addEventListener(`click`,()=>{
        submitButtonDiv.classList.remove(`hidden`);
        saveButtonDiv.classList.add(`hidden`);
        currentNote = null; 

        dialog.close();
    });

    closeEditDialog.addEventListener(`click`,() =>{
        editButtonDiv.classList.add(`hidden`);
        submitButtonDiv.classList.remove(`hidden`);
        projSelectDiv.classList.remove(`hidden`);
        inputProj.classList.add(`hidden`);
        currentNote = null;

        readOnlyElements.forEach((element) =>{
            element.classList.remove(`editColor`);
            element.removeAttribute(`readonly`);
        });

        disableElements.forEach((element) =>{
            element.removeAttribute(`disabled`);
        });   

        dialog.close();
    });

}



export {previewNote,editNote}
    
