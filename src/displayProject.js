import {getAllProjects, settingPriority, getSpecificProject, delProject, addProject,saveToLocalStorage} from "./project.js";
import { previewNote, editNote } from "./displayNote.js";

const container = document.querySelector(`.container`);
const content = document.querySelector(`.content`);
const sidePanelDiv = document.querySelector(`.sidePanelDiv`);
const sidePanelProjectDiv = document.querySelector(`.sidePanelProjectDiv`);
const exist1 = document.querySelector(`.existingProject1`);
const exist2 = document.querySelector(`.existingProject2`);
const exist3 = document.querySelector(`.existingProject3`);
const sideNav = document.querySelector(`.sideNav`);
const newProjModal = document.querySelector(`#newProject`);
const submitProjName = document.querySelector(`#submitProjName`);
const cancelProj = document.querySelector(`#cancelNewProject`);
const newProjName = document.querySelector(`#newProjectTxt`);
const delNoteModal = document.querySelector(`.deleteNoteDialog`);
const delNoteBtn = document.querySelector(`#deleteNote`);
const cancelDel = document.querySelector(`#cancelDelete`);
const delProjModal = document.querySelector(`.deleteProjDialog`);
const delProjBtn = document.querySelector(`#deleteProj`);
const cancelDelProj = document.querySelector(`#cancelDeleteProj`);
const submitProjNameDiv = document.querySelector(`.submitProjNameDiv`);
const editProjNameDiv = document.querySelector(`.editProjNameDiv`);
const saveProjEdit = document.querySelector(`#saveProjEdit`);
const cancelProjEdit = document.querySelector(`#cancelProjEdit`);
let sharedReference;
let projSharedReference;

function pullProject(name){
    content.innerHTML="";
    
    const projectDiv = document.createElement(`div`);
    projectDiv.setAttribute(`class`,`projectDiv`);
    
    const projBox = document.createElement(`div`);
    projBox.setAttribute(`class`,`projBox`);

    let specProj = getSpecificProject(name);
    if(!specProj){
        specProj=name;
    }

    const projDisplayTitle = document.createElement(`div`);
    projDisplayTitle.setAttribute(`class`,`projTitleName`);

    const projDisplayPrior = document.createElement(`div`);
    projDisplayPrior.setAttribute(`class`,`displayPrior`);

    const projHighDiv = document.createElement(`div`);
    const projMedDiv = document.createElement(`div`);
    const projLowDiv = document.createElement(`div`);

    projHighDiv.setAttribute(`class`,`projPrior`);
    projMedDiv.setAttribute(`class`,`projPrior`);
    projLowDiv.setAttribute(`class`,`projPrior`);

    const colorHighDiv = document.createElement(`div`);
    colorHighDiv.setAttribute(`class`,`colorCircle highPrior`);
    projHighDiv.appendChild(colorHighDiv);

    const hiTxt = document.createElement(`p`);
    hiTxt.setAttribute(`class`,`priorTxt`);
    hiTxt.innerText = `High`;
    projHighDiv.appendChild(hiTxt);
    
    const colorMedDiv = document.createElement(`div`);
    colorMedDiv.setAttribute(`class`,`colorCircle medPrior`);
    projMedDiv.appendChild(colorMedDiv);

    const medTxt = document.createElement(`p`);
    medTxt.setAttribute(`class`,`priorTxt`);
    medTxt.innerText = `Med`;
    projMedDiv.appendChild(medTxt);

    const colorLowDiv = document.createElement(`div`);
    colorLowDiv.setAttribute(`class`,`colorCircle lowPrior`);
    projLowDiv.appendChild(colorLowDiv);

    const lowTxt = document.createElement(`p`);
    lowTxt.setAttribute(`class`,`priorTxt`);
    lowTxt.innerText = `Low`;
    projLowDiv.appendChild(lowTxt);

    const projTitleTxt = document.createElement(`p`);
    const projTitleSubTxt = document.createElement(`p`);
    projTitleSubTxt.setAttribute(`class`,`projTitleTxt`);
    projTitleSubTxt.innerText = `${specProj.name}`;
    projTitleTxt.innerText = `Priority:`;
    projTitleTxt.setAttribute(`class`,`impTxt`);

    const projTitleTxtDiv = document.createElement(`div`);
    projTitleTxtDiv.appendChild(projTitleTxt);

    projDisplayPrior.appendChild(projTitleTxtDiv);
    projDisplayPrior.appendChild(projHighDiv);
    projDisplayPrior.appendChild(projMedDiv);
    projDisplayPrior.appendChild(projLowDiv);
    projDisplayTitle.appendChild(projTitleSubTxt);
    projDisplayTitle.appendChild(projDisplayPrior);

    const sortContainer = document.createElement(`div`);
    sortContainer.setAttribute(`class`,`sortContainer`);
    const sortIconDiv = document.createElement(`div`);
    sortIconDiv.setAttribute(`class`,`sortIconDiv`);
    sortIconDiv.innerHTML=`<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 12H21M13 8H21M13 16H21M6 7V17M6 17L3 14M6 17L9 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
    const sortTxtDiv = document.createElement(`div`);
    sortTxtDiv.setAttribute(`class`,`sortTxtDiv`);
    const sortTxt = document.createElement(`p`);
    sortTxt.innerText = `Recent`;
    sortTxtDiv.appendChild(sortTxt);

    const sortDiv = document.createElement(`div`);
    sortDiv.setAttribute(`class`,`sortDiv`);

    const filterDiv = document.createElement(`div`);
    filterDiv.setAttribute(`class`,`filter`);

    const filterTagDiv = document.createElement(`div`);
    filterTagDiv.setAttribute(`class`,`filterTagDiv`);
    
    filterTagDiv.innerHTML=`<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 3H5C3.58579 3 2.87868 3 2.43934 3.4122C2 3.8244 2 4.48782 2 5.81466V6.50448C2 7.54232 2 8.06124 2.2596 8.49142C2.5192 8.9216 2.99347 9.18858 3.94202 9.72255L6.85504 11.3624C7.49146 11.7206 7.80967 11.8998 8.03751 12.0976C8.51199 12.5095 8.80408 12.9935 8.93644 13.5872C9 13.8722 9 14.2058 9 14.8729L9 17.5424C9 18.452 9 18.9067 9.25192 19.2613C9.50385 19.6158 9.95128 19.7907 10.8462 20.1406C12.7248 20.875 13.6641 21.2422 14.3321 20.8244C15 20.4066 15 19.4519 15 17.5424V14.8729C15 14.2058 15 13.8722 15.0636 13.5872C15.1959 12.9935 15.488 12.5095 15.9625 12.0976C16.1903 11.8998 16.5085 11.7206 17.145 11.3624L20.058 9.72255C21.0065 9.18858 21.4808 8.9216 21.7404 8.49142C22 8.06124 22 7.54232 22 6.50448V5.81466C22 4.48782 22 3.8244 21.5607 3.4122C21.1213 3 20.4142 3 19 3Z" fill="currentColor"></path> </g></svg>`
    
    const filterTxtDiv = document.createElement(`div`);
    filterTxtDiv.setAttribute(`class`,`filterTxtDiv`);
    
    const filterTxt = document.createElement(`p`);
    filterTxt.setAttribute(`class`,`filterTxt`);
    filterTxt.innerText = `All`;
    filterTxtDiv.appendChild(filterTxt);

    filterDiv.appendChild(filterTagDiv);
    filterDiv.appendChild(filterTxtDiv);

    sortDiv.appendChild(sortIconDiv);
    sortDiv.appendChild(sortTxtDiv);

    sortContainer.appendChild(sortDiv);
    sortContainer.appendChild(filterDiv);

    const titleContainer = document.createElement(`div`);
    titleContainer.setAttribute(`class`,`titleContainer`);

    const emptyDiv2 = document.createElement(`div`);

    titleContainer.appendChild(projDisplayTitle);
    titleContainer.appendChild(emptyDiv2);
    projectDiv.appendChild(titleContainer);

    const projTitleCards = document.createElement(`div`);
    projTitleCards.setAttribute(`class`,`projTitleCard`);

    const projDisplayTime = document.createElement(`div`);
    projDisplayTime.setAttribute(`class`,`projDisplayCard projDisplayDate`);

    const projTimeTxt = document.createElement(`p`);
    if(name.name===`Today`||name.name===`All Notes`|| name.name===`Upcoming`||name.name===`Overdue`){
        projTimeTxt.innerText = `Project`;
    }
    else{
        projTimeTxt.innerText = `Due`;
    }
    projDisplayTime.appendChild(projTimeTxt);

    const projDisplayDue = document.createElement(`div`);
    projDisplayDue.setAttribute(`class`,`projDisplayCard projDisplayDeadline`);

    const projDueTxt = document.createElement(`p`);
    projDueTxt.innerText = `Deadline`;
    projDisplayDue.appendChild(projDueTxt);

    
    projTitleCards.appendChild(sortContainer);
    projTitleCards.appendChild(projDisplayTime);
    projTitleCards.appendChild(projDisplayDue);
    projBox.appendChild(projTitleCards);
    
    let allNotes = [];
    specProj.array.forEach((note) =>{
        allNotes.push(note);
    });

    const noteContainer = document.createElement(`div`);
    noteContainer.setAttribute(`class`,`noteContainer`);

    showProject(allNotes.toReversed());

    function showProject(array){
        noteContainer.innerHTML="";
        array.forEach((note,index)=>{
            let obj = miniNote(note,name.name);
            obj.style.animationDelay=`${index * 100}ms`;
            noteContainer.appendChild(obj); 
        });
        projBox.appendChild(noteContainer);
    }

    function sortNote(text){

        let reverseNotes = allNotes.toReversed();
        let orderedArr=[...allNotes].sort((a,b) => a.duration - b.duration);

        if(text===`Recent`){
            showProject(reverseNotes);
        }
        else if(text===`Due`){
            showProject(orderedArr);
        }
    }

    sortDiv.addEventListener(`click`,(event) =>{
        sortTxt.innerText = sortTxt.innerText ===`Recent`? `Due`:`Recent`;
        sortNote(sortTxt.innerText);
    });

    filterDiv.addEventListener(`click`,(event) =>{
        if(filterTxt.innerText===`All`){
            allNotes=[];
            filterTxt.innerText=`High`;
            specProj.array.forEach((note) =>{
                if(note.priority===`high`){
                    allNotes.push(note);
                }
            });
            sortNote(sortTxt.innerText);
            return;
        }
        else if(filterTxt.innerText===`High`){
            allNotes=[];
            filterTxt.innerText=`Med`;
            specProj.array.forEach((note) =>{
                if(note.priority===`med`){
                    allNotes.push(note);
                }
            });
            sortNote(sortTxt.innerText);
            return;
        }
        else if(filterTxt.innerText===`Med`){
            allNotes=[];
            filterTxt.innerText=`Low`;
            specProj.array.forEach((note) =>{
                if(note.priority===`low`){
                    allNotes.push(note);
                }
            });
            sortNote(sortTxt.innerText);
            return;
        }
        if(filterTxt.innerText===`Low`){
            allNotes=[];
            filterTxt.innerText=`All`;
            specProj.array.forEach((note) =>{
                allNotes.push(note);
            });
            sortNote(sortTxt.innerText);
            return;
        }
    });

    projBox.addEventListener(`click`,(event) =>{
        const noteDiv=event.target.closest(`.noteBox`);
        if(!noteDiv) return;

        let currentNote = specProj.array.find((note)=> note.name === noteDiv.id);
        sharedReference=currentNote;

        if(event.target.closest(`.checkBoxDiv`)){
            const checkBoxDiv = event.target.closest(`.checkBoxDiv`);
            const noteDueDiv = noteDiv.querySelector(`.noteDisplayDate`);
            const noteDue = noteDueDiv.querySelector(`.timeLeftTxt`);

            const noteNameDiv = noteDiv.querySelector(`.noteDisplayName`);
            const nameTxt = noteNameDiv.querySelector(`.noteDisplayNameTxt`);

            currentNote.changeFinished();

            checkBoxDiv.innerHTML = getCheckedSVG(currentNote.finished);
            nameTxt.classList.toggle(`lineThrough`,currentNote.finished);

            if(projTimeTxt.innerText===`Project`){
                noteDue.innerText = currentNote.projName;
            }
            else if(projTimeTxt.innerText===`Due`){
                noteDue.innerText = getCheckedDue(currentNote.finished,currentNote.timeUntil);               
            }
            return;
        }

        if(event.target.closest(`.pencilDiv`)){
            editNote(currentNote);
            return;
        }
        if(event.target.closest(`.trashDiv`)){
            delNoteModal.showModal();
            return;
        }

        previewNote(currentNote);
    });

    const backDiv = document.createElement(`div`);
    backDiv.setAttribute(`class`,`backDiv`);
    backDiv.innerHTML =`<svg width="40px" height="40px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.4102 16.4199L10.3502 13.55C10.1944 13.4059 10.0702 13.2311 9.98526 13.0366C9.9003 12.8422 9.85645 12.6321 9.85645 12.4199C9.85645 12.2077 9.9003 11.9979 9.98526 11.8035C10.0702 11.609 10.1944 11.4342 10.3502 11.29L13.4102 8.41992" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

    backDiv.addEventListener(`click`,()=>{
        viewAllProjects();
    });
    
    projectDiv.appendChild(projBox);
    content.appendChild(backDiv);
    content.appendChild(projectDiv);
}

function getCheckedSVG(isDone){
    return isDone
    ?`<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Checkbox_Check"> <path id="Vector" d="M8 12L11 15L16 9M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>`
    :`<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Checkbox_Unchecked"> <path id="Vector" d="M4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>`;
}

function getCheckedDue(isDone,text){

    return isDone
    ?`Completed`
    :`${text}`;
}

function miniNote(obj,projectAssc){
    const noteBox = document.createElement(`div`);
    noteBox.setAttribute(`class`,`noteBox`);
    noteBox.setAttribute(`id`,`${obj.name}`);

    const noteDisplayName = document.createElement(`div`);
    noteDisplayName.setAttribute(`class`,`noteDisplay noteDisplayName`);

    const noteTitleName = document.createElement(`p`);
    noteTitleName.setAttribute(`class`,`noteDisplayNameTxt`);
    noteTitleName.classList.toggle(`lineThrough`,obj.finished);
    noteTitleName.innerText = `${obj.name}`;
    noteDisplayName.appendChild(noteTitleName);

    const noteDisplayTimeLeft = document.createElement(`div`);
    noteDisplayTimeLeft.setAttribute(`class`,`noteDisplay noteDisplayDate`);

    const noteTimeLeft = document.createElement(`p`);
    noteTimeLeft.setAttribute(`class`,`timeLeftTxt`);

    if(projectAssc===`Today`||projectAssc===`All Notes`|| projectAssc===`Upcoming`|| projectAssc===`Overdue`){
        noteTimeLeft.innerText=obj.projName;
    }
    else{
        noteTimeLeft.innerText = getCheckedDue(obj.finished,obj.timeUntil);
    }
    noteDisplayTimeLeft.appendChild(noteTimeLeft);

    const noteDisplayDate = document.createElement(`div`);
    noteDisplayDate.setAttribute(`class`,`noteDisplay noteDisplayDeadline`);

    const noteDue = document.createElement(`p`);
    noteDue.innerText = `${obj.dueDate}`;
    noteDisplayDate.appendChild(noteDue); 
    
    if(obj.priority===`high`){
        noteBox.classList.add(`highImp`);
    }
    if(obj.priority===`med`){
        noteBox.classList.add(`medImp`);
    }
    if(obj.priority==`low`){
        noteBox.classList.add(`lowImp`);
    }

    const noteDisplayBtns = document.createElement(`div`);
    noteDisplayBtns.setAttribute(`class`,`noteDisplay noteDisplayBtns`);
    const pencilDiv = document.createElement(`div`);
    pencilDiv.setAttribute(`class`,`pencilDiv`);
    const trashDiv = document.createElement(`div`);
    trashDiv.setAttribute(`class`,`trashDiv`);
    const checkBoxDiv = document.createElement(`div`);
    checkBoxDiv.setAttribute(`class`,`checkBoxDiv`);
    noteDisplayBtns.appendChild(checkBoxDiv);
    noteDisplayBtns.appendChild(pencilDiv);
    noteDisplayBtns.appendChild(trashDiv);

    checkBoxDiv.innerHTML=getCheckedSVG(obj.finished);
    pencilDiv.innerHTML=`<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.924-.348.487.08 1.232.322 1.934 1.024.703.703.945 1.447 1.024 1.934.058.346-.1.677-.348.924L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" fill="currentColor"></path></g></svg>`
    trashDiv.innerHTML=`<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z" fill="currentColor"></path> <path d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0246L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.24549 11.945L5.515 16.0246C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z" fill="currentColor"></path> </g></svg>`
    
    noteBox.appendChild(noteDisplayName);
    noteBox.appendChild(noteDisplayTimeLeft);
    noteBox.appendChild(noteDisplayDate);
    noteBox.appendChild(noteDisplayBtns);

    return noteBox;

}

function closeNavBar(){
    sideNav.setAttribute(`style`,`transform: scaleX(0);`);
    container.setAttribute(`style`,`margin-left:0`);    
}

function viewAllProjects(){
    content.innerHTML="";
    const allProjectsView = document.createElement(`div`);
    allProjectsView.setAttribute(`class`,`allProjectsView`);
    
    const allProjectContainer = document.createElement(`div`);
    allProjectContainer.setAttribute(`class`,`allProjectContainer`);

    let allProjects = getAllProjects().toReversed(); 

    allProjects.forEach((project) =>{
        const folderContainer = document.createElement(`div`);
        folderContainer.setAttribute(`class`,`projectFolder`);
        folderContainer.setAttribute(`id`,`${project.name}`);

        const folderBox = document.createElement(`div`);
        folderBox.setAttribute(`class`,`projectFolderTop`);

        const shape = document.createElement(`div`);
        shape.setAttribute(`class`,`allProjName`);

        const modifyDiv = document.createElement(`div`);
        modifyDiv.setAttribute(`class`,`modifyProject`);

        const trashDiv = document.createElement(`div`);
        const pencilDiv = document.createElement(`div`);
        pencilDiv.setAttribute(`class`,`editProjDiv`);
        trashDiv.setAttribute(`class`,`delProjDiv`);
        modifyDiv.appendChild(pencilDiv);
        modifyDiv.appendChild(trashDiv);

        pencilDiv.innerHTML= `<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.924-.348.487.08 1.232.322 1.934 1.024.703.703.945 1.447 1.024 1.934.058.346-.1.677-.348.924L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" fill="currentColor"></path></g></svg>`;
        trashDiv.innerHTML = `<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z" fill="currentColor"></path> <path d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0246L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.24549 11.945L5.515 16.0246C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z" fill="currentColor"></path> </g></svg>`

        const projDetails = document.createElement(`div`);
        projDetails.setAttribute(`class`,`projNoteBox`);
        
        const projNameDiv = document.createElement(`div`);
        projNameDiv.setAttribute(`class`,`projNameDiv`);

        const projNameTxt = document.createElement(`p`);
        projNameTxt.setAttribute(`class`,`projNameTxt`);
        projNameTxt.innerText=`${project.name}`;

        projNameDiv.appendChild(projNameTxt);

        shape.appendChild(projNameDiv);

        const projNoteDiv = document.createElement(`div`);
        projNoteDiv.setAttribute(`class`,`projNoteDiv`);

        const projNoteTxt = document.createElement(`p`);
        projNoteTxt.setAttribute(`class`,`projNoteTxt`);
        projNoteTxt.innerText=project.array.length;

        projNoteDiv.appendChild(projNoteTxt);
        projDetails.appendChild(projNoteDiv);

        folderBox.appendChild(shape);
        folderBox.appendChild(modifyDiv);
        folderContainer.appendChild(folderBox);
        folderContainer.appendChild(projDetails);
        
        allProjectContainer.appendChild(folderContainer);
    });

    allProjectContainer.addEventListener(`click`,(event) =>{
        let project = event.target.closest(`.projectFolder`);
        if(!project) return;
        
        projSharedReference=project.id;

        if(event.target.closest(`.delProjDiv`)){
            delProjModal.showModal();
            return;
        }

        if(event.target.closest(`.editProjDiv`)){
            submitProjNameDiv.classList.add(`hidden`);
            editProjNameDiv.classList.remove(`hidden`);
            newProjName.value=projSharedReference;
            newProjModal.showModal();
            return;
        }

        
        pullProject(project.id);
        closeNavBar();
    });

    allProjectsView.appendChild(allProjectContainer);
    content.appendChild(allProjectsView);
    closeNavBar();
}

function displaySideProject(){
    let all = getAllProjects().toReversed(); 
    if(all.length===0){
        exist1.innerText="";
        exist2.innerText="";
        exist3.innerText="";
    }
    if(all.length===1){
        exist1.innerText=all[0].name;
        exist2.innerText="";
        exist3.innerText="";
    }
    if(all.length===2){
        exist1.innerText=all[0].name;
        exist2.innerText=all[1].name;
        exist3.innerText="";
    }
    if(all.length===3){
        exist1.innerText=all[0].name;
        exist2.innerText=all[1].name;
        exist3.innerText=all[2].name;
    }
    if(all.length>3){
        exist1.innerText=all[0].name;
        exist2.innerText=all[1].name;
        exist3.innerText=`...`
    }
}

export function initProj(){
    displaySideProject();

    submitProjName.addEventListener(`click`,(event) =>{
        if(!newProjName.value) return;
        let newName = newProjName.value.charAt(0).toUpperCase() + newProjName.value.slice(1);
        addProject(newName);
        newProjModal.close();
        displaySideProject();
        saveToLocalStorage();
        viewAllProjects();
    });

    cancelProj.addEventListener(`click`,() =>{
        newProjModal.close();
    });

    saveProjEdit.addEventListener(`click`,() =>{
        if(!newProjName.value) return;
        let newName = newProjName.value.charAt(0).toUpperCase() + newProjName.value.slice(1);
        let proj = getSpecificProject(projSharedReference);  
        proj.newProjName=`${newName}`;

        submitProjNameDiv.classList.remove(`hidden`);
        editProjNameDiv.classList.add(`hidden`);
        newProjModal.close();
        saveToLocalStorage();
        viewAllProjects();
    });

    cancelProjEdit.addEventListener(`click`,() =>{
        submitProjNameDiv.classList.remove(`hidden`);
        editProjNameDiv.classList.add(`hidden`);
        newProjModal.close();
    });

    delNoteBtn.addEventListener(`click`,()=>{
        let parent = getSpecificProject(`${sharedReference.projName}`);
        parent.deleteNote(sharedReference);
        delNoteModal.close();
        saveToLocalStorage();
        pullProject(parent);
    });

    cancelDel.addEventListener(`click`,() =>{
        delNoteModal.close();
    });

    delProjBtn.addEventListener(`click`,() =>{
        delProject(projSharedReference);
        delProjModal.close();
        saveToLocalStorage();
        displaySideProject();
        viewAllProjects();
    });

    cancelDelProj.addEventListener(`click`,()=>{
        delProjModal.close();
    });

    sidePanelDiv.addEventListener(`click`,(event) =>{
        let tag = event.target.closest(`.scheduleTag`);
        if(!tag) return;
        let scheduleTag = settingPriority(tag.id);
        pullProject(scheduleTag);
        closeNavBar();
    });

    sidePanelProjectDiv.addEventListener(`click`,(event) =>{
        let projDiv = event.target.closest(`.existingProj`);
        if(!projDiv) return;
        if(projDiv.id===`ep1`){
            pullProject(exist1.innerText);
            closeNavBar();
            return;
        }
        if(projDiv.id===`ep2`){
            pullProject(exist2.innerText);
            closeNavBar();
            return;
        }
        if(projDiv.id===`ep3`){
            return;
        }
        if(projDiv.id===`allProjectsDiv`){
            viewAllProjects();
            closeNavBar();
            return;
        }
        if(projDiv.id===`addNewProject`){
            newProjName.value="";
            newProjModal.showModal();
            closeNavBar();
            return;
        }
    });
}




export{pullProject,displaySideProject}
