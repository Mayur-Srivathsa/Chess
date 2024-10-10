// Global variable
let table = document.getElementById("chessboard");
let onMove = false;
let chance = 'w';
let batMove = "";
let troop = "";

let black=[];
let white=[];

function createChess() {
    for (let i = 0; i < 8; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < 8; j++) {
            let td = document.createElement("td");
            td.id = `cell-${7-i}-${j}`;
            // Fuction
            td.addEventListener('click',selected);
            if (j % 2 === i % 2) {
                td.classList.add('whitebox');
            } else {
                td.classList.add('blackbox'); 
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

createChess();
addPics();

function addPics()
{
    for(let i=0;i<8;i++)
    {
        let q=document.getElementById(`cell-${6}-${i}`);
        let img=document.createElement('img');
        img.src = "pics/pdt.svg";
        img.id =`b-p-${i}`;
        img.classList.add('paw');
        img.addEventListener('click',chanceImage);
        q.appendChild(img);
        let a={Name:`b-p-${i}`,location:[6,i]};
        black.push(a);
    }
    for(let i=0;i<8;i++)
    {
        let q=document.getElementById(`cell-${1}-${i}`);
        let img=document.createElement('img');
        img.id =`w-p-${i}`;
        img.src = "pics/plt.svg";
        img.classList.add('paw');
        img.addEventListener('click',chanceImage);
        q.appendChild(img);
        let a={Name:`w-p-${i}`,location:[1,i]};
        white.push(a);

    }
    war(7,'r');
    war(6,'n');
    war(5,'b');
    royal(3,'q');
    royal(4,'k');
}

// function to add Pieces
function war(n,immg)
{
    let box1=document.getElementById(`cell-${0}-${7-n}`);
    let box2=document.getElementById(`cell-${0}-${n}`);
    let box3=document.getElementById(`cell-${7}-${7-n}`);
    let box4=document.getElementById(`cell-${7}-${n}`);

    let f1=document.createElement('img');
    let f2=document.createElement('img');
    let f3=document.createElement('img');
    let f4=document.createElement('img');
    f1.src = `pics/${immg}lt.svg`;
    f2.src = `pics/${immg}lt.svg`;
    f3.src = `pics/${immg}dt.svg`;
    f4.src = `pics/${immg}dt.svg`;
    f1.id =`w-${immg}-${1}`;
    f2.id =`w-${immg}-${2}`;
    f3.id =`b-${immg}-${1}`;
    f4.id =`b-${immg}-${2}`;
    f1.classList.add('paw');
    f2.classList.add('paw');
    f3.classList.add('paw');
    f4.classList.add('paw');

    let a={Name:`w-${immg}-1`,location:[0,7-n]};
    let b={Name:`w-${immg}-2`,location:[0,n]};
    let c={Name:`b-${immg}-1`,location:[7,7-n]};
    let d={Name:`b-${immg}-2`,location:[7,n]};
    white.push(a);
    white.push(b);
    black.push(c);
    black.push(d);

    f1.addEventListener('click',chanceImage);
    f2.addEventListener('click',chanceImage);
    f3.addEventListener('click',chanceImage);
    f4.addEventListener('click',chanceImage);

    box1.appendChild(f1);    
    box2.appendChild(f2); 
    box3.appendChild(f3);    
    box4.appendChild(f4);
}

//because they are one
function royal(n,immg)
{
    let rw1=document.getElementById(`cell-${0}-${n}`);
    let rw2=document.getElementById(`cell-${7}-${n}`);
    let r1=document.createElement('img');
    let r2=document.createElement('img');
    r1.src = `pics/${immg}lt.svg`;
    r2.src = `pics/${immg}dt.svg`;
    r1.id =`w-${immg}-${1}`;
    r2.id =`b-${immg}-${1}`;
    r1.classList.add('paw');
    r2.classList.add('paw');
    let a={Name:`w-${immg}-${1}`,location:[0,n]};
    let b={Name:`b-${immg}-${1}`,location:[7,n]};
    white.push(a);
    black.push(b);
    r1.addEventListener('click',chanceImage);
    r2.addEventListener('click',chanceImage);
    rw1.appendChild(r1);    
    rw2.appendChild(r2); 
}

// move the troop to destination
function Mover(troop, m, n) {
    if (troop) {
        let currentParent = troop.parentElement;
        if (currentParent) {
            currentParent.removeChild(troop);
        }
        let destCell = document.getElementById(`cell-${m}-${n}`);//m,n para
        console.log(`Moving to cell-${m}-${n}`);
        destCell.appendChild(troop);
    }
}



function selected() {
    let dest = this.id;
    let [_, row, col] = dest.split('-');
    row = parseInt(row);
    col = parseInt(col);
    console.log(`Cell selected: (${row}, ${col})`);
    if (onMove) {
        Mover(troop, row, col);
        onMove = false;
        troop = "";
        chance = chance === 'w' ? 'b' : 'w';
    }
}



function chanceImage(event) {
    event.stopPropagation(); // Prevents the event from bubbling up to the parent elements
    let id = this.id;
    let [_, pieceType, index] = id.split('-');
    let row = parseInt(this.parentElement.id.split('-')[1]);
    let col = parseInt(this.parentElement.id.split('-')[2]);
    if (!onMove) {
        if (chance === id[0]) {
            onMove = true;
            batMove = pieceType;
            troop = this;
        }
    }
}
