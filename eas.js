const gridContainer = document.querySelector('.grid-container');


const createDivs = (gridSize = 16) => {
  for (i = 0; i < gridSize * gridSize; i++) {
    const newDiv = document.createElement('div');
    newDiv.classList.toggle('grid-item');
    gridContainer.appendChild(newDiv);
  }
  gridContainer.setAttribute('style', 'grid-template-columns: repeat(' + gridSize + ', auto); grid-template-rows: repeat('+ gridSize +', auto);')
}

const draw = (gridItemColor) => {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((gridItem) => {
    gridItem.addEventListener('mouseenter', () => {
      gridItem.setAttribute('style', 'background-color: ' + gridItemColor);
    });
  });
} 

createDivs();
draw('red');