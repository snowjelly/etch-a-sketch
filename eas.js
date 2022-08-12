const gridContainer = document.querySelector('.grid-container');
const slider = document.getElementById('slider');
const sliderSize = document.querySelectorAll('#value');
const wrapper = document.querySelector('.wrapper');
let gridSize = 0;
let gridItemColor = "";
let eraserSelected = false;
let strokeComplete = false;
let strokeBuffer = []; //  stores the latest stroke data
let wasBuffer = [];
let isBuffer = [];
let atBuffer = [];
let strokeList = []; // stores stroke history
let wasList = [];
let isList = [];
let atList = [];
let strokeCount = 0;
let prevStrokeColor = "";
let historyPos = 0;
let redoPos = 0;


// quick bugfix to prevent pen always being down
wrapper.addEventListener('mouseup', () => {
        mousedown = false;
      });
//  need to add the extra credit assignment, clear button and more than 0 styling
  

//  update Grid size
sliderSize.forEach((size) => {
  size.innerHTML = slider.value;
});


const createDivs = (gridSize = 16) => {
  for (i = 0; i < gridSize * gridSize; i++) {
    const newDiv = document.createElement('div');
    newDiv.classList.toggle('grid-item');
    newDiv.setAttribute('id', i);
    newDiv.setAttribute('draggable', 'false');
    newDiv.setAttribute('style', 'background-color: white');
    gridContainer.appendChild(newDiv);
  }
  gridContainer.setAttribute('style', 'grid-template-columns: repeat(' + gridSize + ', auto); grid-template-rows: repeat('+ gridSize +', auto);')
  getGridSize(gridSize);
}

const getGridSize = (size) => {
  gridSize = size;
  return gridSize;
}
//  strokeBuffer holds a temporary array of the latest stroke colors
//  strokeList holds an array of every strokeBuffer
//  i need to gather more data. for example: the position of each gridItem
//  autosave when u change grid size. save button. different save for each grid
//  transfer button or translation button. allows you to translate divs you select or the entire strokeList
//  transfer button allows you to move your current save across different grids. click it again to stop translating.
//  you click transfer. you can drag the grid and u can see it scale. you click it again to save to that specific grid size. ignoring the inbetween saves it would normally make
//  instead of a different save for each slot. maybe just a seperate save slot, creation button, etc.
//  modular. database for saving. selection tool. rotating. translating
let mousedown = false;
const draw = (gridItemColor) => {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((gridItem) => { //if mousedown then mouseenter/exit then stop if mouseup
      gridItem.addEventListener('mousedown', () => {
        mousedown = true;
        strokeComplete = false;
        getPrevStroke(gridItem);
        if (eraserSelected) {
          gridItem.setAttribute('style', 'background-color: white')
          gridItem.classList.add('touched');
          gridItem.classList.add('prev-color-' + prevStrokeColor);
        } else {
          gridItem.setAttribute('style', 'background-color: ' + gridItemColor);
          gridItem.classList.add('touched');
          gridItem.classList.add('prev-color-' + prevStrokeColor);
        }
        getStroke(gridItem, prevStrokeColor);
      });
      gridItem.addEventListener('mouseenter', () => {
        getPrevStroke(gridItem);
        if (mousedown && eraserSelected === false) {  
          gridItem.setAttribute('style', 'background-color: ' + gridItemColor);
          gridItem.classList.add('touched');
          gridItem.classList.add('prev-color-' + prevStrokeColor);
          getStroke(gridItem, prevStrokeColor);
        } else if (mousedown && eraserSelected) {
          gridItem.setAttribute('style', 'background-color: white')
          gridItem.classList.add('touched');
          gridItem.classList.add('prev-color-' + prevStrokeColor);
          getStroke(gridItem, prevStrokeColor);
        } 
        });
      gridItem.addEventListener('mouseup', () => {
        mousedown = false;
        strokeComplete = true;
        console.log(getStroke(gridItem));
      });
      
  }); 
}

const getPrevStroke = (gridItem) => {
  prevStrokeColor = gridItem.getAttribute('style').replace('background-color: ', '');
  return prevStrokeColor;
}

const getStroke = (gridItem, prevStrokeColor) => {
  if (strokeComplete) {
    strokeList.push(strokeBuffer);
    wasList.push(wasBuffer);
    isList.push(isBuffer);
    atList.push(atBuffer);
    strokeCount++;
    strokeBuffer = [];
    wasBuffer = [];
    isBuffer = [];
    atBuffer = [];
    historyPos = strokeList.length - 1;
    return strokeList;
  } else {
    const strokeColor = gridItem.getAttribute('style').replace('background-color: ', '');
    const strokePos = gridItem.getAttribute('id');
    strokeBuffer.push("was:" + prevStrokeColor + ", " + "is:" + strokeColor + ", " + "at:" + strokePos);
    wasBuffer.push(prevStrokeColor);
    isBuffer.push(strokeColor);
    atBuffer.push(strokePos);
    return strokeBuffer;
  }
}



const drawHistory = () => { //  need to extract was: and pos:
  const gridItems = document.querySelectorAll('.touched');
  gridItems.forEach((gridItem) => {
    // (atList[historyPos] == gridItem.className.replace('', '')) {
    //gridItem.setAttribute('style', 'background-color: ' + prevStrokeColor);
    //}
    
    //
    //grabs the prev-color of all touched items. console.log(gridItem.className.split(' ')[2].replace('prev-color-', ''));
  });

console.log(strokeList[historyPos]);
selector()

}

const selector = (was, is, at) => {
  const yes = document.getElementById(at)  
  yes.setAttribute('style', 'background-color: ' + is); 

}
selector('blue', 0);

//  undo
window.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'z') {
    if (historyPos > 0) {
      historyPos--;
    } else {
      console.log('Cannot undo anymore');
    }
    drawHistory();
    console.log(historyPos);
  }
});


//  redo
window.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'y') {
    if (historyPos < strokeList.length - 1) {
    historyPos++;
    } else {
      console.log('Cannot redo anymore');
    }
    drawHistory();
    console.log(historyPos);
  }
});

  // eraser button
  const eraser = document.querySelector('.eraser-container button');
  eraser.addEventListener('click', () => {
    if (eraserSelected) {
      eraserSelected = false;
    } else {
      eraserSelected = true;
    }
    console.log(gridItemColor);
  });

  //  clear button
  const clear = document.querySelector('.clear-container button');
  clear.addEventListener('click', () => {
    sliderUpdate();
  });


const removeDivs = () => {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((gridItem) => {
    gridContainer.removeChild(gridItem);
  });
}

//lets make a buffer to store the last however many changes made to undo them

// update Grid size when slider is used
const sliderUpdate = slider.oninput = () => {
  sliderSize.forEach((size) => {
      size.innerHTML = slider.value;
    });
    removeDivs();
    createDivs(slider.value);
    draw(gridItemColor);
}

// init
createDivs();
gridItemColor = 'red';
draw(gridItemColor);


