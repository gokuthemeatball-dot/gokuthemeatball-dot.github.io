const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext('2d');
const liveRegion = document.querySelector('#liveRegion');
const objectiveText = document.querySelector('#objectiveText');
const visualMessage = document.querySelector('#visualMessage');
const dangerStatus = document.querySelector('#dangerStatus');
const powerStatus = document.querySelector('#powerStatus');
const energyStatus = document.querySelector('#energyStatus');
const chanceItem = document.querySelector('#chanceItem');
const memoryItem = document.querySelector('#memoryItem');
const fuseItem = document.querySelector('#fuseItem');
const keyItem = document.querySelector('#keyItem');
const doorKeyItem = document.querySelector('#doorKeyItem');
const foodItem = document.querySelector('#foodItem');
const clueItem = document.querySelector('#clueItem');
const craftItem = document.querySelector('#craftItem');
const mapItem = document.querySelector('#mapItem');
const lureItem = document.querySelector('#lureItem');
const cameraItem = document.querySelector('#cameraItem');
const wedgeItem = document.querySelector('#wedgeItem');
const maskItem = document.querySelector('#maskItem');
const narrationToggle = document.querySelector('#narrationToggle');
const soundToggle = document.querySelector('#soundToggle');
const installButton = document.querySelector('#installButton');
const languageSelect = document.querySelector('#languageSelect');
const startButton = document.querySelector('#startButton');
const gestureControls = document.querySelector('#gestureControls');
const gesturePad = document.querySelector('#gesturePad');
const gestureItemStatus = document.querySelector('#gestureItemStatus');
const dangerMusic = new Audio('danger-song.mp3?v=51');
dangerMusic.loop = true;
dangerMusic.preload = 'auto';
const deathMusic = new Audio('death-song.mp3?v=51');
deathMusic.loop = true;
deathMusic.preload = 'auto';
const deathSoundEffect = new Audio('death-sound-effect.mp3?v=72');
deathSoundEffect.loop = false;
deathSoundEffect.preload = 'auto';
const closeBySound = new Audio('close-by-sound.mp3?v=73');
closeBySound.loop = false;
closeBySound.preload = 'auto';
const jumpSound = new Audio('jump-sound.mp3?v=74');
jumpSound.loop = false;
jumpSound.preload = 'auto';
const surpriseSound = new Audio('surprise-sound.mp3?v=75');
surpriseSound.loop = false;
surpriseSound.preload = 'auto';
const questionSound = new Audio('question-sound.mp3?v=77');
questionSound.loop = false;
questionSound.preload = 'auto';
const storeSpeakerRecordings = [
  new Audio('speaker-sound-1.mp3?v=78'),
  new Audio('speaker-sound-2.mp3?v=78'),
  new Audio('speaker-sound-3.mp3?v=78')
];
storeSpeakerRecordings.forEach(recording=>{recording.loop=false;recording.preload='auto';});
const spanishStoreSpeakerRecordings = [
  new Audio('speaker-sound-es-1.mp3?v=80'),
  new Audio('speaker-sound-es-2.mp3?v=80'),
  new Audio('speaker-sound-es-3.mp3?v=80')
];
spanishStoreSpeakerRecordings.forEach(recording=>{recording.loop=false;recording.preload='auto';});
const lightsOutMusic = new Audio('lights-out-song.mp3?v=51');
lightsOutMusic.loop = false;
lightsOutMusic.preload = 'auto';
const storeTrack = new Audio('store-song.mp3?v=51');
storeTrack.loop = true;
storeTrack.preload = 'auto';
const explorationTrack = new Audio('exploration-song.mp3?v=51');
explorationTrack.loop = false;
explorationTrack.preload = 'auto';
const memoryLossSound = new Audio('caught-memory-loss-sound.mp3?v=71');
memoryLossSound.loop = false;
memoryLossSound.preload = 'auto';

const TILE = 40;
const COLS = 32;
const ROWS = 20;
const playerStart = { x: 2, y: 2 };
const bossStart = { x: 28, y: 17 };
const fuse = { x: 3, y: 17, name: 'stockroom fuse' };
const keycard = { x: 28, y: 2, name: 'office keycard' };
const exit = { x: 30, y: 18, name: 'loading exit' };
const cleaningSpots = [{x:4,y:3},{x:7,y:3}];
const mopSpot = {x:9,y:2, name:'mop closet'};
const checkoutSpot = {x:4,y:2};
const foodSpots = [{x:5,y:4},{x:8,y:5},{x:18,y:4},{x:20,y:15}];
const bottleSpot = {x:6,y:4};
const cleanerSpot = {x:18,y:5};
const paperSpot = {x:19,y:4};
const markerSpot = {x:20,y:5};
const canSpot = {x:5,y:9};
const batterySpot = {x:25,y:11};
const cameraSpot = {x:6,y:14};
const flashCellSpot = {x:20,y:9};
const handleSpot = {x:10,y:17};
const tapeSpot = {x:29,y:6};
const ragSpot = {x:18,y:14};
const coffeeSpot = {x:7,y:9};
const clueSpots = [{x:2,y:15},{x:16,y:2},{x:22,y:16},{x:29,y:11}];
const clueTexts = [
  'A timecard dated 1987. Every employee clocked out except one. The missing name is scratched away.',
  'A staff photograph shows Mr. Hollow in the same green vest. The photograph is dated forty years ago.',
  'A damaged training tape says: If the manager learns your route, change it. He remembers repeated footsteps.',
  'The night ledger already contains your name. It lists every shift you will work for the next thirteen years.'
];
const hideSpots = [{x:6,y:2},{x:25,y:17},{x:15,y:9},{x:5,y:11},{x:26,y:8}];
const patrolPoints = [{x:28,y:3},{x:28,y:15},{x:21,y:17},{x:12,y:17},{x:3,y:12},{x:5,y:3},{x:16,y:9}];
const hollowHidingPoints = [
  {x:29,y:2},{x:27,y:6},{x:29,y:14},{x:24,y:17},{x:18,y:17},{x:11,y:17},
  {x:3,y:15},{x:3,y:9},{x:5,y:6},{x:10,y:2},{x:16,y:2},{x:22,y:2},
  {x:15,y:7},{x:23,y:12},{x:9,y:13}
];
const cameraRoomEntrance = {x:13,y:3};
const cameraTransportButton = {x:13,y:1};
const cameraRoomFloor = new Set(['12,1','13,1','14,1','12,2','13,2','14,2','13,3']);
const cameraTransportDestinations = [
  {x:2,y:12},{x:11,y:12},{x:22,y:12},{x:29,y:16},{x:22,y:7},{x:3,y:7}
];
const doorBlueprints = [
  {x:11,y:8,orientation:'vertical'},
  {x:14,y:8,orientation:'vertical'},
  {x:24,y:8,orientation:'vertical'},
  {x:27,y:8,orientation:'vertical'},
  {x:9,y:16,orientation:'horizontal'},
  {x:16,y:16,orientation:'horizontal'}
];
const shelfKeyCandidates = [
  {x:4,y:4},{x:7,y:5},{x:5,y:9},{x:8,y:10},{x:4,y:14},{x:8,y:15},
  {x:13,y:4},{x:17,y:5},{x:20,y:4},{x:13,y:9},{x:17,y:10},{x:20,y:9},
  {x:13,y:14},{x:17,y:15},{x:20,y:14},{x:24,y:4},{x:27,y:5},{x:25,y:9},
  {x:28,y:10},{x:24,y:14},{x:27,y:15},{x:24,y:11},{x:28,y:6},{x:10,y:17}
];

const walls = new Set();
const shelfTiles = new Set();
for (let x = 0; x < COLS; x++) { walls.add(`${x},0`); walls.add(`${x},${ROWS - 1}`); }
for (let y = 0; y < ROWS; y++) { walls.add(`0,${y}`); walls.add(`${COLS - 1},${y}`); }
// A sealed surveillance room. Its only opening is the south entrance at 13,3.
for(let y=1;y<=3;y++){walls.add(`11,${y}`);walls.add(`15,${y}`);}
walls.add('12,3');walls.add('14,3');
[
  [4,4,6,2],[4,9,6,2],[4,14,6,2],
  [13,4,8,2],[13,9,8,2],[13,14,8,2],
  [24,4,5,2],[24,9,5,2],[24,14,5,2],
  [9,17,2,1],[24,11,3,1],[28,6,2,1]
].forEach(([x,y,w,h]) => {
  for (let ix=x; ix<x+w; ix++) for (let iy=y; iy<y+h; iy++){
    shelfTiles.add(`${ix},${iy}`);
  }
});
shelfKeyCandidates.forEach(spot=>shelfTiles.add(`${spot.x},${spot.y}`));

let player;
let boss;
let hasFuse;
let powerOn;
let hasKey;
let brassKeys;
let securityDoors;
let shelfKeys;
let hidden;
let crouching;
let flashlight;
let flashlightDistractedBoss;
let paused;
let running;
let won;
let noiseTurns;
let lastBossMove;
let patrolIndex;
let facing;
let computerShiftHeld;
let phase;
let cleanedSpots;
let hasMop;
let moppingIndex = -1;
let mopProgress = 0;
let mopLastDirection = '';
let themeTimer;
let catches;
let energy;
let eatenFood;
let hasBottle;
let hasCleaner;
let hasStunBottle;
let bossStunnedUntil;
let foodPortions;
let hasPaper;
let hasMarker;
let hasMap;
let hasCan;
let hasBattery;
let hasLure;
let showMapUntil;
let lureTarget;
let lureTurns;
let hasCamera;
let hasFlashCell;
let hasFlashCamera;
let hasHandle;
let hasTape;
let hasDoorJammer;
let jammerSpot;
let hasRag;
let hasCoffee;
let hasScentMask;
let scentMaskUntil;
let flickerUntil;
let lastFearEvent;
let lastJumpScare;
let nextJumpScareAt;
let customersServed;
let dialogueSteps;
let dialogueIndex;
let dialogueOnDone;
let foundClues;
let lastKnownPlayer;
let huntMemory;
let bossSearching;
let lastAmbush;
let nextAmbushAt;
let nextPresenceCueAt;
let dangerMusicActive;
let dangerNearSince;
let dangerFarSince;
let dangerFadeTimer;
let lightsOutMusicActive;
let lightsOutTransitionTimer;
let storeTrackActive;
let storeTrackFadeTimer;
let explorationTrackActive;
let explorationFadeTimer;
let explorationSegmentTimer;
let memoryFragments;
let memorySideTaskActive;
let stolenMemories;
let battleActive;
let battleHits;
let battleTimer;
let battleLost;
let nextExhaustedMoveAt;
let trailLostUntil;
let cameraAlertActive;
let lastCameraAlertAt;
let audioContext;
let ambientGain;
let lastAnnouncement = '';
let activeSpeechUtterance = null;
let speechRetryTimer = null;
let blindMode = false;
let deferredInstallPrompt = null;
let language = localStorage.getItem('aisle13Language') === 'es' ? 'es' : 'en';
let accessMenuTrigger = null;
const accessBackgroundState = new Map();
const startBackgroundState = new Map();
let selectedGestureItem = 0;
let gestureStart = null;
let gestureLast = null;
let gestureHoldTimer = null;
let gestureDirection = '';
let gestureWentDown = false;
let gestureWentUp = false;
let gestureFirstVertical = '';
let gesturePattern = '';
let gestureTapCount = 0;
let gestureTapTimer = null;
let gestureRunArmedUntil = 0;
let activeGesturePointers = new Set();
let twoFingerTouch = false;
let threeFingerTouch = false;
let fourFingerTouch = false;
let multiGestureStart = null;
let multiGestureAction = '';
let twoFingerTapCount = 0;
let twoFingerTapTimer = null;
let storyGestureStart = null;
let storyGestureTapCount = 0;
let storyGestureTapTimer = null;
let startGestureStart = null;
let startGestureTapCount = 0;
let startGestureTapTimer = null;
let battleGestureStart = null;
let battleGestureTapCount = 0;
let battleGestureTapTimer = null;
let closeByWasNear = false;
let bossWasVisible = false;

const spanishExact = {
  'Your shift begins. The front doors lock behind you.':'Tu turno comienza. Las puertas principales se cierran detrás de ti.',
  'Brass key collected from the shelf.':'Llave de latón recogida del estante.',
  'The security door is locked. Search the shelves for a brass key.':'La puerta de seguridad está cerrada. Busca una llave de latón en los estantes.',
  'You insert the brass key and turn the lock. Move forward to push the door open.':'Insertas la llave de latón y giras la cerradura. Avanza para empujar la puerta y abrirla.',
  'The key is already in the lock. Move forward to push the door open.':'La llave ya está en la cerradura. Avanza para empujar la puerta y abrirla.',
  'The security door swings open.':'La puerta de seguridad se abre.',
  'The security door closes. Mr. Hollow cannot cross it.':'La puerta de seguridad se cierra. El señor Hollow no puede atravesarla.',
  'Mr. Hollow is in the doorway. You cannot close it yet.':'El señor Hollow está en la puerta. Todavía no puedes cerrarla.',
  'Insert a brass key with Interact before pushing the door.':'Inserta una llave de latón con Interactuar antes de empujar la puerta.',
  'No locked door is close enough to insert a key.':'No hay una puerta cerrada lo bastante cerca para insertar una llave.',
  'No prepared door is close enough to open.':'No hay una puerta preparada lo bastante cerca para abrirla.',
  'No open door is close enough to close.':'No hay una puerta abierta lo bastante cerca para cerrarla.',
  'No security door is close enough to open or close.':'No hay una puerta de seguridad lo bastante cerca para abrirla o cerrarla.',
  'Press I to insert a brass key into this door.':'Pulsa I para insertar una llave de latón en esta puerta.',
  'The key is inserted. Press O to open this door.':'La llave está insertada. Pulsa O para abrir esta puerta.',
  'Swipe four fingers right to insert a brass key first.':'Desliza cuatro dedos a la derecha para insertar primero una llave de latón.',
  'The key is inserted. Swipe four fingers left to open the door.':'La llave está insertada. Desliza cuatro dedos a la izquierda para abrir la puerta.',
  'You insert the brass key and turn the lock. Now swipe four fingers left to open the door.':'Insertas la llave de latón y giras la cerradura. Ahora desliza cuatro dedos a la izquierda para abrir la puerta.',
  'Listen to Mr. Hollow’s instructions.':'Escucha las instrucciones del señor Hollow.',
  'Find the stockroom fuse in the southwest corner.':'Encuentra el fusible del almacén en la esquina suroeste.',
  'Install the fuse at the breaker beside you.':'Instala el fusible en el interruptor que está a tu lado.',
  'Find the office keycard in the northeast corner.':'Encuentra la tarjeta de la oficina en la esquina noreste.',
  'Reach the loading exit in the southeast corner.':'Llega a la salida de carga en la esquina sureste.',
  'Walk to the front checkout and press E to serve each customer.':'Ve a la caja principal y usa Interactuar para atender a cada cliente.',
  'Mr. Hollow orders you to clean the two marked spills.':'El señor Hollow te ordena limpiar los dos derrames marcados.',
  'You are out of energy. Find food and press E to eat.':'No tienes energía. Encuentra comida y usa Interactuar para comer.',
  'Blocked. A shelf or wall is in that direction.':'Bloqueado. Hay un estante o una pared en esa dirección.',
  'Blocked by a stocked shelf. Go around it.':'Un estante lleno bloquea el paso. Rodéalo.',
  'Blocked by the store wall. Turn and choose another route.':'La pared de la tienda bloquea el paso. Gira y elige otra ruta.',
  'Your memory becomes whole again. One chance is restored. Your breathing steadies, your energy rises, and Mr. Hollow loses your trail for four seconds.':'Tu memoria vuelve a estar completa. Recuperas una oportunidad. Recuperas energía y el señor Hollow pierde tu rastro durante cuatro segundos.',
  'Hidden inside a supply cabinet. Mr. Hollow cannot see you. Press E to leave.':'Estás escondido en un armario. El señor Hollow no puede verte. Usa Interactuar para salir.',
  'You leave the hiding place. Listen before moving.':'Sales del escondite. Escucha antes de moverte.',
  'Fuse collected. Install it at the breaker here by pressing E again.':'Fusible recogido. Instálalo en el interruptor usando Interactuar otra vez.',
  'Power restored. Mr. Hollow heard the breaker. Find the office keycard northeast.':'La energía volvió. El señor Hollow oyó el interruptor. Encuentra la tarjeta al noreste.',
  'Office keycard collected. Mr. Hollow enters his enraged phase. Reach the loading exit southeast.':'Tarjeta recogida. El señor Hollow entra en su fase furiosa. Llega a la salida de carga al sureste.',
  'Nothing to use here.':'No hay nada que usar aquí.',
  'The store falls silent. Mr. Hollow’s location is unknown.':'La tienda queda en silencio. No se conoce la ubicación del señor Hollow.',
  'Camera room. The surveillance screens reveal store fixtures and items, but never Mr. Hollow’s location. He cannot enter this room. The transport button is at the north wall.':'Sala de cámaras. Las pantallas de vigilancia muestran los objetos y lugares de la tienda, pero nunca la ubicación del señor Hollow. No puede entrar en esta sala. El botón de transporte está en la pared norte.',
  'Camera warning. Movement detected outside the secure room. Mr. Hollow cannot enter.':'Alerta de cámara. Movimiento detectado fuera de la sala segura. El señor Hollow no puede entrar.',
  'Camera clear. No movement is detected near the secure room.':'Cámara despejada. No se detecta movimiento cerca de la sala segura.',
  'The camera room does not reveal Mr. Hollow’s location. Its motion alarm will warn you if he approaches.':'La sala de cámaras no revela la ubicación del señor Hollow. La alarma de movimiento te avisará si se acerca.',
  'Transport button ready. Press Interact to move to another part of the store and erase your trail for one minute.':'Botón de transporte listo. Usa Interactuar para ir a otra parte de la tienda y borrar tu rastro durante un minuto.',
  'The camera flashes white. You arrive somewhere else in the store. Mr. Hollow loses your trail for one minute.':'La cámara emite un destello blanco. Apareces en otra parte de la tienda. El señor Hollow pierde tu rastro durante un minuto.',
  'The flashlight hits Mr. Hollow. He shields his eyes and loses your trail for fifteen seconds.':'La linterna alcanza al señor Hollow. Se cubre los ojos y pierde tu rastro durante quince segundos.',
  'Mr. Hollow is somewhere in the store. Listen for him.':'El señor Hollow está en algún lugar de la tienda. Escúchalo.',
  'Caught by Mr. Hollow. Shift ended.':'El señor Hollow te atrapó. El turno terminó.',
  'You escaped Aisle 13. Shift survived.':'Escapaste del Pasillo 13. Sobreviviste al turno.',
  'No food remains in your pack.':'No queda comida en tu mochila.',
  'Your energy is already full.':'Tu energía ya está llena.',
  'Energy empty. You can still move, but every step is painfully slow. Find food.':'Energía agotada. Todavía puedes moverte, pero cada paso será muy lento. Encuentra comida.',
  'Noise lure deployed. Mr. Hollow turns toward the sound.':'Señuelo de ruido desplegado. El señor Hollow se dirige hacia el sonido.',
  'Door jammer placed here. Lead Mr. Hollow across this tile to stop him.':'Bloqueador colocado. Haz que el señor Hollow pase por aquí para detenerlo.',
  'The final spill is clean. The lights die. Mr. Hollow locks the doors. You pocket three food portions. First build the required guidance map, then find the fuse and escape.':'Limpiaste el último derrame. Las luces se apagan y el señor Hollow cierra las puertas. Tienes tres porciones de comida. Primero construye el mapa de guía obligatorio, después encuentra el fusible y escapa.',
  'The final spill is clean. The lights die. Mr. Hollow locks the doors. Your guidance map is already in your pocket, but you have no food. Find supplies, then use the map to reach the fuse and escape.':'Limpiaste el último derrame. Las luces se apagan y el señor Hollow cierra las puertas. Ya tienes el mapa de guía, pero no tienes comida. Encuentra provisiones y usa el mapa para llegar al fusible y escapar.',
  'Mr. Hollow locked you in the stockroom. Shift ended.':'El señor Hollow te encerró en el almacén. El turno terminó.',
  'Crouched. You move quietly.':'Agachado. Te mueves en silencio.',
  'Standing.':'De pie.',
  'Game paused.':'Juego en pausa.',
  'Game resumed.':'Juego reanudado.',
  'Standard control layout active.':'Controles estándar activados.',
  'Blind gesture mode active. Turn off VoiceOver or TalkBack now. Swipe and hold to walk. Tap once, then swipe up and hold to run. Double tap to interact, triple tap for the flashlight, two-finger single tap to crouch, two-finger double tap to eat, and three-finger single tap to jump.':'Modo de gestos para jugadores ciegos activado. Ahora desactiva VoiceOver o TalkBack. Desliza y mantén para caminar. Toca una vez y después desliza hacia arriba y mantén para correr. Toca dos veces para interactuar, tres veces para la linterna, una vez con dos dedos para agacharte, dos veces con dos dedos para comer y una vez con tres dedos para saltar.',
  'Blind gesture mode selected. Start the game first, then turn off VoiceOver or TalkBack when instructed.':'Modo de gestos para jugadores ciegos seleccionado. Primero inicia el juego y después desactiva VoiceOver o TalkBack cuando se te indique.',
  'Blind gesture mode selected. Double tap anywhere on the start screen to begin.':'Modo de gestos para jugadores ciegos seleccionado. Toca dos veces en cualquier parte de la pantalla de inicio para comenzar.',
  'Running forward.':'Corriendo hacia adelante.',
  'Double tap anywhere to continue.':'Toca dos veces en cualquier parte para continuar.',
  'You are the new night employee. I am Mr. Hollow. While these doors are open, every customer leaves satisfied.':'Eres el nuevo empleado nocturno. Soy el señor Hollow. Mientras estas puertas estén abiertas, todos los clientes deben salir satisfechos.',
  'Understood. Where do you need me?':'Entendido. ¿Dónde me necesita?',
  'Front checkout. Three customers remain. Scan their items, take payment, and do not ask why they are shopping this late.':'La caja principal. Quedan tres clientes. Escanea sus productos, cobra y no preguntes por qué compran tan tarde.'
};

Object.assign(spanishExact,{
  'That is enough. Lock the register. The customers always leave before dark.':'Es suficiente. Cierra la caja. Los clientes siempre se van antes de que oscurezca.',
  'Two spills remain in aisles three and four. Clean them, then report to me. Do not open the loading door.':'Quedan dos derrames en los pasillos tres y cuatro. Límpialos y después ven a informarme. No abras la puerta de carga.',
  'Customer one buys milk and bread. The register drawer sticks before opening.':'El primer cliente compra leche y pan. El cajón de la caja se atasca antes de abrirse.',
  'Customer two returns a damaged music box. It plays one note by itself.':'El segundo cliente devuelve una caja de música dañada. Toca una nota por sí sola.',
  'The final customer pays without speaking, then stares past you toward Mr. Hollow.':'El último cliente paga sin hablar y después mira detrás de ti, hacia el señor Hollow.',
  'You need five energy to jump.':'Necesitas cinco puntos de energía para saltar.',
  'Jumped forward. The landing was loud.':'Saltaste hacia adelante. El aterrizaje hizo mucho ruido.',
  'The dark stockroom is impossible to navigate safely without the guidance map. Find the store plan and marker first.':'Es imposible recorrer el almacén oscuro sin el mapa de guía. Encuentra primero el plano de la tienda y el marcador.',
  'The cabinet door is ripped open. Mr. Hollow found your hiding place.':'La puerta del armario se abre de golpe. El señor Hollow encontró tu escondite.',
  'Mr. Hollow hits the door jammer. The aisle shakes, but the pursuit stops for seven seconds.':'El señor Hollow golpea el bloqueador. El pasillo tiembla, pero la persecución se detiene durante siete segundos.',
  'The beam catches Mr. Hollow’s eyes. He recoils, but now he knows your position.':'El haz alcanza los ojos del señor Hollow. Retrocede, pero ahora conoce tu posición.',
  'Stun bottle crafted. Press B when Mr. Hollow gets close.':'Botella aturdidora creada. Usa B cuando el señor Hollow esté cerca.',
  'Guidance map completed. Press M to reveal a route toward your objective.':'Mapa de guía terminado. Usa M para mostrar una ruta hacia tu objetivo.',
  'Noise lure assembled. Press N to pull Mr. Hollow away from you.':'Señuelo de ruido armado. Usa N para alejar al señor Hollow.',
  'Flash camera crafted. Press X at close range to blind Mr. Hollow, but the flash reveals your position.':'Cámara con flash creada. Usa X de cerca para cegar al señor Hollow, pero el destello revelará tu posición.',
  'Door jammer crafted. Press V to place it. Mr. Hollow will be stopped when he crosses that tile.':'Bloqueador de puerta creado. Usa V para colocarlo. Detendrá al señor Hollow cuando pase por ese lugar.',
  'Scent mask crafted. Press Z for a short stealth window.':'Máscara de olor creada. Usa Z para ocultarte durante unos segundos.',
  'The guidance map is missing.':'No tienes el mapa de guía.',
  'Craft a noise lure from an empty can and batteries.':'Crea un señuelo de ruido con una lata vacía y baterías.',
  'You need an empty bottle and cleaner to craft a stun bottle.':'Necesitas una botella vacía y limpiador para crear una botella aturdidora.',
  'Direct hit. Mr. Hollow is stunned for nine seconds.':'Impacto directo. El señor Hollow queda aturdido durante nueve segundos.',
  'The bottle shattered, but Mr. Hollow was too far away.':'La botella se rompió, pero el señor Hollow estaba demasiado lejos.',
  'Craft a flash camera from a disposable camera and flash cell.':'Crea una cámara con flash usando una cámara desechable y una celda de flash.',
  'The flash catches Mr. Hollow. He is blinded for six seconds, but now he knows exactly where you are.':'El destello alcanza al señor Hollow. Queda cegado durante seis segundos, pero ahora sabe exactamente dónde estás.',
  'The camera flashes into an empty aisle. The noise gives away your position.':'La cámara ilumina un pasillo vacío. El ruido revela tu posición.',
  'Craft a door jammer from a broken handle and duct tape.':'Crea un bloqueador de puerta con un mango roto y cinta adhesiva.',
  'Craft a scent mask from a rag and coffee grounds.':'Crea una máscara de olor con un trapo y café molido.',
  'Scent mask active for eighteen seconds. Stay crouched and keep your flashlight off for the best concealment.':'Máscara de olor activa durante dieciocho segundos. Mantente agachado y con la linterna apagada para ocultarte mejor.',
  'Empty bottle collected. Find cleaner to craft a stun bottle.':'Botella vacía recogida. Encuentra limpiador para crear una botella aturdidora.',
  'Cleaner collected. Find an empty bottle to craft a stun bottle.':'Limpiador recogido. Encuentra una botella vacía para crear una botella aturdidora.',
  'Empty can collected. Find batteries to build a noise lure.':'Lata vacía recogida. Encuentra baterías para crear un señuelo de ruido.',
  'Batteries collected. Find an empty can to build a noise lure.':'Baterías recogidas. Encuentra una lata vacía para crear un señuelo de ruido.',
  'Disposable camera collected. Find a flash cell to weaponize it.':'Cámara desechable recogida. Encuentra una celda de flash para prepararla.',
  'Flash cell collected. Find the disposable camera.':'Celda de flash recogida. Encuentra la cámara desechable.',
  'Broken broom handle collected. Find duct tape for a door jammer.':'Mango de escoba roto recogido. Encuentra cinta adhesiva para crear un bloqueador.',
  'Duct tape collected. Find a broken handle for a door jammer.':'Cinta adhesiva recogida. Encuentra un mango roto para crear un bloqueador.',
  'Cleaning rag collected. Find coffee grounds for a scent mask.':'Trapo de limpieza recogido. Encuentra café molido para crear una máscara de olor.',
  'Coffee grounds collected. Find a cleaning rag for a scent mask.':'Café molido recogido. Encuentra un trapo de limpieza para crear una máscara de olor.',
  'Crouched. You can move quietly and are harder to see.':'Agachado. Puedes moverte en silencio y es más difícil verte.',
  'Standing. You move normally again.':'De pie. Vuelves a moverte normalmente.',
  'Arrows move and turn. Space or J jumps. H crouches. E interacts. I inserts a door key. O opens the prepared door. C closes an open security door. L activates the audio compass. R eats food. B throws a stun bottle. M uses the required map. N deploys a noise lure. X fires the flash camera. V places a door jammer. Z uses the scent mask. F toggles the flashlight. P pauses.':'Las flechas mueven y giran. Espacio o J salta. H agacha. E interactúa. I inserta una llave. O abre la puerta preparada. C cierra una puerta de seguridad abierta. L activa la brújula de audio. R come. B lanza la botella aturdidora. M usa el mapa. N coloca el señuelo. X usa la cámara. V coloca el bloqueador. Z usa la máscara. F controla la linterna. P pausa.'
  ,'A timecard dated 1987. Every employee clocked out except one. The missing name is scratched away.':'Una tarjeta de asistencia de 1987. Todos los empleados marcaron su salida excepto uno. El nombre que falta fue borrado.'
  ,'A staff photograph shows Mr. Hollow in the same green vest. The photograph is dated forty years ago.':'Una fotografía del personal muestra al señor Hollow con el mismo chaleco verde. La foto tiene cuarenta años.'
  ,'A damaged training tape says: If the manager learns your route, change it. He remembers repeated footsteps.':'Una cinta de entrenamiento dañada dice: Si el gerente aprende tu ruta, cámbiala. Recuerda los pasos repetidos.'
  ,'The night ledger already contains your name. It lists every shift you will work for the next thirteen years.':'El registro nocturno ya contiene tu nombre. Enumera cada turno que trabajarás durante los próximos trece años.'
  ,'Mr. Hollow is watching from the service desk.':'El señor Hollow observa desde el mostrador de servicio.'
});

function translateText(message){
  if(language!=='es'||!message)return message;
  if(spanishExact[message])return spanishExact[message];
  return message
    .replace(/^Facing north\.$/,'Mirando al norte.')
    .replace(/^Facing south\.$/,'Mirando al sur.')
    .replace(/^Facing east\.$/,'Mirando al este.')
    .replace(/^Facing west\.$/,'Mirando al oeste.')
    .replace(/^Danger\. Mr\. Hollow is (.+), (\d+) steps\.$/,'Peligro. El señor Hollow está $1, a $2 pasos.')
    .replace(/\bnortheast\b/gi,'noreste').replace(/\bnorthwest\b/gi,'noroeste').replace(/\bsoutheast\b/gi,'sureste').replace(/\bsouthwest\b/gi,'suroeste')
    .replace(/\bnorth\b/gi,'norte').replace(/\bsouth\b/gi,'sur').replace(/\beast\b/gi,'este').replace(/\bwest\b/gi,'oeste')
    .replace(/\bsteps?\b/gi,'pasos').replace(/\bremaining\b/gi,'restantes').replace(/\bleft\b/gi,'restantes')
    .replace(/^Flashlight on\.$/,'Linterna encendida.').replace(/^Flashlight off\.$/,'Linterna apagada.')
    .replace(/^Serve customers at the front checkout\. (\d+) of 3 served\.$/,'Atiende a los clientes en la caja principal. $1 de 3 atendidos.')
    .replace(/^Clean the marked spills\. (\d+) remaining\.$/,'Limpia los derrames marcados. Quedan $1.')
    .replace(/^Recover your lost memories before escaping\. (\d+) remaining\.$/,'Recupera tus recuerdos perdidos antes de escapar. Quedan $1.')
    .replace(/^Mr\. Hollow carries (\d+) stolen memories?\. Survive until you can confront him\.$/,'El señor Hollow tiene $1 recuerdos robados. Sobrevive hasta poder enfrentarlo.')
    .replace(/^Spill cleaned\. (\d+) left\.$/,'Derrame limpiado. Quedan $1.')
    .replace(/^Find the next marked spill\. (\d+) remain\.$/,'Encuentra el siguiente derrame marcado. Quedan $1.')
    .replace(/^Food packed\. You now carry (\d+) portions?\. Press R to eat anywhere\.$/,'Comida guardada. Ahora llevas $1 porciones. Usa R para comer en cualquier lugar.')
    .replace(/^You eat one portion\. Energy (\d+)\. (\d+) portions remain\.$/,'Comes una porción. Energía $1. Quedan $2 porciones.')
    .replace(/^Danger\. Mr\. Hollow is (.+), three steps away\.$/,'Peligro. El señor Hollow está hacia $1, a tres pasos.')
    .replace(/^The next customer is waiting at checkout, (.+), (\d+) steps away\.$/,'El siguiente cliente espera en la caja, hacia $1, a $2 pasos.')
    .replace(/^Mystery fragment (\d+) of 4\. /,'Fragmento del misterio $1 de 4. ')
    .replace(/^Required lost memory is (.+), (\d+) steps away\.$/,'El recuerdo perdido obligatorio está hacia $1, a $2 pasos.')
    .replace(/^Nothing to use here\. /,'No hay nada que usar aquí. ')
    .replace(/\bFront checkout\b/g,'Caja principal').replace(/\bStockroom\b/g,'Almacén').replace(/\bLoading bay\b/g,'Zona de carga').replace(/\bBack aisle\b/g,'Pasillo trasero').replace(/\bManager office hall\b/g,'Pasillo de la oficina del gerente')
    .replace(/\bCheckout\b/g,'Caja').replace(/\bNext spill\b/g,'Siguiente derrame').replace(/\bSpill\b/g,'Derrame').replace(/\bFuse\b/g,'Fusible').replace(/\bBreaker\b/g,'Interruptor').replace(/\bKeycard\b/g,'Tarjeta').replace(/\bExit\b/g,'Salida')
    .replace(/\bHiding place\b/g,'Escondite').replace(/\bFood\b/g,'Comida').replace(/\bEmpty bottle\b/g,'Botella vacía').replace(/\bCleaner\b/g,'Limpiador').replace(/\bEmpty can\b/g,'Lata vacía').replace(/\bBatteries\b/g,'Baterías').replace(/\bCamera room\b/g,'Sala de cámaras').replace(/\bCamera\b/g,'Cámara').replace(/\bFlash cell\b/g,'Celda de flash').replace(/\bHandle\b/g,'Mango').replace(/\bDuct tape\b/g,'Cinta adhesiva').replace(/\bRag\b/g,'Trapo').replace(/\bCoffee\b/g,'Café').replace(/\bMystery fragment\b/g,'Fragmento del misterio').replace(/\bLost memory\b/g,'Recuerdo perdido').replace(/\bBrass key\b/g,'Llave de latón').replace(/\bLocked security door\b/g,'Puerta de seguridad cerrada')
    .replace(/\bis\b/g,'está').replace(/\bhere\b/g,'aquí').replace(/\bAisle (\d+)\b/g,'Pasillo $1')
    .replace(/^Selected item: /,'Objeto seleccionado: ')
    .replace(/^Using selected item: /,'Usando objeto: ')
    .replace(/^Memory fragment restored\. One chance recovered\. You now have (\d+) chances\. (\d+) lost fragment remains\.$/,'Fragmento de memoria restaurado. Recuperaste una oportunidad. Ahora tienes $1 oportunidades. Queda $2 fragmento perdido.')
    .replace(/^Memory fragment restored\. One chance recovered\. You now have (\d+) chances\. (\d+) lost fragments remain\.$/,'Fragmento de memoria restaurado. Recuperaste una oportunidad. Ahora tienes $1 oportunidades. Quedan $2 fragmentos perdidos.')
    .replace(/^Mr\. Hollow says: /,'El señor Hollow dice: ')
    .replace(/^YOU says: /,'TÚ dices: ');
}

function applyLanguage(){
  languageSelect.value=language;
  document.documentElement.lang=language;
  const es=language==='es';
  document.querySelector('#accessTitle').textContent=es?'Visual, audio o ambos':'Visual, audio, or both';
  document.querySelector('#accessDescription').textContent=es?'Jugadores con visión, ciegos y con baja visión comparten la misma historia, mapa, objetivos y dificultad. Elige la información que te funcione mejor.':'Sighted, blind, and low-vision players share the same story, map, objectives, and difficulty. Choose the information that works best for you.';
  document.querySelector('#accessTalkBackHint').textContent=es?'TalkBack o Jieshuo: desliza a la derecha o izquierda por cada opción y toca dos veces para cambiarla. Elige Listo cuando termines.':'TalkBack or Jieshuo: swipe right or left through every option, then double tap to change it. Choose Done when ready.';
  document.querySelector('#startScreenReaderHelp').textContent=es?'Usuarios de TalkBack y Jieshuo: deslicen a la derecha o izquierda para moverse entre Accesibilidad e Iniciar juego y toquen dos veces para activar. Abran Accesibilidad primero para elegir mensajes hablados, sonido, contraste, modo de gestos e idioma.':'TalkBack and Jieshuo users: swipe right or left to move between Accessibility and Start Game, then double tap to activate. Open Accessibility first to choose spoken updates, sound, contrast, blind gesture mode, and language.';
  document.querySelector('#accessCloseIcon').textContent=es?'CERRAR':'CLOSE';
  document.querySelector('#accessCloseIcon').setAttribute('aria-label',es?'Cerrar menú de accesibilidad':'Close accessibility menu');
  document.querySelector('#startButton').innerHTML=es?'INICIAR JUEGO <span aria-hidden="true">→</span>':'START GAME <span aria-hidden="true">→</span>';
  document.querySelector('#startButton').setAttribute('aria-label',es?'Iniciar Night Shift: Pasillo 13':'Start Night Shift: Aisle 13');
  document.querySelector('#startAccessButton').setAttribute('aria-label',es?'Abrir opciones de accesibilidad y lector de pantalla':'Open accessibility and screen reader options');
  document.querySelector('#startAccessButton').textContent=es?'ACCESIBILIDAD':'ACCESSIBILITY';
  document.querySelector('#accessButton').textContent=es?'Accesibilidad':'Accessibility';
  document.querySelector('#helpButton').textContent=es?'Controles':'Controls';
  installButton.textContent=es?'Instalar aplicación':'Install App';
  document.querySelector('#startDescription').textContent=es?'Un turno nocturno de limpieza aparentemente normal. No hay compañeros, y el gerente nunca parece irse.':'A routine overnight sanitation shift. No customers, no coworkers, and one manager who never seems to leave.';
  document.querySelector('#audienceNote').textContent=es?'Creado para todos. Juega con imágenes, sonido o ambos; todos reciben la misma historia, objetivos y dificultad.':'Built for every player. Play visually, through sound, or with both—every objective, threat, and interaction remains available.';
  document.querySelector('#headphonesNote').textContent=es?'Se recomiendan auriculares para el audio espacial. La narración es opcional.':'Headphones recommended for spatial audio. Narration is optional.';
  document.querySelector('#narrationLabel').textContent=es?'Mensajes hablados del juego':'Spoken game updates';
  document.querySelector('#soundLabel').textContent=es?'Sonidos espaciales y música':'Spatial sounds and music';
  document.querySelector('#contrastLabel').textContent=es?'Contraste extra alto':'Extra-high contrast';
  document.querySelector('#gestureModeLabel').textContent=es?'Modo de gestos móvil para jugadores ciegos y navegación hablada frecuente':'Blind mobile gesture mode and frequent spoken navigation';
  document.querySelector('#languageLabel').textContent=es?'Idioma':'Language';
  document.querySelector('#gestureTitle').textContent=es?'MODO DE GESTOS':'GESTURE MODE';
  document.querySelector('#gestureHint').textContent=es?'Usa toda la pantalla como un solo control':'Use the whole screen as one controller';
  document.querySelector('header .wordmark span').textContent=es?'TURNO NOCTURNO':'NIGHT SHIFT';
  document.querySelector('header>p').textContent=es?'TERROR DE SUPERVIVENCIA · JUGABLE CON O SIN VISIÓN':'SURVIVAL HORROR · PLAYABLE WITH OR WITHOUT SIGHT';
  document.querySelector('.game-topbar .label').textContent=es?'OBJETIVO ACTUAL':'CURRENT OBJECTIVE';
  document.querySelector('.inventory>.label').textContent=es?'INVENTARIO':'INVENTORY';
  document.querySelector('.action-log .label').textContent=es?'ÚLTIMA ACTUALIZACIÓN':'LAST UPDATE';
  document.querySelector('.danger-label').textContent=es?'GERENTE DE LA TIENDA':'STORE MANAGER';
  document.querySelector('.manager-card>p').textContent=es?'Sigue el ruido, la luz y los pasillos alterados. Sus llaves suelen ser la única advertencia que recibes.':'He tracks noise, light, and disturbed aisles. His keys are often the only warning you receive.';
  document.querySelector('.controls-card>.label').textContent=es?'CONTROLES':'CONTROLS';
  const controlTranslations=['girar a la izquierda o derecha','avanzar o retroceder','correr hacia adelante','saltar hacia adelante','interactuar, recoger o comer','insertar y girar una llave','abrir una puerta después de insertar la llave','cerrar una puerta de seguridad abierta','lanzar botella aturdidora','comer comida guardada','usar mapa de guía','colocar señuelo de ruido','usar cámara con flash','colocar bloqueador de puerta','usar máscara de olor','agacharse y moverse en silencio','linterna','pausa'];
  document.querySelectorAll('.controls-card div span').forEach((item,index)=>item.textContent=es?controlTranslations[index]:['turn left or right','forward or backward','run forward','jump forward','interact, collect, or eat','insert and turn a door key','open a door after inserting its key','close an open security door','throw crafted stun bottle','eat carried food','use crafted guidance map','deploy crafted noise lure','fire crafted flash camera','place crafted door jammer','use crafted scent mask','crouch and move quietly','flashlight','pause'][index]);
  document.querySelector('#pauseCard strong').textContent=es?'PAUSA':'PAUSED';
  document.querySelector('#pauseCard span').textContent=es?'Pulsa P para continuar':'Press P to continue';
  document.querySelector('#compassButton').innerHTML=es?'Brújula de audio <kbd>L</kbd>':'Audio compass <kbd>L</kbd>';
  document.querySelector('#repeatButton').innerHTML=es?'Repetir objetivo <kbd>Q</kbd>':'Repeat objective <kbd>Q</kbd>';
  document.querySelector('#closeAccessButton').innerHTML=es?'LISTO <span>→</span>':'DONE <span>→</span>';
  document.querySelector('#restartButton').innerHTML=es?'INTENTAR DE NUEVO <span>↻</span>':'TRY AGAIN <span>↻</span>';
  document.querySelector('#fightButton').innerHTML=es?'LUCHAR <span>E · TOCAR</span>':'FIGHT BACK <span>E · TAP</span>';
  document.querySelector('#battleModal .kicker').textContent=es?'ENFRENTAMIENTO DE MEMORIA':'MEMORY CONFRONTATION';
  document.querySelector('#battleTitle').textContent=es?'TE TIENE.':'HE HAS YOU.';
  document.querySelector('#battleModal small').textContent=es?'Usa E o activa este botón repetidamente. Modo de gestos: toca dos veces repetidamente.':'Press E or activate this button repeatedly. Blind gesture mode: double tap repeatedly.';
  document.querySelector('#storyModal .label').textContent=es?'ANTES DEL CIERRE':'BEFORE CLOSING';
  document.querySelector('#accessModal .label').textContent=es?'OPCIONES DE JUEGO':'PLAY OPTIONS';
  document.querySelector('#mobileControlsHelp').textContent=es?'Gestos de puerta con cuatro dedos: junto a una puerta cerrada, desliza cuatro dedos a la derecha para insertar y girar una llave. Desliza cuatro dedos a la izquierda para abrir o cerrar la puerta.':'Four-finger door gestures: beside a locked door, swipe four fingers right to insert and turn a key. Swipe four fingers left to open or close the door.';
  document.querySelector('.touch-controls').setAttribute('aria-label',es?'Controles táctiles del juego':'Touch game controls');
  document.querySelector('.touch-actions').setAttribute('aria-label',es?'Controles de acciones del juego':'Game action controls');
  document.querySelector('#touchInteract').setAttribute('aria-label',es?'Interactuar, recoger, abrir, limpiar, atender, comer u ocultarse':'Interact, collect, open, clean, serve, eat, or hide');
  canvas.setAttribute('aria-label',es?'Mapa de Night Shift. Ante una puerta de seguridad, I inserta una llave, O la abre y C la cierra. L activa la brújula de audio. E realiza las demás interacciones.':'Night Shift game map. At a security door, I inserts a key, O opens it, and C closes it. L activates the audio compass. E handles other interactions.');
  document.querySelector('.manager-portrait').alt=es?'El señor Hollow, un gerente de supermercado alto y pálido con un viejo chaleco verde y un pesado llavero.':'Mr. Hollow, a tall pale supermarket manager in an old green vest, holding a heavy ring of keys.';
  document.querySelector('.story-card img').alt=es?'El señor Hollow detrás del mostrador de servicio del supermercado.':'Mr. Hollow standing behind the supermarket service counter.';
  document.querySelector('.start-art').alt=es?'Un pasillo oscuro de supermercado abandonado con el señor Hollow bajo luces fluorescentes que fallan.':'A dark abandoned supermarket aisle with Mr. Hollow standing beneath failing fluorescent lights.';
  const touchLabels=es?['INTERACTUAR','CORRER','SALTAR','LUZ','AGACHARSE','ESCUCHAR','REPETIR','COMER','CÁMARA','BLOQUEADOR','MÁSCARA']:['INTERACT','RUN','JUMP','LIGHT','CROUCH','LISTEN','REPEAT','EAT','CAMERA','JAMMER','MASK'];
  document.querySelectorAll('.touch-actions button').forEach((button,index)=>button.textContent=touchLabels[index]);
  gesturePad.setAttribute('aria-label',es?'Panel de gestos. Junto a una puerta cerrada, desliza cuatro dedos a la derecha para insertar y girar una llave; desliza cuatro dedos a la izquierda para abrirla o cerrarla. Desliza y mantén hacia arriba para caminar y hacia abajo para retroceder. Toca tres veces para la linterna, una vez con dos dedos para agacharte, dos veces con dos dedos para comer y una vez con tres dedos para saltar.':'Gesture pad. Beside a locked door, swipe four fingers right to insert and turn a key; swipe four fingers left to open or close it. Swipe and hold up to walk and down to move backward. Triple tap toggles the flashlight. Two-finger single tap crouches. Two-finger double tap eats. Three-finger single tap jumps.');
  visualMessage.textContent=translateText(visualMessage.dataset.message||visualMessage.textContent);
  updateGestureItemStatus();
  if(running){updateHud();draw();}
}

async function enterGestureFullscreen(){
  try{
    const root=document.documentElement;
    const request=root.requestFullscreen||root.webkitRequestFullscreen;
    if(request&&!document.fullscreenElement)await request.call(root);
  }catch(error){}
  try{
    if(screen.orientation?.lock)await screen.orientation.lock('landscape');
  }catch(error){}
}

function resetGame() {
  stopDangerMusic(true);
  stopDeathMusic();
  stopLightsOutMusic();
  stopStoreTrack(true);
  stopExplorationTrack(true);
  stopMemoryLossSound();
  stopCloseBySound();
  stopJumpSound();
  stopSurpriseSound();
  stopQuestionSound();
  stopStoreSpeakerRecordings();
  if(themeTimer){clearInterval(themeTimer);themeTimer=null;}
  player = {...playerStart};
  boss = {...bossStart};
  hasFuse = false;
  powerOn = false;
  hasKey = false;
  brassKeys = 0;
  securityDoors = doorBlueprints.map(door=>({...door,open:false,keyInserted:false}));
  shelfKeys = [...shelfKeyCandidates]
    .sort(()=>Math.random()-.5)
    .slice(0,securityDoors.length)
    .map((spot,index)=>({...spot,id:index,collected:false}));
  hidden = false;
  crouching = false;
  flashlight = true;
  flashlightDistractedBoss = false;
  paused = false;
  running = true;
  won = false;
  noiseTurns = 0;
  lastBossMove = 0;
  patrolIndex = 0;
  facing = 0;
  computerShiftHeld = false;
  phase = 'intro';
  if(ambientGain)ambientGain.gain.setTargetAtTime(soundToggle.checked?.018:0,audioContext.currentTime,.25);
  cleanedSpots = new Set();
  hasMop = false;
  moppingIndex = -1;mopProgress = 0;mopLastDirection = '';
  catches = 0;
  energy = 100;
  eatenFood = new Set();
  hasBottle = false;
  hasCleaner = false;
  hasStunBottle = false;
  bossStunnedUntil = 0;
  foodPortions = 0;
  hasPaper = false;
  hasMarker = false;
  hasMap = false;
  hasCan = false;
  hasBattery = false;
  hasLure = false;
  showMapUntil = 0;
  lureTarget = null;
  lureTurns = 0;
  hasCamera = false;
  hasFlashCell = false;
  hasFlashCamera = false;
  hasHandle = false;
  hasTape = false;
  hasDoorJammer = false;
  jammerSpot = null;
  hasRag = false;
  hasCoffee = false;
  hasScentMask = false;
  scentMaskUntil = 0;
  flickerUntil = 0;
  lastFearEvent = 0;
  lastJumpScare = -20000;
  nextJumpScareAt = performance.now()+4500+Math.random()*5000;
  customersServed = 0;
  dialogueSteps = [];
  dialogueIndex = 0;
  dialogueOnDone = null;
  foundClues = new Set();
  lastKnownPlayer = {...playerStart};
  huntMemory = 0;
  bossSearching = false;
  lastAmbush = 0;
  nextAmbushAt = performance.now()+12000+Math.random()*12000;
  nextPresenceCueAt = performance.now()+4500+Math.random()*5000;
  dangerMusicActive = false;
  dangerNearSince = 0;
  dangerFarSince = 0;
  lightsOutMusicActive = false;
  storeTrackActive = false;
  explorationTrackActive = false;
  memoryFragments = [];
  memorySideTaskActive = false;
  stolenMemories = 0;
  battleActive = false;
  battleHits = 0;
  battleLost = false;
  nextExhaustedMoveAt = 0;
  trailLostUntil = 0;
  cameraAlertActive = false;
  lastCameraAlertAt = 0;
  if(battleTimer){clearTimeout(battleTimer);battleTimer=null;}
  document.querySelector('#battleModal').hidden=true;
  closeByWasNear = false;
  bossWasVisible = false;
  powerOn = true;
  document.querySelector('#endModal').hidden = true;
  document.querySelector('#storyModal').hidden = true;
  document.querySelector('#pauseCard').hidden = true;
  updateHud();
  draw();
}

function objective() {
  if (phase === 'intro') return 'Listen to Mr. Hollow’s instructions.';
  if (phase === 'customers') return `Serve customers at the front checkout. ${customersServed} of 3 served.`;
  if (phase === 'cleaning') return hasMop ? `Mop the marked spills. ${cleaningSpots.length-cleanedSpots.size} remaining.` : 'Get the mop from the supply closet, then clean the marked spills.';
  const lostMemories=memorySideTaskActive?memoryFragments.filter(fragment=>!fragment.recovered).length:0;
  if(lostMemories>0)return `Recover your lost memories before escaping. ${lostMemories} remaining.`;
  if(stolenMemories>0)return `Mr. Hollow carries ${stolenMemories} stolen memor${stolenMemories===1?'y':'ies'}. Survive until you can confront him.`;
  if (!hasFuse) return 'Find the stockroom fuse in the southwest corner.';
  if (!powerOn) return 'Install the fuse at the breaker beside you.';
  if (!hasKey) return 'Find the office keycard in the northeast corner.';
  return 'Reach the loading exit in the southeast corner.';
}

function speakGameMessage(message, allowRetry = true) {
  if (!('speechSynthesis' in window) || !message) return;
  if (speechRetryTimer) {
    clearTimeout(speechRetryTimer);
    speechRetryTimer = null;
  }
  speechSynthesis.cancel();
  speechSynthesis.resume();
  const utterance = new SpeechSynthesisUtterance(message);
  activeSpeechUtterance = utterance;
  utterance.lang = language === 'es' ? 'es-US' : 'en-US';
  utterance.rate = blindMode ? 1.05 : 1;
  utterance.pitch = 0.9;
  const voices = speechSynthesis.getVoices();
  const languagePrefix = language === 'es' ? 'es' : 'en';
  const matchingVoice = voices.find(item => item.lang?.toLowerCase().startsWith(languagePrefix));
  if (matchingVoice) utterance.voice = matchingVoice;
  utterance.onend = () => {
    if (activeSpeechUtterance === utterance) activeSpeechUtterance = null;
  };
  utterance.onerror = event => {
    if (activeSpeechUtterance === utterance) activeSpeechUtterance = null;
    if (!allowRetry || event.error === 'canceled' || event.error === 'interrupted') return;
    speechRetryTimer = setTimeout(() => speakGameMessage(message, false), 180);
  };
  speechSynthesis.speak(utterance);
  if (allowRetry) {
    speechRetryTimer = setTimeout(() => {
      speechRetryTimer = null;
      if (activeSpeechUtterance === utterance && !speechSynthesis.speaking && !speechSynthesis.pending) {
        speakGameMessage(message, false);
      }
    }, 350);
  }
}

function announce(message, speak = true) {
  const localizedMessage=translateText(message);
  visualMessage.dataset.message=message;
  if (!localizedMessage || localizedMessage === lastAnnouncement) return;
  lastAnnouncement = localizedMessage;
  liveRegion.textContent = '';
  setTimeout(() => { liveRegion.textContent = localizedMessage; }, 20);
  visualMessage.textContent = localizedMessage;
  if (speak && narrationToggle.checked) speakGameMessage(localizedMessage);
}

function openDialogue(steps,onDone){
  dialogueSteps=steps;
  dialogueIndex=0;
  dialogueOnDone=onDone;
  document.querySelector('#storyModal').hidden=false;
  showDialogueStep();
}
function showDialogueStep(){
  const step=dialogueSteps[dialogueIndex];
  document.querySelector('#storySpeaker').textContent=language==='es'?(step.speaker==='YOU'?'TÚ':'SEÑOR HOLLOW'):step.speaker;
  document.querySelector('#storyText').textContent=translateText(step.text);
  document.querySelector('#storyNextButton').innerHTML=language==='es'?(dialogueIndex===dialogueSteps.length-1?'INICIAR TAREA <span>→</span>':'CONTINUAR <span>→</span>'):(dialogueIndex===dialogueSteps.length-1?'BEGIN TASK <span>→</span>':'CONTINUE <span>→</span>');
  const spokenSpeaker=language==='es'?(step.speaker==='YOU'?'TÚ dices:':'El señor Hollow dice:'):`${step.speaker} says:`;
  announce(`${spokenSpeaker} ${translateText(step.text)}${blindMode?' '+translateText('Double tap anywhere to continue.'):''}`,true);
}
function advanceDialogue(){
  dialogueIndex++;
  if(dialogueIndex<dialogueSteps.length){showDialogueStep();return;}
  document.querySelector('#storyModal').hidden=true;
  const onDone=dialogueOnDone;
  dialogueOnDone=null;
  if(onDone)onDone();
  canvas.focus();
}
function startIntro(){
  startStoreMusic();
  openDialogue([
    {speaker:'MR. HOLLOW',text:'You are the new night employee. I am Mr. Hollow. While these doors are open, every customer leaves satisfied.'},
    {speaker:'YOU',text:'Understood. Where do you need me?'},
    {speaker:'MR. HOLLOW',text:'Front checkout. Three customers remain. Scan their items, take payment, and do not ask why they are shopping this late.'}
  ],()=>{stopStoreMusic();phase='customers';playStoreTrack(false);announce('Walk to the front checkout and press E to serve each customer.',true);updateHud();draw();});
}

function updateHud() {
  objectiveText.textContent = translateText(objective()).replace(/\.$/, '');
  powerStatus.textContent = language==='es'?`ENERGÍA ELÉCTRICA: ${powerOn?'ACTIVA':'APAGADA'}`:`POWER: ${powerOn ? 'ON' : 'OFF'}`;
  powerStatus.style.color = powerOn ? '#c7ff4a' : '#ff414d';
  energyStatus.textContent = `${language==='es'?'RESISTENCIA':'ENERGY'}: ${Math.round(energy)}`;
  energyStatus.style.color = energy<=20?'#ff414d':energy<=45?'#ffc44a':'#c7ff4a';
  chanceItem.textContent=`${language==='es'?'OPORTUNIDADES':'CHANCES'} ×${Math.max(0,6-catches)}`;
  chanceItem.style.color=catches>=5?'#ff414d':catches>=3?'#ffc44a':'';
  const restoredMemories=memoryFragments.filter(fragment=>fragment.recovered).length;
  memoryItem.textContent=language==='es'?(!memoryFragments.length?'MEMORIA ESTABLE':memorySideTaskActive?`MEMORIA OBLIGATORIA ${restoredMemories}/${memoryFragments.length}`:'MEMORIA DESVANECIÉNDOSE'):(!memoryFragments.length?'MEMORY STABLE':memorySideTaskActive?`MEMORY REQUIRED ${restoredMemories}/${memoryFragments.length}`:'MEMORY FADING');
  memoryItem.classList.toggle('found',memoryFragments.length>0&&restoredMemories===memoryFragments.length);
  fuseItem.textContent = `${language==='es'?'FUSIBLE':'FUSE'} ${hasFuse ? '●' : '○'}`;
  keyItem.textContent = `${language==='es'?'TARJETA':'KEYCARD'} ${hasKey ? '●' : '○'}`;
  doorKeyItem.textContent = `${language==='es'?'LLAVES DE LATÓN':'BRASS KEYS'} ×${brassKeys}`;
  doorKeyItem.classList.toggle('found',brassKeys>0);
  foodItem.textContent=`${language==='es'?'COMIDA':'FOOD'} ×${foodPortions}`;
  clueItem.textContent=`${language==='es'?'MISTERIO':'MYSTERY'} ${foundClues.size}/4`;
  clueItem.classList.toggle('found',foundClues.size>0);
  fuseItem.classList.toggle('found', hasFuse);
  keyItem.classList.toggle('found', hasKey);
  craftItem.textContent=`${language==='es'?'BOTELLA ATURDIDORA':'STUN BOTTLE'} ${hasStunBottle?'●':'○'}`;
  craftItem.classList.toggle('found',hasStunBottle);
  mapItem.textContent=`${language==='es'?'MAPA':'MAP'} ${hasMap?'●':'○'}`;
  mapItem.classList.toggle('found',hasMap);
  lureItem.textContent=`${language==='es'?'SEÑUELO DE RUIDO':'NOISE LURE'} ${hasLure?'●':'○'}`;
  lureItem.classList.toggle('found',hasLure);
  cameraItem.textContent=`${language==='es'?'CÁMARA CON FLASH':'FLASH CAMERA'} ${hasFlashCamera?'●':'○'}`;
  cameraItem.classList.toggle('found',hasFlashCamera);
  wedgeItem.textContent=`${language==='es'?'BLOQUEADOR':'DOOR JAMMER'} ${hasDoorJammer?'●':'○'}`;
  wedgeItem.classList.toggle('found',hasDoorJammer);
  maskItem.textContent=`${language==='es'?'MÁSCARA DE OLOR':'SCENT MASK'} ${hasScentMask?'●':'○'}`;
  maskItem.classList.toggle('found',hasScentMask);
  if(phase!=='escape'){dangerStatus.textContent=language==='es'?(phase==='customers'?'TIENDA: ABIERTA':'TURNO: NORMAL'):(phase==='customers'?'STORE: OPEN':'SHIFT: NORMAL');dangerStatus.style.color='#c7ff4a';return;}
  if(isInCameraRoom(player)){
    dangerStatus.textContent=language==='es'?(cameraAlertActive?'CÁMARA: MOVIMIENTO':'CÁMARA: SEGURA'):(cameraAlertActive?'CAMERA: MOTION ALERT':'CAMERA: SECURE');
    dangerStatus.style.color=cameraAlertActive?'#ffc44a':'#54cfff';return;
  }
  if(performance.now()<trailLostUntil){
    const seconds=Math.max(1,Math.ceil((trailLostUntil-performance.now())/1000));
    dangerStatus.textContent=language==='es'?`RASTRO BORRADO: ${seconds} S`:`TRAIL ERASED: ${seconds} S`;
    dangerStatus.style.color='#54cfff';return;
  }
  const bossPhase=language==='es'?(hasKey?'FURIOSO':powerOn?'CAZANDO':'ACECHANDO'):(hasKey?'ENRAGED':powerOn?'HUNTING':'STALKING');
  dangerStatus.textContent = `${bossPhase}: ${language==='es'?'UBICACIÓN DESCONOCIDA':'LOCATION UNKNOWN'}`;
  dangerStatus.style.color = '#ff414d';
}

function movePlayer(dx, dy, quiet = false, energyCost = 1, allowDoorPush = true) {
  if (!running || paused || hidden || battleActive) return;
  const energyActive=phase==='escape';
  if(energyActive&&energy<=0){
    const now=performance.now();
    if(now<nextExhaustedMoveAt)return;
    nextExhaustedMoveAt=now+1150;
    energyCost=0;
    announce('Energy empty. You can still move, but every step is painfully slow. Find food.',true);
  }else if(energyActive&&energy<energyCost){energyCost=Math.max(0,energy);}
  const next = {x:player.x+dx,y:player.y+dy};
  const closedDoor=closedDoorAt(next.x,next.y);
  if(closedDoor&&!allowDoorPush){lockedDoorSound();announce(closedDoor.keyInserted?'The key is inserted. Press O to open this door.':'Press I to insert a brass key into this door.',true);return;}
  if(closedDoor&&!useSecurityDoor(closedDoor,'push'))return;
  if (walls.has(`${next.x},${next.y}`)) {
    announce(shelfTiles.has(`${next.x},${next.y}`)?'Blocked by a stocked shelf. Go around it.':'Blocked by the store wall. Turn and choose another route.', blindMode);
    tone(120, .06, 0);
    return;
  }
  player = next;
  if(energyActive)energy=Math.max(0,energy-energyCost);
  noiseTurns = quiet||crouching ? 0 : 2;
  footstepSound(dx);
  describeTile();
  updateHud();
  draw();
  checkCaught();
}

const facingVectors = [{x:0,y:-1},{x:1,y:-1},{x:1,y:0},{x:1,y:1},{x:0,y:1},{x:-1,y:1},{x:-1,y:0},{x:-1,y:-1}];
const facingNames = ['north','north-east','east','south-east','south','south-west','west','north-west'];
function turnPlayer(amount) {
  if (!running || paused || hidden) return;
  facing = (facing + amount + 8) % 8;
  announce(`Facing ${facingNames[facing]}.`, blindMode);
  tone(260,.035,amount);
  draw();
}
function moveFacing(backward = false, run = false, allowDoorPush = true) {
  const vector = facingVectors[facing];
  const dx = vector.x * (backward ? -1 : 1);
  const dy = vector.y * (backward ? -1 : 1);
  const actuallyRunning=run&&!crouching&&energy>0;
  movePlayer(dx,dy,crouching,actuallyRunning?3:1,allowDoorPush);
  if (actuallyRunning && running && !paused && !hidden) {
    noiseTurns = 5;
    movePlayer(dx,dy,false,3,allowDoorPush);
  }
}
function jumpForward(){
  if(!running||paused||hidden)return;
  if(phase==='escape'&&energy<5){announce('You need five energy to jump.',true);return;}
  const vector=facingVectors[facing];
  if(phase==='escape')energy=Math.max(0,energy-5);
  noiseTurns=5;
  playJumpSound();
  movePlayer(vector.x,vector.y,false,0,false);
  announce('Jumped forward. The landing was loud.',blindMode);
}

function describeTile() {
  if(isInCameraRoom(player)){
    announce(manhattan(player,cameraTransportButton)<=1?'Transport button ready. Press Interact to move to another part of the store and erase your trail for one minute.':'Camera room. The surveillance screens reveal store fixtures and items, but never Mr. Hollow’s location. He cannot enter this room. The transport button is at the north wall.',true);
    return;
  }
  const nearby = nearestImportant();
  const place = areaName(player);
  if (blindMode || nearby.distance <= 1) {
    announce(`${place}. ${nearby.text}`, true);
  } else {
    announce(place, false);
  }
}

function interact(allowDoorAction=true) {
  if(battleActive){fightBack();return;}
  if (!running || paused) return;
  if (phase === 'customers') {
    if(manhattan(player,checkoutSpot)<=1){
      const customerLines=[
        'Customer one buys milk and bread. The register drawer sticks before opening.',
        'Customer two returns a damaged music box. It plays one note by itself.',
        'The final customer pays without speaking, then stares past you toward Mr. Hollow.'
      ];
      announce(customerLines[customersServed],true);
      customersServed++;
      checkoutSound();
      if(customersServed>=3){
        stopStoreTrack(false);
        startStoreMusic();
        openDialogue([
          {speaker:'MR. HOLLOW',text:'That is enough. Lock the register. The customers always leave before dark.'},
          {speaker:'MR. HOLLOW',text:'Two spills remain in aisles three and four. Clean them, then report to me. Do not open the loading door.'}
        ],()=>{stopStoreMusic();phase='cleaning';playStoreTrack(true);announce('Mr. Hollow orders you to clean the two marked spills.',true);updateHud();draw();});
      }
      updateHud();draw();return;
    }
    announce(`The next customer is waiting at checkout, ${directionWords(checkoutSpot.x-player.x,checkoutSpot.y-player.y)}, ${manhattan(player,checkoutSpot)} steps away.`,true);
    return;
  }
  if(phase==='intro')return;
  if (phase === 'cleaning') {
    if(!hasMop&&manhattan(player,mopSpot)<=1){
      hasMop=true;pickupSound();announce('Mop collected. Clean the two marked spills with Interact.',true);updateHud();draw();return;
    }
    const spillIndex=cleaningSpots.findIndex((spot,index)=>!cleanedSpots.has(index)&&manhattan(player,spot)<=1);
    if(spillIndex>=0){
      if(!hasMop){announce('You need the mop from the supply closet before you can clean this spill.',true);return;}
      moppingIndex=spillIndex;mopProgress=0;mopLastDirection='';announce('Mop ready. Scrub left and right repeatedly until the spill is clean.',true);draw();
      return;
    }
    announce(hasMop?`Find the next marked spill. ${cleaningSpots.length-cleanedSpots.size} remain.`:'The mop is in the supply closet beside the front checkout.',true);
    return;
  }
  if(phase==='escape'&&manhattan(player,cameraTransportButton)<=1){
    useCameraTransport();
    return;
  }
  const shelfKey=phase==='escape'?shelfKeys.find(key=>!key.collected&&manhattan(player,key)<=1):null;
  if(shelfKey){
    shelfKey.collected=true;
    brassKeys++;
    brassKeyPickupSound();
    announce('Brass key collected from the shelf.',true);
    updateHud();draw();return;
  }
  const nearbyDoor=phase==='escape'?securityDoors.find(door=>!door.open&&manhattan(player,door)<=1):null;
  if(allowDoorAction&&nearbyDoor){useSecurityDoor(nearbyDoor,'insert');updateHud();draw();return;}
  const memoryIndex=phase==='escape'&&memorySideTaskActive?memoryFragments.findIndex(fragment=>!fragment.recovered&&manhattan(player,fragment)<=1):-1;
  if(memoryIndex>=0){
    memoryFragments[memoryIndex].recovered=true;
    catches=Math.max(0,catches-1);
    energy=Math.min(100,energy+14);
    huntMemory=Math.max(0,huntMemory-3);
    pickupSound();
    const remaining=memoryFragments.filter(fragment=>!fragment.recovered).length;
    const chancesNow=6-catches;
    if(remaining===0){
      bossStunnedUntil=Math.max(bossStunnedUntil,performance.now()+4000);
      announce('Your memory becomes whole again. One chance is restored. Your breathing steadies, your energy rises, and Mr. Hollow loses your trail for four seconds.',true);
    }else{
      announce(`Memory fragment restored. One chance recovered. You now have ${chancesNow} chances. ${remaining} lost fragment${remaining===1?' remains':'s remain'}.`,true);
    }
    updateHud();draw();return;
  }
  const foodIndex=phase==='escape'?foodSpots.findIndex((spot,index)=>!eatenFood.has(index)&&manhattan(player,spot)<=1):-1;
  if(foodIndex>=0){
    eatenFood.add(foodIndex);foodPortions=Math.min(6,foodPortions+1);pickupSound();
    announce(`Food packed. You now carry ${foodPortions} portion${foodPortions===1?'':'s'}. Press R to eat anywhere.`,false);updateHud();draw();return;
  }
  if(phase==='escape'&&!hasBottle&&manhattan(player,bottleSpot)<=1){
    hasBottle=true;pickupSound();announce('Empty bottle collected. Find cleaner to craft a stun bottle.',false);tryCraft();updateHud();draw();return;
  }
  if(phase==='escape'&&!hasCleaner&&manhattan(player,cleanerSpot)<=1){
    hasCleaner=true;pickupSound();announce('Cleaner collected. Find an empty bottle to craft a stun bottle.',false);tryCraft();updateHud();draw();return;
  }
  if(phase==='escape'&&!hasCan&&manhattan(player,canSpot)<=1){hasCan=true;pickupSound();announce('Empty can collected. Find batteries to build a noise lure.',false);tryCraftLure();updateHud();draw();return;}
  if(phase==='escape'&&!hasBattery&&manhattan(player,batterySpot)<=1){hasBattery=true;pickupSound();announce('Batteries collected. Find an empty can to build a noise lure.',false);tryCraftLure();updateHud();draw();return;}
  if(phase==='escape'&&!hasCamera&&manhattan(player,cameraSpot)<=1){hasCamera=true;pickupSound();announce('Disposable camera collected. Find a flash cell to weaponize it.',false);tryCraftCamera();updateHud();draw();return;}
  if(phase==='escape'&&!hasFlashCell&&manhattan(player,flashCellSpot)<=1){hasFlashCell=true;pickupSound();announce('Flash cell collected. Find the disposable camera.',false);tryCraftCamera();updateHud();draw();return;}
  if(phase==='escape'&&!hasHandle&&manhattan(player,handleSpot)<=1){hasHandle=true;pickupSound();announce('Broken broom handle collected. Find duct tape for a door jammer.',false);tryCraftJammer();updateHud();draw();return;}
  if(phase==='escape'&&!hasTape&&manhattan(player,tapeSpot)<=1){hasTape=true;pickupSound();announce('Duct tape collected. Find a broken handle for a door jammer.',false);tryCraftJammer();updateHud();draw();return;}
  if(phase==='escape'&&!hasRag&&manhattan(player,ragSpot)<=1){hasRag=true;pickupSound();announce('Cleaning rag collected. Find coffee grounds for a scent mask.',false);tryCraftMask();updateHud();draw();return;}
  if(phase==='escape'&&!hasCoffee&&manhattan(player,coffeeSpot)<=1){hasCoffee=true;pickupSound();announce('Coffee grounds collected. Find a cleaning rag for a scent mask.',false);tryCraftMask();updateHud();draw();return;}
  const clueIndex=phase==='escape'?clueSpots.findIndex((spot,index)=>!foundClues.has(index)&&manhattan(player,spot)<=1):-1;
  if(clueIndex>=0){
    foundClues.add(clueIndex);
    playQuestionSound();
    tapeGlitchSound();
    announce(`Mystery fragment ${foundClues.size} of 4. ${clueTexts[clueIndex]}`,true);
    updateHud();draw();return;
  }
  const hide = hideSpots.find(h => manhattan(player,h) <= 1);
  if (hidden) {
    hidden = false;
    announce('You leave the hiding place. Listen before moving.', true);
    return;
  }
  if (hide) {
    hidden = true;
    crouching = false;
    flashlight = false;
    announce('Hidden inside a supply cabinet. Mr. Hollow cannot see you. Press E to leave.', true);
    draw();
    return;
  }
  if (!hasMap && manhattan(player,fuse) <= 1) {
    announce('The dark stockroom is impossible to navigate safely without the guidance map. Find the store plan and marker first.',true);
  } else if (!hasFuse && manhattan(player,fuse) <= 1) {
    hasFuse = true;
    pickupSound();
    announce('Fuse collected. Install it at the breaker here by pressing E again.', true);
  } else if (hasFuse && !powerOn && manhattan(player,fuse) <= 1) {
    powerOn = true;
    tone(440,.12,0); setTimeout(()=>tone(660,.18,0),130);
    announce('Power restored. Mr. Hollow heard the breaker. Find the office keycard northeast.', true);
    boss = {x:7,y:11};
    noiseTurns = 5;
  } else if (powerOn && !hasKey && manhattan(player,keycard) <= 1) {
    hasKey = true;
    pickupSound();
    announce('Office keycard collected. Mr. Hollow enters his enraged phase. Reach the loading exit southeast.', true);
  } else if (hasKey && manhattan(player,exit) <= 1) {
    const lostMemories=memorySideTaskActive?memoryFragments.filter(fragment=>!fragment.recovered).length:0;
    if(lostMemories>0||stolenMemories>0)announce(`You cannot leave without your memories. ${lostMemories} fragment${lostMemories===1?' remains':'s remain'} in the store and ${stolenMemories} stolen by Mr. Hollow.`,true);
    else endGame(true);
  } else {
    const near = nearestImportant();
    announce(`Nothing to use here. ${near.text}`, true);
  }
  updateHud();
  draw();
}

function mopStroke(direction){
  if(moppingIndex<0)return false;
  if(direction===mopLastDirection)return true;
  mopLastDirection=direction;mopProgress++;cleaningSound();
  if(mopProgress>=6){
    cleanedSpots.add(moppingIndex);moppingIndex=-1;mopProgress=0;
    if(cleanedSpots.size===cleaningSpots.length)beginHorror();
    else announce(`Spill cleaned. ${cleaningSpots.length-cleanedSpots.size} left.`,true);
  }else announce(`Scrubbing. ${6-mopProgress} strokes remain.`,false);
  updateHud();draw();return true;
}

function nearestImportant() {
  const requiredMemories=phase==='escape'&&memorySideTaskActive?memoryFragments.filter(fragment=>!fragment.recovered):[];
  if(requiredMemories.length){
    requiredMemories.sort((a,b)=>manhattan(player,a)-manhattan(player,b));
    const memory=requiredMemories[0];
    const dx=memory.x-player.x,dy=memory.y-player.y;
    return {distance:manhattan(player,memory),text:`Required lost memory is ${directionWords(dx,dy)}, ${manhattan(player,memory)} steps away.`};
  }
  const targets = [];
  if(phase==='customers')targets.push({...checkoutSpot,label:'Checkout'});
  else if (phase==='cleaning') {
    if(!hasMop) targets.push({...mopSpot,label:'Mop closet'});
    else cleaningSpots.forEach((spot,index)=>{if(!cleanedSpots.has(index))targets.push({...spot,label:'Spill'});});
  }
  else if (!hasFuse) targets.push({...fuse,label:'Fuse'});
  else if (!powerOn) targets.push({...fuse,label:'Breaker'});
  else if (!hasKey) targets.push({...keycard,label:'Keycard'});
  else targets.push({...exit,label:'Exit'});
  if(phase==='escape')hideSpots.forEach(h => targets.push({...h,label:'Hiding place'}));
  if(phase==='escape')targets.push({...cameraRoomEntrance,label:'Camera room'});
  if(phase==='escape'&&energy<55)foodSpots.forEach((spot,index)=>{if(!eatenFood.has(index))targets.push({...spot,label:'Food'});});
  if(phase==='escape'&&!hasBottle)targets.push({...bottleSpot,label:'Empty bottle'});
  if(phase==='escape'&&!hasCleaner)targets.push({...cleanerSpot,label:'Cleaner'});
  if(phase==='escape'&&!hasCan)targets.push({...canSpot,label:'Empty can'});
  if(phase==='escape'&&!hasBattery)targets.push({...batterySpot,label:'Batteries'});
  if(phase==='escape'&&!hasCamera)targets.push({...cameraSpot,label:'Camera'});
  if(phase==='escape'&&!hasFlashCell)targets.push({...flashCellSpot,label:'Flash cell'});
  if(phase==='escape'&&!hasHandle)targets.push({...handleSpot,label:'Handle'});
  if(phase==='escape'&&!hasTape)targets.push({...tapeSpot,label:'Duct tape'});
  if(phase==='escape'&&!hasRag)targets.push({...ragSpot,label:'Rag'});
  if(phase==='escape'&&!hasCoffee)targets.push({...coffeeSpot,label:'Coffee'});
  if(phase==='escape')shelfKeys.forEach(key=>{if(!key.collected)targets.push({...key,label:'Brass key'});});
  if(phase==='escape'&&(brassKeys>0||securityDoors.some(door=>door.keyInserted)))securityDoors.forEach(door=>{if(!door.open)targets.push({...door,label:'Locked security door'});});
  if(phase==='escape')clueSpots.forEach((spot,index)=>{if(!foundClues.has(index))targets.push({...spot,label:'Mystery fragment'});});
  if(phase==='escape'&&memorySideTaskActive)memoryFragments.forEach(fragment=>{if(!fragment.recovered)targets.push({...fragment,label:'Lost memory'});});
  targets.sort((a,b)=>manhattan(player,a)-manhattan(player,b));
  const target = targets[0];
  const dx=target.x-player.x,dy=target.y-player.y;
  return {distance:manhattan(player,target),text:`${target.label} is ${directionWords(dx,dy)}, ${manhattan(player,target)} steps away.`};
}

function audioCompass() {
  if (!running) return;
  const uncleaned=cleaningSpots.find((spot,index)=>!cleanedSpots.has(index));
  const goal = phase==='customers' ? checkoutSpot : phase==='cleaning' ? (hasMop?uncleaned:mopSpot) : !hasFuse || !powerOn ? fuse : !hasKey ? keycard : exit;
  const goalName = phase==='customers' ? 'Checkout' : phase==='cleaning' ? (hasMop?'Next spill':'Mop closet') : !hasFuse ? 'Fuse' : !powerOn ? 'Breaker' : !hasKey ? 'Keycard' : 'Exit';
  const enemyDistance=manhattan(player,boss);
  const enemyDirection = directionWords(boss.x-player.x,boss.y-player.y);
  const dangerLine=phase!=='escape'?'Mr. Hollow is watching from the service desk.':isInCameraRoom(player)?'The camera room does not reveal Mr. Hollow’s location. Its motion alarm will warn you if he approaches.':enemyDistance<=5?`Danger. Mr. Hollow is ${enemyDirection}, ${enemyDistance} steps.`:'Mr. Hollow is somewhere in the store. Listen for him.';
  announce(`${goalName}: ${directionWords(goal.x-player.x,goal.y-player.y)}, ${manhattan(player,goal)} steps. ${dangerLine}`, true);
  spatialCue(goal.x-player.x, 520);
  if(phase==='escape'&&!isInCameraRoom(player)&&enemyDistance<=5)setTimeout(()=>spatialCue(boss.x-player.x,110),280);
}

function isInCameraRoom(point){return cameraRoomFloor.has(`${point.x},${point.y}`);}

function useCameraTransport(){
  if(!running||paused||phase!=='escape')return;
  const options=cameraTransportDestinations.filter(point=>!tileBlocked(point.x,point.y)&&manhattan(point,boss)>=7);
  const destinations=options.length?options:cameraTransportDestinations.filter(point=>!tileBlocked(point.x,point.y));
  player={...(destinations[Math.floor(Math.random()*destinations.length)]||playerStart)};
  trailLostUntil=performance.now()+60000;
  lastKnownPlayer={...playerStart};
  huntMemory=0;bossSearching=false;noiseTurns=0;lureTarget=null;lureTurns=0;
  cameraAlertActive=false;
  tone(1420,.08,-.5);setTimeout(()=>tone(1860,.08,.5),80);setTimeout(()=>noiseBurst(.3,.06,0),160);
  announce('The camera flashes white. You arrive somewhere else in the store. Mr. Hollow loses your trail for one minute.',true);
  updateHud();draw();
}

function updateCameraRoomAlert(time){
  if(phase!=='escape'||!isInCameraRoom(player)){
    if(cameraAlertActive){cameraAlertActive=false;updateHud();}
    return;
  }
  const approaching=manhattan(boss,cameraRoomEntrance)<=5;
  if(approaching&&!cameraAlertActive){
    cameraAlertActive=true;lastCameraAlertAt=time;
    [920,620,920].forEach((frequency,index)=>setTimeout(()=>tone(frequency,.09,index%2?-.45:.45),index*135));
    if(navigator.vibrate)navigator.vibrate([80,55,80]);
    announce('Camera warning. Movement detected outside the secure room. Mr. Hollow cannot enter.',true);
    updateHud();
  }else if(!approaching&&cameraAlertActive&&time-lastCameraAlertAt>1200){
    cameraAlertActive=false;
    announce('Camera clear. No movement is detected near the secure room.',true);
    updateHud();
  }
}

function bossStep(time) {
  const bossDelay=Math.max(430,(hasKey?620:powerOn?850:1150)-catches*90-foundClues.size*15);
  if (!running || paused || phase!=='escape' || time-lastBossMove < bossDelay) return;
  lastBossMove = time;
  if(time<bossStunnedUntil){dangerStatus.textContent=language==='es'?'GERENTE: ATURDIDO':'BOSS: STUNNED';dangerStatus.style.color='#54cfff';return;}
  const trailIsLost=time<trailLostUntil;
  const baseSight=flashlight ? (hasKey?9:6) : (hasKey?5:3);
  const scentMasked = time < scentMaskUntil;
  const seesPlayer = !trailIsLost&&!isInCameraRoom(player)&&!hidden&&manhattan(player,boss) <= Math.max(scentMasked?1:2,baseSight-(crouching?3:0)-(scentMasked?4:0));
  const distanceBeforeMove=manhattan(player,boss);
  if(distanceBeforeMove>7&&Math.random()<.16)return;
  if(!trailIsLost&&time>=nextAmbushAt&&distanceBeforeMove>8){
    const ambushPoints=hollowHidingPoints.filter(point=>{const distance=manhattan(player,point);return distance>=9&&distance<=18&&!bossTileBlocked(point.x,point.y);});
    if(ambushPoints.length){
      boss={...ambushPoints[Math.floor(Math.random()*ambushPoints.length)]};
      lastAmbush=time;
      patrolIndex=Math.floor(Math.random()*patrolPoints.length);
      if(blindMode)announce('The store falls silent. Mr. Hollow’s location is unknown.',true);
    }
    nextAmbushAt=time+14000+Math.random()*12000;
  }
  let target;
  if(trailIsLost){
    huntMemory=0;bossSearching=false;noiseTurns=0;
    target=patrolPoints[patrolIndex];
    if(manhattan(boss,target)<=1)patrolIndex=(patrolIndex+1)%patrolPoints.length;
  } else if(lureTurns>0&&lureTarget){
    target=lureTarget;lureTurns--;bossSearching=false;
  } else if(hidden&&(bossSearching||Math.random()<(hasKey ? .3 : .18))) {
    target=player;
    bossSearching=true;
  } else if (seesPlayer || noiseTurns > 0) {
    lastKnownPlayer={...player};
    huntMemory=5+Math.floor(Math.random()*5);
    target = lastKnownPlayer;
    bossSearching=false;
    noiseTurns = Math.max(0,noiseTurns-1);
  } else if(huntMemory>0) {
    target=lastKnownPlayer;
    huntMemory--;
    bossSearching=false;
  } else {
    target = patrolPoints[patrolIndex];
    bossSearching=false;
    if (manhattan(boss,target) <= 1) {
      let nextIndex=patrolIndex;
      while(nextIndex===patrolIndex)nextIndex=Math.floor(Math.random()*patrolPoints.length);
      patrolIndex=nextIndex;
    }
  }
  const path = findPath(boss,target);
  const bossBeforeMove = {...boss};
  if (path.length > 1) boss = path[1];
  if(jammerSpot&&manhattan(boss,jammerSpot)===0){
    boss=bossBeforeMove;
    jammerSpot=null;
    bossStunnedUntil=time+7000;
    impactSound();
    announce('Mr. Hollow hits the door jammer. The aisle shakes, but the pursuit stops for seven seconds.',true);
  }
  const distance = manhattan(player,boss);
  if(!isInCameraRoom(player))bossFootstepSound(distance,boss.x-player.x);
  if (!isInCameraRoom(player)&&distance <= 6) {
    spatialCue(boss.x-player.x, distance <= 2 ? 75 : 105);
    if(distance<=4)heartbeatSound(distance);
    if (Math.random() < .18) keyRattle(boss.x-player.x);
    if(distance<=5&&time>=nextJumpScareAt&&Math.random()<.38)triggerJumpScare(distance<=2?'HE FOUND YOU.':Math.random()<.5?'DON’T MOVE.':'SOMETHING MOVED.',false);
    if (blindMode && distance === 3) announce(`Danger. Mr. Hollow is ${directionWords(boss.x-player.x,boss.y-player.y)}, three steps away.`,true);
  }
  updateHud();
  draw();
  checkCaught();
}

function findPath(start,target) {
  const queue=[start], came=new Map([[`${start.x},${start.y}`,null]]);
  while(queue.length) {
    const current=queue.shift();
    if(current.x===target.x&&current.y===target.y) break;
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{
      const next={x:current.x+dx,y:current.y+dy},key=`${next.x},${next.y}`;
      if(!bossTileBlocked(next.x,next.y)&&!came.has(key)){came.set(key,current);queue.push(next);}
    });
  }
  const endKey=`${target.x},${target.y}`;
  if(!came.has(endKey)) return [start];
  const path=[]; let current=target;
  while(current){path.unshift(current);current=came.get(`${current.x},${current.y}`);}
  return path;
}

function checkCaught(){
  if(isInCameraRoom(player))return;
  if(player.x!==boss.x||player.y!==boss.y)return;
  if(hidden&&!bossSearching)return;
  if(hidden&&bossSearching){
    hidden=false;
    cabinetRipSound();
    announce('The cabinet door is ripped open. Mr. Hollow found your hiding place.',true);
  }
  if(catches>=5){startMemoryBattle();return;}
  const looseFragments=memoryFragments.filter(fragment=>!fragment.recovered).length;
  if(looseFragments>0){
    stolenMemories+=looseFragments;
    memoryFragments=memoryFragments.filter(fragment=>fragment.recovered);
  }
  const memoryDrop={x:player.x,y:player.y,recovered:false};
  catches++;
  triggerJumpScare(catches>=6?'CAUGHT.':'HE FOUND YOU.',true);
  closeByWasNear=false;
  stopCloseBySound();
  playMemoryLossSound();
  memoryFragments.push(memoryDrop);
  if(catches>=2)memorySideTaskActive=true;
  impactSound();
  player={...playerStart};
  boss={...bossStart};
  flashlight=false;
  noiseTurns=0;
  huntMemory=0;
  bossSearching=false;
  const chancesLeft=6-catches;
  const stolenMessage=stolenMemories?` He stole ${stolenMemories} memory fragment${stolenMemories===1?'':'s'} before leaving another piece behind.`:'';
  const memoryMessage=memorySideTaskActive?' Lost pieces of your memory remain where he caught you. You must recover every fragment by finding it and pressing E before you can escape.':' Something from the encounter is already becoming difficult to remember.';
  announce(`Mr. Hollow grabbed you, but you broke free. ${chancesLeft} chance${chancesLeft===1?'':'s'} left. He is getting faster.${stolenMessage}${memoryMessage}`,true);
  updateHud();draw();
}
function startMemoryBattle(){
  if(battleActive)return;
  battleActive=true;
  battleHits=0;
  paused=true;
  stopDangerMusic(false);
  triggerJumpScare('DON’T LET HIM LOCK IT.',true);
  document.querySelector('#battleModal').hidden=false;
  document.querySelector('#battleProgress').textContent=language==='es'?'LIBÉRATE: 0 / 6':'BREAK FREE: 0 / 6';
  document.querySelector('#battleText').textContent=language==='es'?`El señor Hollow tiene ${stolenMemories} fragmentos de memoria robados. Te arrastra hacia el almacén cerrado. Lucha antes de que termine de cerrar la última cerradura.`:`Mr. Hollow has ${stolenMemories} stolen memory fragment${stolenMemories===1?'':'s'}. He is dragging you toward the locked stockroom. Fight before the final lock turns.`;
  [42,31,52,27,39,24].forEach((frequency,index)=>setTimeout(()=>{tone(frequency,.5,index%2?-.7:.7);noiseBurst(.35,.12,index%2?-.8:.8);},index*420));
  if(navigator.vibrate)navigator.vibrate([220,80,220,80,400]);
  announce(`Memory confrontation. Mr. Hollow has ${stolenMemories} stolen memories. Press E or activate Fight Back six times before he locks you in.`,true);
  battleTimer=setTimeout(()=>finishMemoryBattle(false),9000);
  document.querySelector('#fightButton').focus();
}
function fightBack(){
  if(!battleActive)return;
  battleHits++;
  document.querySelector('#battleProgress').textContent=`${language==='es'?'LIBÉRATE':'BREAK FREE'}: ${battleHits} / 6`;
  noiseBurst(.18,.14,battleHits%2?-.65:.65);
  tone(90+battleHits*34,.12,battleHits%2?-.5:.5);
  if(navigator.vibrate)navigator.vibrate(70);
  if(battleHits>=6)finishMemoryBattle(true);
}
function finishMemoryBattle(wonBattle){
  if(!battleActive)return;
  battleActive=false;
  paused=false;
  if(battleTimer){clearTimeout(battleTimer);battleTimer=null;}
  document.querySelector('#battleModal').hidden=true;
  if(!wonBattle){
    battleLost=true;
    triggerJumpScare('THE LOCK TURNS.',true);
    endGame(false);
    return;
  }
  const returned=stolenMemories;
  catches=Math.max(0,catches-returned);
  stolenMemories=0;
  bossStunnedUntil=performance.now()+9000;
  player={...playerStart};
  boss={...bossStart};
  energy=Math.max(25,energy);
  triggerJumpScare('YOU TORE FREE.',true);
  announce(`You broke his grip. He dropped ${returned} stolen memory fragment${returned===1?'':'s'}. ${returned} chance${returned===1?' was':'s were'} restored. Run.`,true);
  updateHud();draw();
}
function endGame(success){
  running=false;won=success;
  stopDangerMusic(!success);
  stopLightsOutMusic();
  stopStoreTrack(true);
  stopExplorationTrack(true);
  stopMemoryLossSound();
  stopCloseBySound();
  stopJumpSound();
  stopSurpriseSound();
  stopQuestionSound();
  stopStoreSpeakerRecordings();
  if(themeTimer){clearInterval(themeTimer);themeTimer=null;}
  document.querySelector('#endKicker').textContent=language==='es'?(success?'TURNO SUPERADO':'TURNO TERMINADO'):(success?'SHIFT SURVIVED':'SHIFT ENDED');
  document.querySelector('#endTitle').textContent=language==='es'?(success?'ESCAPASTE.':'ATRAPADO.'):(success?'YOU ESCAPED.':'CAUGHT.');
  document.querySelector('#endMessage').textContent=language==='es'?(success?'La puerta de carga se cierra de golpe detrás de ti. Desde dentro, el señor Hollow dice en voz baja: «Nos vemos mañana».':battleLost?'La cerradura del almacén gira. Las luces del otro lado se apagan. El señor Hollow conserva todos los recuerdos que dejaste atrás.':'El señor Hollow te encontró entre los pasillos. Escucha, escóndete e intenta una ruta más silenciosa.'):(success?'The loading door slams behind you. From inside, Mr. Hollow quietly says: “See you tomorrow.”':battleLost?'The stockroom lock turns. The lights outside the door go silent. Mr. Hollow keeps every memory you left behind.':'Mr. Hollow found you between the aisles. Listen, hide, and try a quieter route.');
  document.querySelector('#endModal').hidden=false;
  if(!success)playDeathMusic();
  announce(success?'You escaped Aisle 13. Shift survived.':battleLost?'Mr. Hollow locked you in the stockroom. Shift ended.':'Caught by Mr. Hollow. Shift ended.',true);
}

function draw() {
  ctx.fillStyle=powerOn?'#101817':'#070a0b';ctx.fillRect(0,0,canvas.width,canvas.height);
  for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++){
    const wall=walls.has(`${x},${y}`);
    ctx.fillStyle=wall?(powerOn?'#293231':'#171d1d'):((x+y)%2?'#101515':'#0d1212');
    ctx.fillRect(x*TILE,y*TILE,TILE,TILE);
    if(!wall){ctx.strokeStyle='rgba(105,120,116,.06)';ctx.strokeRect(x*TILE,y*TILE,TILE,TILE);}
    if(wall){ctx.strokeStyle='#3c4947';ctx.strokeRect(x*TILE+2,y*TILE+2,TILE-4,TILE-4);}
  }
  drawCameraRoom();
  drawStoreFixtures();
  securityDoors.forEach(door=>drawSecurityDoor(phase==='escape'?door:{...door,open:true}));
  if(phase==='escape')shelfKeys.forEach(key=>{if(!key.collected)drawShelfKey(key);});
  if(phase==='escape')hideSpots.forEach(h=>drawMarker(h,'#50645f','H'));
  if(phase==='customers')drawCheckoutCounter();
  if(phase==='cleaning'){
    drawMopCloset();
    cleaningSpots.forEach((spot,index)=>{if(!cleanedSpots.has(index))drawSpill(spot);});
  }
  if(phase==='escape')foodSpots.forEach((spot,index)=>{if(!eatenFood.has(index))drawMarker(spot,'#c7ff4a','FOOD');});
  if(phase==='escape'&&!hasBottle)drawMarker(bottleSpot,'#9bc8ff','BOT');
  if(phase==='escape'&&!hasCleaner)drawMarker(cleanerSpot,'#d49bff','SOAP');
  if(phase==='escape'&&!hasCan)drawMarker(canSpot,'#a8b1ae','CAN');
  if(phase==='escape'&&!hasBattery)drawMarker(batterySpot,'#e3c866','CELL');
  if(phase==='escape'&&!hasCamera)drawMarker(cameraSpot,'#8be7ff','CAM');
  if(phase==='escape'&&!hasFlashCell)drawMarker(flashCellSpot,'#fff38b','FLASH');
  if(phase==='escape'&&!hasHandle)drawMarker(handleSpot,'#b68b67','WOOD');
  if(phase==='escape'&&!hasTape)drawMarker(tapeSpot,'#bdc7c4','TAPE');
  if(phase==='escape'&&!hasRag)drawMarker(ragSpot,'#9aaea8','RAG');
  if(phase==='escape'&&!hasCoffee)drawMarker(coffeeSpot,'#9b6948','COFFEE');
  if(phase==='escape')clueSpots.forEach((spot,index)=>{if(!foundClues.has(index))drawMarker(spot,'#ff6b84','?');});
  if(phase==='escape'&&memorySideTaskActive)memoryFragments.forEach(fragment=>{if(!fragment.recovered)drawMarker(fragment,'#b58cff','MEM');});
  if(phase==='escape'&&!hasFuse)drawMarker(fuse,'#ffc44a','F');
  if(phase==='escape'&&powerOn&&!hasKey)drawMarker(keycard,'#54cfff','K');
  if(phase==='escape')drawMarker(exit,hasKey?'#c7ff4a':'#5a665f','EXIT');
  if(!hidden) {
    ctx.beginPath();ctx.fillStyle=crouching?'#73827e':flashlight?'#c7ff4a':'#9aa8a3';ctx.arc(player.x*TILE+20,player.y*TILE+20,crouching?7:11,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
    const face=facingVectors[facing];
    ctx.beginPath();ctx.moveTo(player.x*TILE+20,player.y*TILE+20);ctx.lineTo(player.x*TILE+20+face.x*18,player.y*TILE+20+face.y*18);ctx.strokeStyle='#07100d';ctx.lineWidth=4;ctx.stroke();
    if(crouching){ctx.fillStyle='#b7c2be';ctx.font='8px IBM Plex Mono';ctx.fillText('CROUCHED',player.x*TILE-2,player.y*TILE+34);}
  } else {
    ctx.fillStyle='#c7ff4a';ctx.font='bold 11px IBM Plex Mono';ctx.fillText('HIDDEN',player.x*TILE-4,player.y*TILE+5);
  }
  if(!powerOn&&!isInCameraRoom(player)){ctx.fillStyle='rgba(0,0,0,.62)';ctx.fillRect(0,0,canvas.width,canvas.height);}
  if(flashlight&&!hidden&&!powerOn){
    const gradient=ctx.createRadialGradient(player.x*TILE+20,player.y*TILE+20,10,player.x*TILE+20,player.y*TILE+20,150);
    gradient.addColorStop(0,'rgba(220,255,180,.38)');gradient.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=gradient;ctx.fillRect(0,0,canvas.width,canvas.height);
  }
  if(hasMap&&performance.now()<showMapUntil){
    const goal=currentGoal();ctx.strokeStyle='rgba(199,255,74,.68)';ctx.lineWidth=3;ctx.setLineDash([8,8]);ctx.beginPath();ctx.moveTo(player.x*TILE+20,player.y*TILE+20);ctx.lineTo(goal.x*TILE+20,goal.y*TILE+20);ctx.stroke();ctx.setLineDash([]);
  }
  if(jammerSpot)drawMarker(jammerSpot,'#ff9f43','JAM');
  if(performance.now()<flickerUntil){ctx.fillStyle='rgba(0,0,0,.78)';ctx.fillRect(0,0,canvas.width,canvas.height);}
}

function drawCameraRoom(){
  ctx.save();
  cameraRoomFloor.forEach(key=>{
    const [x,y]=key.split(',').map(Number);
    ctx.fillStyle=isInCameraRoom(player)?'#17343a':'#102429';
    ctx.fillRect(x*TILE+2,y*TILE+2,TILE-4,TILE-4);
    ctx.strokeStyle='#4aa9b8';ctx.lineWidth=1;ctx.strokeRect(x*TILE+4,y*TILE+4,TILE-8,TILE-8);
  });
  for(let x=12;x<=14;x++){
    const px=x*TILE+5,py=TILE+5;
    ctx.fillStyle=cameraAlertActive?'#6b2027':'#143b42';ctx.fillRect(px,py,30,18);
    ctx.strokeStyle=cameraAlertActive?'#ff6b74':'#70d9e8';ctx.strokeRect(px,py,30,18);
    ctx.fillStyle=cameraAlertActive?'#ff9aa1':'#8be7ff';ctx.fillRect(px+5,py+5,20,2);ctx.fillRect(px+5,py+10,12,2);
  }
  const buttonX=cameraTransportButton.x*TILE+20,buttonY=cameraTransportButton.y*TILE+29;
  ctx.fillStyle='#080c0d';ctx.beginPath();ctx.arc(buttonX,buttonY,8,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#c7ff4a';ctx.lineWidth=2;ctx.stroke();
  ctx.fillStyle='#dce8e4';ctx.font='bold 7px IBM Plex Mono';ctx.textAlign='center';ctx.fillText(language==='es'?'TRANSP.':'TRANSPORT',buttonX,buttonY+17);
  ctx.fillStyle='#8be7ff';ctx.font='bold 7px IBM Plex Mono';ctx.fillText(language==='es'?'SALA DE CÁMARAS':'CAMERA ROOM',13*TILE+20,3*TILE+34);
  ctx.textAlign='start';ctx.restore();
}

function drawStoreFixtures(){
  // Shelves are searchable scenery: visibly stocked, but never movement blockers.
  ctx.save();
  shelfTiles.forEach(key=>{
    const [x,y]=key.split(',').map(Number);
    const px=x*TILE,py=y*TILE;
    const stockSeed=(x*17+y*31)%5;
    ctx.fillStyle='#65492e';ctx.fillRect(px+2,py+2,TILE-4,TILE-4);
    ctx.fillStyle='#1d1713';ctx.fillRect(px+5,py+6,TILE-10,5);ctx.fillRect(px+5,py+19,TILE-10,5);ctx.fillRect(px+5,py+32,TILE-10,4);
    for(let row=0;row<2;row++)for(let slot=0;slot<4;slot++){
      const product=(stockSeed+row*2+slot)%5;
      const itemX=px+7+slot*7,itemY=py+11+row*13;
      if(product===0){ctx.fillStyle='#e2c45a';ctx.fillRect(itemX,itemY,5,8);ctx.fillStyle='#7d3d31';ctx.fillRect(itemX,itemY,5,2);}
      else if(product===1){ctx.fillStyle='#75a979';ctx.fillRect(itemX,itemY+1,6,7);ctx.fillStyle='#dce8d7';ctx.fillRect(itemX+1,itemY+2,4,2);}
      else if(product===2){ctx.fillStyle='#c96e58';ctx.fillRect(itemX,itemY,5,8);ctx.fillStyle='#f0c99e';ctx.fillRect(itemX+1,itemY+1,3,2);}
      else if(product===3){ctx.fillStyle='#79aeca';ctx.beginPath();ctx.arc(itemX+3,itemY+4,3,0,Math.PI*2);ctx.fill();ctx.fillStyle='#d8eff5';ctx.fillRect(itemX+2,itemY,2,2);}
      else{ctx.fillStyle='#d5d2c6';ctx.fillRect(itemX,itemY+2,6,6);ctx.fillStyle='#9d7cc4';ctx.fillRect(itemX,itemY+2,6,2);}
    }
    ctx.strokeStyle='#9a7449';ctx.lineWidth=1;ctx.strokeRect(px+2,py+2,TILE-4,TILE-4);
  });
  ctx.restore();
}
function drawSecurityDoor(door){
  const px=door.x*TILE,py=door.y*TILE;
  ctx.save();
  ctx.fillStyle='#202827';ctx.fillRect(px+2,py+2,TILE-4,TILE-4);
  ctx.strokeStyle=door.open?'#668076':'#9d733b';ctx.lineWidth=3;ctx.strokeRect(px+3,py+3,TILE-6,TILE-6);
  if(door.open){
    ctx.fillStyle='#263532';
    if(door.orientation==='vertical')ctx.fillRect(px+4,py+5,7,TILE-10);
    else ctx.fillRect(px+5,py+4,TILE-10,7);
    ctx.fillStyle='#c7ff4a';ctx.font='bold 7px IBM Plex Mono';ctx.fillText('OPEN',px+9,py+23);
  }else{
    const gradient=ctx.createLinearGradient(px,py,px+TILE,py+TILE);
    gradient.addColorStop(0,'#79512f');gradient.addColorStop(1,'#33251d');
    ctx.fillStyle=gradient;ctx.fillRect(px+7,py+5,TILE-14,TILE-10);
    ctx.strokeStyle='#b98b50';ctx.lineWidth=1;ctx.strokeRect(px+10,py+8,TILE-20,TILE-16);
    ctx.fillStyle='#e2b85f';ctx.beginPath();ctx.arc(px+27,py+21,3,0,Math.PI*2);ctx.fill();
    if(door.keyInserted){
      ctx.strokeStyle='#fff0a8';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(px+27,py+21);ctx.lineTo(px+34,py+17);ctx.stroke();
      ctx.fillStyle='#c7ff4a';ctx.font='bold 7px IBM Plex Mono';ctx.fillText('PUSH',px+8,py+37);
    }else{
      ctx.fillStyle='#ffd978';ctx.font='bold 7px IBM Plex Mono';ctx.fillText('LOCK',px+8,py+37);
    }
  }
  ctx.restore();
}
function drawShelfKey(key){
  const cx=key.x*TILE+20,cy=key.y*TILE+20;
  ctx.save();ctx.shadowColor='#ffd978';ctx.shadowBlur=9;ctx.strokeStyle='#ffd978';ctx.lineWidth=3;
  ctx.beginPath();ctx.arc(cx-5,cy,5,0,Math.PI*2);ctx.stroke();
  ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+11,cy);ctx.lineTo(cx+11,cy+5);ctx.moveTo(cx+6,cy);ctx.lineTo(cx+6,cy+4);ctx.stroke();
  ctx.shadowBlur=0;ctx.fillStyle='#fff0a8';ctx.font='bold 7px IBM Plex Mono';ctx.fillText('KEY',cx-9,cy+15);ctx.restore();
}
function drawCheckoutCounter(){
  const px=checkoutSpot.x*TILE,py=checkoutSpot.y*TILE;
  ctx.fillStyle='#573b2c';ctx.fillRect(px-18,py+10,98,27);
  ctx.fillStyle='#d2b171';ctx.fillRect(px-18,py+10,98,5);
  ctx.fillStyle='#182121';ctx.fillRect(px+44,py-2,22,17);ctx.fillStyle='#7fd9e8';ctx.fillRect(px+48,py+1,14,8);
  ctx.fillStyle='#d9d1be';ctx.fillRect(px+7,py+17,25,9);
  ctx.fillStyle='#e7eee9';ctx.font='bold 7px IBM Plex Mono';ctx.fillText('REGISTER',px-13,py+48);
}
function drawMopCloset(){
  const px=mopSpot.x*TILE,py=mopSpot.y*TILE;
  ctx.fillStyle='#334842';ctx.fillRect(px+4,py+3,31,34);ctx.fillStyle='#a1b5a6';ctx.fillRect(px+17,py+6,3,27);
  ctx.strokeStyle='#d6c15f';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(px+12,py+31);ctx.lineTo(px+24,py+8);ctx.stroke();
  if(!hasMop){ctx.fillStyle='#d8e6dd';ctx.font='bold 7px IBM Plex Mono';ctx.fillText('MOP',px+1,py+48);}
}
function drawSpill(point){
  const px=point.x*TILE+20,py=point.y*TILE+22;
  ctx.fillStyle='rgba(75,167,185,.65)';ctx.beginPath();ctx.ellipse(px,py,16,8,.25,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#b7ecf1';ctx.beginPath();ctx.ellipse(px-6,py-2,5,2,.2,0,Math.PI*2);ctx.fill();
}

// Sighted players use the map itself as a gesture controller; screen-reader
// gesture mode remains available and uses its own full-screen pad.
let visualGestureStart=null,visualGestureTimer=null;
let visualFourFingerActive=false;
const visualGesturePointers=new Map();
function stopVisualGesture(){if(visualGestureTimer){clearInterval(visualGestureTimer);visualGestureTimer=null;}}
canvas.addEventListener('pointerdown',event=>{
  if(blindMode||event.pointerType==='mouse')return;
  canvas.setPointerCapture?.(event.pointerId);
  visualGesturePointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
  if(!visualGestureStart)visualGestureStart={x:event.clientX,y:event.clientY,id:event.pointerId,held:false,used:false};
  if(visualGesturePointers.size>=4)visualFourFingerActive=true;
});
canvas.addEventListener('pointermove',event=>{
  if(!visualGestureStart)return;
  if(moppingIndex>=0&&event.pointerId===visualGestureStart.id){
    event.preventDefault();
    const dx=event.clientX-visualGestureStart.x;
    if(Math.abs(dx)>22){mopStroke(dx<0?'left':'right');visualGestureStart.used=true;visualGestureStart.x=event.clientX;visualGestureStart.y=event.clientY;}
    return;
  }
  const origin=visualGesturePointers.get(event.pointerId);
  if(!origin)return;
  const multiDx=event.clientX-origin.x,multiDy=event.clientY-origin.y;
  if(visualFourFingerActive&&!visualGestureStart.used&&Math.abs(multiDx)>48&&Math.abs(multiDx)>Math.abs(multiDy)){
    visualGestureStart.used=true;stopVisualGesture();
    useNearbySecurityDoor(multiDx>0?'gesture-insert':'gesture-toggle');return;
  }
  if(visualGesturePointers.size>=4)return;
  if(visualGesturePointers.size>=3&&multiDy<-42&&!visualGestureStart.used){visualGestureStart.used=true;stopVisualGesture();useMap();return;}
  if(visualGesturePointers.size>=2&&!visualGestureStart.held&&(multiDy<-42||Math.abs(multiDx)>42)){
    visualGestureStart.held=true;
    const action=()=>multiDy<-42?moveFacing(false,true):turnPlayer(multiDx<0?-1:1);
    action();visualGestureTimer=setInterval(action,310);return;
  }
  if(event.pointerId!==visualGestureStart.id||visualGesturePointers.size>1)return;
  const dx=event.clientX-visualGestureStart.x,dy=event.clientY-visualGestureStart.y;
  if(visualGestureStart.held||Math.max(Math.abs(dx),Math.abs(dy))<42)return;
  visualGestureStart.held=true;
  const action=()=>{
    if(Math.abs(dx)>Math.abs(dy))turnPlayer(dx<0?-1:1);
    else moveFacing(dy>0,false);
  };
  action();visualGestureTimer=setInterval(action,310);
});
function finishVisualGesture(event){
  if(!visualGestureStart)return;
  visualGesturePointers.delete(event.pointerId);
  if(visualGesturePointers.size)return;
  if(visualFourFingerActive)visualGestureStart.used=true;
  visualFourFingerActive=false;
  const dx=event.clientX-visualGestureStart.x,dy=event.clientY-visualGestureStart.y;
  const wasHeld=visualGestureStart.held||visualGestureStart.used;stopVisualGesture();visualGestureStart=null;
  if(wasHeld)return;
  if(Math.hypot(dx,dy)<26)interact();
  else if(Math.abs(dx)>Math.abs(dy))turnPlayer(dx<0?-1:1);
  else moveFacing(dy>0,false);
}
canvas.addEventListener('pointerup',finishVisualGesture);
canvas.addEventListener('pointercancel',finishVisualGesture);
canvas.addEventListener('dblclick',event=>{
  if(blindMode||!window.matchMedia('(hover:hover) and (pointer:fine)').matches)return;
  event.preventDefault();interact(false);
});

function drawMarker(point,color,label){
  const cx=point.x*TILE+20,cy=point.y*TILE+20;
  ctx.fillStyle='rgba(4,8,8,.82)';ctx.beginPath();ctx.arc(cx,cy,13,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=color;ctx.lineWidth=2;ctx.stroke();
  ctx.fillStyle='#d6dfdb';ctx.font='bold 7px IBM Plex Mono';ctx.textAlign='center';ctx.fillText(label,cx,cy+3);ctx.textAlign='start';
}
function areaName(p){if(isInCameraRoom(p))return 'Camera room';if(p.y<=3)return p.x>=23?'Manager office hall':'Front checkout';if(p.y>=15)return p.x<=9?'Stockroom':p.x>=23?'Loading bay':'Back aisle';return `Aisle ${Math.max(1,Math.floor(p.x/2))}`;}
function directionWords(dx,dy){const vertical=dy<0?'north':dy>0?'south':'';const horizontal=dx<0?'west':dx>0?'east':'';return vertical&&horizontal?`${vertical}-${horizontal}`:vertical||horizontal||'here';}
function manhattan(a,b){return Math.abs(a.x-b.x)+Math.abs(a.y-b.y);}
function closedDoorAt(x,y){return phase==='escape'?securityDoors.find(door=>!door.open&&door.x===x&&door.y===y):null;}
function tileBlocked(x,y){return walls.has(`${x},${y}`)||Boolean(closedDoorAt(x,y));}
function bossTileBlocked(x,y){return tileBlocked(x,y)||cameraRoomFloor.has(`${x},${y}`);}
function useSecurityDoor(door,action){
  if(!door)return false;
  if(door.open&&(action==='close'||action==='gesture-toggle')){
    if(boss.x===door.x&&boss.y===door.y){lockedDoorSound();announce('Mr. Hollow is in the doorway. You cannot close it yet.',true);draw();return false;}
    door.open=false;
    closeDoorSound();
    announce('The security door closes. Mr. Hollow cannot cross it.',true);
    updateHud();draw();return true;
  }
  if(door.open)return true;
  if(action==='push'||action==='open'||action==='gesture-open'||action==='gesture-toggle'){
    if(!door.keyInserted){
      lockedDoorSound();
      announce(brassKeys>0?(action==='open'?'Press I to insert a brass key into this door.':action==='gesture-open'||action==='gesture-toggle'?'Swipe four fingers right to insert a brass key first.':'Insert a brass key with Interact before pushing the door.'):'The security door is locked. Search the shelves for a brass key.',true);
      draw();return false;
    }
    door.open=true;
    openDoorSound();
    announce('The security door swings open.',true);
    updateHud();draw();return true;
  }
  if(door.keyInserted){lockedDoorSound();announce(action==='gesture-insert'?'The key is inserted. Swipe four fingers left to open the door.':'The key is already in the lock. Move forward to push the door open.',true);draw();return false;}
  if(brassKeys<1){lockedDoorSound();announce('The security door is locked. Search the shelves for a brass key.',true);draw();return false;}
  brassKeys--;
  door.keyInserted=true;
  insertKeySound();
  announce(action==='gesture-insert'?'You insert the brass key and turn the lock. Now swipe four fingers left to open the door.':'You insert the brass key and turn the lock. Move forward to push the door open.',true);
  updateHud();draw();return false;
}
function useNearbySecurityDoor(action){
  if(!running||paused||phase!=='escape')return;
  const door=securityDoors.find(item=>(action==='close'?item.open:action==='gesture-toggle'?true:!item.open)&&manhattan(player,item)<=1);
  if(!door){announce(action==='insert'?'No locked door is close enough to insert a key.':action==='close'?'No open door is close enough to close.':action==='gesture-toggle'?'No security door is close enough to open or close.':'No prepared door is close enough to open.',true);return;}
  useSecurityDoor(door,action);
}
function currentGoal(){return !hasFuse||!powerOn?fuse:!hasKey?keycard:exit;}

function ensureAudio(){
  if(audioContext)return;
  audioContext=new(window.AudioContext||window.webkitAudioContext)();
  ambientGain=audioContext.createGain();
  ambientGain.gain.value=soundToggle.checked?.018:0;
  ambientGain.connect(audioContext.destination);
  [46,58,119].forEach((frequency,index)=>{
    const oscillator=audioContext.createOscillator(),gain=audioContext.createGain();
    oscillator.type=index===2?'sine':'triangle';
    oscillator.frequency.value=frequency;
    gain.gain.value=index===2?.18:.34;
    oscillator.connect(gain).connect(ambientGain);
    oscillator.start();
  });
}
function noiseBurst(duration=.08,volume=.035,pan=0){
  if(!soundToggle.checked)return;ensureAudio();
  const length=Math.max(1,Math.floor(audioContext.sampleRate*duration)),buffer=audioContext.createBuffer(1,length,audioContext.sampleRate),data=buffer.getChannelData(0);
  for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*(1-i/length);
  const source=audioContext.createBufferSource(),gain=audioContext.createGain(),p=audioContext.createStereoPanner?audioContext.createStereoPanner():audioContext.createGain();
  source.buffer=buffer;gain.gain.value=volume;if('pan'in p)p.pan.value=Math.max(-1,Math.min(1,pan));source.connect(gain).connect(p).connect(audioContext.destination);source.start();
}
function footstepSound(pan=0){noiseBurst(.075,.028,pan);tone(105+Math.random()*24,.055,pan);}
function checkoutSound(){tone(880,.055,-.2);setTimeout(()=>tone(1180,.06,.2),70);setTimeout(()=>noiseBurst(.09,.025,0),145);}
function bossFootstepSound(distance,dx){
  if(!soundToggle.checked||distance>14)return;
  const pan=Math.max(-1,Math.min(1,dx/6));
  const closeness=Math.max(0,1-distance/15);
  const closeImpact=distance<=3?.11:distance<=6?.07:0;
  noiseBurst(.17,.03+closeness*.1+closeImpact,pan);
  tone(42+Math.random()*7,.18+closeness*.11,pan);
  setTimeout(()=>{noiseBurst(.09,.025+closeness*.065+closeImpact*.5,pan);tone(distance<=3?54:68,.07,pan);},95);
  if(distance<=3)setTimeout(()=>{noiseBurst(.12,.1,pan);tone(34,.16,pan);},165);
  if(distance<=6)setTimeout(()=>keyRattle(dx),150);
}
function cleaningSound(){noiseBurst(.38,.045,0);tone(540,.12,-.2);setTimeout(()=>noiseBurst(.28,.035,.2),150);setTimeout(()=>tone(880,.11,0),310);}
function lockedDoorSound(){
  noiseBurst(.08,.08,0);tone(135,.09,-.15);setTimeout(()=>tone(118,.11,.15),95);
  if(navigator.vibrate)navigator.vibrate([45,35,65]);
}
function openDoorSound(){
  noiseBurst(.42,.07,.2);setTimeout(()=>tone(92,.3,.1),45);setTimeout(()=>tone(150,.14,-.1),170);
  if(navigator.vibrate)navigator.vibrate(55);
}
function closeDoorSound(){
  noiseBurst(.34,.075,-.15);tone(155,.12,.1);setTimeout(()=>tone(78,.22,0),90);setTimeout(()=>noiseBurst(.09,.12,0),185);
  if(navigator.vibrate)navigator.vibrate([45,25,75]);
}
function insertKeySound(){
  keyRattle(0);setTimeout(()=>tone(390,.07,-.2),125);setTimeout(()=>tone(210,.11,.2),205);
  if(navigator.vibrate)navigator.vibrate([35,30,55]);
}
function brassKeyPickupSound(){
  [980,1320,1760].forEach((frequency,index)=>setTimeout(()=>tone(frequency,.06,index===0?-.3:index===2?.3:0),index*65));
}
function flashlightSound(){noiseBurst(.025,.06,0);tone(flashlight?1250:480,.035,0);setTimeout(()=>tone(flashlight?760:260,.045,0),38);}
function flashlightHitsBoss(maxRange=8){
  if(!flashlight||hidden||phase!=='escape'||isInCameraRoom(player))return false;
  const beam=facingVectors[facing];
  const dx=boss.x-player.x,dy=boss.y-player.y;
  const beamLength=Math.hypot(beam.x,beam.y);
  const forward=(dx*beam.x+dy*beam.y)/beamLength;
  const sideways=Math.abs(dx*beam.y-dy*beam.x)/beamLength;
  if(forward<=0||forward>maxRange||sideways>Math.max(1.5,forward*.45))return false;
  let x=player.x,y=player.y;
  const stepX=Math.sign(dx),stepY=Math.sign(dy),absX=Math.abs(dx),absY=Math.abs(dy);
  let error=absX-absY;
  while(x!==boss.x||y!==boss.y){
    const doubled=error*2;
    if(doubled>-absY){error-=absY;x+=stepX;}
    if(doubled<absX){error+=absX;y+=stepY;}
    if((x!==boss.x||y!==boss.y)&&tileBlocked(x,y))return false;
  }
  return true;
}
function checkFlashlightDistraction(){
  if(flashlightDistractedBoss||!flashlightHitsBoss())return false;
  flashlightDistractedBoss=true;
  bossStunnedUntil=Math.max(bossStunnedUntil,performance.now()+15000);
  huntMemory=0;bossSearching=false;noiseTurns=0;
  keyRattle(boss.x-player.x);setTimeout(()=>tone(95,.28,boss.x>player.x?1:-1),150);
  announce('The flashlight hits Mr. Hollow. He shields his eyes and loses your trail for fifteen seconds.',true);
  updateHud();draw();
  return true;
}
function toggleFlashlight(){
  flashlight=!flashlight;
  if(!flashlight)flashlightDistractedBoss=false;
  flashlightSound();
  if(!checkFlashlightDistraction())announce(`Flashlight ${flashlight?'on. It reveals dark halls but makes you easier to see.':'off. You are harder to see, but the halls are nearly black.'}`,true);
  draw();
}
function eatSound(){noiseBurst(.16,.045,0);tone(330,.08,0);setTimeout(()=>tone(440,.12,0),120);}
function heartbeatSound(distance){tone(54,.08,0);setTimeout(()=>tone(47,.1,0),120+distance*18);}
function pickupSound(){playQuestionSound();}
function tapeGlitchSound(){noiseBurst(.28,.06,-.3);setTimeout(()=>tone(930,.07,.3),90);setTimeout(()=>noiseBurst(.18,.045,0),170);}
function cabinetRipSound(){noiseBurst(.55,.13,0);tone(73,.4,0);setTimeout(()=>noiseBurst(.3,.1,0),120);}
function tryCraft(){
  if(!hasBottle||!hasCleaner||hasStunBottle)return;
  hasStunBottle=true;
  tone(520,.08,-.3);setTimeout(()=>tone(760,.08,0),90);setTimeout(()=>tone(1040,.13,.3),180);
  announce('Stun bottle crafted. Press B when Mr. Hollow gets close.',true);
}
function tryCraftMap(){if(!hasPaper||!hasMarker||hasMap)return;hasMap=true;tone(480,.08,-.3);setTimeout(()=>tone(720,.12,.3),100);announce('Guidance map completed. Press M to reveal a route toward your objective.',true);}
function tryCraftLure(){if(!hasCan||!hasBattery||hasLure)return;hasLure=true;tone(260,.07,-.2);setTimeout(()=>tone(520,.12,.2),90);announce('Noise lure assembled. Press N to pull Mr. Hollow away from you.',true);}
function tryCraftCamera(){if(!hasCamera||!hasFlashCell||hasFlashCamera)return;hasFlashCamera=true;tone(700,.06,-.3);setTimeout(()=>tone(1300,.1,.3),80);announce('Flash camera crafted. Press X at close range to blind Mr. Hollow, but the flash reveals your position.',true);}
function tryCraftJammer(){if(!hasHandle||!hasTape||hasDoorJammer)return;hasDoorJammer=true;tone(240,.08,-.3);setTimeout(()=>tone(410,.12,.3),100);announce('Door jammer crafted. Press V to place it. Mr. Hollow will be stopped when he crosses that tile.',true);}
function tryCraftMask(){if(!hasRag||!hasCoffee||hasScentMask)return;hasScentMask=true;tone(360,.09,-.2);setTimeout(()=>noiseBurst(.12,.025,.2),90);announce('Scent mask crafted. Press Z for a short stealth window.',true);}
function eatCarriedFood(){
  if(!running||paused)return;
  if(foodPortions<1){announce('No food remains in your pack.',false);return;}
  if(energy>=95){announce('Your energy is already full.',false);return;}
  foodPortions--;energy=Math.min(100,energy+38);eatSound();announce(`You eat one portion. Energy ${Math.round(energy)}. ${foodPortions} portions remain.`,false);updateHud();
}
function useMap(){
  if(!hasMap){announce('The guidance map is missing.',false);return;}
  const goal=currentGoal();showMapUntil=performance.now()+12000;announce(`Required map guidance: face ${directionWords(goal.x-player.x,goal.y-player.y)}. Your next objective is ${manhattan(player,goal)} steps away. Listen again whenever you become lost.`,true);tone(620,.12,goal.x-player.x);draw();
}
function useLure(){
  if(!hasLure){announce('Craft a noise lure from an empty can and batteries.',false);return;}
  hasLure=false;lureTarget=patrolPoints.reduce((best,point)=>manhattan(player,point)>manhattan(player,best)?point:best,patrolPoints[0]);lureTurns=12;
  [880,660,920,540].forEach((frequency,index)=>setTimeout(()=>tone(frequency,.12,lureTarget.x>player.x?1:-1),index*150));
  announce('Noise lure deployed. Mr. Hollow turns toward the sound.',true);updateHud();
}
function useStunBottle(){
  if(!running||paused)return;
  if(!hasStunBottle){announce('You need an empty bottle and cleaner to craft a stun bottle.',false);return;}
  hasStunBottle=false;noiseBurst(.22,.1,boss.x-player.x);tone(1250,.12,boss.x-player.x);
  if(phase==='escape'&&manhattan(player,boss)<=10){
    bossStunnedUntil=performance.now()+9000;announce('Direct hit. Mr. Hollow is stunned for nine seconds.',true);
  }else announce('The bottle shattered, but Mr. Hollow was too far away.',true);
  updateHud();draw();
}
function useFlashCamera(){
  if(!running||paused)return;
  if(!hasFlashCamera){announce('Craft a flash camera from a disposable camera and flash cell.',false);return;}
  hasFlashCamera=false;
  noiseBurst(.1,.13,0);[1500,1900,2300].forEach((f,i)=>setTimeout(()=>tone(f,.05,0),i*35));
  flickerUntil=performance.now()+320;
  noiseTurns=7;
  if(phase==='escape'&&manhattan(player,boss)<=8){bossStunnedUntil=performance.now()+6000;announce('The flash catches Mr. Hollow. He is blinded for six seconds, but now he knows exactly where you are.',true);}
  else announce('The camera flashes into an empty aisle. The noise gives away your position.',true);
  updateHud();draw();
}
function placeJammer(){
  if(!running||paused)return;
  if(!hasDoorJammer){announce('Craft a door jammer from a broken handle and duct tape.',false);return;}
  hasDoorJammer=false;jammerSpot={...player};tone(180,.1,0);setTimeout(()=>tone(120,.14,0),90);
  announce('Door jammer placed here. Lead Mr. Hollow across this tile to stop him.',true);updateHud();draw();
}
function useScentMask(){
  if(!running||paused)return;
  if(!hasScentMask){announce('Craft a scent mask from a rag and coffee grounds.',false);return;}
  hasScentMask=false;scentMaskUntil=performance.now()+18000;noiseTurns=0;noiseBurst(.18,.025,0);
  announce('Scent mask active for eighteen seconds. Stay crouched and keep your flashlight off for the best concealment.',true);updateHud();
}
function gestureItems(){
  return [
    {name:language==='es'?'linterna':'flashlight',available:()=>true,use:toggleFlashlight},
    {name:language==='es'?'brújula de audio':'audio compass',available:()=>true,use:audioCompass},
    {name:language==='es'?'comida':'food',available:()=>foodPortions>0,use:eatCarriedFood},
    {name:language==='es'?'mapa':'map',available:()=>hasMap,use:useMap},
    {name:language==='es'?'señuelo de ruido':'noise lure',available:()=>hasLure,use:useLure},
    {name:language==='es'?'botella aturdidora':'stun bottle',available:()=>hasStunBottle,use:useStunBottle},
    {name:language==='es'?'cámara con flash':'flash camera',available:()=>hasFlashCamera,use:useFlashCamera},
    {name:language==='es'?'bloqueador de puerta':'door jammer',available:()=>hasDoorJammer,use:placeJammer},
    {name:language==='es'?'máscara de olor':'scent mask',available:()=>hasScentMask,use:useScentMask}
  ];
}
function updateGestureItemStatus(){
  if(!gestureItemStatus)return;
  const items=gestureItems();
  selectedGestureItem=Math.max(0,Math.min(selectedGestureItem,items.length-1));
  gestureItemStatus.textContent=(language==='es'?'OBJETO SELECCIONADO: ':'SELECTED ITEM: ')+items[selectedGestureItem].name.toUpperCase();
}
function selectNextGestureItem(){
  const items=gestureItems();
  for(let offset=1;offset<=items.length;offset++){
    const index=(selectedGestureItem+offset)%items.length;
    if(items[index].available()){selectedGestureItem=index;break;}
  }
  updateGestureItemStatus();
  announce(`Selected item: ${items[selectedGestureItem].name}.`,true);
}
function useSelectedGestureItem(){
  const items=gestureItems();
  const item=items[selectedGestureItem];
  if(!item.available()){selectNextGestureItem();return;}
  announce(`Using selected item: ${item.name}.`,false);
  item.use();
}
function gestureStep(direction){
  if(direction==='run')moveFacing(false,true);
  else if(direction==='up')moveFacing(false,false);
  else if(direction==='down')moveFacing(true,false);
  else if(direction==='left')turnPlayer(-1);
  else if(direction==='right')turnPlayer(1);
}
function stopGestureHold(){
  if(gestureHoldTimer){clearTimeout(gestureHoldTimer);clearInterval(gestureHoldTimer);gestureHoldTimer=null;}
  gesturePad.classList.remove('gesture-active');
}
function beginGestureHold(direction){
  if(direction===gestureDirection||gesturePattern)return;
  stopGestureHold();
  gestureDirection=direction;
  gestureHoldTimer=setTimeout(()=>{
    gesturePad.classList.add('gesture-active');
    gestureStep(direction);
    gestureHoldTimer=setInterval(()=>gestureStep(direction),330);
  },340);
}
function orientedGestureDelta(dx,dy){
  // Android reports pointer coordinates in the current landscape orientation.
  // Rotating those coordinates again makes an upward swipe turn the player.
  if(/Android/i.test(navigator.userAgent))return {dx,dy};
  // Blind gesture mode is played in landscape with the charging port on the right.
  // Some mobile browsers keep reporting portrait pointer axes after fullscreen.
  return {dx:dy,dy:-dx};
}
gesturePad.addEventListener('pointerdown',event=>{
  event.preventDefault();
  gesturePad.setPointerCapture?.(event.pointerId);
  activeGesturePointers.add(event.pointerId);
  if(activeGesturePointers.size>=4){
    fourFingerTouch=true;
    threeFingerTouch=false;
    twoFingerTouch=false;
    stopGestureHold();
    gestureStart=null;
    multiGestureStart={x:event.clientX,y:event.clientY,id:event.pointerId};multiGestureAction='';
    return;
  }
  if(activeGesturePointers.size>=3){
    threeFingerTouch=true;
    twoFingerTouch=false;
    stopGestureHold();
    gestureStart=null;
    multiGestureStart={x:event.clientX,y:event.clientY,id:event.pointerId};multiGestureAction='';
    return;
  }
  if(activeGesturePointers.size>=2){
    twoFingerTouch=true;
    stopGestureHold();
    gestureStart=null;
    multiGestureStart={x:event.clientX,y:event.clientY,id:event.pointerId};multiGestureAction='';
    return;
  }
  gestureStart={x:event.clientX,y:event.clientY,time:performance.now(),id:event.pointerId};
  gestureLast={x:event.clientX,y:event.clientY};
  gestureDirection='';gestureWentDown=false;gestureWentUp=false;gestureFirstVertical='';gesturePattern='';
});
gesturePad.addEventListener('pointermove',event=>{
  if(activeGesturePointers.size>1&&multiGestureStart){
    const {dx,dy}=orientedGestureDelta(event.clientX-multiGestureStart.x,event.clientY-multiGestureStart.y);
    if(fourFingerTouch){
      if(!multiGestureAction&&Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy)){
        multiGestureAction=dx>0?'door-insert':'door-toggle';
        useNearbySecurityDoor(dx>0?'gesture-insert':'gesture-toggle');
      }
      return;
    }
    if(threeFingerTouch&&dy<-38&&multiGestureAction!=='map'){multiGestureAction='map';useMap();}
    if(twoFingerTouch&&(dy<-38||Math.abs(orientedGestureDelta(event.clientX-multiGestureStart.x,event.clientY-multiGestureStart.y).dx)>38)&&!multiGestureAction){
      const {dx}=orientedGestureDelta(event.clientX-multiGestureStart.x,event.clientY-multiGestureStart.y);
      multiGestureAction=dy<-38?'run':dx<0?'turn-left':'turn-right';stopGestureHold();gesturePad.classList.add('gesture-active');
      const action=()=>multiGestureAction==='run'?gestureStep('run'):turnPlayer(multiGestureAction==='turn-left'?-1:1);
      action();gestureHoldTimer=setInterval(action,330);if(multiGestureAction==='run')announce('Running forward.',false);
    }
    return;
  }
  if(!gestureStart||event.pointerId!==gestureStart.id)return;
  event.preventDefault();
  gestureLast={x:event.clientX,y:event.clientY};
  const rawDx=event.clientX-gestureStart.x,rawDy=event.clientY-gestureStart.y;
  const {dx,dy}=orientedGestureDelta(rawDx,rawDy);
  if(moppingIndex>=0){
    stopGestureHold();
    if(Math.abs(dx)>22){
      mopStroke(dx<0?'left':'right');
      gesturePattern='mopping';
      gestureStart.x=event.clientX;
      gestureStart.y=event.clientY;
      gestureLast={x:event.clientX,y:event.clientY};
    }
    return;
  }
  if(!gestureFirstVertical&&Math.abs(dy)>45)gestureFirstVertical=dy>0?'down':'up';
  if(gestureFirstVertical==='down'&&dy<-28)gesturePattern='down-up';
  if(gestureFirstVertical==='up'&&dy>28)gesturePattern='up-down';
  if(gesturePattern){stopGestureHold();return;}
  if(Math.max(Math.abs(dx),Math.abs(dy))<34)return;
  let direction=Math.abs(dy)>=Math.abs(dx)?(dy<0?'up':'down'):(dx<0?'left':'right');
  if(direction==='up'&&performance.now()<gestureRunArmedUntil&&gestureTapCount===1){
    direction='run';
    gestureTapCount=0;
    gestureRunArmedUntil=0;
    if(gestureTapTimer){clearTimeout(gestureTapTimer);gestureTapTimer=null;}
    announce('Running forward.',false);
  }
  beginGestureHold(direction);
});
function registerSimpleGestureTap(){
  const now=performance.now();
  gestureTapCount++;
  if(gestureTapTimer){clearTimeout(gestureTapTimer);gestureTapTimer=null;}
  if(gestureTapCount===1){
    gestureRunArmedUntil=now+700;
    gestureTapTimer=setTimeout(()=>{gestureTapCount=0;gestureRunArmedUntil=0;gestureTapTimer=null;},720);
  }else if(gestureTapCount===2){
    gestureTapTimer=setTimeout(()=>{gestureTapCount=0;gestureRunArmedUntil=0;gestureTapTimer=null;interact();},360);
  }else{
    gestureTapCount=0;gestureRunArmedUntil=0;
    toggleFlashlight();
  }
}
function registerTwoFingerTap(){
  twoFingerTapCount++;
  if(twoFingerTapTimer){clearTimeout(twoFingerTapTimer);twoFingerTapTimer=null;}
  if(twoFingerTapCount>=2){
    twoFingerTapCount=0;
    eatCarriedFood();
  }else twoFingerTapTimer=setTimeout(()=>{
    twoFingerTapCount=0;twoFingerTapTimer=null;
    if(!hidden){
      crouching=!crouching;
      announce(crouching?'Crouched. You move quietly.':'Standing.',true);
      draw();
    }
  },520);
}
function finishGesture(event){
  activeGesturePointers.delete(event.pointerId);
  if(fourFingerTouch){
    event.preventDefault();
    if(activeGesturePointers.size===0){
      fourFingerTouch=false;threeFingerTouch=false;twoFingerTouch=false;
      gestureStart=null;gestureLast=null;gestureDirection='';gesturePattern='';
      stopGestureHold();multiGestureStart=null;multiGestureAction='';
    }
    return;
  }
  if(threeFingerTouch){
    event.preventDefault();
    if(activeGesturePointers.size===0){
      threeFingerTouch=false;
      twoFingerTouch=false;
      gestureStart=null;gestureLast=null;gestureDirection='';gesturePattern='';
      if(multiGestureAction!=='map')jumpForward();
      multiGestureStart=null;multiGestureAction='';
    }
    return;
  }
  if(twoFingerTouch){
    event.preventDefault();
    if(activeGesturePointers.size===0){
      twoFingerTouch=false;
      gestureStart=null;gestureLast=null;gestureDirection='';gesturePattern='';
      stopGestureHold();
      if(!multiGestureAction)registerTwoFingerTap();
      multiGestureStart=null;multiGestureAction='';
    }
    return;
  }
  if(!gestureStart||event.pointerId!==gestureStart.id)return;
  event.preventDefault();
  const duration=performance.now()-gestureStart.time;
  const last=gestureLast||gestureStart;
  const distance=Math.hypot(last.x-gestureStart.x,last.y-gestureStart.y);
  stopGestureHold();
  if(gesturePattern==='down-up')selectNextGestureItem();
  else if(gesturePattern==='up-down')useSelectedGestureItem();
  else if(distance<22&&duration<280)registerSimpleGestureTap();
  gestureStart=null;gestureLast=null;gestureDirection='';gesturePattern='';
}
gesturePad.addEventListener('pointerup',finishGesture);
gesturePad.addEventListener('pointercancel',finishGesture);
function impactSound(){noiseBurst(.3,.09,0);tone(58,.45,0);}
function powerFailureSound(){[520,410,300,180].forEach((frequency,index)=>setTimeout(()=>tone(frequency,.22,0),index*110));}
function fadeDangerMusic(target,duration,onDone){
  if(dangerFadeTimer)clearInterval(dangerFadeTimer);
  const startVolume=dangerMusic.volume;
  const started=performance.now();
  dangerFadeTimer=setInterval(()=>{
    const progress=Math.min(1,(performance.now()-started)/duration);
    dangerMusic.volume=Math.max(0,Math.min(1,startVolume+(target-startVolume)*progress));
    if(progress>=1){
      clearInterval(dangerFadeTimer);
      dangerFadeTimer=null;
      if(onDone)onDone();
    }
  },40);
}
function startDangerMusic(){
  if(dangerMusicActive||!soundToggle.checked)return;
  stopExplorationTrack(false);
  dangerMusicActive=true;
  dangerMusic.currentTime=0;
  dangerMusic.volume=0;
  dangerMusic.play().then(()=>fadeDangerMusic(.78,550)).catch(()=>{dangerMusicActive=false;});
}
function stopDangerMusic(immediate=false){
  dangerNearSince=0;
  dangerFarSince=0;
  if(dangerFadeTimer){clearInterval(dangerFadeTimer);dangerFadeTimer=null;}
  if(immediate){
    dangerMusic.pause();
    dangerMusic.currentTime=0;
    dangerMusic.volume=0;
    dangerMusicActive=false;
    return;
  }
  if(!dangerMusicActive)return;
  fadeDangerMusic(0,650,()=>{
    dangerMusic.pause();
    dangerMusic.currentTime=0;
    dangerMusicActive=false;
    playRandomExplorationSegment();
  });
}
function updateDangerMusic(time,distance){
  if(lightsOutMusicActive)return;
  if(!running||paused||phase!=='escape'||!soundToggle.checked){
    if(dangerMusicActive)stopDangerMusic(false);
    return;
  }
  if(distance<=6){
    const returningDuringFade=dangerFarSince>0&&dangerMusicActive&&dangerMusic.volume<.7;
    dangerFarSince=0;
    if(returningDuringFade)fadeDangerMusic(.78,300);
    if(!dangerNearSince)dangerNearSince=time;
    if(!dangerMusicActive&&time-dangerNearSince>=450)startDangerMusic();
  }else if(distance>=9){
    dangerNearSince=0;
    if(!dangerFarSince)dangerFarSince=time;
    if(dangerMusicActive&&time-dangerFarSince>=1100)stopDangerMusic(false);
  }
}
function primeDangerMusic(){
  dangerMusic.volume=0;
  const primed=dangerMusic.play();
  if(primed)primed.then(()=>{dangerMusic.pause();dangerMusic.currentTime=0;}).catch(()=>{});
}
function playDeathMusic(){
  if(!soundToggle.checked)return;
  deathMusic.currentTime=0;
  deathMusic.volume=.82;
  deathMusic.play().catch(()=>{});
  deathSoundEffect.currentTime=0;
  deathSoundEffect.volume=.95;
  deathSoundEffect.play().catch(()=>{});
}
function playMemoryLossSound(){
  if(!soundToggle.checked)return;
  stopDangerMusic(true);
  stopExplorationTrack(true);
  stopLightsOutMusic();
  memoryLossSound.currentTime=0;
  memoryLossSound.volume=.9;
  memoryLossSound.play().catch(()=>{});
}
function stopMemoryLossSound(){
  memoryLossSound.pause();
  memoryLossSound.currentTime=0;
}
function primeMemoryLossSound(){
  memoryLossSound.volume=0;
  const primed=memoryLossSound.play();
  if(primed)primed.then(()=>{memoryLossSound.pause();memoryLossSound.currentTime=0;memoryLossSound.volume=.9;}).catch(()=>{});
}
function playCloseBySound(){
  if(!soundToggle.checked)return;
  closeBySound.currentTime=0;
  closeBySound.volume=1;
  closeBySound.play().catch(()=>{});
}
function stopCloseBySound(){
  closeBySound.pause();
  closeBySound.currentTime=0;
}
function primeCloseBySound(){
  closeBySound.volume=0;
  const primed=closeBySound.play();
  if(primed)primed.then(()=>{closeBySound.pause();closeBySound.currentTime=0;closeBySound.volume=.9;}).catch(()=>{});
}
function playJumpSound(){
  if(!soundToggle.checked)return;
  jumpSound.currentTime=0;
  jumpSound.volume=.9;
  jumpSound.play().catch(()=>{});
}
function stopJumpSound(){
  jumpSound.pause();
  jumpSound.currentTime=0;
}
function primeJumpSound(){
  jumpSound.volume=0;
  const primed=jumpSound.play();
  if(primed)primed.then(()=>{jumpSound.pause();jumpSound.currentTime=0;jumpSound.volume=.9;}).catch(()=>{});
}
function playSurpriseSound(){
  if(!soundToggle.checked)return;
  surpriseSound.currentTime=0;
  surpriseSound.volume=1;
  surpriseSound.play().catch(()=>{});
}
function stopSurpriseSound(){
  surpriseSound.pause();
  surpriseSound.currentTime=0;
}
function primeSurpriseSound(){
  surpriseSound.volume=0;
  const primed=surpriseSound.play();
  if(primed)primed.then(()=>{surpriseSound.pause();surpriseSound.currentTime=0;surpriseSound.volume=.95;}).catch(()=>{});
}
function playQuestionSound(){
  if(!soundToggle.checked)return;
  questionSound.currentTime=0;
  questionSound.volume=.9;
  questionSound.play().catch(()=>{});
}
function stopQuestionSound(){
  questionSound.pause();
  questionSound.currentTime=0;
}
function primeQuestionSound(){
  questionSound.volume=0;
  const primed=questionSound.play();
  if(primed)primed.then(()=>{questionSound.pause();questionSound.currentTime=0;questionSound.volume=.9;}).catch(()=>{});
}
function stopStoreSpeakerRecordings(){
  [...storeSpeakerRecordings,...spanishStoreSpeakerRecordings].forEach(recording=>{recording.pause();recording.currentTime=0;});
}
function playStoreSpeakerRecording(index,fallbackText){
  if(!soundToggle.checked){announce(fallbackText,true);return;}
  stopStoreSpeakerRecordings();
  const recordings=language==='es'?spanishStoreSpeakerRecordings:storeSpeakerRecordings;
  const recording=recordings[index];
  visualMessage.dataset.message=fallbackText;
  visualMessage.textContent=translateText(fallbackText);
  recording.currentTime=0;
  recording.volume=.68;
  // The announcement comes from a ceiling speaker ahead, behind, left, or right of the player.
  ensureAudio();
  if(!recording._spatialized&&audioContext.createMediaElementSource&&audioContext.createStereoPanner){
    const source=audioContext.createMediaElementSource(recording),pan=audioContext.createStereoPanner();
    source.connect(pan).connect(audioContext.destination);recording._speakerPan=pan;recording._spatialized=true;
  }
  if(recording._speakerPan){
    const speaker={x:index===0?5:index===1?27:16,y:index===0?4:index===1?16:1};
    const dx=speaker.x-player.x,dy=speaker.y-player.y,face=facingVectors[facing];
    recording._speakerPan.pan.value=Math.max(-1,Math.min(1,(face.x*dy-face.y*dx)/10));
  }
  recording.play().catch(()=>announce(fallbackText,true));
}
function primeStoreSpeakerRecordings(){
  [...storeSpeakerRecordings,...spanishStoreSpeakerRecordings].forEach(recording=>{
    recording.volume=0;
    const primed=recording.play();
    if(primed)primed.then(()=>{recording.pause();recording.currentTime=0;recording.volume=.68;}).catch(()=>{});
  });
}
function updateSurpriseSound(distance){
  if(!running||paused||phase!=='escape')return;
  const visible=!hidden&&distance<=7;
  if(visible&&!bossWasVisible){
    bossWasVisible=true;
    playSurpriseSound();
    if(distance<=6&&performance.now()>=nextJumpScareAt&&Math.random()<.7)triggerJumpScare('SOMETHING MOVED.',false);
  }else if(!visible&&(hidden||distance>=9)){
    bossWasVisible=false;
  }
}
function updateCloseBySound(distance){
  if(!running||paused||phase!=='escape'||!soundToggle.checked)return;
  if(!closeByWasNear&&distance<=4){
    closeByWasNear=true;
    playCloseBySound();
  }else if(closeByWasNear&&distance>=9){
    closeByWasNear=false;
    playCloseBySound();
  }
}
memoryLossSound.addEventListener('ended',()=>{
  if(running&&phase==='escape'&&!dangerMusicActive)playRandomExplorationSegment();
});
function stopDeathMusic(){
  deathMusic.pause();
  deathMusic.currentTime=0;
  deathSoundEffect.pause();
  deathSoundEffect.currentTime=0;
}
function primeDeathMusic(){
  deathMusic.volume=0;
  const primed=deathMusic.play();
  if(primed)primed.then(()=>{deathMusic.pause();deathMusic.currentTime=0;deathMusic.volume=.82;}).catch(()=>{});
  deathSoundEffect.volume=0;
  const effectPrimed=deathSoundEffect.play();
  if(effectPrimed)effectPrimed.then(()=>{deathSoundEffect.pause();deathSoundEffect.currentTime=0;deathSoundEffect.volume=.95;}).catch(()=>{});
}
function playLightsOutMusic(){
  if(!soundToggle.checked){lightsOutMusicActive=false;return;}
  if(themeTimer){clearInterval(themeTimer);themeTimer=null;}
  lightsOutMusicActive=true;
  lightsOutMusic.currentTime=0;
  lightsOutMusic.volume=.82;
  lightsOutMusic.play().catch(()=>{lightsOutMusicActive=false;});
}
function stopLightsOutMusic(){
  if(lightsOutTransitionTimer){clearTimeout(lightsOutTransitionTimer);lightsOutTransitionTimer=null;}
  lightsOutMusic.pause();
  lightsOutMusic.currentTime=0;
  lightsOutMusicActive=false;
}
function primeLightsOutMusic(){
  lightsOutMusic.volume=0;
  const primed=lightsOutMusic.play();
  if(primed)primed.then(()=>{lightsOutMusic.pause();lightsOutMusic.currentTime=0;lightsOutMusic.volume=.82;}).catch(()=>{});
}
lightsOutMusic.addEventListener('ended',()=>{
  lightsOutMusicActive=false;
  playRandomExplorationSegment();
});
function fadeExplorationTrack(target,duration,onDone){
  if(explorationFadeTimer)clearInterval(explorationFadeTimer);
  const startVolume=explorationTrack.volume;
  const started=performance.now();
  explorationFadeTimer=setInterval(()=>{
    const progress=Math.min(1,(performance.now()-started)/duration);
    explorationTrack.volume=Math.max(0,Math.min(1,startVolume+(target-startVolume)*progress));
    if(progress>=1){
      clearInterval(explorationFadeTimer);
      explorationFadeTimer=null;
      if(onDone)onDone();
    }
  },40);
}
function playRandomExplorationSegment(){
  if(!running||paused||phase!=='escape'||!soundToggle.checked||lightsOutMusicActive||dangerMusicActive||explorationTrackActive)return;
  if(manhattan(player,boss)<=7)return;
  if(explorationSegmentTimer){clearTimeout(explorationSegmentTimer);explorationSegmentTimer=null;}
  if(explorationFadeTimer){clearInterval(explorationFadeTimer);explorationFadeTimer=null;}
  const segmentLength=14+Math.random()*10;
  const duration=explorationTrack.duration;
  explorationTrack.currentTime=Number.isFinite(duration)&&duration>segmentLength+2?Math.random()*(duration-segmentLength-1):0;
  explorationTrack.volume=0;
  explorationTrackActive=true;
  explorationTrack.play().then(()=>{
    fadeExplorationTrack(.6,700);
    explorationSegmentTimer=setTimeout(()=>{
      explorationSegmentTimer=null;
      fadeExplorationTrack(0,700,()=>{
        explorationTrack.pause();
        explorationTrackActive=false;
        playRandomExplorationSegment();
      });
    },segmentLength*1000);
  }).catch(()=>{explorationTrackActive=false;});
}
function stopExplorationTrack(reset=false){
  if(explorationSegmentTimer){clearTimeout(explorationSegmentTimer);explorationSegmentTimer=null;}
  if(explorationFadeTimer){clearInterval(explorationFadeTimer);explorationFadeTimer=null;}
  if(reset){
    explorationTrack.pause();
    explorationTrack.currentTime=0;
    explorationTrack.volume=0;
    explorationTrackActive=false;
    return;
  }
  if(!explorationTrackActive)return;
  fadeExplorationTrack(0,450,()=>{
    explorationTrack.pause();
    explorationTrackActive=false;
  });
}
function primeExplorationTrack(){
  explorationTrack.volume=0;
  const primed=explorationTrack.play();
  if(primed)primed.then(()=>{explorationTrack.pause();explorationTrack.currentTime=0;}).catch(()=>{});
}
explorationTrack.addEventListener('ended',()=>{
  if(explorationSegmentTimer){clearTimeout(explorationSegmentTimer);explorationSegmentTimer=null;}
  explorationTrackActive=false;
  playRandomExplorationSegment();
});
function fadeStoreTrack(target,duration,onDone){
  if(storeTrackFadeTimer)clearInterval(storeTrackFadeTimer);
  const startVolume=storeTrack.volume;
  const started=performance.now();
  storeTrackFadeTimer=setInterval(()=>{
    const progress=Math.min(1,(performance.now()-started)/duration);
    storeTrack.volume=Math.max(0,Math.min(1,startVolume+(target-startVolume)*progress));
    if(progress>=1){
      clearInterval(storeTrackFadeTimer);
      storeTrackFadeTimer=null;
      if(onDone)onDone();
    }
  },40);
}
function playStoreTrack(resume=false){
  if(!soundToggle.checked)return;
  if(storeTrackFadeTimer){clearInterval(storeTrackFadeTimer);storeTrackFadeTimer=null;}
  if(!resume)storeTrack.currentTime=0;
  storeTrackActive=true;
  storeTrack.volume=0;
  storeTrack.play().then(()=>fadeStoreTrack(.62,550)).catch(()=>{storeTrackActive=false;});
}
function stopStoreTrack(reset=false){
  if(storeTrackFadeTimer){clearInterval(storeTrackFadeTimer);storeTrackFadeTimer=null;}
  if(reset){
    storeTrack.pause();
    storeTrack.currentTime=0;
    storeTrack.volume=0;
    storeTrackActive=false;
    return;
  }
  if(!storeTrackActive)return;
  fadeStoreTrack(0,400,()=>{
    storeTrack.pause();
    storeTrackActive=false;
  });
}
function primeStoreTrack(){
  storeTrack.volume=0;
  const primed=storeTrack.play();
  if(primed)primed.then(()=>{storeTrack.pause();storeTrack.currentTime=0;}).catch(()=>{});
}
function startStoreMusic(){
  if(themeTimer)clearInterval(themeTimer);
  let pulse=0;const drones=[98,103,92,87];
  themeTimer=setInterval(()=>{if(!running||paused||!soundToggle.checked||dangerMusicActive)return;tone(drones[pulse%4],.85,pulse%2?-.35:.35);if(pulse%3===0)noiseBurst(.18,.012,0);pulse++;},1100);
}
function stopStoreMusic(){
  if(themeTimer){clearInterval(themeTimer);themeTimer=null;}
}
function startTheme(){
  if(themeTimer)clearInterval(themeTimer);
  let beat=0;
  themeTimer=setInterval(()=>{if(!running||paused||!soundToggle.checked||dangerMusicActive)return;const notes=hasKey?[55,62,58,47]:[65,69,58,62];tone(notes[beat%4],hasKey?.42:.34,beat%2?-.55:.55);tone(notes[beat%4]*1.414,.13,-(beat%2?-.35:.35));if(beat%2===0)noiseBurst(.11,hasKey?.055:.035,0);if(beat%4===3)keyRattle(boss.x-player.x);beat++;},hasKey?430:620);
}
function beginHorror(){
  stopDangerMusic(true);
  phase='escape';
  if(ambientGain)ambientGain.gain.setTargetAtTime(soundToggle.checked?.065:0,audioContext.currentTime,.65);
  powerOn=false;
  foodPortions=0;
  hasPaper=true;
  hasMarker=true;
  hasMap=true;
  boss={...bossStart};
  noiseTurns=0;
  lastKnownPlayer={...player};
  huntMemory=0;
  bossSearching=false;
  lastAmbush=performance.now();
  lastFearEvent=performance.now();
  lightsOutMusicActive=true;
  fadeStoreTrack(0,750,()=>{
    storeTrack.pause();
    storeTrack.currentTime=0;
    storeTrackActive=false;
  });
  lightsOutTransitionTimer=setTimeout(()=>{
    lightsOutTransitionTimer=null;
    powerFailureSound();
    playLightsOutMusic();
    setTimeout(()=>tone(55,.7,0),430);
  },550);
  announce('The final spill is clean. The lights die. Mr. Hollow locks the doors. Your guidance map is already in your pocket, but you have no food. Find supplies, then use the map to reach the fuse and escape.',true);
}
document.querySelector('#fightButton').addEventListener('click',fightBack);
document.querySelector('#battleModal').addEventListener('pointerdown',event=>{
  if(!battleActive||event.target.closest('button'))return;
  battleGestureStart={x:event.clientX,y:event.clientY,time:performance.now(),id:event.pointerId};
});
document.querySelector('#battleModal').addEventListener('pointerup',event=>{
  if(!battleGestureStart||event.pointerId!==battleGestureStart.id||event.target.closest('button'))return;
  const distance=Math.hypot(event.clientX-battleGestureStart.x,event.clientY-battleGestureStart.y);
  const duration=performance.now()-battleGestureStart.time;
  battleGestureStart=null;
  if(distance>28||duration>340)return;
  battleGestureTapCount++;
  if(battleGestureTapTimer){clearTimeout(battleGestureTapTimer);battleGestureTapTimer=null;}
  if(battleGestureTapCount>=2){
    battleGestureTapCount=0;
    fightBack();
  }else battleGestureTapTimer=setTimeout(()=>{battleGestureTapCount=0;battleGestureTapTimer=null;},430);
});
function tone(frequency,duration,pan=0){if(!soundToggle.checked)return;ensureAudio();const o=audioContext.createOscillator(),g=audioContext.createGain(),p=audioContext.createStereoPanner?audioContext.createStereoPanner():audioContext.createGain();o.frequency.value=frequency;o.type='triangle';g.gain.setValueAtTime(.055,audioContext.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioContext.currentTime+duration);if('pan'in p)p.pan.value=Math.max(-1,Math.min(1,pan));o.connect(g).connect(p).connect(audioContext.destination);o.start();o.stop(audioContext.currentTime+duration);}
function spatialCue(dx,frequency){tone(frequency,.13,Math.max(-1,Math.min(1,dx/5)));}
function keyRattle(dx){[1480,1810,1320].forEach((f,i)=>setTimeout(()=>tone(f,.025,Math.max(-1,Math.min(1,dx/5))),i*42));}
function triggerJumpScare(text='RUN.',force=false){
  const now=performance.now();
  if(!force&&now<nextJumpScareAt)return;
  lastJumpScare=now;
  nextJumpScareAt=now+4500+Math.random()*6500;
  const scare=document.querySelector('#jumpScare');
  const spanishScares={'RUN.':'CORRE.','DON’T MOVE.':'NO TE MUEVAS.','CAUGHT.':'ATRAPADO.','HE FOUND YOU.':'TE ENCONTRÓ.','DON’T LET HIM LOCK IT.':'NO DEJES QUE CIERRE.','THE LOCK TURNS.':'LA CERRADURA GIRA.','YOU TORE FREE.':'TE LIBERASTE.','SOMETHING MOVED.':'ALGO SE MOVIÓ.'};
  document.querySelector('#jumpScareText').textContent=language==='es'?(spanishScares[text]||text):text;
  scare.style.setProperty('--scare-x',`${12+Math.random()*76}%`);
  scare.style.setProperty('--scare-y',`${8+Math.random()*70}%`);
  scare.style.setProperty('--scare-scale',`${1.25+Math.random()*.65}`);
  scare.style.setProperty('--scare-text-x',`${18+Math.random()*64}%`);
  scare.hidden=false;
  document.body.classList.add('danger-flash');
  noiseBurst(.55,.22,boss.x>player.x?1:-1);
  [48,31,67,26,43].forEach((frequency,index)=>setTimeout(()=>tone(frequency,.32,0),index*58));
  if(navigator.vibrate)navigator.vibrate(force?[120,45,180]:[80,35,110]);
  setTimeout(()=>{scare.hidden=true;document.body.classList.remove('danger-flash');},force?1050:720);
}

function fearEvent(time){
  if(!running||paused||phase!=='escape'||isInCameraRoom(player)||time<nextPresenceCueAt)return;
  lastFearEvent=time;nextPresenceCueAt=time+6000+Math.random()*6000;flickerUntil=time+350+Math.random()*500;
  const eventRoll=Math.random();
  if(eventRoll<.34){
    const fakePan=boss.x>player.x?-1:1;
    [86,72,91].forEach((frequency,index)=>setTimeout(()=>{noiseBurst(.11,.04,fakePan);tone(frequency,.09,fakePan);},index*190));
  }else if(eventRoll<.68){
    keyRattle(boss.x-player.x);
  }else{
    const messages=[
      'Store speaker: Cleanup required in aisle thirteen. No aisle thirteen appears on the map.',
      'Store speaker: The building is now closed. One customer remains.',
      'Store speaker: Employee attendance corrected. No one is permitted to leave.'
    ];
    const messageIndex=Math.floor(Math.random()*messages.length);
    const message=messages[messageIndex];
    noiseBurst(.32,.055,0);
    setTimeout(()=>playStoreSpeakerRecording(messageIndex,message),180);
  }
  if(time>=nextJumpScareAt&&Math.random()<(flashlight ? .2 : .34))triggerJumpScare(Math.random()<.5?'SOMETHING MOVED.':'DON’T MOVE.',false);
  draw();setTimeout(()=>{if(running)draw();},900);
}
function gameLoop(time){checkFlashlightDistraction();bossStep(time);updateCameraRoomAlert(time);const bossDistance=isInCameraRoom(player)?99:manhattan(player,boss);updateSurpriseSound(bossDistance);updateDangerMusic(time,bossDistance);updateCloseBySound(bossDistance);fearEvent(time);requestAnimationFrame(gameLoop);}
window.addEventListener('keydown',event=>{
  if(event.code==='ShiftLeft'||event.code==='ShiftRight')computerShiftHeld=true;
  if(document.querySelector('#storyModal').hidden===false){
    if(event.code==='Enter'&&!event.repeat){event.preventDefault();advanceDialogue();}
    return;
  }
  if(document.querySelector('#startModal').hidden===false||document.querySelector('#accessModal').hidden===false)return;
  const code=event.code;
  if(moppingIndex>=0&&(code==='ArrowLeft'||code==='ArrowRight')){event.preventDefault();if(!event.repeat)mopStroke(code==='ArrowLeft'?'left':'right');return;}
  if(code==='ArrowUp'){event.preventDefault();moveFacing(false,event.shiftKey,false);}
  else if(code==='ArrowDown'){event.preventDefault();moveFacing(true,false,false);}
  else if(code==='ArrowLeft'||code==='ArrowRight'){
    event.preventDefault();
    const direction=code==='ArrowLeft'?-1:1;
    const diagonalTurn=computerShiftHeld;
    const turnAmount=diagonalTurn?direction:(facing%2===0?direction*2:direction);
    turnPlayer(turnAmount);
  }
  else if(code==='KeyE'){event.preventDefault();interact(false);}
  else if(code==='KeyI'){event.preventDefault();if(!event.repeat)useNearbySecurityDoor('insert');}
  else if(code==='KeyO'){event.preventDefault();if(!event.repeat)useNearbySecurityDoor('open');}
  else if(code==='KeyC'){event.preventDefault();if(!event.repeat)useNearbySecurityDoor('close');}
  else if(code==='Space'||code==='KeyJ'){event.preventDefault();if(!event.repeat)jumpForward();}
  else if(code==='KeyL'){event.preventDefault();audioCompass();}
  else if(code==='KeyQ'){event.preventDefault();announce(objective(),true);}
  else if(code==='KeyF'){event.preventDefault();toggleFlashlight();}
  else if(code==='KeyB'){event.preventDefault();useStunBottle();}
  else if(code==='KeyR'){event.preventDefault();eatCarriedFood();}
  else if(code==='KeyM'){event.preventDefault();useMap();}
  else if(code==='KeyN'){event.preventDefault();useLure();}
  else if(code==='KeyX'){event.preventDefault();useFlashCamera();}
  else if(code==='KeyV'){event.preventDefault();placeJammer();}
  else if(code==='KeyZ'){event.preventDefault();useScentMask();}
  else if(code==='KeyH'){event.preventDefault();if(!event.repeat&&!hidden){crouching=!crouching;announce(crouching?'Crouched. You can move quietly and are harder to see.':'Standing. You move normally again.',true);draw();}}
  else if(code==='KeyP'){event.preventDefault();paused=!paused;document.querySelector('#pauseCard').hidden=!paused;announce(paused?'Game paused.':'Game resumed.',true);}
},{capture:true});
window.addEventListener('keyup',event=>{
  if(event.code==='ShiftLeft'||event.code==='ShiftRight')computerShiftHeld=false;
},{capture:true});
window.addEventListener('blur',()=>{computerShiftHeld=false;});
document.querySelectorAll('[data-move]').forEach(button=>button.addEventListener('click',()=>{
  const action=button.dataset.move;
  if(action==='up')moveFacing(false,false);
  else if(action==='down')moveFacing(true,false);
  else turnPlayer(action==='left'?-1:1);
}));
document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>{
  const action=button.dataset.action;
  if(action==='run')moveFacing(false,true);
  else if(action==='jump')jumpForward();
  else if(action==='repeat')announce(objective(),true);
  else if(action==='flashlight')toggleFlashlight();
  else if(action==='crouch'&&!hidden){crouching=!crouching;announce(crouching?'Crouched. You move quietly.':'Standing.',true);draw();}
  else if(action==='compass')audioCompass();
  else if(action==='food')eatCarriedFood();
  else if(action==='camera')useFlashCamera();
  else if(action==='jammer')placeJammer();
  else if(action==='mask')useScentMask();
}));
document.querySelector('#touchInteract').addEventListener('click',interact);
document.querySelector('#storyNextButton').addEventListener('click',advanceDialogue);
document.querySelector('#storyModal').addEventListener('pointerdown',event=>{
  if(!blindMode||event.target.closest('button'))return;
  storyGestureStart={x:event.clientX,y:event.clientY,time:performance.now(),id:event.pointerId};
});
document.querySelector('#storyModal').addEventListener('pointerup',event=>{
  if(!storyGestureStart||event.pointerId!==storyGestureStart.id||event.target.closest('button'))return;
  const distance=Math.hypot(event.clientX-storyGestureStart.x,event.clientY-storyGestureStart.y);
  const duration=performance.now()-storyGestureStart.time;
  storyGestureStart=null;
  if(distance>24||duration>320)return;
  storyGestureTapCount++;
  if(storyGestureTapTimer){clearTimeout(storyGestureTapTimer);storyGestureTapTimer=null;}
  if(storyGestureTapCount>=2){
    storyGestureTapCount=0;
    advanceDialogue();
  }else storyGestureTapTimer=setTimeout(()=>{storyGestureTapCount=0;storyGestureTapTimer=null;},430);
});
document.querySelector('#compassButton').addEventListener('click',audioCompass);
document.querySelector('#repeatButton').addEventListener('click',()=>announce(objective(),true));
document.querySelector('#contrastToggle').addEventListener('change',event=>document.body.classList.toggle('extra-contrast',event.target.checked));
soundToggle.addEventListener('change',()=>{
  if(ambientGain)ambientGain.gain.setTargetAtTime(soundToggle.checked?(phase==='escape'?.065:.018):0,audioContext.currentTime,.08);
  if(!soundToggle.checked){stopDangerMusic(true);stopDeathMusic();stopMemoryLossSound();stopCloseBySound();stopJumpSound();stopSurpriseSound();stopQuestionSound();stopStoreSpeakerRecordings();stopLightsOutMusic();stopStoreTrack(true);stopExplorationTrack(true);}
});
languageSelect.addEventListener('change',()=>{
  language=languageSelect.value==='es'?'es':'en';
  localStorage.setItem('aisle13Language',language);
  lastAnnouncement='';
  applyLanguage();
  announce(language==='es'?'Idioma cambiado a español.':'Language changed to English.',true);
});
function startGame(){
  if(document.querySelector('#startModal').hidden)return;
  blindMode=document.querySelector('#blindModeStart').checked;
  if(blindMode)narrationToggle.checked=true;
  document.body.classList.toggle('screen-reader-controls',blindMode);
  gestureControls.hidden=!blindMode;
  if(blindMode)enterGestureFullscreen();
  setStartBackgroundInert(false);
  document.querySelector('#startModal').hidden=true;
  ensureAudio();primeDangerMusic();primeDeathMusic();primeLightsOutMusic();primeStoreTrack();primeExplorationTrack();primeMemoryLossSound();primeCloseBySound();primeJumpSound();primeSurpriseSound();primeQuestionSound();primeStoreSpeakerRecordings();resetGame();
  (blindMode?gesturePad:canvas).focus();
  tone(660,.09,0);setTimeout(()=>tone(880,.14,0),110);
  if(blindMode){
    announce('Blind gesture mode active. Turn off VoiceOver or TalkBack now. Swipe and hold to walk. Tap once, then swipe up and hold to run. Double tap to interact, triple tap for the flashlight, two-finger single tap to crouch, two-finger double tap to eat, and three-finger single tap to jump.',true);
    setTimeout(startIntro,5200);
  }else startIntro();
}
startButton.addEventListener('click',startGame);
document.querySelector('#startModal').addEventListener('pointerdown',event=>{
  if(!document.querySelector('#blindModeStart').checked||event.target.closest('button'))return;
  startGestureStart={x:event.clientX,y:event.clientY,time:performance.now(),id:event.pointerId};
});
document.querySelector('#startModal').addEventListener('pointerup',event=>{
  if(!startGestureStart||event.pointerId!==startGestureStart.id||event.target.closest('button'))return;
  const distance=Math.hypot(event.clientX-startGestureStart.x,event.clientY-startGestureStart.y);
  const duration=performance.now()-startGestureStart.time;
  startGestureStart=null;
  if(distance>24||duration>320)return;
  startGestureTapCount++;
  if(startGestureTapTimer){clearTimeout(startGestureTapTimer);startGestureTapTimer=null;}
  if(startGestureTapCount>=2){
    startGestureTapCount=0;
    startGame();
  }else startGestureTapTimer=setTimeout(()=>{startGestureTapCount=0;startGestureTapTimer=null;},430);
});
document.querySelector('#restartButton').addEventListener('click',()=>{resetGame();startIntro();});
function setStartBackgroundInert(inert){
  [...document.body.children].forEach(element=>{
    if(element.id==='startModal'||element.id==='accessModal'||element.id==='liveRegion'||element.tagName==='SCRIPT')return;
    if(inert){
      startBackgroundState.set(element,{inert:element.inert,ariaHidden:element.getAttribute('aria-hidden')});
      element.inert=true;
      element.setAttribute('aria-hidden','true');
    }else{
      const previous=startBackgroundState.get(element);
      element.inert=previous?.inert||false;
      if(previous?.ariaHidden===null||previous?.ariaHidden===undefined)element.removeAttribute('aria-hidden');
      else element.setAttribute('aria-hidden',previous.ariaHidden);
      startBackgroundState.delete(element);
    }
  });
}
function setAccessBackgroundInert(inert){
  [...document.body.children].forEach(element=>{
    if(element.id==='accessModal'||element.id==='liveRegion'||element.tagName==='SCRIPT')return;
    if(inert){
      accessBackgroundState.set(element,{inert:element.inert,ariaHidden:element.getAttribute('aria-hidden')});
      element.inert=true;
      element.setAttribute('aria-hidden','true');
    }else{
      const previous=accessBackgroundState.get(element);
      element.inert=previous?.inert||false;
      if(previous?.ariaHidden===null||previous?.ariaHidden===undefined)element.removeAttribute('aria-hidden');
      else element.setAttribute('aria-hidden',previous.ariaHidden);
      accessBackgroundState.delete(element);
    }
  });
}
function openAccessMenu(trigger){
  accessMenuTrigger=trigger;
  document.querySelector('#accessModal').hidden=false;
  document.querySelectorAll('[aria-controls="accessModal"]').forEach(button=>button.setAttribute('aria-expanded','true'));
  setAccessBackgroundInert(true);
  requestAnimationFrame(()=>document.querySelector('#accessTitle').focus());
}
function closeAccessMenu(applySettings=true){
  if(applySettings){
    blindMode=document.querySelector('#blindModeStart').checked;
    if(blindMode)narrationToggle.checked=true;
    const gameAlreadyStarted=document.querySelector('#startModal').hidden;
    document.body.classList.toggle('screen-reader-controls',blindMode&&gameAlreadyStarted);
    gestureControls.hidden=!(blindMode&&gameAlreadyStarted);
  }
  document.querySelector('#accessModal').hidden=true;
  document.querySelectorAll('[aria-controls="accessModal"]').forEach(button=>button.setAttribute('aria-expanded','false'));
  setAccessBackgroundInert(false);
  const returnTarget=accessMenuTrigger;
  accessMenuTrigger=null;
  if(applySettings)announce(blindMode?(running?'Blind gesture mode active. Turn off VoiceOver or TalkBack now. Swipe and hold to walk. Tap once, then swipe up and hold to run. Double tap to interact, triple tap for the flashlight, two-finger single tap to crouch, two-finger double tap to eat, and three-finger single tap to jump.':'Blind gesture mode selected. Double tap anywhere on the start screen to begin.'):'Standard control layout active.',true);
  requestAnimationFrame(()=>{if(returnTarget?.isConnected)returnTarget.focus();else (blindMode&&running?gesturePad:canvas).focus();});
}
document.querySelector('#accessButton').addEventListener('click',event=>openAccessMenu(event.currentTarget));
document.querySelector('#startAccessButton').addEventListener('click',event=>openAccessMenu(event.currentTarget));
document.querySelector('#closeAccessButton').addEventListener('click',()=>closeAccessMenu(true));
document.querySelector('#accessCloseIcon').addEventListener('click',()=>closeAccessMenu(false));
document.querySelector('#accessModal').addEventListener('keydown',event=>{
  if(event.key==='Escape'){event.preventDefault();closeAccessMenu(false);return;}
  if(event.key!=='Tab')return;
  const controls=[...event.currentTarget.querySelectorAll('button,input,select,[tabindex]:not([tabindex="-1"])')].filter(element=>!element.disabled&&!element.hidden);
  if(!controls.length)return;
  const first=controls[0],last=controls[controls.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
});
document.querySelector('#helpButton').addEventListener('click',()=>announce('Arrows move and turn. Space or J jumps. H crouches. E interacts. I inserts a door key. O opens the prepared door. C closes an open security door. L activates the audio compass. R eats food. B throws a stun bottle. M uses the required map. N deploys a noise lure. X fires the flash camera. V places a door jammer. Z uses the scent mask. F toggles the flashlight. P pauses.',true));
window.addEventListener('beforeinstallprompt',event=>{
  event.preventDefault();
  deferredInstallPrompt=event;
  installButton.hidden=false;
});
installButton.addEventListener('click',async()=>{
  if(!deferredInstallPrompt)return;
  deferredInstallPrompt.prompt();
  const choice=await deferredInstallPrompt.userChoice;
  if(choice.outcome==='accepted')installButton.hidden=true;
  deferredInstallPrompt=null;
});
window.addEventListener('appinstalled',()=>{installButton.hidden=true;deferredInstallPrompt=null;});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));

resetGame();
running = false;
applyLanguage();
setStartBackgroundInert(true);
requestAnimationFrame(()=>document.querySelector('#startTitle').focus());
requestAnimationFrame(gameLoop);
