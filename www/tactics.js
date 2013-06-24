/**
 * @author Michael Morris-Pearce <mikemp@mit.edu>
 * @copy Michael Morris-Pearce 2013
 * @license AGPLv3
 */

$(document).ready(function() {
  var coffeySrces = {
    b1: [
      "1b.htm",
    ],
    b2: [
      "2b.htm",
    ],
    b3: [
      "3b.htm",
    ],
    w1: [
      "1w.htm",
    ],
    w2: [
      "2w.htm",
    ],
    w3: [
      "3w.htm",
    ],
  };
  var coffeyDiv = $("#coffey-page");
  var puzzleDiv = $("#puzzle");
  var puzzles = {};
  var selected = {};
  var answered = 0;
  var startTime = Date.now();

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  Object.keys(coffeySrces).forEach(function(type) {
    coffeySrces[type].forEach(function(coffeySrc) {
      coffeyDiv.append('<div>').load(coffeySrc+" table", function() {
        coffeyDiv.find("tr").find("td").find("a").remove();
        coffeyDiv.find("tr").find("td").find("br").remove();
        coffeyDiv.find("tr").find("td").each(function() {
          if ($(this).find("img").length > 0) {
            puzzles[type] = puzzles[type] || [];
            puzzles[type].push($(this).html());
          }
        });
      });
    });
  });
  

  function nextPuzzle() {
    var types = Object.keys(selected).filter(function(key){return !!selected[key];});
    var typeIdx = getRandomInt(0, types.length - 1);
    var typeKey = types[typeIdx];
    var puzzlesAry = puzzles[typeKey[1]+typeKey[0]];
    var nextPuzzle = puzzlesAry[getRandomInt(0, puzzlesAry.length - 1)];
    if (typeKey[1]=='w') {
      $('#puzzle-white-move').addClass('lit');
      $('#puzzle-black-move').removeClass('lit');
    } else {
      $('#puzzle-black-move').addClass('lit');
      $('#puzzle-white-move').removeClass('lit');
    }
    puzzleDiv.show();
    puzzleDiv.animate({'opacity':0}, 100, function() {
      puzzleDiv.html(nextPuzzle);
      puzzleDiv.animate({'opacity':1}, 100);
    });
  }

  function debounce(fn, delay) {
    var id;
    var that = this;
    return function() {
      clearTimeout(id);
      id = setTimeout(fn.bind(that), delay);
    };
  }

  $("#puzzle-next-btn").click(debounce(nextPuzzle,0));

  ['1w', '2w', '3w', '1b', '2b', '3b'].forEach(function(type) {
    $('#puzzle-'+type).click(function() {
      if (selected[type]) {
        selected[type] = false;
        $(this).removeClass('selected');
      } else {
        selected[type] = true;
        $(this).addClass('selected');
      }
    });
  });

  $('#puzzle-1w').click();

});
