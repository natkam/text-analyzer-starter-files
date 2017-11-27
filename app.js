'use strict'

/* If there are non-word-chars at the end of the text, split() produces
an additional empty string item at the end of the textArray. This function trims
non-word-chars from the beginning and end of the text. */
function trimNonLetters(txt) {
	var start = txt.search(/\w+/);
	var end = txt.search(/[\W\s]+$/);
  /* If there are no non-letters at the end (search returns -1), extract to the end of the string: */
	var trimmedTxt = txt.slice(start, end !== -1 ? end : undefined);
	return trimmedTxt;
}

function getTextStats(txt) {
  var textArray = txt
		.toLowerCase()
    .split(/[^\w-']+/); // this can't handle Polish letters though...
		// .split(/[\\\/.,;!?"()\[\]&%#*@+=\s]+/); // yuck!
	var wordCount = textArray.length;
  var letterCount = 0;
	var uniqueWordArray = [];
	for (var i = 0, word; word = textArray[i]; i++) {
		letterCount += word.length;
		if (!uniqueWordArray.includes(word)) {
			uniqueWordArray.push(word);
		}
	}
  $('.js-word-count').text(wordCount);
  $('.js-unique-word-count').text(uniqueWordArray.length);
  $('.js-average-word-length').text((letterCount/wordCount).toFixed(2) + ' characters');
  $('.js-results').removeClass('hidden');
}

function handleForm() {
  var textForm = $('.js-text-form');
  textForm.submit(function(event) {
    event.preventDefault();
  	var txt = $(this).find('#user-text').val();
    getTextStats(trimNonLetters(txt));
  });
  textForm.on('click', '.js-reset', function(){
    $('.js-results').addClass('hidden');
  });
}

$(handleForm);
