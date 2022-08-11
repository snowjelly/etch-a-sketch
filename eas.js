const gridContainer = document.querySelector('.grid-container');
const slider = document.getElementById('slider');
const sliderSize = document.querySelectorAll('#value');
const wrapper = document.querySelector('.wrapper');
let gridSize = 0;
let gridItemColor = "";
let eraserSelected = false;
let strokeComplete = false;
let strokeBuffer = []; //  stores the latest stroke data
let strokeList = []; // stores stroke history
let strokeCount = 0;
let prevStrokeColor = "";
let historyPos = 0;


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
    newDiv.classList.toggle(i);
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
        } else {
          gridItem.setAttribute('style', 'background-color: ' + gridItemColor);
        }
        console.log(getStroke(gridItem, prevStrokeColor));
      });
      gridItem.addEventListener('mouseenter', () => {
        getPrevStroke(gridItem);
        if (mousedown && eraserSelected === false) {  
          gridItem.setAttribute('style', 'background-color: ' + gridItemColor);
          console.log(getStroke(gridItem, prevStrokeColor));
        } else if (mousedown && eraserSelected) {
          gridItem.setAttribute('style', 'background-color: white')
          console.log(getStroke(gridItem, prevStrokeColor));
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
      strokeCount++;
      strokeBuffer = [];
      historyPos = strokeList.length - 1;
      return strokeList;
    } else {
      const strokeColor = gridItem.getAttribute('style').replace('background-color: ', '');
      const strokePos = gridItem.className.replace('grid-item ', '');
      strokeBuffer.push("was:" + prevStrokeColor + ", " + "is:" + strokeColor + ", " + "at:" + strokePos);
      return strokeBuffer;
    }
  }
const drawHistory = () => {
    console.log(strokeList[historyPos]);
    historyPos--;
}

  //  undo
  window.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'z') {
      drawHistory();
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
