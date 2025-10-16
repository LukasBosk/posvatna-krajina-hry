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
        // ZMĚNA: Odstraněn problematický záznam 'images/ Licí formy.jpg'
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
        'images/puzzle21.jpg',
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
        'images/puzzle21.jpg': 'Bronzový náramek, doba bronzová - kultura lužických popelnicových polí',
        'images/hrobR.jpg': 'Rekonstrukce pohřbu - typickým pohřbem kultury lužických popelnicových polí byl žárový pohřeb uložený v keramické nádobě.',
    };

    let currentPuzzleIndex = 0;
    let pieces = [];
    let currentPositions = [];
    let originalPositions = [];

    let draggedPiece = null;
    let highlightedPiece = null; 

    // --- Proměnné pro offset myši/dotyku ---
    let offsetX = 0; 
    let offsetY = 0;

    // --- Funkce pro stabilní výpočet rozměrů puzzle (KLÍČOVÁ OPRAVA) ---
    function calculatePuzzleDimensions(imageNaturalWidth, imageNaturalHeight) {
        // Používáme ŠÍŘKU okna (stabilní na mobilech) jako primární kotvu.
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight; // Pouze pro max. limit.

        // Cíl: 90% šířky okna (což odpovídá max-width: 90vw v CSS pro puzzle-container)
        const maxAllowedWidth = viewportWidth * 0.9; 
        
        let targetWidth = maxAllowedWidth;
        const imageAspectRatio = imageNaturalWidth / imageNaturalHeight;
        
        // Výpočet výšky POUZE na základě stabilní šířky a poměru stran
        let targetHeight = targetWidth / imageAspectRatio;
        
        // Sekundární kontrola: Pojistka, aby se puzzle vešlo na výšku i s navigačními lištami.
        // Povolíme max. 85% aktuální výšky.
        const maxHeightLimit = viewportHeight * 0.85; 

        if (targetHeight > maxHeightLimit) {
            targetHeight = maxHeightLimit;
            targetWidth = targetHeight * imageAspectRatio;
        }

        // Zajištění minimálních a finálních rozměrů
        targetWidth = Math.min(Math.max(targetWidth, 200), maxAllowedWidth);
        targetHeight = Math.min(Math.max(targetHeight, 200), maxHeightLimit);

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
        
        // Odstranění třídy .correct před načtením nového puzzle, aby se resetoval rámeček
        pieces.forEach(piece => piece.classList.remove('correct'));

        const img = new Image();
        img.onload = () => {
            // Při každém načtení (včetně otočení) přepočítáme rozměry
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
            // Zajistí, že se styly z ručního přetahování resetují
            piece.style.removeProperty('transform'); 
            piece.style.removeProperty('left');
            piece.style.removeProperty('top');
            piece.style.removeProperty('z-index');
        });
    }

    // --- Funkce pro zamíchání dílků ---
    function shufflePieces() {
        messageDisplay.textContent = '';
        pieces.forEach(piece => piece.classList.remove('correct')); // Zajištění odstranění třídy 'correct'
        
        for (let i = currentPositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentPositions[i], currentPositions[j]] = [currentPositions[j], currentPositions[i]];
        }
        positionPieces();
        checkWin();
    }

    // --- KLÍČOVÉ FUNKCE pro přetahování (beze změny, jsou správné) ---

    function startDrag(e) {
        e.preventDefault(); 
        
        draggedPiece = e.currentTarget;
        draggedPiece.classList.add('dragging');

        const clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
        const clientY = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;

        const rect = draggedPiece.getBoundingClientRect();
        offsetX = clientX - rect.left - rect.width / 2;
        offsetY = clientY - rect.top - rect.height / 2;

        draggedPiece.style.left = `${clientX}px`;
        draggedPiece.style.top = `${clientY}px`;

        if (e.type === 'mousedown') {
            document.addEventListener('mousemove', dragMove);
            document.addEventListener('mouseup', endDrag);
        }
    }

    function dragMove(e) {
        if (!draggedPiece) return;
        e.preventDefault();

        const clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
        const clientY = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;
        
        draggedPiece.style.left = `${clientX}px`;
        draggedPiece.style.top = `${clientY}px`;

        draggedPiece.style.visibility = 'hidden';
        let elementUnderCursor = document.elementFromPoint(clientX, clientY);
        draggedPiece.style.visibility = 'visible';

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

    function endDrag(e) {
        if (!draggedPiece) return;
        
        const clientX = e.clientX !== undefined ? e.clientX : e.changedTouches[0].clientX;
        const clientY = e.clientY !== undefined ? e.clientY : e.changedTouches[0].clientY;

        draggedPiece.style.visibility = 'hidden';
        let targetElement = document.elementFromPoint(clientX, clientY);
        draggedPiece.style.visibility = 'visible';

        if (targetElement && targetElement.classList.contains('puzzle-piece') && targetElement !== draggedPiece) {
            const draggedIndexInPiecesArray = pieces.indexOf(draggedPiece);
            const targetIndexInPiecesArray = pieces.indexOf(targetElement);

            const tempCurrentPositionOfDragged = currentPositions[draggedIndexInPiecesArray];
            currentPositions[draggedIndexInPiecesArray] = currentPositions[targetIndexInPiecesArray];
            currentPositions[targetIndexInPiecesArray] = tempCurrentPositionOfDragged;
        }
        
        draggedPiece.classList.remove('dragging');
        if (highlightedPiece) {
            highlightedPiece.classList.remove('highlight');
            highlightedPiece = null;
        }
        draggedPiece = null;

        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', endDrag);

        positionPieces();
        checkWin();
    }


    // --- Funkce pro přidání event listenerů pro přetahování (myš i dotyk) ---
    function addEventListenersToPieces() {
        pieces.forEach(piece => {
            // Myší události (vlastní logika přetahování)
            piece.addEventListener('mousedown', startDrag);
            
            // Dotykové události
            piece.addEventListener('touchstart', (e) => {
                startDrag(e); 
            });

            piece.addEventListener('touchmove', dragMove);
            piece.addEventListener('touchend', endDrag);
        });
    }

    // --- Funkce pro kontrolu výhry ---
    function checkWin() {
        let isSolved = true;
        for (let i = 0; i < numRows * numCols; i++) {
            // Kontrolujeme, zda dílek na dané aktuální pozici (i) má originální index shodný s touto pozicí
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

    // --- Debounce pro zabránění přeblikávání při scrollu, ale zachování reakce na otočení ---
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        // Počkáme krátce, abychom zaručili, že se nejedná jen o skrytou lištu
        resizeTimer = setTimeout(() => {
            // Tímto se zajistí, že se puzzle po otočení NÁHODOU ROZMIXUJE, 
            // ale správně se NAČTE s novými rozměry
            loadPuzzle(currentPuzzleIndex); 
        }, 250);
    });
});
