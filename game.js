// Game State
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let gameMode = ''; // 'computer' or 'twoPlayers'
let difficultyLevel = 1;
let scores = {
    wins: 0,
    losses: 0,
    draws: 0
};

// Load scores from localStorage
function loadScores() {
    try {
        const savedScores = localStorage.getItem('scores');
        if (savedScores) {
            scores = JSON.parse(savedScores);
            updateScoreDisplay();
        }
    } catch (e) {
        console.warn('Could not load scores from localStorage:', e);
    }
}

// Save scores to localStorage
function saveScores() {
    try {
        localStorage.setItem('scores', JSON.stringify(scores));
        updateScoreDisplay();
    } catch (e) {
        console.warn('Could not save scores to localStorage:', e);
    }
}

// Update score display
function updateScoreDisplay() {
    document.getElementById('winsScore').textContent = scores.wins;
    document.getElementById('lossesScore').textContent = scores.losses;
    document.getElementById('drawsScore').textContent = scores.draws;
}

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Check for winner
function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], combo };
        }
    }
    
    if (!board.includes('')) {
        return { winner: 'draw', combo: [] };
    }
    
    return null;
}

// Initialize game
function initGame() {
    loadScores();
    showScreen('languageScreen');
    
    // Language selection
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            try {
                localStorage.setItem('selectedLanguage', lang);
                updateLanguage();
            } catch (e) {
                console.warn('Could not save language preference:', e);
                // Still update the language even if localStorage fails
                updateLanguage();
            }
            showScreen('modeScreen');
        });
    });
    
    // Mode selection
    document.getElementById('vsComputerBtn').addEventListener('click', () => {
        gameMode = 'computer';
        showScreen('difficultyScreen');
    });
    
    document.getElementById('vsTwoPlayersBtn').addEventListener('click', () => {
        gameMode = 'twoPlayers';
        startGame();
    });
    
    // Difficulty selection
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyLevel = parseInt(btn.getAttribute('data-level'));
            startGame();
        });
    });
    
    document.getElementById('backToMode').addEventListener('click', () => {
        showScreen('modeScreen');
    });
    
    // New game button
    document.getElementById('newGameBtn').addEventListener('click', () => {
        resetBoard();
        if (gameMode === 'computer') {
            showRobotGreeting();
        }
    });
    
    // Board cells
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
}

// Show screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Start game
function startGame() {
    showScreen('gameScreen');
    resetBoard();
    
    // Show/hide robot based on mode
    const robotContainer = document.getElementById('robotContainer');
    if (gameMode === 'computer') {
        robotContainer.style.display = 'block';
        showRobotGreeting();
        document.getElementById('gameMode').textContent = t('vsComputer');
        document.getElementById('difficultyLevel').textContent = `${t('selectDifficulty')}: ${difficultyLevel}`;
    } else {
        robotContainer.style.display = 'none';
        document.getElementById('gameMode').textContent = t('vsTwoPlayers');
        document.getElementById('difficultyLevel').textContent = '';
    }
    
    updateStatus();
}

// Reset board
function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning');
    });
    
    updateStatus();
}

// Handle cell click
function handleCellClick(e) {
    const index = parseInt(e.target.getAttribute('data-index'));
    
    if (!gameActive || board[index] !== '') return;
    
    makeMove(index, currentPlayer);
    
    const result = checkWinner();
    if (result) {
        handleGameEnd(result);
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
    
    // Computer's turn
    if (gameMode === 'computer' && currentPlayer === 'O' && gameActive) {
        showRobotThinking();
        setTimeout(() => {
            makeComputerMove();
        }, 800);
    }
}

// Make a move
function makeMove(index, player) {
    board[index] = player;
    const cell = document.querySelector(`[data-index="${index}"]`);
    cell.textContent = player;
    cell.classList.add(player.toLowerCase());
}

// Make computer move
function makeComputerMove() {
    if (!gameActive) return;
    
    let move;
    
    // Difficulty-based AI
    if (difficultyLevel <= 4) {
        // Easy: Random moves with occasional smart moves
        move = Math.random() < 0.3 ? getBestMove() : getRandomMove();
    } else if (difficultyLevel <= 8) {
        // Medium: Mix of smart and random moves
        move = Math.random() < 0.6 ? getBestMove() : getRandomMove();
    } else {
        // Hard/Impossible: Always best move
        move = getBestMove();
    }
    
    makeMove(move, 'O');
    
    const result = checkWinner();
    if (result) {
        handleGameEnd(result);
        return;
    }
    
    currentPlayer = 'X';
    updateStatus();
    evaluatePosition();
}

// Get random available move
function getRandomMove() {
    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

// Get best move using minimax
function getBestMove() {
    let bestScore = -Infinity;
    let bestMove = 0;
    
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    
    return bestMove;
}

// Minimax algorithm
function minimax(board, depth, isMaximizing) {
    const result = checkWinner();
    
    if (result) {
        if (result.winner === 'O') return 10 - depth;
        if (result.winner === 'X') return depth - 10;
        return 0;
    }
    
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Evaluate position and show robot emotion
function evaluatePosition() {
    if (!gameActive || gameMode !== 'computer') return;
    
    // Simulate evaluation
    let computerScore = 0;
    let playerScore = 0;
    
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        const line = [board[a], board[b], board[c]];
        const oCount = line.filter(cell => cell === 'O').length;
        const xCount = line.filter(cell => cell === 'X').length;
        
        if (oCount > 0 && xCount === 0) computerScore += oCount;
        if (xCount > 0 && oCount === 0) playerScore += xCount;
    }
    
    if (computerScore > playerScore) {
        showRobotWinning();
    } else if (playerScore > computerScore) {
        showRobotLosing();
    }
}

// Handle game end
function handleGameEnd(result) {
    gameActive = false;
    
    if (result.combo.length > 0) {
        result.combo.forEach(index => {
            document.querySelector(`[data-index="${index}"]`).classList.add('winning');
        });
    }
    
    setTimeout(() => {
        if (result.winner === 'draw') {
            scores.draws++;
            if (gameMode === 'computer') {
                showRobotDraw();
            }
            showMessage(t('draw'));
        } else if (gameMode === 'computer') {
            if (result.winner === 'X') {
                scores.wins++;
                showRobotLosing();
                showMessage(t('youWin'));
                createFireworks();
            } else {
                scores.losses++;
                showRobotWinning();
                showMessage(t('youLose'));
            }
        } else {
            // Two players mode
            showMessage(t('playerWins', { player: result.winner }));
            createFireworks();
        }
        
        saveScores();
    }, 500);
}

// Update status
function updateStatus() {
    const statusText = document.getElementById('statusText');
    
    if (gameMode === 'twoPlayers') {
        statusText.textContent = t('playerTurn', { player: currentPlayer });
    } else {
        statusText.textContent = currentPlayer === 'X' ? t('yourTurn') : t('thinking');
    }
}

// Show message
function showMessage(message) {
    const statusText = document.getElementById('statusText');
    statusText.textContent = message;
}

// Robot speech functions
function showRobotSpeech(message) {
    const robotText = document.getElementById('robotText');
    const robotSpeech = document.getElementById('robotSpeech');
    
    robotText.textContent = message;
    robotSpeech.classList.add('active');
    
    setTimeout(() => {
        robotSpeech.classList.remove('active');
    }, 3000);
}

function showRobotGreeting() {
    const phrases = t('robotGreeting');
    const message = phrases[Math.floor(Math.random() * phrases.length)];
    showRobotSpeech(message);
    setRobotExpression('happy');
}

function showRobotThinking() {
    const phrases = t('robotThinking');
    const message = phrases[Math.floor(Math.random() * phrases.length)];
    showRobotSpeech(message);
    setRobotExpression('thinking');
}

function showRobotWinning() {
    const phrases = t('robotWinning');
    const message = phrases[Math.floor(Math.random() * phrases.length)];
    showRobotSpeech(message);
    setRobotExpression('happy');
}

function showRobotLosing() {
    const phrases = t('robotLosing');
    const message = phrases[Math.floor(Math.random() * phrases.length)];
    showRobotSpeech(message);
    setRobotExpression('sad');
}

function showRobotDraw() {
    const phrases = t('robotDraw');
    const message = phrases[Math.floor(Math.random() * phrases.length)];
    showRobotSpeech(message);
    setRobotExpression('neutral');
}

// Set robot expression
function setRobotExpression(expression) {
    const robot = document.querySelector('.robot');
    robot.className = 'robot';
    robot.classList.add(expression);
}

// Create fireworks effect
function createFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    fireworksContainer.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.setProperty('--hue', Math.random() * 360);
            fireworksContainer.appendChild(firework);
            
            setTimeout(() => firework.remove(), 1000);
        }, i * 200);
    }
    
    createConfetti();
}

// Create confetti effect
function createConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 10 + 5,
            d: Math.random() * 10 + 5,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.random() * 10 - 10,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = confettiPieces.length - 1; i >= 0; i--) {
            const piece = confettiPieces[i];
            ctx.beginPath();
            ctx.lineWidth = piece.d / 2;
            ctx.strokeStyle = piece.color;
            ctx.moveTo(piece.x + piece.tilt + piece.w / 2, piece.y);
            ctx.lineTo(piece.x + piece.tilt, piece.y + piece.tilt + piece.h / 2);
            ctx.stroke();
            
            piece.tiltAngle += piece.tiltAngleIncremental;
            piece.y += (Math.cos(piece.d) + 3 + piece.d / 2) / 2;
            piece.tilt = Math.sin(piece.tiltAngle - i / 3) * 15;
            
            if (piece.y > canvas.height) {
                confettiPieces.splice(i, 1);
            }
        }
        
        if (confettiPieces.length > 0) {
            requestAnimationFrame(draw);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    draw();
}

// Initialize on load
window.addEventListener('DOMContentLoaded', initGame);
