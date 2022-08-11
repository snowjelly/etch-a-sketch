const gridContainer = document.querySelector('.grid-container');
const slider = document.getElementById('slider');
const sliderSize = document.querySelectorAll('#value');
let gridSize = 0;

//  need to add the extra credit assignment, clear button and more than 0 styling
  

//  update Grid size
sliderSize.forEach((size) => {
  size.innerHTML = slider.value;
});


const createDivs = (gridSize = 16) => {
  for (i = 0; i < gridSize * gridSize; i++) {
    const newDiv = document.createElement('div');
    newDiv.classList.toggle('grid-item');
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
let mousedown = false;
const draw = (gridItemColor) => {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((gridItem) => { //if mousedown then mouseenter/exit then stop if mouseup
      gridItem.addEventListener('mousedown', () => {
        mousedown = true;
        //add class clicked? or just store a variable prolly  
        gridItem.setAttribute('style', 'background-color: ' + gridItemColor);
      });
      gridItem.addEventListener('mouseenter', () => {
        if (mousedown) {  
          gridItem.setAttribute('style', 'background-color: ' + gridItemColor);
        }
        });
      gridItem.addEventListener('mouseup', () => {
        mousedown = false;
      });
      
  }); 
}
const removeDivs = () => {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((gridItem) => {
    gridContainer.removeChild(gridItem);
  });
}

// update Grid size when slider is used
slider.oninput = () => {
  sliderSize.forEach((size) => {
      size.innerHTML = slider.value;
    });
    removeDivs();
    createDivs(slider.value);
    draw('red');
}

createDivs();
draw('red');

