const gridContainer = document.querySelector('.grid-container');
const slider = document.getElementById('slider');
const sliderSize = document.querySelectorAll('#value');
const wrapper = document.querySelector('.wrapper');
let gridSize = 0;
let gridItemColor = "";
let eraserSelected = false;
let strokeComplete = false;
let strokeBuffer = [];
let strokeList = [];
let strokeCount = 0;
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
// 
let mousedown = false;
const draw = (gridItemColor) => {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((gridItem) => { //if mousedown then mouseenter/exit then stop if mouseup
      gridItem.addEventListener('mousedown', () => {
        mousedown = true;
        strokeComplete = false;
        if (eraserSelected) {
          gridItem.setAttribute('style', 'background-color: white')
        } else {
          gridItem.setAttribute('style', 'background-color: ' + gridItemColor);
        }
        console.log(getStroke(gridItem));
      });
      gridItem.addEventListener('mouseenter', () => {
        if (mousedown && eraserSelected === false) {  
          gridItem.setAttribute('style', 'background-color: ' + gridItemColor);
          console.log(getStroke(gridItem));
        } else if (mousedown && eraserSelected) {
          gridItem.setAttribute('style', 'background-color: white')
          console.log(getStroke(gridItem));
        } 
        });
      gridItem.addEventListener('mouseup', () => {
        mousedown = false;
        strokeComplete = true;
        console.log(getStroke(gridItem));
      });
      
  }); 
}

  const getStroke = (gridItem) => {
    if (strokeComplete) {
      strokeList.push(strokeBuffer);
      strokeCount++;
      strokeBuffer = [];
      return strokeList;
    } else {
      const strokeColor = gridItem.getAttribute('style').replace('background-color: ', '');
      const strokePos = gridItem.className.replace('grid-item ', '');
      strokeBuffer.push(strokeColor + "-" + strokePos);
      return strokeBuffer;
    }
  }

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
