var step = 1;
var step_name = "";
var is_end = false;
var end_charater = "";
var step_history = [];

var end = function (value) {
    is_end = true;
    end_charater = value;
    step_history.push(value);
    console.log(step_history);
    go_end_page();
    return;
}

var go_end_page = function () {
    var result_content = "";

    if (end_charater == 'A') {
        result_content = result[0];
    } else if (end_charater == 'B') {
        result_content = result[1];
    } else if (end_charater == 'C') {
        result_content = result[2];
    } else if (end_charater == 'D') {
        result_content = result[3];
    }

    $(".card-title").html(result_content);
    $(".card-text").hide();

    save_data();
}

var save_data = function() {
    var config = {
        apiKey: "AIzaSyCUrv5r8SS3z7GbCxP177xQ8HdCj2uuU_I",
        authDomain: "dvmoomoodv-project.firebaseapp.com",
        databaseURL: "https://dvmoomoodv-project.firebaseio.com",
        storageBucket: "dvmoomoodv-project.appspot.com"
      };
      firebase.initializeApp(config);
      var database = firebase.database();
      var name = "test";
      firebase.database().ref('church/survey/test/' + name).set({
        name : name,
        step_history: step_history,
        type : end_charater
      });
}





var load_question = function () {
    console.log("question = ", question);
    console.log("result = ", result);
    console.log("load_question loaded");

    var init_question = {
        number: 1,
        question: question[1 - 1]
    };
    step_history.push(init_question);
    $(".card-title").html(question[1 - 1]);
    $(".step").html("Step " + step);
}

var action = function (check) {

    console.log("action.js loaded");
    var next_number = 0;
    step++;

    $(".step").html("Step " + step);

    if (step == 2) {
        if (check == 'y') {
            $(".card-title").html(question[3 - 1]);
            step_name = "1-3";
        } else if (check == 'n') {
            $(".card-title").html(question[6 - 1]);
            step_name = "1-6";
        }
    }

    if (step == 3) {
        if (step_name == "1-3") {
            $(".card-title").html(question[4 - 1]);
            step_name = "1-3-4";
        } else if (step_name == "1-6") {
            if (check == 'y') {
                $(".card-title").html(question[3 - 1]);
                step_name = "1-6-3";
            } else if (check == 'n') {
                $(".card-title").html(question[2 - 1]);
                step_name = "1-6-2";
            }
        }
    }


    if (step == 4) {
        if (step_name == "1-3-4") {
            if (check == 'y') {
                $(".card-title").html(question[7 - 1]);
                step_name = "1-3-4-7";
            } else if (check == 'n') {
                $(".card-title").html(question[10 - 1]);
                step_name = "1-3-4-10";
            }
        } else if (step_name == "1-6-3") {
            if (check == 'y') {
                $(".card-title").html(question[5 - 1]);
                step_name = "1-6-3-5";
            } else if (check == 'n') {
                $(".card-title").html(question[11 - 1]);
                step_name = "1-6-3-11";
            }
        } else if (step_name == "1-6-2") {
            if (check == 'y') {
                $(".card-title").html(question[3 - 1]);
                step_name = "1-6-2-3";
            } else if (check == 'n') {
                $(".card-title").html(question[4 - 1]);
                step_name = "1-6-2-4";
            }
        }
    }

    if (step == 5) {
        if (step_name == "1-3-4-7") {
            if (check == 'y') {
                step_name = "1-3-4-7-D";
                end('D');
            } else if (check == 'n') {
                $(".card-title").html(question[9 - 1]);
                step_name = "1-3-4-7-9";
            }
        } else if (step_name == "1-3-4-10") {
            if (check == 'y') {
                $(".card-title").html(question[8 - 1]);
                step_name = "1-3-4-10-8";
            } else if (check == 'n') {
                step_name = "1-3-4-10-A";
                end('A');
            }
        } else if (step_name == "1-6-3-5") {
            if (check == 'y') {
                step_name = "1-6-3-5-D";
                end('D');
            } else if (check == 'n') {
                $(".card-title").html(question[11 - 1]);
                step_name = "1-6-3-5-11";
            }
        } else if (step_name == "1-6-3-11") {
            if (check == 'y') {
                step_name = "1-6-3-11-D";
                end('D');
            } else if (check == 'n') {
                step_name = "1-6-3-11-B";
                end('B');
            }
        } else if (step_name == "1-6-2-3") {
            if (check == 'y') {
                $(".card-title").html(question[3 - 1]);
                step_name = "1-6-2-3-7";
            } else if (check == 'n') {
                $(".card-title").html(question[4 - 1]);
                step_name = "1-6-2-3-7";
            }
        } else if (step_name == "1-6-2-4") {
            if (check == 'y') {
                $(".card-title").html(question[7 - 1]);
                step_name = "1-6-2-4-7";
            } else if (check == 'n') {
                $(".card-title").html(question[10 - 1]);
                step_name = "1-6-2-4-10";
            }
        }
    }


    if (step == 6) {

        if (step_name == "1-3-4-7-9") {
            if (check == 'y') {
                step_name = "1-3-4-7-9-C";
                end('C');
            } else if (check == 'n') {
                step_name = "1-3-4-7-9-B";
                end('B');
            }
        } else if (step_name == "1-3-4-10-8") {
            if (check == 'y') {
                step_name = "1-3-4-10-8-C";
                end('C');
            } else if (check == 'n') {
                step_name = "1-3-4-10-8-B";
                end('B');
            }
        } else if (step_name == "1-6-3-5-11") {
            if (check == 'y') {
                step_name = "1-6-3-5-11-D";
                end('D');
            } else if (check == 'n') {
                step_name = "1-6-3-5-11-B";
                end('B');
            }
        } else if (step_name == "1-6-2-3-7") {
            if (check == 'y') {
                step_name = "1-6-2-3-7-D";
                end('D');
            } else if (check == 'n') {
                $(".card-title").html(question[8 - 1]);
                step_name = "1-6-2-3-7-8";
            }
        } else if (step_name == "1-6-2-4-7") {
            if (check == 'y') {
                step_name = "1-6-2-4-7-D";
                end('D');
            } else if (check == 'n') {
                $(".card-title").html(question[9 - 1]);
                step_name = "1-6-2-4-7-9";
            }
        } else if (step_name == "1-6-2-4-10") {
            if (check == 'y') {
                $(".card-title").html(question[8 - 1]);
                step_name = "1-6-2-4-10-8";
            } else if (check == 'n') {
                step_name = "1-6-2-4-10-A";
                end('A');
            }
        }
    }

    if (step == 7) {
        if (step_name == "1-6-2-3-7-8") {
            if (check == 'y') {
                step_name = "1-6-2-3-7-8-C";
                end('C');
            } else if (check == 'n') {
                step_name = "1-6-2-3-7-8-B";
                end('B');
            }
        } else if (step_name == "1-6-2-4-7-9") {
            if (check == 'y') {
                step_name = "1-6-2-4-7-9-C";
                end('C');
            } else if (check == 'n') {
                step_name = "1-6-2-4-7-9-B";
                end('B');
            }
        } else if (step_name == "1-6-2-4-10-8") {

            if (check == 'y') {
                step_name = "1-6-2-4-10-8-C";
                end('C');
            } else if (check == 'n') {
                step_name = "1-6-2-4-10-8-B";
                end('B');
            }
        }
    }


    

    if (!is_end) {
        var question_info = {
            check: check,
            next_question: question[step_name.split("-")[step - 1] - 1]
        };
        step_history.push(question_info);

    }


}