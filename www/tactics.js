/**
 * @author Michael Morris-Pearce <mikemp@mit.edu>
 * @copy Michael Morris-Pearce 2013
 * @license AGPLv3
 */

$(document).ready(function() {
  var coffeySrces = [
    "1w.htm",
    "1w1.htm",
    "1w2.htm",
    "1w3.htm",
    "1w4.htm",
    "1w5.htm",
    "1w6.htm",
    "1w7.htm",
    "1w8.htm",
    "1w9.htm",
    "1w10.htm",
    "1w11.htm",
    "1w12.htm",
    "1w13.htm",
  ];
  var coffeyDiv = $("#coffey-page");
  var puzzleDiv = $("#puzzle");
  var puzzles = [];
  var answered = 0;
  var startTime = Date.now();

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  coffeySrces.forEach(function(coffeySrc) {
    coffeyDiv.append('<div>').load(coffeySrc+" table", function() {
      coffeyDiv.find("tr").find("td").find("a").remove();
      coffeyDiv.find("tr").find("td").find("br").remove();
      coffeyDiv.find("tr").find("td").each(function() {
        if ($(this).find("img").length > 0) {
          puzzles.push($(this).html());
        }
      });
    });
  });
  

  function nextPuzzle() {
    /*
    var avgTime;
    answered++;
    avgTime = (Date.now - startTime) / (1000 * answered);
    $('#puzzle-time').text(avgTime);
    */
    puzzleDiv.animate({'opacity':0}, 200, function() {
      puzzleDiv.html(puzzles[getRandomInt(0, puzzles.length - 1)]);
      puzzleDiv.animate({'opacity':1}, 200);
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

  $("#puzzle-next-btn").click(debounce(nextPuzzle,200));

});
