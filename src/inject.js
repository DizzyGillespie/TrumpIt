// Ensure a full Trump match, so we don't trumpet on pages
// that are only about "trump" and not "Trump."
var TRUMP_MASTER_PATTERN = /Donald( J\.?)? Trump/im
// Track number of rules, so we can apply them fairly.
var NUM_RULES = 0;
for (var i = 0; i < RULES.length; i++) {
    NUM_RULES += RULES[i][1].length;
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
        // Check if we even mention Trump. This is a more restrictive
        // condition in order to ensure we don't trigger on non-Trump
        // trumps.
        if (!$("body").text().match(TRUMP_MASTER_PATTERN)) {
            return;
        }
        // Get our trumpets.
        var trumpets = shuffle($("p").contents().filter(function(){
            return this.nodeType == Node.TEXT_NODE;
        }));
        if (trumpets.length < 1) {
            return;
        }
        var rules = shuffle(RULES);
                
        // Get all paragraph text nodes. Apply a maximum of NUM_RULES/3 times.
        for (var i = 0; i < trumpets.length && i < NUM_RULES/3; i++) {
            apply(rules, trumpets[i]);
        };
	}
	}, 10);
});

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function apply(rules, node) {
    var t = node.textContent;
    for (var i = 0; i < rules.length; i++) {
        var pattern = rules[i][0]
        var replacements = rules[i][1];
        var replacement_idx = Math.floor(Math.random() * replacements.length);
        var r = replacements[replacement_idx];
        var result = t.replace(pattern, r);

        if (result !== t) {
            // Check EXCEPTIONS.
            if (EXCEPTIONS.some(function(x){return t.match(x);})) return;
            // Don't reuse this rule.
            rules[i][1].splice(replacement_idx, 1);
            var e = document.createElement("span");
            e.innerHTML = result;
            node.parentElement.replaceChild(e, node);
            return;
        }
    }
}