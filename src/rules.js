var SUFFIXES = [
    "a man whose fingers are so small he can't use the latest iPhone",
    "a man who is statistically indistinguishable from a muppet version of himself",
    "the Republican Presidential candidate and reality TV host",
    "whom Egyptologists suggest we were warned about in ancient hieroglyphs",
    "the man Mayan scholars warn is the reason the ancient calendar ends in 2016",
    "a man whose short, stubby fingers should never be allowed near the nuclear launch button",
    "a man whose cognitive functions resemble the vestigial galvanic twitching of a pair of severed frog legs",
    "a man so racist he makes George Wallace look politically correct",
    "a \"man of the people\" who lives in a golden apartment",
    "the best current argument against popular democracy",
    "who as a businessman underperformed the market by all reliable estimates",
    "heir to his father's real-estate fortune",
    "a man so self-obsessed he named all of his sons \"Donald\"",
    "whose wit is the only thing shorter than his fingers",
    "a man posessed of a singular desire to see his name written in gold",
    "the man so unlikable New York billionaires will have nothing to do with him",
    "a man who makes Narcissus look humble",
    "who has never read a book (but he's heard good things about them)",
    "whose name translates literally from the Japanese as \"strangely short-fingered\"",
    "whose name derives from the Sanskrit for \"looks older than he is\"",
    "whose fingers are so short they make him look like he has child hands"
    
];

var PREFIXES = [
    "accused rapist",
    "alleged child rapist",
    "short-fingered vulgarian",
    "walking and talking ballsack",
    "over-tanned huckster",
    "reality television star",
    "documented racist",
    "tie brand representative",
    "ready-to-wear suit spokesman",
    "short-fingered-glove-buyer",
    "bottled water salesman",
    "four-time bankruptcy filer",
    "over-tanned ballsack",
    "talking baseball mitt",
    "pompous hairpiece",
    "comb-over-wearing baboon",
    "millionaire real-estate heir and self-described businessman",
    "stubby-fingered reality TV star",
    "Mussolini-admirer",
    "noted conspiracy theorist",
    "pathetic publicity whore",
    "confirmed misogynist",
    "pathetic windbag",
    "cheating husband",
    "bombastic windbag",
    "serial bankruptcy-filer",
    "unsuccessful businessman",
    "failed entrepreneur",
    "failed casino owner",
    "life-size Chucky doll",
    "Chapter 11 \"frequent filer\"",
    "USDA canner-grade beef salesman",
    "\"self-made\" \"billionaire\""
    
];

function style(x) {
    // TODO: fix this to use the CSS?!? If only I knew what I was doing.
    return "<span style='color:white;background-color:black;'>" + x + "</span>";
}

var COMMA_SUFFIXES = SUFFIXES.map(function(x) {
    return "$1, " + style(x) + ", $2"; });
var CLAUSE_PREFIXES = PREFIXES.map(function (x) {
    return "$1" + style(x) + " $2"});  
var SENTENCE_PREFIXES = PREFIXES.map(function (x) {
    return  "$1" + style(
        // Uppercase the first "\w" letter.
        x.replace(/(\w)/, function(v) { return v.toUpperCase()})) + " $2";});

var RULES = [
    [/((?:Donald(?: J\.?)?|Mr\.) Trump) ($|[a-z])/im, COMMA_SUFFIXES],
    [/([,;\w]\s+)((?:Donald(?: J\.?)?|Mr\.)? Trump)/im, CLAUSE_PREFIXES],
    [/(^|[\.^]\s+)((?:Donald(?: J\.?)?|Mr\.)? Trump)/im, SENTENCE_PREFIXES]
]

// Things we definitely don't want to trigger on. Yeah, I suck at NLP, whatever.
var EXCEPTIONS = [
    /trump campaign/im,
    /trump organization/im,
    /melania trump/im,
    /ivanka trump/im,
    /ivana trump/im,
    /eric trump/im,
    /barron trump/im,
    /mrs\.? trump/im,
    /ms\.? trump/im,
    /tiffany trump/im,
]
