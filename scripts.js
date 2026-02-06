let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Palm Staff"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  { name: 'Palm Staff', power: 5 },
  { name: 'Obsidian Dagger', power: 30 },
  { name: 'Bronze Khopesh', power: 50 },
  { name: 'Spear of Horus', power: 100 }
];

const monsters = [
  { name: "Scarab Swarm", level: 2, health: 15 },
  { name: "Desert Viper", level: 5, health: 40 },
  { name: "Cursed Mummy", level: 8, health: 60 },
  { name: "Nile Crocodile", level: 12, health: 100 },
  { name: "Anubis Guard", level: 15, health: 150 },
  { name: "Priest Akhenaten", level: 20, health: 300 }
];

const locations = [
  {
    name: "temple",
    "button text": ["Go to Bazaar", "Go to Necropolis", "Fight High Priest"],
    "button functions": [goStore, goCave, fightBoss],
    text: "You are in the Temple of Karnak. The heavy incense calms your spirit."
  },
  {
    name: "store",
    "button text": ["Buy Health (10 gold)", "Buy Weapon (30 gold)", "Return to Temple"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the bustling Bazaar. A merchant offers you wares."
  },
  {
    name: "necropolis",
    "button text": ["Hunt Minions", "Find the Sphinx", "Return to Temple"],
    "button functions": [fightRandomMinion, findSphinx, goTown],
    text: "You enter the Necropolis. The smell of decay is strong here. Shadows move in the corners."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are in combat!"
  },
  {
    name: "kill monster",
    "button text": ["Return to Temple", "Hunt More", "Return to Temple"],
    "button functions": [goTown, goCave, easterEgg], // Easter egg trigger
    text: 'The beast crumbles to dust. You gain experience and gold.'
  },
  {
    name: "lose",
    "button text": ["Resurrect?", "Resurrect?", "Resurrect?"],
    "button functions": [restart, restart, restart],
    text: "Your soul has been weighed by Anubis and found wanting. You are dead. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["Replay?", "Replay?", "Replay?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat Akhenaten! The curse lifts and the sun shines on Thebes again! &#x1F389;" 
  },
  {
    name: "senet",
    "button text": ["2", "8", "Leave Game"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find an ancient Senet board in the sand. A spirit challenges you. Pick a number. If it matches the spirit's roll (0-10), you win gold."
  },
  {
    name: "sphinx",
    "button text": ["Answer: Man", "Answer: A God", "Run Away"],
    "button functions": [answerSphinxCorrect, answerSphinxWrong, goCave],
    text: "A massive Sphinx blocks your path. It speaks: 'What walks on four legs in the morning, two at noon, and three in the evening?'"
  }
];

// Initialize
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightBoss;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You purchased a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " Inventory: " + inventory;
    } else {
      text.innerText = "Not enough gold.";
    }
  } else {
    text.innerText = "You hold the Spear of Horus. None are stronger.";
    button2.innerText = "Sell Weapon (15 gold)";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeaponName = inventory.shift();
    text.innerText = "You sold your " + currentWeaponName + ".";
    text.innerText += " Inventory: " + inventory;
  } else {
    text.innerText = "Do not disarm yourself completely!";
  }
}

function fightRandomMinion() {
    // Picks a random monster from index 0 to 4 (Scarab to Anubis Guard)
    // Weighted slightly towards easier monsters using Math.floor
    fighting = Math.floor(Math.random() * 5);
    goFight();
}

function fightBoss() {
  fighting = 5; // Akhenaten
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " strikes.";
  text.innerText += " You attack with your " + weapons[currentWeapon].name + ".";
  
  // Player takes damage
  health -= getMonsterAttackValue(monsters[fighting].level);
  
  if (isMonsterHit()) {
    // Monster takes damage
    let damage = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    monsterHealth -= damage;
    text.innerText += " You hit for " + damage + " damage!";
  } else {
    text.innerText += " You miss.";
  }
  
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 5) { // Boss Index
      winGame();
    } else {
      defeatMonster();
    }
  }
  
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks!";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the " + monsters[fighting].name + "'s attack.";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Palm Staff"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

// Easter Egg 1: Senet Game
function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". The spirit rolls:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! The spirit curses you. Lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

// Easter Egg 2: Sphinx
function findSphinx() {
    update(locations[8]);
}

function answerSphinxCorrect() {
    text.innerText = "The Sphinx nods. 'Wisdom is power.' You feel revitalized.";
    xp += 20;
    gold += 50;
    health += 20;
    xpText.innerText = xp;
    goldText.innerText = gold;
    healthText.innerText = health;
    // Disable the buttons so they can't farm it infinitely in one go
    button1.onclick = goTown;
    button2.onclick = goTown;
    button1.innerText = "Return to Temple";
    button2.innerText = "Return to Temple";
}

function answerSphinxWrong() {
    text.innerText = "The Sphinx roars: 'Arrogance!' It attacks you.";
    health -= 30;
    healthText.innerText = health;
    if (health <= 0) {
        lose();
    } else {
        text.innerText += " You barely escape with your life.";
        button1.onclick = goTown;
        button2.onclick = goTown;
        button1.innerText = "Crawl back to Temple";
        button2.innerText = "Crawl back to Temple";
    }
}