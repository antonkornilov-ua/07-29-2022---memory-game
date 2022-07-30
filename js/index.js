const cards = document.querySelectorAll(".memory-card");
const resetBtn = document.querySelector(".reset")

let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;
const flipCard = e => {
    if (boardLocked) return;
    const target = e.target.parentElement;
    if (target === firstCard) return;
    target.classList.add('flip');
    if(!hasFlippedCard){
        // first click
        hasFlippedCard = true;
        firstCard = target;
    } else{
        // second card
        hasFlippedCard = false;
        secondCard = target;
        //  check for match
        checkForMatch();
    }
};
const checkForMatch = () => {
    const isEqual = firstCard.dataset.framework === secondCard.dataset.framework;
    isEqual ? disableCards() : unflipCards(); 
}
const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
};
const unflipCards = () => {
 boardLocked = true;
        setTimeout(() => {           
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard()
        }, 1000);
}
const resetBoard = () => {
    // hardmode
    [hasFlippedCard, boardLocked] = [false, false];
    [firstCard, secondCard] = [null, null];
    // Better
//     hasFlippedCard = boardLocked = false;
//     firstCard = secondCard = null;
};
cards.forEach(card => {
    // add eventListener to every card
    card.addEventListener("click", flipCard)
    
    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
});
resetBtn.addEventListener('click', function () {
    window.location.reload(); 
});

