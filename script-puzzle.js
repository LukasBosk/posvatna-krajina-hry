document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.getElementById('puzzle-container');
    const shuffleButton = document.getElementById('shuffle-button');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const puzzleInfo = document.getElementById('puzzle-info');
    const messageDisplay = document.getElementById('message');

    const numRows = 3;
    const numCols = 3;
    
    let dynamicTotalPuzzleWidth;
    let dynamicTotalPuzzleHeight;

    const puzzleImages = [
        'images/puzzle1.jpg',
        'images/puzzle2.jpg',
        'images/Borotin4R.jpg',
        'images/Borotin4R2.jpg',
        'images/puzzle3.jpg',
        'images/puzzle4.jpg',
        'images/puzzle5.jpg',
        'images/Michov10R.jpg',
        'images/Michov10R2.jpg',
        'images/puzzle6.jpg',
        'images/puzzle7.jpg',
        'images/puzzle8.jpg',
        'images/Vanovice4R.jpg',
        'images/Vanovice4R2.jpg',
        'images/puzzle9.jpg',
        'images/puzzle10.jpg',
        'images/osada3R.jpg',
        'images/osadaR.jpg',
        'images/puzzle11.jpg',
        'images/puzzle12.jpg',
        'images/Vanovice6R.jpg',
        'images/Vanovice6R2.jpg',
        'images/puzzle13.jpg',
        'images/puzzle14.jpg',
        'images/puzzle15.jpg',
        'images/puzzle16.jpg',
        'images/VelkeOpatovice1R.jpg',
        'images/VelkeOpatovice1R2.jpg',
        'images/puzzle17.jpg',
        'images/puzzle18.jpg',
        'images/puzzle19.jpg',
        'images/tkaniR.jpg',
        'images/puzzle20.jpg',
        'images/puzzle21.jpg'
        'images/hrobR.jpg',
    ];

    const puzzleMessages = {
        'images/puzzle1.jpg': 'Bronzová sekera s tulejí, doba bronzová - kultura lužických popelnicových polí',
        'images/puzzle2.jpg': 'Bronzový srp, doba bronzová - kultura lužických popelnicových polí',
        'images/Borotin4R.jpg': 'Rekonstrukce vzhledu ženy s použitím artefaktů z depotu Borotín 4. Doba bronzová - kultura lužických popelnicových polí',
        'images/Borotin4R2.jpg': 'Depot Borotín 4 - původně jej tvořily dva šperky: spona ukončená růžicemi a náhrdelník složený z osmi závěsků ve tvaru koleček, závěsku ve tvaru srpku, jednoduchého litého kroužku, trubiček a točeného drátu.',
        'images/puzzle3.jpg': 'Bronzová růžicová spona, doba bronzová - kultura lužických popelnicových polí',
        'images/puzzle4.jpg': 'Bronzový lunicovitý závěsek s tulejkou, doba bronzová - kultura lužických popelnicových polí',
        'images/puzzle5.jpg': 'Bronzový závěsek, starší doba bronzová - věteřovská kultura',
        'images/Michov10R.jpg': 'Rekonstrukce vzhledu ženy na základě luxusní ženské garnitury z depotu Míchov 10. Doba bronzová - kultura lužických popelnicových polí',
        'images/Michov10R2.jpg': 'Depotový soubor Míchov 10 tvoří dva masivní spirálovité náramky ukončené růžicemi a dva křehké spirálovité nánožníky s růžicemi.',
        'images/puzzle6.jpg': 'Bronzová sekera s laloky, doba bronzová - kultura lužických popelnicových polí',
        'images/puzzle7.jpg': 'Bronzové kopí s tulejkou, doba bronzová - kultura lužických popelnicových polí',
        'images/puzzle8.jpg': 'Svitek zlatého drátu, doba bronzová - kultura lužických popelnicových polí',
        'images/Vanovice4R.jpg': 'Rekonstrukce párového nošení dlouhých jehlic u žen na základě depotu Vanovice 4. Doba bronzová - kultura lužických popelnicových polí',
        'images/Vanovice4R2.jpg': 'Depot Vanovice 4 je tvořen pouze jedním typem šperku – dvěma páry identických jehlic, netypicky dlouhých a zdobených jemnou rytou výzdobou.',
        'images/puzzle9.jpg': 'Bronzové udidlo, doba bronzová - kultura lužických popelnicových polí',
        'images/puzzle10.jpg': 'Licí formy, doba bronzová - kultura lužických popelnicových polí',
        'images/osada3R.jpg': 'Rekonstrukce nadzemního domu kůlové konstrukce',
        'images/osadaR.jpg': 'Rekonstrukce osady doby bronzové',
        'images/puzzle11.jpg': 'Jantarový korálek, doba bronzová - kultura lužických popelnicových polí',
        'images/puzzle12.jpg': 'Bronzový závěsek, doba bronzová - kultura lužických popelnicových polí',
        'images/Vanovice6R.jpg': 'Rekonstrukce nošení depotu Vanovice 6. Doba bronzová - kultura lužických popelnicových polí',
        'images/Vanovice6R2.jpg': 'Depot Vanovice 6 obsahoval celkem šest kusů, z toho většinu představují šperky malých rozměrů, odpovídajících dětské velikosti: dva ozdobné kruhy (nákrčníky) a dva náramky. Depot dále obsahoval břitvu a drobnou hlavici jehlice s jemnou výzdobou',
        'images/puzzle13.jpg': 'Bronzová štítová spona, doba bronzová - kultura lužických popelnicových polí',
        'images/puzzle14.jpg': 'Výzdobný motiv štítové spony, doba bronzová - kultura lužických popelnicových polí',
        'images/puzzle15.jpg': 'Bronzové kladívko, doba bronzová - kultura lužických popelnicových polí',
        'images/puzzle16.jpg': 'Bronzový spirálovitý nápažník, doba bronzová - kultura lužických popelnicových polí',
        'images/VelkeOpatovice1R.jpg': 'Rekonstrukce mužské osobní výbavy na základě depotu Velké Opatovice 1. Doba bronzová - kultura lužických popelnicových polí',
        'images/VelkeOpatovice1R2.jpg': 'Depot Velké Opatovice 1 byl složen z nástroje (sekery), zbraně (kopí s tulejí) a šperku sloužícího k sepnutí šatů (jehlice)',
        'images/puzzle17.jpg': 'Rukojeť bronzového meče, doba bronzová - kultura lužických popelnicových polí',
        'images/puzzle18.jpg': 'Keramická nádoba, doba bronzová - kultura lužických popelnicových polí',
        'images/puzzle19.jpg': 'Bronzové dláto s tulejí, doba bronzová - kultura lužických popelnicových polí',
        'images/tkaniR.jpg': 'Tkaní na jednoduchém tkalcovském stavu',
        'images/puzzle20.jpg': 'Bronzový spirálovitý náramek, doba bronzová - kultura lužických popelnicových polí',
        'images/puzzle21.jpg': 'Bronzový náramek, doba bronzová - kultura lužických popelnicových polí'
        'images/hrobR.jpg': 'Rekonstrukce pohřbu - typickým pohřbem kultury lužických popelnicových polí byl žárový pohřeb uložený v keramické nádobě.'
    };

    let currentPuzzleIndex = 0;
    let pieces = [];
    let currentPositions = [];
    let originalPositions = [];

    let draggedPiece = null;
    let highlightedPiece = null; // NOVÁ PROMĚNNÁ pro sledování zvýrazněného dílku

    // --- Funkce pro výpočet rozměrů puzzle na základě velikosti okna a rozměrů obrázku ---
    function calculatePuzzleDimensions(imageNaturalWidth, imageNaturalHeight) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 0;
        const navControlsHeight = document.querySelector('.navigation-controls') ? document.querySelector('.navigation-controls').offsetHeight : 0;
        const gameControlsHeight = document.querySelector('.game-controls') ? document.querySelector('.game-controls').offsetHeight : 0;
        const backButtonHeight = document.querySelector('.back-button') ? document.querySelector('.back-button').offsetHeight : 0;
        const messageHeight = document.getElementById('message') ? document.getElementById('message').offsetHeight : 0;

        const verticalPaddingAndMargins = 20 * 2 + 20 + 20 + 30 + 20;

        const maxAvailableWidth = viewportWidth * 0.9;
        const maxAvailableHeight = viewportHeight - (headerHeight + navControlsHeight + gameControlsHeight + backButtonHeight + messageHeight + verticalPaddingAndMargins);

        let targetWidth;
        let targetHeight;

        const imageAspectRatio = imageNaturalWidth / imageNaturalHeight;
        const containerAspectRatio = maxAvailableWidth / maxAvailableHeight;

        if (imageAspectRatio > containerAspectRatio) {
            targetWidth = maxAvailableWidth;
            targetHeight = maxAvailableWidth / imageAspectRatio;
        } else {
            targetHeight = maxAvailableHeight;
            targetWidth = maxAvailableHeight * imageAspectRatio;
        }

        targetWidth = Math.max(targetWidth, 200);
        targetHeight = Math.max(targetHeight, 200);

        if (targetWidth > maxAvailableWidth) {
            targetWidth = maxAvailableWidth;
            targetHeight = maxAvailableWidth / imageAspectRatio;
        }
        if (targetHeight > maxAvailableHeight) {
            targetHeight = maxAvailableHeight;
            targetWidth = maxAvailableHeight * imageAspectRatio;
        }

        dynamicTotalPuzzleWidth = targetWidth;
        dynamicTotalPuzzleHeight = targetHeight;

        puzzleContainer.style.width = `${dynamicTotalPuzzleWidth}px`;
        puzzleContainer.style.height = `${dynamicTotalPuzzleHeight}px`;

        const pieceWidth = dynamicTotalPuzzleWidth / numCols;
        const pieceHeight = dynamicTotalPuzzleHeight / numRows;

        puzzleContainer.style.gridTemplateColumns = `repeat(${numCols}, ${pieceWidth}px)`;
        puzzleContainer.style.gridTemplateRows = `repeat(${numRows}, ${pieceHeight}px)`;

        puzzleContainer.style.setProperty('--puzzle-total-width', `${dynamicTotalPuzzleWidth}px`);
        puzzleContainer.style.setProperty('--puzzle-total-height', `${dynamicTotalPuzzleHeight}px`);
    }

    // --- Funkce pro načtení a inicializaci puzzle ---
    function loadPuzzle(index) {
        if (index < 0 || index >= puzzleImages.length) {
            console.error('Neplatný index puzzle obrázku.');
            return;
        }

        currentPuzzleIndex = index;
        const imageUrl = puzzleImages[currentPuzzleIndex];
        puzzleInfo.textContent = `Puzzle ${currentPuzzleIndex + 1} / ${puzzleImages.length}`;
        messageDisplay.textContent = '';

        const img = new Image();
        img.onload = () => {
            calculatePuzzleDimensions(img.naturalWidth, img.naturalHeight);
            initializePuzzle(imageUrl);

            prevButton.disabled = (currentPuzzleIndex === 0);
            nextButton.disabled = (currentPuzzleIndex === puzzleImages.length - 1);
            shuffleButton.disabled = false;
        };
        img.onerror = () => {
            console.error(`Nepodařilo se načíst obrázek: ${imageUrl}`);
            messageDisplay.textContent = 'Chyba při načítání obrázku.';
            puzzleContainer.innerHTML = '';
            prevButton.disabled = true;
            nextButton.disabled = true;
            shuffleButton.disabled = true;
        };
        img.src = imageUrl;
    }

    // --- Funkce pro inicializaci dílků puzzle ---
    function initializePuzzle(imageDataUrl) {
        puzzleContainer.innerHTML = '';
        pieces = [];
        currentPositions = [];
        originalPositions = [];
        
        const pieceWidth = dynamicTotalPuzzleWidth / numCols;
        const pieceHeight = dynamicTotalPuzzleHeight / numRows;

        for (let i = 0; i < numRows * numCols; i++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            
            piece.style.width = `${pieceWidth}px`;
            piece.style.height = `${pieceHeight}px`;
            piece.style.backgroundImage = `url(${imageDataUrl})`;

            const row = Math.floor(i / numCols);
            const col = i % numCols;
            
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;
            
            piece.dataset.originalIndex = i;
            piece.draggable = true;

            pieces.push(piece);
            currentPositions.push(i);
            originalPositions.push(i);

            puzzleContainer.appendChild(piece);
        }

        addEventListenersToPieces();
        positionPieces();
        shufflePieces();
    }

    // --- Funkce pro umístění dílků v gridu ---
    function positionPieces() {
        pieces.forEach((piece, index) => {
            const targetIndex = currentPositions[index];
            const row = Math.floor(targetIndex / numCols);
            const col = targetIndex % numCols;
            piece.style.gridRowStart = row + 1;
            piece.style.gridColumnStart = col + 1;
            // Zajistí, že se styly z dotykového přetahování resetují, pokud by z nějakého důvodu zůstaly
            piece.style.removeProperty('transform'); 
            piece.style.removeProperty('left');
            piece.style.removeProperty('top');
            piece.style.removeProperty('z-index');
        });
    }

    // --- Funkce pro zamíchání dílků ---
    function shufflePieces() {
        messageDisplay.textContent = '';
        for (let i = currentPositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentPositions[i], currentPositions[j]] = [currentPositions[j], currentPositions[i]];
        }
        positionPieces();
        checkWin();
    }

    // --- Funkce pro přidání event listenerů pro přetahování (myš i dotyk) ---
    function addEventListenersToPieces() {
        pieces.forEach(piece => {
            // --- Myší události (zachovány pro desktop) ---
            piece.addEventListener('dragstart', (e) => {
                draggedPiece = piece;
                e.dataTransfer.effectAllowed = 'move';
                piece.classList.add('dragging');
                const rect = piece.getBoundingClientRect();
                draggedPiece.style.left = `${e.clientX}px`;
                draggedPiece.style.top = `${e.clientY}px`;
            });

            piece.addEventListener('dragend', () => {
                if (draggedPiece) {
                    draggedPiece.classList.remove('dragging');
                    draggedPiece.style.transform = '';
                    draggedPiece.style.removeProperty('left');
                    draggedPiece.style.removeProperty('top');
                    draggedPiece = null;
                    positionPieces();
                    checkWin();
                }
            });

            piece.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                if (draggedPiece) {
                    draggedPiece.style.left = `${e.clientX}px`;
                    draggedPiece.style.top = `${e.clientY}px`;

                    // Zvýraznění cílového dílku během dragover
                    let elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
                    if (highlightedPiece && highlightedPiece !== elementUnderCursor) {
                        highlightedPiece.classList.remove('highlight');
                    }
                    if (elementUnderCursor && elementUnderCursor.classList.contains('puzzle-piece') && elementUnderCursor !== draggedPiece) {
                        elementUnderCursor.classList.add('highlight');
                        highlightedPiece = elementUnderCursor;
                    } else {
                        highlightedPiece = null;
                    }
                }
            });

            piece.addEventListener('drop', (e) => {
                e.preventDefault();
                if (draggedPiece && draggedPiece !== piece) {
                    const draggedIndexInPiecesArray = pieces.indexOf(draggedPiece);
                    const targetIndexInPiecesArray = pieces.indexOf(piece);

                    const tempCurrentPositionOfDragged = currentPositions[draggedIndexInPiecesArray];
                    currentPositions[draggedIndexInPiecesArray] = currentPositions[targetIndexInPiecesArray];
                    currentPositions[targetIndexInPiecesArray] = tempCurrentPositionOfDragged;
                }
                // positionPieces() a checkWin() se volají v dragend
            });

            // --- Dotykové události (pro mobilní zařízení/tablety) ---
            piece.addEventListener('touchstart', (e) => {
                e.preventDefault();

                draggedPiece = piece;
                draggedPiece.classList.add('dragging');

                const touch = e.touches[0];
                draggedPiece.style.left = `${touch.clientX}px`;
                draggedPiece.style.top = `${touch.clientY}px`;
            });

            piece.addEventListener('touchmove', (e) => {
                if (!draggedPiece) return;
                e.preventDefault(); 

                const touch = e.touches[0];
                draggedPiece.style.left = `${touch.clientX}px`;
                draggedPiece.style.top = `${touch.clientY}px`;

                // --- NOVÁ LOGIKA PRO ZVÝRAZNĚNÍ CÍLE BĚHEM PŘETAHOVÁNÍ ---
                // Dočasně skryjeme tažený dílek, abychom našli element pod ním
                draggedPiece.style.visibility = 'hidden';
                let elementUnderFinger = document.elementFromPoint(touch.clientX, touch.clientY);
                draggedPiece.style.visibility = 'visible';

                // Zruší zvýraznění předchozího dílku
                if (highlightedPiece && highlightedPiece !== elementUnderFinger) {
                    highlightedPiece.classList.remove('highlight');
                }

                // Zvýrazní nový cílový dílek, pokud je to puzzle-piece a není to tažený dílek
                if (elementUnderFinger && elementUnderFinger.classList.contains('puzzle-piece') && elementUnderFinger !== draggedPiece) {
                    elementUnderFinger.classList.add('highlight');
                    highlightedPiece = elementUnderFinger;
                } else {
                    highlightedPiece = null; // Pokud není pod prstem žádný platný dílek
                }
                // --- KONEC NOVÉ LOGIKY ---
            });

            piece.addEventListener('touchend', (e) => {
                if (!draggedPiece) return;

                // Vyčistí zvýraznění při ukončení přetahování
                if (highlightedPiece) {
                    highlightedPiece.classList.remove('highlight');
                    highlightedPiece = null;
                }

                // Dočasně skryjeme tažený dílek, abychom našli element pod ním
                draggedPiece.style.visibility = 'hidden';
                const touch = e.changedTouches[0];
                let targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
                draggedPiece.style.visibility = 'visible';

                // Pokud existuje cílový element a je to jiný dílek puzzle
                if (targetElement && targetElement.classList.contains('puzzle-piece') && targetElement !== draggedPiece) {
                    const draggedIndexInPiecesArray = pieces.indexOf(draggedPiece);
                    const targetIndexInPiecesArray = pieces.indexOf(targetElement);

                    const tempCurrentPositionOfDragged = currentPositions[draggedIndexInPiecesArray];
                    currentPositions[draggedIndexInPiecesArray] = currentPositions[targetIndexInPiecesArray];
                    currentPositions[targetIndexInPiecesArray] = tempCurrentPositionOfDragged;
                }

                // Resetujeme styly taženého dílku
                draggedPiece.classList.remove('dragging');
                draggedPiece.style.removeProperty('left');
                draggedPiece.style.removeProperty('top');
                draggedPiece.style.removeProperty('transform');
                
                draggedPiece = null;

                positionPieces();
                checkWin();
            });
        });
    }

    // --- Funkce pro kontrolu výhry ---
    function checkWin() {
        let isSolved = true;
        for (let i = 0; i < numRows * numCols; i++) {
            if (parseInt(pieces[i].dataset.originalIndex) !== currentPositions[i]) {
                isSolved = false;
                break;
            }
        }

        if (isSolved) {
            const currentImageUrl = puzzleImages[currentPuzzleIndex];
            messageDisplay.textContent = puzzleMessages[currentImageUrl] || 'Gratulujeme! Puzzle složeno!';
            pieces.forEach(piece => piece.classList.add('correct'));
            shuffleButton.disabled = true;
        } else {
            messageDisplay.textContent = '';
            pieces.forEach(piece => piece.classList.remove('correct'));
            if (pieces.length > 0) {
                prevButton.disabled = (currentPuzzleIndex === 0);
                nextButton.disabled = (currentPuzzleIndex === puzzleImages.length - 1);
                shuffleButton.disabled = false;
            }
        }
    }

    // --- Event Listenery pro tlačítka navigace ---
    prevButton.addEventListener('click', () => {
        if (currentPuzzleIndex > 0) {
            loadPuzzle(currentPuzzleIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPuzzleIndex < puzzleImages.length - 1) {
            loadPuzzle(currentPuzzleIndex + 1);
        }
    });

    // --- Event Listener pro tlačítko "Zamíchat" ---
    shuffleButton.addEventListener('click', shufflePieces);

    // --- Načtení prvního puzzle při načtení stránky ---
    if (puzzleImages.length > 0) {
        loadPuzzle(0);
    } else {
        messageDisplay.textContent = 'Nebyly nalezeny žádné puzzle obrázky. Zkontrolujte pole puzzleImages v script-puzzle.js.';
        shuffleButton.disabled = true;
        prevButton.disabled = true;
        nextButton.disabled = true;
    }

    // --- Event Listener pro změnu velikosti okna (responzivita) ---
    window.addEventListener('resize', () => {
        loadPuzzle(currentPuzzleIndex);
    });
});

