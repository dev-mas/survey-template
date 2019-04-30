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
    var end_content = "";

    if (end_charater == 'A') {
        result_content = result[0];
	end_content = "일요일 아침 당신의 속마음";
    } else if (end_charater == 'B') {
        result_content = result[1];
	end_content = "어우 차가워 네 마음이..."
    } else if (end_charater == 'C') {
        result_content = result[2];
	end_content = "우리가 주의 자녀인 것에 대해 자랑스러워 하자!"
    } else if (end_charater == 'D') {
        result_content = result[3];
	end_content = "(주)하늘나라 지분을 얼마나 가지시려고..."
    }
    // 이름, name
    // 학년, year
    // 고을이름, city
    // 핸드폰번호, hp
    // 국내선교팀 들어오고 싶은지, check

    var check_content = `
    <div class="row check-info">
        <div class="col-12 pb-3">
        <i class="fas fa-poll-h"></i>. 아래 정보를 작성해 주시면<br>
            추첨을 통해 소정의 상품을 드리겠습니다. <br>
            감사합니다.
        </div>
        <div class="col-3 pb-3">
        이름
        </div> 
        <div class="col-9 pb-3">
        <input type="text" id="name"/>
        </div>

        <div class="col-3 pb-3">
        학년
        </div> 
        <div class="col-9 pb-3">
        <input type="text" id="year"/>
        </div>
   


        <div class="col-3 pb-3">
        고을이름
        </div> 
        <div class="col-9 pb-3">
        <input type="text" id="city"/>
        </div>
   


        <div class="col-3 pb-3">
        핸드폰번호
        </div> 
        <div class="col-9 pb-3">
        <input type="text" id="hp"/>
        </div>
   

        <div class="col-12 pb-5 check-question">
        국내선교팀에 들어오고 싶으신가요? 
        <input type="checkbox" id="check"/>
        </div> 

        <div class=" col-12 text-center pb-2">
        <button type="button" class="btn btn-primary col-12 send">
              <i class="fas fa-paper-plane"></i>
        </button>
         </div>
    </div>
    `


    result_show_content = `
        <div class="row result_show">
            <div class="col-12 text-center">
               Type ${end_charater} ${end_content}
            </div>
        </div>
    ` 
    ;
   $(".card-title").html(
    result_show_content + 
        result_content +
        "<hr>" +
        check_content
    );
    $(".card-text").hide();

    $(".check-question").on("click", function(){
        $("#check").attr("checked",true);
    });
   
    $(".send").on("click", function(){
        save_data();
    });
}




var save_data = function () {
//    
    firebase.initializeApp(config);
    var database = firebase.database();
    var name = "test";

    // 이름, name
    // 학년, year
    // 고을이름, city
    // 핸드폰번호, hp
    // 국내선교팀 들어오고 싶은지, check
    firebase.database().ref('church/survey/test/' + $("#name").val()).set({
        name: $("#name").val(),
        year: $("#year").val(),
        city: $("#city").val(),
        hp: $("#hp").val(),
        hope: $("#check").is(":checked"),
        step_history: step_history,
        type: end_charater
    });
    console.log("save success data");

    alert("설문이 완료되었습니다. \n감사합니다.");
    location.href="./index.html";
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
