var allInfo = []
var states = []

//reads in the states of the PDA
var readPDAGrammar = function () {
    var temp = document.getElementById("states").value.split(",");

    temp.forEach(element => {
        var temp2 = {}
        element = "q" + "<sub>" + element.charAt(1) + "</sub>";
        temp2.state = element;
        states.push(temp2);
    });

    console.log(states);
}

//reads transition rules for PDA
var readInput = function () {

    var info = {}

    info.initial_state = document.getElementById("initial_state").value;
    info.stack = document.getElementById("stack").value;
    info.input = document.getElementById("input").value;
    info.final_state = document.getElementById("final_state").value;
    info.stack_1 = document.getElementById("stack_1").value;
    info.stack_2 = document.getElementById("stack_2").value;

    info.initial_state = "q" + "<sub>" + info.initial_state.charAt(1) + "</sub>";
    info.final_state = "q" + "<sub>" + info.final_state.charAt(1) + "</sub>";

    allInfo.push(info);
    console.log(allInfo);

    if (allInfo.length != 0) {
        document.getElementById("pdaFormula").innerHTML += "𝛿(" + allInfo[allInfo.length - 1].initial_state + "," + allInfo[allInfo.length - 1].stack + "," + allInfo[allInfo.length - 1].input + ")" + " = {(" + allInfo[allInfo.length - 1].final_state + "," + allInfo[allInfo.length - 1].stack_1 + allInfo[allInfo.length - 1].stack_2 + ")}<br>";
    }
    return false;
}


function pLp(_initial, _stack, _final) {
    var t = "(" + _initial + _stack + _final + ")" + " → ";
    return t;
}

function pRp(_state_1, _stack, _state_2) {
    var t = "(" + _state_1 + _stack + _state_2 + ")";
    return t;
}

var calculateCFG = function () {

    var txt = "<p>";

    //λ     
    var i;
    var flag = 0;

    for (i = 0; i < allInfo.length; i++) {
        for (var k = 0; k < states.length; k++) {
            if (allInfo[i].stack_1 == 'λ') {
                txt += pLp(allInfo[i].initial_state, allInfo[i].stack, allInfo[i].final_state);
            }
            else {
                txt += pLp(allInfo[i].initial_state, allInfo[i].stack, states[k].state);
            }
            for (var j = 0; j < states.length; j++) {
                if (allInfo[i].stack_1 == 'λ') {
                    txt += " " + allInfo[i].input;
                    flag = 1;
                    break;
                }
                txt += " " + allInfo[i].input +
                    pRp(allInfo[i].initial_state, allInfo[i].stack_1, states[j].state) +
                    pRp(states[j].state, allInfo[i].stack_2, states[k].state);
                if (j != (states.length - 1)) {
                    txt += " | ";
                }
            }
            if (flag == 1) {
                txt += "</p>";
                break;
            }
            txt += "</p>"
        }
    }

    document.getElementById("demo").innerHTML = txt;
}