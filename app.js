'use strict'

/* If there are non-word-chars at the end of the text, slice() produces
an additional empty string item at the end of the textArray. This funcion trims
non-word-chars from the beginning and end of the text. */
function trimNonLetters(txt) {
	var start = txt.search(/\w+/);
	var end = txt.search(/[\W\s]+$/);
  /* If there are no non-letters at the end (search returns -1), extract to the end of the string: */
	var trimmedTxt = txt.slice(start, end !== -1 ? end : undefined);
	return trimmedTxt;
}

function getTextStats() {
	var txt = $('.js-text').val();
  var textArray = txt //trimNonLetters(txt)
		.toLowerCase()
    .split(/[^\w-']+/); // this can't handle Polish letters though...
		// .split(/[\\\/.,;!?"()\[\]&%#*@+=\s]+/); // yuck!
	var wordCount = textArray.length;
	var uniqueWordArray = [];
	var letterCount = 0;
	for (var i = 0, word; word = textArray[i]; i++) {
		letterCount += word.length;
		if (!uniqueWordArray.includes(word)) {
			uniqueWordArray.push(word);
		}
	}
	var uniqueWordCount = uniqueWordArray.length;
	var averageWordLength = (letterCount/wordCount).toFixed(2);

  $('.js-results').removeClass('hidden');
  $('.js-word-count').text(wordCount);
  $('.js-unique-word-count').text(uniqueWordCount);
  $('.js-average-word-length').text(averageWordLength);
}

function analyze() {
  $('.js-analyze').on('click', function(event) {
    event.preventDefault();
    getTextStats();
  });
}

$(analyze);
