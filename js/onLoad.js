// front-end UI drag 'n drop
// front-end UI drag 'n drop

//tuta BEGIN
var x = 1, y = 1;
var objOld = "";
var objNew = "";
var middleBrixPosition = "false";
var rightTopBricks = "false";
var rightBottomBricks = "false";

$(document).keydown(function (e) {
  if (e.keyCode == 49) // tlacitko 1
  {
    middleBrixPosition = "true";
    rightTopBricks = "false";
    rightBottomBricks = "false";

    allBricks_Clear();
    jQuery("#1_1").addClass("yellowFrame");
  }

  if (e.keyCode == 50) // tlacitko 2
  {
    rightTopBricks = "true";
    middleBrixPosition = "false";
    rightBottomBricks = "false";

    allBricks_Clear();
    x = 5;
    jQuery("#1_5").addClass("yellowFrame");
  }

  if (e.keyCode == 51) // tlacitko 3
  {
    rightBottomBricks = "true";
    rightTopBricks = "false";
    middleBrixPosition = "false";


    allBricks_Clear();
    x = 7;
    jQuery("#1_7").addClass("yellowFrame");
  }

  if (e.keyCode == 39) // sipka vpravo
  {
    if (middleBrixPosition == "true") {
      if (x < 4) {
        moveRight();
      }
    }

    if (rightBottomBricks == "true") {
      if (x < 8) {
        moveRight();
      }
    }

    if (rightTopBricks == "true") {
      if (y != 3 && x < 6) {
        moveRight();
      }
    }

  }
  if (e.keyCode == 37)//sipka vlevo
  {
    if (middleBrixPosition == "true") {
      if (x > 1) {
        moveLeft();
      }
    }

    if (rightBottomBricks == "true") {
      if (x > 7) {
        moveLeft();
      }
    }

    if (rightTopBricks == "true") {
      if (x > 5) {
        moveLeft();
      }
    }
  }
  if (e.keyCode == 40)//sipka dolu
  {
    if (middleBrixPosition == "true") {
      if (y < getMaxYear()) {
        moveDown();
      }
    }

    if (rightBottomBricks == "true") {
      if (y < 2) {
        moveDown();
      }
    }

    if (rightTopBricks == "true") {
      if (x == 5 && y < 3) {
        moveDown();
      }
      else if (y < 2) {
        moveDown();
      }
    }
  }
  if (e.keyCode == 38)//sipka nahoru
  {
    if (middleBrixPosition == "true" || rightTopBricks == "true" || rightBottomBricks == "true") {
      if (y > 1) {
        moveUp();
      }
    }
  }
});

function moveRight() {
  objOld = "#" + y.toString() + "_" + x.toString();
  x++;
  objNew = "#" + y.toString() + "_" + x.toString();
  jQuery(objOld).removeClass("yellowFrame");
  jQuery(objNew).addClass("yellowFrame");
  objOld = objNew;
}

function moveLeft() {
  objOld = "#" + y.toString() + "_" + x.toString();
  x--;
  objNew = "#" + y.toString() + "_" + x.toString();
  jQuery(objOld).removeClass("yellowFrame");
  jQuery(objNew).addClass("yellowFrame");
  objOld = objNew;
}

function moveDown() {
  objOld = "#" + y.toString() + "_" + x.toString();
  y++;
  objNew = "#" + y.toString() + "_" + x.toString();
  jQuery(objOld).removeClass("yellowFrame");
  jQuery(objNew).addClass("yellowFrame");
  objOld = objNew;
}

function moveUp() {
  objOld = "#" + y.toString() + "_" + x.toString();
  y--;
  objNew = "#" + y.toString() + "_" + x.toString();
  jQuery(objOld).removeClass("yellowFrame");
  jQuery(objNew).addClass("yellowFrame");
  objOld = objNew;
}

function allBricks_Clear() {
  middleBricks_Clear();
  rightTopBricks_Clear();
  rightBottomBricks_Clear();
  window.x = 1; window.y = 1;
}

function middleBricks_Clear() {
  var x, y;
  for (y = 1; y <= getMaxYear(); y++) {
    for (x = 1; x <= 4; x++) {
      var obj = "#" + y.toString() + "_" + x.toString();
      $(obj).removeClass("yellowFrame");
    }
  }
}

function rightTopBricks_Clear() {
  var x, y;
  for (y = 1; y <= 3; y++) {
    for (x = 5; x <= 6; x++) {
      var obj = "#" + y.toString() + "_" + x.toString();
      $(obj).removeClass("yellowFrame");
    }
  }
}

function rightBottomBricks_Clear() {
  var x, y;
  for (y = 1; y <= 2; y++) {
    for (x = 7; x <= 8; x++) {
      var obj = "#" + y.toString() + "_" + x.toString();
      $(obj).removeClass("yellowFrame");
    }
  }
}

function getMaxYear() {
  if (document.getElementById("DDLGradYear").value == "Year")
    return 4;
  else
    return document.getElementById("DDLGradYear").value;
}
//tuta END

$(function () {

  var REASON_FOR_ERROR = ""; // String containing the reason that the move was not allowed.
  var ITEM_TO_ADD = ""; // if the user chooses to continue, then ignore and just add...
  var ITEM_TO_REF = ""; // the item you wanted to originally add
  var ANALYSIS_TEXT = ""; // text to appear in the analysis section
  var currentMaxYear = 5;
  var warnings = new Array(0);
  var switchToUnearned = 0; // boolean value to determine whether an "earned" leave term should be switched to unearned
  var switchToR = 0; // boolean value to determine whether an L(OPT) term should be switched to an R term
  var useNotFlex = 0; // boolean value to determine whether to use the "not flexible" warning popup
  var seniorYearCheck = 0; // boolean value for checking 


  (function ($) {
    $.fn.liveDraggable = function (opts) {
      this.live("click", function () {
        $(this).draggable(opts);
      });
    };
  }(jQuery));

  (function ($) {
    $.fn.liveDroppable = function (opts) {
      this.live("click", function () {
        $(this).droppable(opts);
      });
    };
  }(jQuery));

  // From stackoverflow: 
  // this is a small helper extension i got from
  // http://www.texotela.co.uk/code/jquery/reverse/
  // it merely reverses the order of a jQuery set.
  $.fn.reverse = function () {
    return this.pushStack(this.get().reverse(), arguments);
  };

  // create two new functions: prevALL and nextALL. they're very similar, hence this style.
  $.each(['prev', 'next'], function (unusedIndex, name) {
    $.fn[name + 'ALL'] = function (matchExpr) {
      // get all the elements in the body, including the body.
      var $all = $('body').find('*').andSelf();

      // slice the $all object according to which way we're looking
      $all = (name == 'prev')
        ? $all.slice(0, $all.index(this)).reverse()
        : $all.slice($all.index(this) + 1)
        ;
      // filter the matches if specified
      if (matchExpr) $all = $all.filter(matchExpr);
      return $all;
    };
  });

  // From stackoverflow:
  // this is a small helper function from http://stackoverflow.com/questions/5686735/populate-one-dropdown-based-on-selection-in-another
  // which adds dropdown list values
  function createOption(ddl, text, value) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    ddl.options.add(opt);
  }
  function configureDropDownList(ddl) {
    var current = ddl.length;
    while (ddl.length < currentMaxYear) {
      createOption(ddl, current, current);
      current++;
    }
  }


  // Code for adding a new year.
  $('#addNewYear').live("click", function () {
    //Warn student to contact registrar if they wish to add a new year
    REASON_FOR_ERROR = "<font color=\"black\">See</font> Registrar's Office to change your d-plan and expected graduation term.  <font color=\"black\">See</font> your Undergraduate Dean for a written rationale to extend your academic program.  <font color=\"black\">See</font> OVIS to extend your I-20.";
    warnings.push(REASON_FOR_ERROR);
    $("#errorText").html(REASON_FOR_ERROR);
    $("#dialog-flex").dialog('open');

    // eliminate undroppable in the previous row
    var yearToCheck = "'a[class*=\"row_" + (currentMaxYear - 1) + "\"]'";
    var activeClass = $(yearToCheck).attr("class").split(' ')[1];

    var firstLine = "<div class=\"row_" + currentMaxYear + "\">";
    var midLine = "";
    for (i = 1; i < 5; i++) {
      if (i == 1) {
        midLine = midLine + "<div class=\"grid_2 mainGridItem alpha\" id=\"" + currentMaxYear + "_" + i + "\"><font color=\"white\"; style=\"margin-left: 10px;\">" + "Year " + currentMaxYear + ", Fall" + "</font></div>";
      } else if (i == 4) {
        midLine = midLine + "<div class=\"grid_2 mainGridItem omega\" id=\"" + currentMaxYear + "_" + i + "\"><font color=\"white\"; style=\"margin-left: 10px;\">" + "Year " + currentMaxYear + ", Summer" + "</font></div>";
      } else if (i == 3) {
        midLine = midLine + "<div class=\"grid_2 mainGridItem\" id=\"" + currentMaxYear + "_" + i + "\"><font color=\"white\"; style=\"margin-left: 10px;\">" + "Year " + currentMaxYear + ", Spring" + "</font></div>";
      } else {
        midLine = midLine + "<div class=\"grid_2 mainGridItem\" id=\"" + currentMaxYear + "_" + i + "\"><font color=\"white\"; style=\"margin-left: 10px;\">" + "Year " + currentMaxYear + ", Winter" + "</font></div>";
      }
    }


    var allLines = firstLine + midLine + "</div>";
    $(allLines).hide().appendTo('#addYearContainer').slideDown();

    var firstYearLine = "<div id=\"academicYear" + (currentMaxYear) + "\" class=\"grid_1 alpha yearData\">";
    var midYearLine = "<p><form><input style=\"font-size: 25px; margin-left: -10px; margin-top: 10px; width: 70px;\" class=\"league year" + currentMaxYear + "textBox\"  type=\"text\" name=\"Year" + (currentMaxYear) + "\" placeholder=\"Year " + currentMaxYear + "\" style=\"width: 75px; height: 40px; margin-left: -26px; margin-top: -13px;\"/></form></p></div>";
    var allYearLines = firstYearLine + midYearLine + "</div>";
    $(allYearLines).hide().appendTo('#addYearLabelContainer').slideDown();

    $("[class*=year_" + currentMaxYear + "]").fadeIn();
    $("[class*=row_" + currentMaxYear + "]").fadeIn();
    $('.mainGridItem').click();
    currentMaxYear++;
    configureDropDownList(document.getElementById("DDLGradYear"));
    document.getElementById("DDLGradYear").value = (currentMaxYear - 1);
    document.getElementById("DDLGradTerm").value = 4;
    checkDeleteBtnStatus();
    warn();
    return false;
  });
  // end

  //code for clearing board
  $('#clear').live("click", function () {
    //reset title box, preference, and grad date forms
    document.getElementById("titleBox").value = '';
    document.getElementById("DDLpreference").selectedIndex = 0;
    document.getElementById("DDLGradTerm").selectedIndex = 0;
    document.getElementById("DDLGradYear").selectedIndex = 0;
    document.getElementById("notesTextBox").value = '1.\n2.\n3.';

    //clear current analysis container
    $("#analysisContainer").children().remove();
    $("#analysisContainer").fadeOut();

    //hide notes container
    $("#notesContainer").fadeOut();

    for (i = 1; i <= ((currentMaxYear - 1) * 4); i++) {

      //get gridID
      var gridID = "";

      //get year number
      if (i / 4 == 0) { gridID = "#1_"; }
      else { gridID = "#" + (Math.ceil(i / 4) + "_"); }

      //get term within year number
      if (i % 4 != 0) { gridID = gridID + (i % 4); }
      else { gridID = gridID + "4"; }

      var lengthOfArray = $(gridID).attr("class").split(' ').length;
      var k = 1;
      $(gridID).removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');

    }

    //add R terms in year 4 fall, winter and spring
    $("#4_1").addClass('R');
    $("#4_2").addClass('R');
    $("#4_3").addClass('R');

    //clear out any added rows
    while (currentMaxYear > 5) {

      console.log("CurrentMaxYear=" + currentMaxYear);
      currentMaxYear = currentMaxYear - 1;
      $("#academicYear" + currentMaxYear).slideUp(function () { $(this).remove(); });
      $("[class*=year_" + currentMaxYear + "]").slideUp(function () {
        $(this).remove();
      });
      $("[class*=row_" + currentMaxYear + "]").slideUp(function () {
        $(this).remove();
      });

    }
    warn();
  });

  // Code for adding notes
  $('#addNotes').live("click", function () {

    document.getElementById("notesTextBox").value = '1.\n2.\n3.';
    $("#notesContainer").fadeIn();
  });

  // analyze before printing
  $('#printPage').live("click", function () {

    $("#dropArea").slideUp();
    printerFriendly();
    setTimeout(function () { $("#printArea").fadeIn(); }, 1500);
    //setTimeout(function() {window.print();},1250);
  });

  $('#disclaimer').live("click", function () {
    $("#dropArea").slideUp();
    $("#disclaimerArea").slideDown();
  });

  // Code for compiling analysis
  $('#analyze').live("click", function () {
    if (analysisCheck()) {
      warn();
      analyzeMe();
    }
    else {
      ITEM_TO_ADD = ""; // if this were not included, the last dropped term would be erased after hitting "Cancel" on the dialog
      $("#errorText2").html(REASON_FOR_ERROR);
      $("#dialog-notflex").dialog('open');
      warn(1);
    }
  });

  $("#backToMain").live("click", function () {
    $("#printArea").slideUp();
    $("#disclaimerArea").slideUp();
    setTimeout(function () { $('#dropArea').fadeIn(); }, 750);
  });

  // Code for deleteing latest year
  $('a#deleteLatestYear').live("click", function () {

    //add undroppable in the new final row
    var currentFinalTerm = "div#" + (currentMaxYear - 2) + "_4";
    var activeClass = $(currentFinalTerm).attr("class").split(' ')[1];
    $("." + activeClass).children().removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');


    configureDropDownList(document.getElementById("DDLGradYear"));
    currentMaxYear--;
    $("#academicYear" + currentMaxYear).slideUp(function () { $(this).remove(); });
    $("[class*=year_" + currentMaxYear + "]").slideUp(function () { $(this).remove(); });
    $("[class*=row_" + currentMaxYear + "]").slideUp(function () { $(this).remove(); });
    checkDeleteBtnStatus();
    $('.mainGridItem').click();
    warn();
    return false;
  });

  // function to generate a printer friendly compilation of the game
  function printerFriendly() {
    //clear current printer friendly container
    $("#printArea").children().remove();

    var printAreaText = "<div class=\"container_12\">";
    var title = "Your DPlan!";
    if ($('#titleBox').val() != "") {
      title = $('#titleBox').val();
    }
    var printAreaText = printAreaText + "<font><div \"league\" style=\"font-size: 30px;\">" + title + "</div>";
    //if the user has entered a preference, add it
    printAreaText = printAreaText + "<div \"league\" style=\"font-size: 15px;\">Preference - " + document.getElementById('DDLpreference').value + "</div>";
    //if the user has entered a grad term/year, add it
    var gradTerm = "";
    if (document.getElementById('DDLGradTerm').value == "1") {
      gradTerm = "Fall";
    }
    else if (document.getElementById('DDLGradTerm').value == "2") {
      gradTerm = "Winter";
    }
    else if (document.getElementById('DDLGradTerm').value == "3") {
      gradTerm = "Spring";
    }
    else if (document.getElementById('DDLGradTerm').value == "4") {
      gradTerm = "Summer";
    }
    else {
      gradTerm = "-";
    }
    printAreaText = printAreaText + "<div \"league\" style=\"font-size: 15px;\">Grad Date - " + gradTerm + " Year ";
    printAreaText = printAreaText + $('#DDLGradYear').val();
    printAreaText = printAreaText + "</div>";
    var totalAnalysis = "<div class=\"grid_9\">";


    // get terms
    j = 1;
    for (i = 1; i <= ((currentMaxYear - 1) * 4); i++) {

      //get year number
      if (i / 4 == 0) { gridID = "#1_"; }
      else { gridID = "#" + (Math.ceil(i / 4) + "_"); }

      //get term within year number
      if (i % 4 != 0) { gridID = gridID + (i % 4); }
      else { gridID = gridID + "4"; }

      //get type of term
      var analysis = "";
      var lengthOfArray = $(gridID).attr("class").split(' ').length;
      var k = 0;
      var bool = 0;
      var currentTerm = "";
      while (k <= lengthOfArray) {
        if ($(gridID).attr("class").split(' ')[k] == "RNotMoveable") {
          analysis = "R is a SEVIS-enrolled term in residence at Dartmouth College";
          bool = 1;
        }
        else if ($(gridID).attr("class").split(' ')[k] == "R") {
          analysis = "R is a SEVIS-enrolled term in residence at Dartmouth College";
          bool = 1;
        }
        else if ($(gridID).attr("class").split(' ')[k] == "O") {
          analysis = "O is a Dartmouth LSA or FSP with admissionr through Off-Campus Programs Office.  See Off-Campus Programs Office to apply for an LSA or FSP.  Upon acceptance to the LSA or FSP, the Registrar will change the term to an O.  OVIS will issue a new I-20 for this program.";
          bool = 1;
        }
        else if ($(gridID).attr("class").split(' ')[k] == "X") {
          analysis = "X is an official Dartmouth College exchange term with admission through Off-Campus Programs Office.  See Off-Campus Programs to apply for an exchange program.  Upon acceptance to the exchange program, the Regsistrar will change the term to an X.  OVIS will issue a new I-20 for this program.";
          bool = 1;
        }
        else if ($(gridID).attr("class").split(' ')[k] == "T_S") {
          analysis = "T(S) is an independently arranged transfer term with at least 3 courses approved to transfer to Dartmouth College. If two courses are approved to transfer, OVIS must count this as one of the 3 academic 2-course loads allowed. See the Registrar's office for transfer approval. See OVIS for SEVIS approval. A newmust count this as one of the 3 academic 2-course loads allowed. See the I-20 will be issued by OVIS. At least 2 courses must transfer to remain SEVIS active.";
          bool = 1;
        }
        else if ($(gridID).attr("class").split(' ')[k] == "L_Thesis") {
          analysis = "L(Thesis) is the last term of enrollment for students in a Senior Honors Program.  See the major department to enroll in the Senior Honors Thesis program.  See OVIS for the SEVIS registration application form.";
          bool = 1;
        }
        else if ($(gridID).attr("class").split(' ')[k] == "L_Unearned") {
          analysis = "L(Unearned) is a leave term following fewer than 3 terms of R O X or T. Student loses visa status and must depart the U.S. See OVIS to coordinate termination of the I-20 and departure from the U.S. A new I-20 will be required to return to enroll at Dartmouth. SEVIS fee must be paid again for all students. A new visa stamp will be required for all but Canadian students.";
          bool = 1;
        }
        else if ($(gridID).attr("class").split(' ')[k] == "L_Earned") {
          analysis = "L is an earned leave term or vacation term.  See the Registrar's Office to change D-Plan to L.";
          bool = 1;
        }
        else if ($(gridID).attr("class").split(' ')[k] == "L_LOA") {
          analysis = "I-20 will be TERMINATED.  L(LoA) is a Leave of Absence termination where the L term falls between two R terms but is taken after fewer than 3 enrolled terms of R O X or T.  Student losees visa status and must depart the U.S.  See OVIS to request termination date, and to coordinate departure from the U.S. and reactivation of the I-20.  Student will not be eligible for OPT work authorization until 3 terms of enrollment have been completed after the L(LoA).  A new I-20 will be required to return to Dartmouth College to resume study.";
          bool = 1;
        }
        else if ($(gridID).attr("class").split(' ')[k] == "L_OPT") {
          analysis = "L(OPT) is an earned leave term.  See OVIS 100 days in advance of this term to apply for OPT work authorization.  Student must be in the U.S. to mail in the application to USCIS.  Working in the U.S. without work authorization is a violation of status and will cause termination of the I-20, student will have to depart the U.S.";
          bool = 1;
        }
        else if ($(gridID).attr("class").split(' ')[k] == "G") {
          analysis = "G is a \"graduated\" term that serves as a label for any term after your last enrolled term.  Students must graduate after their last enrolled term.  The last enrolled term may be R or L(Thesis).";
          bool = 1;
        }
        if (bool == 0) {
          analysis = "No term selected";
        }
        k = k + 1;
      }
      if (i % 4 == 1) { currentTerm = "Fall" }
      else if (i % 4 == 2) { currentTerm = "Winter" }
      else if (i % 4 == 3) { currentTerm = "Spring" }
      else if (i % 4 == 0) { currentTerm = "Summer" }
      totalAnalysis = totalAnalysis + "<div style=\"font-size: 15px;\"> <b>Year " + Math.ceil(i / 4) + ", " + currentTerm + ": </b>" + analysis + "</div>";
    }

    printAreaText = printAreaText + "<div>" + totalAnalysis + "<\div>";

    // add warnings text
    var warningText = "<div style=\"font-size: 24px;\" ><font color=\"black\">WARNINGS: </font></br>";
    var warnCount = 0;
    for (warnCount = 0; warnCount < warnings.length; warnCount++) {
      warningText = warningText + "<div style=\"font-size: 15px;\"> <font color=\"black\">" + warnings[warnCount] + "</font></div>";
    }
    //warningText = "</div>";
    printAreaText = printAreaText + "<div>" + warningText + "<\div>";

    // add notes text
    printAreaText = printAreaText + "<div style=\"font-size: 24px;\">Notes: </br>";
    printAreaText = printAreaText + "<div style=\"font-size: 15px;\">" + $("#notesTextBox").val() + "</div></div>"

    printAreaText = printAreaText + "<div class=\"grid_3 alpha noPrint\" style=\"margin-top: 10px; padding-top:15px; border-bottom: 1px dotted rgb(170, 170, 170); height: 26px;\">"
    printAreaText = printAreaText + "<a id=\"backToMain\" class=\"ui-corner-all\" href=\"javascript:void(0);\"";
    printAreaText = printAreaText + "style=\"display:block;\"><span class=\"league\" style=\"font-size:24px; \">Back To Main</span></a></div>";

    printAreaText = printAreaText + "<div class=\"grid_3 alpha noPrint\" style=\"margin-top: 10px; padding-top: 15px; border-bottom: 1px dotted rgb(170, 170, 170); height: 26px;\">";
    printAreaText = printAreaText + "<a id=\"printNow\" class=\"ui-corner-all\" href=\"javascript:window.print();\"";
    printAreaText = printAreaText + "style=\"display:block;\"><span class=\"league\" style=\"font-size: 24px; \">Print!</span></a></div>";


    printAreaText = printAreaText + "<\div><\div>"

    $(printAreaText).hide().appendTo('#printArea').slideDown();
  }

  //function to analyze the grid and generate a summary of the terms the user has selected
  function analyzeMe() {
    //clear current analysis container
    $("#analysisContainer").children().remove();


    var modifiedHeight = (currentMaxYear * 6 * 25);

    //if the user entered a title, use that, otherwise title should be "Analysis"
    var title = "Analysis";
    if ($('#titleBox').val() != "") {
      title = $('#titleBox').val();
    }
    var year1analysis = "<font color=\"white\"><div \"league\" style=\"font-size: 24px;\">" + title + "</div>";


    //if the user has entered a preference, add it
    year1analysis = year1analysis + "<div \"league\" style=\"font-size: 15px;\">Preference - " + document.getElementById('DDLpreference').value + "</div>";

    //if the user has entered a grad term/year, add it
    var gradTerm = "";
    if (document.getElementById('DDLGradTerm').value == "1") {
      gradTerm = "Fall";
    }
    else if (document.getElementById('DDLGradTerm').value == "2") {
      gradTerm = "Winter";
    }
    else if (document.getElementById('DDLGradTerm').value == "3") {
      gradTerm = "Spring";
    }
    else if (document.getElementById('DDLGradTerm').value == "4") {
      gradTerm = "Summer";
    }
    else {
      gradTerm = "-";
    }
    year1analysis = year1analysis + "<div \"league\" style=\"font-size: 15px;\">Grad Date - " + gradTerm + " Year ";
    year1analysis = year1analysis + $('#DDLGradYear').val();
    year1analysis = year1analysis + "</div>";

    j = 1;
    for (i = 1; i <= ((currentMaxYear - 1) * 4); i++) {

      if ((i % 4) == 1) {
        var yearID = "academicYear" + j;
        year1analysis = year1analysis + "<div \"league\" style=\"font-size: 15px;\"><font weight=\"600;\"" + document.getElementById(yearID).value + "</font>";
        j++;
      }


      //get year number
      if (i / 4 == 0) { gridID = "#1_"; }
      else { gridID = "#" + (Math.ceil(i / 4) + "_"); }

      //get term within year number
      if (i % 4 != 0) { gridID = gridID + (i % 4); }
      else { gridID = gridID + "4"; }

      //get type of term
      var analysis = "";
      var lengthOfArray = $(gridID).attr("class").split(' ').length;
      var k = 0;
      var currentTerm = "";
      while (k <= lengthOfArray) {
        if ($(gridID).attr("class").split(' ')[k] == "RNotMoveable") {
          modifiedHeight = modifiedHeight + 20;
          analysis = "R is a SEVIS-enrolled term in residence at Dartmouth College";
        }
        else if ($(gridID).attr("class").split(' ')[k] == "R") {
          modifiedHeight = modifiedHeight + 20;
          analysis = "R is a SEVIS-enrolled term in residence at Dartmouth College";
        }
        else if ($(gridID).attr("class").split(' ')[k] == "O") {
          modifiedHeight = modifiedHeight + 40;
          analysis = "O is a Dartmouth LSA or FSP with admissionr through Off-Campus Programs Office.  See Off-Campus Programs Office to apply for an LSA or FSP.  Upon acceptance to the LSA or FSP, the Registrar will change the term to an O.  OVIS will issue a new I-20 for this program.";
        }
        else if ($(gridID).attr("class").split(' ')[k] == "X") {
          modifiedHeight = modifiedHeight + 40;
          analysis = "X is an official Dartmouth College exchange term with admission through Off-Campus Programs Office.  See Off-Campus Programs to apply for an exchange program.  Upon acceptance to the exchange program, the Regsistrar will change the term to an X.  OVIS will issue a new I-20 for this program.";
        }
        else if ($(gridID).attr("class").split(' ')[k] == "T_S") {
          modifiedHeight = modifiedHeight + 50;
          analysis = "T(S) is an independently arranged transfer term with at least 3 courses approved to transfer to Dartmouth College. If two courses are approved to transfer, OVIS must count this as one of the 3 academic 2-course loads allowed. See the Registrar's office for transfer approval. See OVIS for SEVIS approval.  See the I-20 will be issued by OVIS. At least 2 courses must transfer to remain SEVIS active.";
        }
        else if ($(gridID).attr("class").split(' ')[k] == "L_Thesis") {
          modifiedHeight = modifiedHeight + 40;
          analysis = "L(Thesis) is the last term of enrollment for students in a Senior Honors Program.  See the major department to enroll in the Senior Honors Thesis program.  See OVIS for the SEVIS registration application form.";
        }
        else if ($(gridID).attr("class").split(' ')[k] == "L_Unearned") {
          modifiedHeight = modifiedHeight + 50;
          analysis = "L(Unearned) is a leave term following fewer than 3 terms of R O X or T. Student loses visa status and must depart the U.S. See OVIS to coordinate termination of the I-20 and departure from the U.S. A new I-20 will be required to return to enroll at Dartmouth. SEVIS fee must be paid again for all students. A new visa stamp will be required for all but Canadian students.";
        }
        else if ($(gridID).attr("class").split(' ')[k] == "L_Earned") {
          modifiedHeight = modifiedHeight + 20;
          analysis = "L is an earned leave term or vacation term.  See the Registrar's Office to change D-Plan to L.";
        }
        else if ($(gridID).attr("class").split(' ')[k] == "L_OPT") {
          modifiedHeight = modifiedHeight + 50;
          analysis = "L(OPT) is an earned leave term.  See OVIS 100 days in advance of this term to apply for OPT work authorization.  Student must be in the U.S. to mail in the application to USCIS.  Working in the U.S. without work authorization is a violation of status and will cause termination of the I-20, student will have to depart the U.S.";
        }
        else if ($(gridID).attr("class").split(' ')[k] == "L_LOA") {
          modifiedHeight = modifiedHeight + 60;
          analysis = "I-20 will be TERMINATED.  L(LoA) is a Leave of Absence termination where the L term falls between two R terms but is taken after fewer than 3 enrolled terms of R O X or T.  Student losees visa status and must depart the U.S.  See OVIS to request termination date, and to coordinate departure from the U.S. and reactivation of the I-20.  Student will not be eligible for OPT work authorization until 3 terms of enrollment have been completed after the L(LoA).  A new I-20 will be required to return to Dartmouth College to resume study.";
        }
        else if ($(gridID).attr("class").split(' ')[k] == "G") {
          modifiedHeight = modifiedHeight + 50;
          analysis = "G is a \"graduated\" term that serves as a label for any term after your last enrolled term.  Students must graduate after their last enrolled term.  The last enrolled term may be R or L(Thesis).";
        }

        k = k + 1;
      }
      if (i % 4 == 1) { currentTerm = "Fall" }
      else if (i % 4 == 2) { currentTerm = "Winter" }
      else if (i % 4 == 3) { currentTerm = "Spring" }
      else if (i % 4 == 0) { currentTerm = "Summer" }
      year1analysis = year1analysis + "<div style=\"font-size: 15px;\"> <b>Year " + Math.ceil(i / 4) + ", " + currentTerm + ": </b>" + analysis + "</div>";
    }

    year1analysis = year1analysis + "</font>"
    //modify height of box based on number of terms
    var newHeight = modifiedHeight + "px";
    $("#analysisContainer").css("height", newHeight);
    $("#analysisContainer").fadeIn();

    $(year1analysis).hide().appendTo('#analysisContainer').slideDown();
  };

  function checkDeleteBtnStatus() {
    if (currentMaxYear <= 5) {
      $('#deleteLatestYearContainer').fadeOut();
      //$('#addNewYearContainer').delay(1000).removeClass('grid_4').addClass('grid_8');
    } else if (currentMaxYear > 5) {
      $('#addNewYearContainer').removeClass('grid_8').addClass('grid_4');
      $('#deleteLatestYearContainer').fadeIn();
    }
  };

  // CLEAR Btn function. If an <a> with class row_#N is clicked, where #N is an integer, then look through element's children and remove any Term Tags
  $('a[class*="row_"]').live("click", function () {
    var activeClass = $(this).attr("class").split(' ')[1];
    $("." + activeClass).children().removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');
  });

  $('.draggable_box_white, .draggable_box_blue, .draggable_box_black').draggable({
    revert: 'invalid',
    helper: 'clone',
  });
  $('.mainGridItem:not(.ui-draggable)').liveDraggable({
    revert: 'invalid',
    helper: 'clone',
  });

  // check terms for any potential violations
  $('.mainGridItem:not(.ui-draggable)').liveDroppable({
    accept: '.draggable_box_black, .draggable_box_white, .draggable_box_blue, .mainGridItem, .Undroppable',
    drop: function (event, ui) {

      var droppedItemClass = ui.draggable.attr("class").split(' ')[1]; // is the dropped item from the WHITE or BLACK box:
      var typeOfTerm = ui.draggable.attr("class").split(' ')[0]; // what type of term are we dropping
      ITEM_TO_REF = ui.draggable;

      var finalTermId = "4_4";
      if (((document.getElementById("DDLGradYear").value) != "None Selected") && (document.getElementById("DDLGradTerm").value != "None Selected")) {
        finalTermId = document.getElementById("DDLGradYear").value + "_" + document.getElementById("DDLGradTerm").value;

      }


      var ReceiverId = $(this).closest('.mainGridItem').attr('id');

      var ReceiverTerm = ReceiverId.split("_")[0] * ReceiverId.split("_")[1];
      if ((finalTermId == ReceiverId) && ((typeOfTerm != "R") && (typeOfTerm != "G") && (typeOfTerm != "L_Thesis"))) {
        $(this).removeClass("R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT");
        $("#errorText").html("Only R or L_Thesis terms are permitted in your selected final term. This selection has been switched to an R.  Change your selected final term if you wish to drop this term here or cancel.");
        switchToR = 1;
        $(this).addClass("R");
        $("#dialog-flex").dialog('open');
      }
      else {
        //var termDescriptor = parseInt(ReceiverId.split('_')[0] * 4) + parseInt(ReceiverId.split('_')[1]);

        var bool = "false";

        if (typeOfTerm != "R") {
          bool = "true";
          if (!L_DI_CPT_Check_Rev(this, ReceiverId, typeOfTerm)) {
            $(this).removeClass('T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');
            if (useNotFlex == 0) {
              $("#errorText2").html(REASON_FOR_ERROR);
              //warnings.push("Term " + termDescriptor + ": " + REASON_FOR_ERROR);
              $("#dialog-notflex").dialog('open');
            }
            else {
              $("#errorText").html(REASON_FOR_ERROR);
              switchToUnearned = 1;
              $("#dialog-flex").dialog('open');
            }
          }
        }

        if (typeOfTerm == "G") {
          bool = "true";
          if (graduatedTermCheck(this, ReceiverId)) {
            // if the check clears...
            $(this).removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');
            $(this).addClass(ui.draggable.attr("class").split(' ')[0]);
          }
          else {
            $(this).removeClass('L_Thesis');
            $("#errorText2").html(REASON_FOR_ERROR);
            $("#dialog-notflex").dialog('open');
          }
        }

        if (typeOfTerm == "T_S") {
          bool = "true";
          if (consecutiveTSCheck(this, ReceiverId)) {
            // if the check clears...
            $(this).removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');
            $(this).addClass(ui.draggable.attr("class").split(' ')[0]);
          }
          else { // otherwise display error message
            $(this).removeClass('L_Thesis');
            if (useNotFlex == 0) {
              $("#errorText").html(REASON_FOR_ERROR);
              $("#dialog-flex").dialog('open');
            }
            else {
              $("#errorText2").html(REASON_FOR_ERROR);
              $("#dialog-notflex").dialog('open');
            }
          }
        }

        if (typeOfTerm == "O") {
          bool = "true";
          if (multiOXCheck(this, ReceiverId)) {
            // if the check clears...
            $(this).removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');
            $(this).addClass(ui.draggable.attr("class").split(' ')[0]);
          }
          else { // otherwise display error message
            $(this).removeClass('L_Thesis');
            if (useNotFlex == 0) {
              $("#errorText").html(REASON_FOR_ERROR);
              $("#dialog-flex").dialog('open');
            }
            else {
              $("#errorText2").html(REASON_FOR_ERROR);
              $("#dialog-notflex").dialog('open');
            }
          }
        }

        if (typeOfTerm == "X") {
          bool = "true";
          if (XCheck(this, ReceiverId)) {

            if (multiOXCheck(this, ReceiverId)) {
              // if the check clears...
              $(this).removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');
              $(this).addClass(ui.draggable.attr("class").split(' ')[0]);
            }
            else { // otherwise display error message
              $(this).removeClass('L_Thesis');
              if (useNotFlex == 0) {
                $("#errorText").html(REASON_FOR_ERROR);
                $("#dialog-flex").dialog('open');
              }
              else {
                $("#errorText2").html(REASON_FOR_ERROR);
                $("#dialog-notflex").dialog('open');
              }
            }
          }
          else { // otherwise display error message
            $(this).removeClass('L_Thesis');
            $("#errorText2").html(REASON_FOR_ERROR);
            //warnings.push("Term " + termDescriptor + ": " + REASON_FOR_ERROR);

            $("#dialog-notflex").dialog('open');
          }
        }

        if (typeOfTerm == "L_Thesis") {
          bool = "true";
          if (multiThesisCheck(this, ReceiverId)) {
            // if the check clears...
            $(this).removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');
            $(this).addClass(ui.draggable.attr("class").split(' ')[0]);
          }
          else { // otherwise display error message
            $(this).removeClass('L_Thesis');
            if (useNotFlex == 0) {
              $("#errorText2").html(REASON_FOR_ERROR);
              //warnings.push("Term " + termDescriptor + ": " + REASON_FOR_ERROR);
              $("#dialog-notflex").dialog('open');
            }
            else {
              $("#errorText").html(REASON_FOR_ERROR);
              $("#dialog-flex").dialog('open');
              warn();
            }
          }
        }
        if (typeOfTerm == "L_Unearned") {
          bool = "true";
          if (unearnedLeaveCheck(this, ReceiverId)) {
            // if the check clears...
            $(this).removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');
            $(this).addClass(ui.draggable.attr("class").split(' ')[0]);
          }
          else { // otherwise display error message
            $(this).removeClass('L_Unearned');
            $("#errorText").html(REASON_FOR_ERROR);
            //warnings.push("Term " + termDescriptor + ": " + REASON_FOR_ERROR);
            $("#dialog-flex").dialog('open');
          }
        }

        if ((typeOfTerm == "L_Earned") || typeOfTerm == "L_OPT") {
          bool = "true";
          if (blueCheck(this, ReceiverId)) { // if the check clears...
            $(this).removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');
            $(this).addClass(ui.draggable.attr("class").split(' ')[0]);
          }
          else { // otherwise display error message
            $(this).removeClass('L_OPT L_Earned');
            $("#errorText").html(REASON_FOR_ERROR);
            switchToUnearned = 1;
            $("#dialog-flex").dialog('open');

          }

        }

        if (typeOfTerm == "L_DI_CPT") {
          bool = "true";
          if (L_DI_CPT_Check(this, ReceiverId)) { // if the check clears...
            $(this).removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');
            $(this).addClass(ui.draggable.attr("class").split(' ')[0]);
          }
          else { // otherwise display error message
            $(this).removeClass('L_DI_CPT');
            if (useNotFlex == 0) {
              $("#errorText2").html(REASON_FOR_ERROR);
              //warnings.push("Term " + termDescriptor + ": " + REASON_FOR_ERROR);
              $("#dialog-notflex").dialog('open');
            }
            else {
              $("#errorText").html(REASON_FOR_ERROR);
              switchToUnearned = 1;
              $("#dialog-flex").dialog('open');
            }
          }
        }

        if (typeOfTerm == "L_LOA") {
          bool = "true";
          if (loaCheck(this, ReceiverId)) { // if the check clears...
            $(this).removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');
            $(this).addClass(ui.draggable.attr("class").split(' ')[0]);
          }
          else { // otherwise display error message
            $(this).removeClass('L_LOA');
            //warnings.push("Term " + termDescriptor + ": " + REASON_FOR_ERROR);
            if (useNotFlex == 0) {
              $("#errorText2").html(REASON_FOR_ERROR);
              $("#dialog-notflex").dialog('open');
            }
            else {
              $("#errorText").html(REASON_FOR_ERROR);
              $("#dialog-flex").dialog('open');
              warn();
            }
          }

        }

        if (bool == "true") {
          $(this).removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');

        }


        console.log("adding...: " + ui.draggable.attr("class").split(' ')[0]);
        $(this).addClass(ui.draggable.attr("class").split(' ')[0]);
      }

      warn();
    }

  });

  // for removing dropped terms from the main grid
  $('#box_white, #box_black, #dropArea').droppable({
    accept: '.mainGridItem, .RNotMoveable',
    drop: function (event, ui) {
      var droppedItemClass = ui.draggable.attr("class").split(' ')[2];
      var droppedItemID = ui.draggable.attr("id");
      console.log("removing: " + ui.draggable.attr("class").split(' ')[0]);
      if (droppedItemClass == "RNotMoveable") {
        //$("#errorText").html(droppedItemID);
        $("#errorText2").html("First year fall, winter and spring must be R terms.  <font color=\"black\">See</font> your Undergraduate Dean if you want to withdraw from Dartmouth College in one of those terms.  <font color=\"black\">See</font> OVIS to coordinate termination of your I-20/visa status.");
        $("#dialog-notflex").dialog('open');
      }
      var finalTerm = (currentMaxYear - 1) + "_";

      $(ui.draggable).removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT L_DI_CPT');

      warn();
    }
  });

  //function to print out any warnings of violations as gathered from the "addWarnings" function
  function warn(arg) {
    addWarnings(arg);
    //clear current warnings container 
    $("#warningsContainer").children().remove();

    var warningsText = "<font color=\"black\"><div style=\"font-size: 24px;\"> Warnings <\div>";
    var i = 0;
    for (i = 0; i < warnings.length; i++) {
      warningsText = warningsText + "<div style=\"font-color: black; font-size: 15px;\">" + warnings[i] + "</div>";
    }
    if (warnings.length > 0) {
      $("#warningsContainer").fadeIn();
      $(warningsText).hide().appendTo('#warningsContainer').slideDown();
    }
    else {
      $("#warningsContainer").slideUp();
    }
  }

  //function to go through the grid and compile any potential violations into an array "warnings"
  function addWarnings(arg) {
    warnings = new Array();
    //check number of years
    if (currentMaxYear > 5) {
      warnings.push("<font color=\"black\">See</font> Registrar's Office to change your d-plan and expected graduation term.  <font color=\"black\">See</font> your Undergraduate Dean for a written rationale to extend your academic program.  <font color=\"black\">See</font> OVIS to extend your I-20.");
    }

    if (arg == "1") {
      warnings.push("<b>General warning</b>: " + REASON_FOR_ERROR);
    }

    //variable to keep track of the number of R, O, X terms (if there are more than 12 the student must be warned)
    var roxTerms = 0;
    var oxTerms = 0;
    //variable to hold current term
    var currentTerm = "";
    for (var f = 1; f <= ((currentMaxYear - 1) * 4); f++) {

      //get year number
      if (f / 4 == 0) {
        gridID = "1_";
      }
      else {
        gridID = (Math.ceil(f / 4) + "_");
      }

      //get term within year number
      if (f % 4 != 0) {
        gridID = gridID + (f % 4);
      }
      else {
        gridID = gridID + "4";
      }

      gridID2 = "#" + gridID;

      // find out what the current term is
      if (f % 4 == 1) { currentTerm = "Fall" }
      else if (f % 4 == 2) { currentTerm = "Winter" }
      else if (f % 4 == 3) { currentTerm = "Spring" }
      else if (f % 4 == 0) { currentTerm = "Summer" }

      //get type of term
      var analysis = "";
      var lengthOfArray = $(gridID2).attr("class").split(' ').length;
      var xyz = 0;

      while (xyz <= lengthOfArray) {
        if ($(gridID2).attr("class").split(' ')[xyz] == "L_Thesis") {
          var finalTerms = ["4_1", "4_2","4_3", "4_4"];

          // has the year and term of graduation been preset by the user?
          if (((document.getElementById("DDLGradYear").value) != "None Selected") && (document.getElementById("DDLGradTerm").value != "None Selected")) {
            finalTermId = document.getElementById("DDLGradYear").value + "_" + document.getElementById("DDLGradTerm").value; 	// if so, make the final term this user-selected value
          }
          // if where the user wants to drop thesis term isn't the final term, warn
          if (!finalTerms.includes(gridID)) {
            warnings.push("<b>Year " + Math.ceil(f / 4) + ", " + currentTerm + "</b>: Thesis terms may only be taken during your final term.");
          }
          // otherwise thesis term is being placed correctly; need to warn user nonetheless
          else {
            warnings.push("<b>Year " + Math.ceil(f / 4) + ", " + currentTerm + "</b>: " + REASON_FOR_ERROR);
          }
        }

        if ($(gridID2).attr("class").split(' ')[xyz] == "R") {
          roxTerms = roxTerms + 1;
        }
        if (($(gridID2).attr("class").split(' ')[xyz] == "O") || ($(gridID2).attr("class").split(' ')[xyz] == "X")) {
          if (!multiOXCheck(null, gridID)) {
            warnings.push("<b>Year " + Math.ceil(f / 4) + ", " + currentTerm + "</b>: " + REASON_FOR_ERROR);
          }
          roxTerms = roxTerms + 1;
          oxTerms = oxTerms + 1;
        }
        if ($(gridID2).attr("class").split(' ')[xyz] == "RNotMoveable") {
          roxTerms = roxTerms + 1;
        }
        if ($(gridID2).attr("class").split(' ')[xyz] == "L_Unearned") {
          if (!unearnedLeaveCheck(null, gridID)) {
            warnings.push("<b>Year " + Math.ceil(f / 4) + ", " + currentTerm + "</b>: " + REASON_FOR_ERROR);
          }
        }
        if ($(gridID2).attr("class").split(' ')[xyz] == "L_LOA") {
          if (!loaCheck(null, gridID)) {
            warnings.push("<b>Year " + Math.ceil(f / 4) + ", " + currentTerm + "</b>: " + REASON_FOR_ERROR);
          }
        }
        xyz = xyz + 1;
      }
    }
    if (roxTerms > 12) {
      $("#errorText").html("Only twelve terms of R O X are allowed.  <font color=\"black\">See</font> Registrar to petition for more terms.  <font color=\"black\">See</font> OVIS to extend I-20.");
      $("#dialog-flex").dialog('open');
      warnings.push("<b>General warning</b>: Only twelve terms of R O X are allowed.  <font color=\"black\">See</font> Registrar to petition for more terms.  <font color=\"black\">See</font> OVIS to extend I-20.")
    }
    if (oxTerms > 3) {
      $("#errorText").html("Only three terms of O X are allowed.  <font color=\"black\">See</font> Registrar to petition for more transfer/ex terms.  <font color=\"black\">See</font> OVIS to extend I-20.");
      $("#dialog-flex").dialog('open');
      warnings.push("<b>General warning</b>: Only twelve terms of R O X are allowed.  <font color=\"black\">See</font> Registrar to petition for more terms.  <font color=\"black\">See</font> OVIS to extend I-20.")
    }

    var modifiedHeight = 200 + (85 * warnings.length);
    //modify height of box based on number of terms
    var newHeight = modifiedHeight + "px";
    $("#warningsContainer").css("height", newHeight);
  }

  // is it valid to perform analysis?
  function analysisCheck() {
    // go through the grid
    for (i = 1; i <= ((currentMaxYear - 1) * 4); i++) {

      //get year number
      if (i / 4 == 0) { gridID = "#1_"; }
      else { gridID = "#" + (Math.ceil(i / 4) + "_"); }

      //get term within year number
      if (i % 4 != 0) { gridID = gridID + (i % 4); }
      else { gridID = gridID + "4"; }

      //get type of term
      var lengthOfArray = $(gridID).attr("class").split(' ').length;
      var k = 0;
      var check = 0
      // go through all classes - if grid has been filled, set check to 1 and break out
      while (k < lengthOfArray) {
        if (($(gridID).attr("class").split(' ')[k] == "RNotMoveable") || ($(gridID).attr("class").split(' ')[k] == "R") || ($(gridID).attr("class").split(' ')[k] == "G") || ($(gridID).attr("class").split(' ')[k] == "O") || ($(gridID).attr("class").split(' ')[k] == "X") || ($(gridID).attr("class").split(' ')[k] == "T_S") || ($(gridID).attr("class").split(' ')[k] == "L_Thesis") || ($(gridID).attr("class").split(' ')[k] == "L_Unearned") || ($(gridID).attr("class").split(' ')[k] == "L_Earned") || ($(gridID).attr("class").split(' ')[k] == "L_OPT") || ($(gridID).attr("class").split(' ')[k] == "L_LOA")) {
          check = 1;
          break;
        }
        k = k + 1;
      }
      if (check == 0) {
        REASON_FOR_ERROR = "You must make a selection for all terms within your D-plan.";
        return false;
      }
    }
    return true;
  }

  // contains rules for dropping G term
  function graduatedTermCheck(box, ReceiverID) {
    var row = ReceiverID.split("_")[0] * 1;	// need to multiply by 1 to change the string to an integer
    var col = ReceiverID.split("_")[1] * 1;

    for (row; row <= getMaxYear(); row++) {
      while (col <= 4) { 		// use while instead of for, since col can be anything between 1 and 4
        var gridID = "#" + row + "_" + col;		// id of box in main grid we're currently checking
        var lengthOfArray = $(gridID).attr("class").split(' ').length;
        var k = 0;
        // go through all classes - if grid has been filled, set check to 1 and break out
        while (k < lengthOfArray) {
          if (($(gridID).attr("class").split(' ')[k] == "RNotMoveable") || ($(gridID).attr("class").split(' ')[k] == "R") || ($(gridID).attr("class").split(' ')[k] == "O") || ($(gridID).attr("class").split(' ')[k] == "X") || ($(gridID).attr("class").split(' ')[k] == "T_S") || ($(gridID).attr("class").split(' ')[k] == "L_Thesis") || ($(gridID).attr("class").split(' ')[k] == "L_Unearned") || ($(gridID).attr("class").split(' ')[k] == "L_Earned") || ($(gridID).attr("class").split(' ')[k] == "L_OPT") || ($(gridID).attr("class").split(' ')[k] == "L_LOA")) {
            if (box != null) {
              ITEM_TO_ADD = box;
            }
            REASON_FOR_ERROR = "You cannot make this a \"graduated\" term since there is at least one Enrolled or Non-Enrolled term following it.";
            useNotFlex = 0;
            return false;
          }
          k = k + 1;
        }
        col++;
      }
      col = 1;
    }
    return true;
  }

  // contains rules for dropping L_Thesis term.
  function multiThesisCheck(box, ReceiverId) {
    var finalTerms = ["4_4", "4_3", "4_2", "4_1"]
    console.log("ReceiverID=" + ReceiverId);
    console.log("year: " + document.getElementById("DDLGradYear").value);
    console.log("term: " + document.getElementById("DDLGradTerm").value);
    if (((document.getElementById("DDLGradYear").value) != "None Selected") && (document.getElementById("DDLGradTerm").value != "None Selected")) {
      finalTermId = document.getElementById("DDLGradYear").value + "_" + document.getElementById("DDLGradTerm").value;
    }
    // if not dropping thesis into final term, don't allow this at all
    if (!finalTerms.includes(ReceiverId)) {
      if (box != null) {
        ITEM_TO_ADD = box;
      }
      REASON_FOR_ERROR = "Thesis term can only be during your final term at Dartmouth";
      useNotFlex = 0;
      return false;
    }
    // else allow term to be droppable with a warning
    else {
      if (box != null) {
        ITEM_TO_ADD = box;
      }
      REASON_FOR_ERROR = "Senior honors thesis requires department admission to the program and completion of an enrollment form for SEVIS. See OVIS for details.";
      useNotFlex = 1;
      return false;
    }
  }


  // contains rules for dropping L_Unearned term.
  function unearnedLeaveCheck(box, ReceiverId) {
    var finalTerm = (currentMaxYear - 1) + "_4";
    if (ReceiverId == finalTerm) {
      if (box != null) {
        ITEM_TO_ADD = box;
      }
      REASON_FOR_ERROR = "Unearned leave terms cannot be taken during your final term at Dartmouth";
      return false;
    }
    else {
      if (box != null) {
        ITEM_TO_ADD = box;
      }
      REASON_FOR_ERROR = "Every L(Unearned) term will require a termination of the I-20. You must depart the U.S. You cannot remain in the U.S. or work in the U.S. after the I-20 has been terminated. To return to the U.S. to study at Dartmouth, you will need to apply for a new I-20 from Dartmouth, pay the SEVIS fee again, and (unless you are Canadian) apply for a new visa stamp at a U.S. Consulate abroad.";
      return false;
    }
  }

  // contains rules for dropping consecutive X terms
  function XCheck(box, ReceiverID) {
    //get int values of the grid row and column
    var row = ReceiverID.split("_")[0];
    var col = ReceiverID.split("_")[1];
    col = col * 1; //have to do this to convert from a string to an int
    row = row * 1;

    //vars to hold the prev/next row/col values
    var prevRow; var prevCol; var nextRow; var nextCol;

    //calculate the prev/next row/col values
    if (col == 1) {
      prevRow = row - 1;
      prevCol = 4;

      nextRow = row;
      nextCol = 1 + col;
    }
    else if (col == 4) {
      prevRow = row;
      prevCol = 3;

      nextRow = row + 1;
      nextCol = 1;
    }
    else {
      prevRow = row;
      prevCol = col - 1;

      nextRow = row;
      nextCol = 1 + col;
    }

    var OXcheck = 0;

    //make a string of the proper next/prev html div ids
    var next = "#" + nextRow + "_" + nextCol;
    var prev = "#" + prevRow + "_" + prevCol;

    if (nextRow == (currentMaxYear) && nextCol == 1) {
      if (box != null) {
        ITEM_TO_ADD = box;
      }
      REASON_FOR_ERROR = "You cannot elect this term in the summer of your final year.  In your final term you must be in residence.";
      useNotFlex = 1;
      return false;
    }
    //check next
    var lengthOfArray = $(next).attr("class").split(' ').length;
    var k = 0;
    while (k <= lengthOfArray) {
      //if it is either an O or an X then keep fail
      if (($(next).attr("class").split(' ')[k] == "X")) {
        OXcheck = 1;
      }
      k++;
    }

    //check prev
    lengthOfArray = $(prev).attr("class").split(' ').length;
    k = 0;
    while (k <= 10) {
      //if it is either an O or an X then fail
      if (($(prev).attr("class").split(' ')[k] == "X")) {
        OXcheck = 1;
      }
      k++;
    }

    //if the prev and next items are not R/RNotMoveables don't allow L_LOA to be dropped
    if (OXcheck == 1) {
      if (box != null) {
        ITEM_TO_ADD = box;
      }
      REASON_FOR_ERROR = "Consecutive Exchange (X) terms may not be allowed by SEVIS. Contact OVIS for details specific to your plan.";
      useNotFlex = 0;
      return false;
    } else { // otherwise, allow the term to be droppable
      return true;
    }
  }

  // contains rules for dropping O/X terms
  function multiOXCheck(box, ReceiverID) {
    //get int values of the grid row and column
    var row = ReceiverID.split("_")[0];
    var col = ReceiverID.split("_")[1];
    col = col * 1; //have to do this to convert from a string to an int
    row = row * 1;

    //vars to hold the prev/next row/col values
    var prevRow; var prevCol; var nextRow; var nextCol;

    //calculate the prev/next row/col values
    if (col == 1) {
      prevRow = row - 1;
      prevCol = 4;

      nextRow = row;
      nextCol = 1 + col;
    }
    else if (col == 4) {
      prevRow = row;
      prevCol = 3;

      nextRow = row + 1;
      nextCol = 1;
    }
    else {
      prevRow = row;
      prevCol = col - 1;

      nextRow = row;
      nextCol = 1 + col;
    }

    var OXcheck = 0;

    //make a string of the proper next/prev html div ids
    var next = "#" + nextRow + "_" + nextCol;
    var prev = "#" + prevRow + "_" + prevCol;
    if (nextRow == (currentMaxYear) && nextCol == 1) {
      if (box != null) {
        ITEM_TO_ADD = box;
      }
      useNotFlex = 1;
      REASON_FOR_ERROR = "You cannot elect this term in the summer of your final year.  In your final term you must be in residence."
      return false;
    }
    //check next
    var lengthOfArray = $(next).attr("class").split(' ').length;
    var k = 0;
    while (k <= lengthOfArray) {
      //if it is either an O or an X then keep fail
      if (($(next).attr("class").split(' ')[k] == "O") || ($(next).attr("class").split(' ')[k] == "X")) {
        OXcheck = 1;
      }
      k++;
    }

    //check prev
    lengthOfArray = $(prev).attr("class").split(' ').length;
    k = 0;
    while (k <= 10) {
      //if it is either an O or an X then fail
      if (($(prev).attr("class").split(' ')[k] == "O") || ($(prev).attr("class").split(' ')[k] == "X")) {
        OXcheck = 1;
      }
      k++;
    }

    //if the prev or next items is an O, X, warn
    if (OXcheck == 1) {
      if (box != null) {
        ITEM_TO_ADD = box;
      }
      REASON_FOR_ERROR = "Electing consecutive Exchange O/X or O/O terms may not be allowed by SEVIS. Contact OVIS for details specific to your plan.";
      return false;
    } else { // otherwise, allow the term to be droppable
      return true;
    }


  }

  // contains rules for dropping L_LOA terms
  function loaCheck(box, ReceiverID) {
    //var to keep track of if there is an R behind/ahead of the dropped grid spot
    var counter = 0;

    //get int values of the grid row and column
    var row = ReceiverID.split("_")[0];
    var col = ReceiverID.split("_")[1];
    col = col * 1; //have to do this to convert from a string to an int
    row = row * 1;

    //vars to hold the prev/next row/col values
    var prevRow; var prevCol; var nextRow; var nextCol;

    //calculate the prev/next row/col values
    if (col == 1) {
      prevRow = row - 1;
      prevCol = 4;

      nextRow = row;
      nextCol = 1 + col;
    }
    else if (col == 4) {
      prevRow = row;
      prevCol = 3;

      nextRow = row + 1;
      nextCol = 1;
    }
    else {
      prevRow = row;
      prevCol = col - 1;

      nextRow = row;
      nextCol = 1 + col;
    }


    if (nextRow == (currentMaxYear) && nextCol == 1) {
      if (box != null) {
        ITEM_TO_ADD = box;
      }
      return false;
    }

    //make a string of the proper next/prev html div ids
    var next = "#" + nextRow + "_" + nextCol;
    var prev = "#" + prevRow + "_" + prevCol;
    //check next
    var lengthOfArray = $(next).attr("class").split(' ').length;
    var k = 0;
    while (k <= lengthOfArray) {
      //if it is either an R (R or Rnotmoveable) then keep track of it in counter
      if ($(next).attr("class").split(' ')[k] == "RNotMoveable") {
        counter++;
      }
      else if ($(next).attr("class").split(' ')[k] == "R") {
        counter++;
      }
      k++;
    }

    //check prev
    lengthOfArray = $(prev).attr("class").split(' ').length;
    k = 0;
    while (k <= 10) {
      //if it is either an R (R or Rnotmoveable) then keep track of it in counter
      if ($(prev).attr("class").split(' ')[k] == "RNotMoveable") {
        counter++;
      }
      else if ($(prev).attr("class").split(' ')[k] == "R") {
        counter++;
      }
      k++;
    }

    //if the prev and next items are not R/RNotMoveables don't allow L_LOA to be dropped
    if (counter != 2) {
      if (box != null) {
        ITEM_TO_ADD = box;
      }
      REASON_FOR_ERROR = "L(LoA) cannot be selected unless the previous term is R and the next term is R.";
      useNotFlex = 0;
      return false;
    } else { // otherwise, allow the term to be droppable with a warning
      if (box != null) {
        ITEM_TO_ADD = box;
      }
      REASON_FOR_ERROR = "Every L(LOA) term will require a termination of the I-20. You must depart the U.S. You cannot remain in the U.S. or work in the U.S. after the I-20 has been terminated. To return to the U.S. to study at Dartmouth, OVIS will have to request reactivation of the I-20 by SEVIS. You absolutely may not re-enter the U.S. during this term if you intend to seek reactivation of the I-20. Reactivation does not require payment of the SEVIS fee. Consult OVIS about the possibility of this option for your plans, and the need for a new visa stamp (or not).";
      useNotFlex = 1;
      return false;
    }
  }

  // contains rules for dropping consecutive L(earned) terms
  function consecutiveTSCheck(box, ReceiverID) {
    //get int values of the grid row and column
    var row = ReceiverID.split("_")[0];
    var col = ReceiverID.split("_")[1];
    col = col * 1; //have to do this to convert from a string to an int
    row = row * 1;

    //vars to hold the prev/next row/col values
    var prevRow; var prevCol; var nextRow; var nextCol;

    //calculate the prev/next row/col values
    if (col == 1) {
      prevRow = row - 1;
      prevCol = 4;

      nextRow = row;
      nextCol = 1 + col;
    }
    else if (col == 4) {
      prevRow = row;
      prevCol = 3;

      nextRow = row + 1;
      nextCol = 1;
    }
    else {
      prevRow = row;
      prevCol = col - 1;

      nextRow = row;
      nextCol = 1 + col;
    }

    var OXcheck = 0;

    //make a string of the proper next/prev html div ids
    var next = "#" + nextRow + "_" + nextCol;
    var prev = "#" + prevRow + "_" + prevCol;
    if (nextRow == (currentMaxYear) && nextCol == 1) {
      if (box != null) {
        ITEM_TO_ADD = box;
      }
      REASON_FOR_ERROR = "You cannot add this term in the final term";
      useNotFlex = 1;
      return false;
    }
    //check next
    var lengthOfArray = $(next).attr("class").split(' ').length;
    var k = 0;
    while (k <= lengthOfArray) {
      //if it is either an O or an X then keep fail
      if (($(next).attr("class").split(' ')[k] == "T_S")) {
        OXcheck = 1;
      }
      k++;
    }

    //check prev
    lengthOfArray = $(prev).attr("class").split(' ').length;
    k = 0;
    while (k <= 10) {
      //if it is either an O or an X then fail
      if (($(prev).attr("class").split(' ')[k] == "T_S")) {
        OXcheck = 1;
      }
      k++;
    }

    //if the prev or next items is an O, X, warn
    if (OXcheck == 1) {
      if (box != null) {
        ITEM_TO_ADD = box;
      }
      REASON_FOR_ERROR = "You cannot elect two consecutive T(S) terms.  The second term has been switched to an L(Unearned) term.";
      //useNotFlex = 1;
      switchToUnearned = 1;
      return false;
    } else { // otherwise, allow the term to be droppable
      return true;
    }
  }

  // contains rule for dropping L_Earned, L_OPT terms.
  function blueCheck(box, ReceiverID) {
    var row = ReceiverID.split("_")[0];
    var col = ReceiverID.split("_")[1];

    // vars to count occurences of R,X,O terms
    var prev = 0;

    for (i = 0; i < 3; i++) {
      var newRow;
      var newCol;

      if (col == 1) {
        newRow = row - 1;
        newCol = 4;
      }
      else {
        newRow = row;
        newCol = col - 1;
      }

      if (newRow == 0) {
        break;
      }

      var newID = "#" + newRow + "_" + newCol;

      //get type of term
      var lengthOfArray = $(newID)?.attr("class")?.split(' ')?.length ?? 0;
      var k = 0;
      while (k <= lengthOfArray) {
        if ($(newID).attr("class").split(' ')[k] == "RNotMoveable") {
          prev++;
        }
        else if ($(newID).attr("class").split(' ')[k] == "R") {
          prev++;
        }
        else if ($(newID).attr("class").split(' ')[k] == "O") {
          prev++;
        }
        else if ($(newID).attr("class").split(' ')[k] == "X") {
          prev++;
        }
        else if ($(newID).attr("class").split(' ')[k] == "T_S") {
          prev++;
        }
        k++;
      }

      row = newRow;
      col = newCol;
    }

    if (prev < 3) { // if they have been "off" atleast once in the past term, then display notice
      if (box != null) {
        ITEM_TO_ADD = box;
      }
      REASON_FOR_ERROR = "L(Earned) terms cannot be selected unless at least 3 R O X or T terms precede it. This has been switched to an Unearned Leave term.";
      return false;
    } else { // otherwise, allow the term to be droppable
      return true;
    }
  }

  // contains rule for dropping L_DI_CPT terms
  function L_DI_CPT_Check(box, ReceiverID) {
    var row = ReceiverID.split("_")[0];
    var col = ReceiverID.split("_")[1];

    // vars to count occurences of R,X,O terms
    var prev = 0;

    for (i = 0; i < 3; i++) {
      var newRow;
      var newCol;

      if (col == 1) {
        newRow = row - 1;
        newCol = 4;
      }
      else {
        newRow = row;
        newCol = col - 1;
      }

      if (newRow == 0) {
        break;
      }

      var newID = "#" + newRow + "_" + newCol;

      //get type of term
      var lengthOfArray = $(newID).attr("class").split(' ').length;
      var k = 0;
      while (k <= lengthOfArray) {
        if ($(newID).attr("class").split(' ')[k] == "RNotMoveable") {
          prev++;
        }
        else if ($(newID).attr("class").split(' ')[k] == "R") {
          prev++;
        }
        else if ($(newID).attr("class").split(' ')[k] == "O") {
          prev++;
        }
        else if ($(newID).attr("class").split(' ')[k] == "X") {
          prev++;
        }
        else if ($(newID).attr("class").split(' ')[k] == "T_S") {
          prev++;
        }
        k++;
      }

      row = newRow;
      col = newCol;
    }

    if (prev < 3) { // if they have been "off" atleast once in the past term, then display notice
      if (box != null) {
        ITEM_TO_ADD = box;
      }
      REASON_FOR_ERROR = "L-DI CPT terms cannot be selected unless at least 3 R O X or T terms precede it.";
      return false;
    } else { 
      row = ReceiverID.split("_")[0];
      col = ReceiverID.split("_")[1];

      if (row == currentMaxYear - 1 && col == 4) return true;

      if (col == 4) {
        row++;
        col = 0;
      } else {
        col++;
      }

      var newID = "#" + row + "_" + col;
      var lengthOfArray = $(newID)?.attr("class")?.split(' ')?.length ?? 0;
      var k = 0;
      while (k <= lengthOfArray) {
        var cName = $(newID)?.attr("class")?.split(' ')?.[k] ?? '';

        if (cName == "L_Thesis" || cName == "T_S" || cName == "L_Earned" || cName == "L_Unearned") {
          if (box != null) {
            ITEM_TO_ADD = box;
          }
          REASON_FOR_ERROR = "L-DI CPT terms must be followed by an R, O, or X term.";
          useNotFlex = 0;
          return false;        
        } else if (cName == "X" || cName == "O") {
          if (box != null) {
            ITEM_TO_ADD = box;
          }
          REASON_FOR_ERROR = "You must request a letter of support from the Associate Dean for International and Interdisciplinary Studies, granting permission to enroll in the DI course while on a study away program.";
          useNotFlex = 1;
          return false;
        }

        k++;
      }

      return true;
    }
  }

  function L_DI_CPT_Check_Rev(box, ReceiverID, typeOfTerm) {
    row = ReceiverID.split("_")[0];
    col = ReceiverID.split("_")[1];

    if (row == 0 && col == 0) return true;

    if (col == 0) {
      row--;
      col = 4;
    } else {
      col--;
    }

    var newID = "#" + row + "_" + col;
    var lengthOfArray = $(newID)?.attr("class")?.split(' ')?.length ?? 0;
    var k = 0;
    while (k <= lengthOfArray) {
      var cName = $(newID)?.attr("class")?.split(' ')?.[k] ?? '';

      if (cName == "L_DI_CPT" && (typeOfTerm == "O" || typeOfTerm == "X")) {
        if (box != null) {
          ITEM_TO_ADD = box;
        }
        REASON_FOR_ERROR = "You must request a letter of support from the Associate Dean for International and Interdisciplinary Studies, granting permission to enroll in the DI course while on a study away program.";
        useNotFlex = 1;
        return false;
      } else if (cName == "L_DI_CPT") {
        if (box != null) {
          ITEM_TO_ADD = box;
        }
        REASON_FOR_ERROR = "L-DI CPT terms must be followed by an R, O, or X term.";
        useNotFlex = 0;
        return false;        
      }

      k++;
    }

    return true;    
  }


  $("#dialog-flex").dialog({
    resizable: true,
    width: 500,
    height: 240,
    modal: true,
    autoOpen: false,
    buttons: {
      "Continue": function () {
        console.log("SwitchtoR=" + switchToR);
        console.log("switchToUnearned=" + switchToUnearned);
        if (switchToUnearned == 1) {
          $(ITEM_TO_ADD).removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');
          $(ITEM_TO_ADD).addClass("L_Unearned");
        } else if (switchToR == 1) {
          console.log("a;lsdkfja;lsdkfja;lsdkfja;ldksjfa;lsdkj");
          $(ITEM_TO_ADD).removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');
          $(ITEM_TO_ADD).addClass("L_Unearned");
        }
        switchToUnearned = 0;
        switchToR = 0;
        $(this).dialog("close");
      },
      "Cancel": function () {
        $(ITEM_TO_ADD).removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');
        $(this).dialog("close");
      }
    }

  }); $("#dialog-notflex").dialog({
    resizable: true,
    width: 500,
    height: 240,
    modal: true,
    autoOpen: false,
    buttons: {
      "Cancel": function () {
        $(ITEM_TO_ADD).removeClass('R X O T_S L_OPT L_LOA L_Thesis L_Earned L_Unearned L_DI_CPT');
        $(this).dialog("close");
      }
    }

  });

  $("#goToMain").click(function () {
    $("#welcome_1").stop().slideUp();
    $("#dropArea").stop().delay(800).slideDown(800);
  });

  $("#tutorial").click(function () {
    $("#slideshowContainer").stop().animate({ height: '543px' }, 700);
    $("#slideshowTitle").text("Tutorial");
    $("#welcomeInnerText").delay(800).cycle('next');
    $("#navBtns").delay(1200).fadeIn();
  });

  function onAfter(curr, next, opts) {
    var index = opts.currSlide;
    $('.back')[index == 0 ? 'hide' : 'show']();
    $('.next')[index == opts.slideCount - 1 ? 'hide' : 'show']();
  }

  $("#welcomeInnerText").cycle({
    fx: "scrollHorz",
    easeIn: "easeOutExpo",
    easeOut: "easeOutExpo",
    sync: 1,
    random: 0,
    pause: 1,
    speed: 800,
    timeout: 0,
    next: '.next',
    prev: '.back',
    after: onAfter,
  });
  $('.mainGridItem').click();

  $("#dropArea").stop().delay(0).fadeIn(800);
});