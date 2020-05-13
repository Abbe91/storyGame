"use strict";
var textElement = document.getElementById('text');
var optionButtonsElement = document.getElementById('option-buttons');
var state = {};
window.addEventListener('load', main);
function main() {
    // showeverything()
    // showTheQuestion()
    startGame();
    //  showOption()
    //  showThequestion()
}
function startGame() {
    state = {};
    showThequestion(1);
}
function showThequestion(theQuestionIndex) {
    var theQuestion = theQuestions.find(function (theQuestion) { return theQuestion.id === theQuestionIndex; });
    textElement.innerText = theQuestion.text;
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }
    theQuestion.options.forEach(function (option) {
        if (showOption(option)) {
            var button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', function () { return selectOption(option); });
            optionButtonsElement.appendChild(button);
        }
    });
}
function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}
function selectOption(option) {
    var nextQuestionId = option.nextQue;
    state = Object.assign(state, option.setState);
    showThequestion(nextQuestionId);
}
var theQuestions = [
    {
        id: 1,
        text: 'Du vaknar på en konstig plats och du ser en burk med blå goo nära dig',
        options: [
            {
                text: 'Ta goo',
                setState: { blueGoo: true },
                nextText: 2
            },
            {
                text: 'Lämna goo',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'Du vågar framåt för att leta efter svar på var du är när du stöter på en köpman.',
        options: [
            {
                text: 'Handla goo för ett svärd',
                requiredState: function (currentState) { return currentState.blueGoo; },
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text: 'Handla goo för en sköld',
                requiredState: function (currentState) { return currentState.blueGoo; },
                setState: { blueGoo: false, shield: true },
                nextText: 3
            },
            {
                text: 'Ignorera köpmannen',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'Efter att ha lämnat köpmannen börjar du känna dig trött och snubbla över en liten stad intill ett farligt slott.',
        options: [
            {
                text: 'Utforska slottet',
                nextText: 4
            },
            {
                text: 'Hitta ett rum att sova på i staden',
                nextText: 5
            },
            {
                text: 'Hitta lite hö i en stall att sova i',
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: 'Du är så trött att du somnar medan du utforskar slottet och dödas av ett fruktansvärt monster i din sömn.',
        options: [
            {
                text: 'Omstart',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'Utan pengar för att köpa ett rum bryter du in i närmaste värdshus och somnar. Efter några timmars sömn hittar gästgivarens ägare dig och låter stadsvakten låsa dig i en cell.',
        options: [
            {
                text: 'Omstart',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'Du vaknar väl vilad och full av energi redo att utforska det närliggande slottet.',
        options: [
            {
                text: 'Utforska slottet',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'När du utforskar slottet stöter du på ett hemskt monster i din väg.',
        options: [
            {
                text: 'Försök springa',
                nextText: 8
            },
            {
                text: 'Attackera det med ditt svärd',
                requiredState: function (currentState) { return currentState.sword; },
                nextText: 9
            },
            {
                text: 'Göm dig bakom ditt sköld',
                requiredState: function (currentState) { return currentState.shield; },
                nextText: 10
            },
            {
                text: 'Kasta den blå gooen på den',
                requiredState: function (currentState) { return currentState.blueGoo; },
                nextText: 11
            }
        ]
    },
    {
        id: 8,
        text: 'Dina försök att springa är förgäves och monsteret fångar lätt.',
        options: [
            {
                text: 'Omstart',
                nextText: -1
            }
        ]
    },
    {
        id: 9,
        text: 'Du trodde dumt att detta monster kunde dödas med ett enda svärd.',
        options: [
            {
                text: 'Omstart',
                nextText: -1
            }
        ]
    },
    {
        id: 10,
        text: 'Monster skrattade när du gömde dig bakom din sköld och åt dig.',
        options: [
            {
                text: 'Omstart',
                nextText: -1
            }
        ]
    },
    {
        id: 11,
        text: 'Du kastade din goo-burk mot monsteret och det exploderade. Efter att dammet sänkt sig såg du att monsteret förstördes. Ser du din seger bestämmer du dig för att göra anspråk på detta slott som ditt och leva ut resten av dina dagar där.',
        options: [
            {
                text: 'Grattis. Spela igen.',
                nextText: -1
            }
        ]
    }
];
// function showTheQuestion(){
//   const theQuestion = theQuestions.find(theQuestion => theQuestion.id === showTheQuestionIndex)
//   textElement.innerText = showTheQuestionIndex.text
//   while (optionButtonsElement.firstChild) {
//     optionButtonsElement.removeChild(optionButtonsElement.firstChild)
// theQuestion.options.forEach(option => {
//   if (showOption(option)) {
//     const button = document.createElement('button')
//     button.innerText = option.text
//     button.classList.add('btn')
//     button.addEventListener('click', () => selectOption(option))
//     optionButtonsElement.appendChild(button)
//   }
// })
// }
// function showOption(option) {
//   return option.requiredState == null || option.requiredState(state)
// }
// function selectOption(option) {
//   const nextTextNodeId = option.nextText
//   if (nextTextNodeId <= 0) {
//     return startGame()
//   }
//   state = Object.assign(state, option.setState)
//   showTextNode(nextTextNodeId)
// }
// class Animal {
//   name:string
//   weight:number
//   height:number;
//   constructor(name:string, weight:number, height:number){
//     this.name=name;
//     this.weight=weight;
//     this.height=height;
//   }
//   getPrice():number
//   {
//     return this.weight/10* this.height;
//   }
// }
// let animal:Animal= new Animal("dog",22,32);
// let price=animal.getPrice();
// let display= document.getElementById("text");
// if (display) {
//   display.innerHTML = "price"
// }
// function showeverything(){
//   const theQuestions = document.getElementById('text')
//   if(theQuestions) {
//     theQuestions.innerText = "theQuestions"
//   }
// }
//  let theQuestions = [
//   {
//     id: 1,
//     text: 'Du vaknar på en konstig plats och du ser en burk med blå goo nära dig',
//     options: [
//       {
//         text: 'Ta goo',
//         setState: { blueGoo: true },
//         nextText: 2
//       },
//       {
//         text: 'Lämna goo',
//         nextText: 2
//       }
//     ]
//   },
//   {
//     id: 2,
//     text: 'Du vågar framåt för att leta efter svar på var du är när du stöter på en köpman.',
//     options: [
//       {
//         text: 'Handla goo för ett svärd',
//         // requiredState: (currentState: any) => currentState.blueGoo,
//         setState: { blueGoo: false, sword: true },
//         nextText: 3
//       },
//       {
//         text: 'Handla goo för en sköld',
//         // requiredState: (currentState: any) => currentState.blueGoo,
//         setState: { blueGoo: false, shield: true },
//         nextText: 3
//       },
//       {
//         text: 'Ignorera köpmannen',
//         nextText: 3
//       }
//     ]
//   },
//   {
//     id: 3,
//     text: 'Efter att ha lämnat köpmannen börjar du känna dig trött och snubbla över en liten stad intill ett farligt slott.',
//     options: [
//       {
//         text: 'Utforska slottet',
//         nextText: 4
//       },
//       {
//         text: 'Hitta ett rum att sova på i staden',
//         nextText: 5
//       },
//       {
//         text: 'Hitta lite hö i en stall att sova i',
//         nextText: 6
//       }
//     ]
//   },
//   {
//     id: 4,
//     text: 'Du är så trött att du somnar medan du utforskar slottet och dödas av ett fruktansvärt monster i din sömn.',
//     options: [
//       {
//         text: 'Omstart',
//         nextText: -1
//       }
//     ]
//   },
//   {
//     id: 5,
//     text: 'Utan pengar för att köpa ett rum bryter du in i närmaste värdshus och somnar. Efter några timmars sömn hittar gästgivarens ägare dig och låter stadsvakten låsa dig i en cell.',
//     options: [
//       {
//         text: 'Omstart',
//         nextText: -1
//       }
//     ]
//   },
//   {
//     id: 6,
//     text: 'Du vaknar väl vilad och full av energi redo att utforska det närliggande slottet.',
//     options: [
//       {
//         text: 'Utforska slottet',
//         nextText: 7
//       }
//     ]
//   },
//   {
//     id: 7,
//     text: 'När du utforskar slottet stöter du på ett hemskt monster i din väg.',
//     options: [
//       {
//         text: 'Försök springa',
//         nextText: 8
//       },
//       {
//         text: 'Attackera det med ditt svärd',
//         // requiredState: (currentState: any) => currentState.sword,
//         nextText: 9
//       },
//       {
//         text: 'Göm dig bakom ditt sköld',
//         // requiredState: (currentState: any) => currentState.shield,
//         nextText: 10
//       },
//       {
//         text: 'Kasta den blå gooen på den',
//         // requiredState: (currentState: any) => currentState.blueGoo,
//         nextText: 11
//       }
//     ]
//   },
//   {
//     id: 8,
//     text: 'Dina försök att springa är förgäves och monsteret fångar lätt.',
//     options: [
//       {
//         text: 'Omstart',
//         nextText: -1
//       }
//     ]
//   },
//   {
//     id: 9,
//     text: 'Du trodde dumt att detta monster kunde dödas med ett enda svärd.',
//     options: [
//       {
//         text: 'Omstart',
//         nextText: -1
//       }
//     ]
//   },
//   {
//     id: 10,
//     text: 'Monster skrattade när du gömde dig bakom din sköld och åt dig.',
//     options: [
//       {
//         text: 'Omstart',
//         nextText: -1
//       }
//     ]
//   },
//   {
//     id: 11,
//     text: 'Du kastade din goo-burk mot monsteret och det exploderade. Efter att dammet sänkt sig såg du att monsteret förstördes. Ser du din seger bestämmer du dig för att göra anspråk på detta slott som ditt och leva ut resten av dina dagar där.',
//     options: [
//       {
//         text: 'Grattis. Spela igen.',
//         nextText: -1
//       }
//     ]
//   }
// ]
//# sourceMappingURL=script.js.map