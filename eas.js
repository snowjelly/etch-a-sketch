const gridContainer = document.querySelector('.grid-container');
const slider = document.getElementById('slider');
const sliderSize = document.querySelectorAll('#value');
let gridSize = 0;

//  update Grid size
sliderSize.forEach((size) => {
  size.innerHTML = slider.value;
});


const createDivs = (gridSize = 16) => {
  for (i = 0; i < gridSize * gridSize; i++) {
    const newDiv = document.createElement('div');
    newDiv.classList.toggle('grid-item');
    gridContainer.appendChild(newDiv);
  }
  gridContainer.setAttribute('style', 'grid-template-columns: repeat(' + gridSize + ', auto); grid-template-rows: repeat('+ gridSize +', auto);')
  getGridSize(gridSize);
}

const getGridSize = (size) => {
  gridSize = size;
  return gridSize;
}

const draw = (gridItemColor) => {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((gridItem) => {
    gridItem.addEventListener('mouseenter', () => {
      gridItem.setAttribute('style', 'background-color: ' + gridItemColor);
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
}

createDivs();
draw('red');

