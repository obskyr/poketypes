String.prototype.repeat = function(num) { /* Amazing string repeater. Python-style, almost. */
    return new Array(num + 1).join(this);
};

var typeClasses = "normal fire fighting water flying grass poison electric ground psychic rock ice bug dragon ghost dark steel fairy"
var $sminstructions = $('<div/>', {
    'id': 'smallinstructions',
    'text': 'Choose your attack type in the box to the LEFT. Choose your defender type(s) in the box to the RIGHT.'
});

function switchToResults() {
    $('#instructions').fadeOut(200, function() {
        $('#instructions').hide();
        $('#results').fadeIn(200);
    });
};

function parentNum(e, n) {
    /* Returns the nth parent of e. */
    p = e
    for (i = 0; i < n; i++) {
        p = p.parentNode
    }
    return p
}
var choices = {
    attacker: {
        chosen: [],
        maxChosen: 1,
        cutChosen: function() { // Truncate chosen so it doesn't exceed the maxChosen limit
            this.chosen = this.chosen.slice(this.chosen.length - this.maxChosen);
        },
        updatePressed: function() { // Updates according to this.chosen
            var classes = ""
            for (var i = 0; i < this.chosen.length; i++) {
                classes += '.attacker .' + this.chosen[i] + ', ';
            };
            classes = classes.slice(0, classes.length - 2); // Trailing comma causes syntax error in jQuery.
            $('.attacker .type').removeClass('pressed');
            $(classes).addClass('pressed');
        },
        choose: function(t) {
            if ($.inArray(t, this.chosen) > -1) {
                this.chosen.splice(this.chosen.indexOf(t), 1);
            } else {
                this.chosen.push(t);
                this.cutChosen();
            };
        },
    },
    defender: {
        chosen: [],
        maxChosen: 2,
        cutChosen: function() { // Same as attacker's.
            this.chosen = this.chosen.slice(this.chosen.length - this.maxChosen);
        },
        updatePressed: function() { // - || -
            var classes = ""
            for (var i = 0; i < this.chosen.length; i++) {
                classes += '.defender .' + this.chosen[i] + ', ';
            };
            classes = classes.slice(0, classes.length - 2); // Trailing comma causes syntax error in jQuery.
            $('.defender .type').removeClass('pressed');
            $(classes).addClass('pressed');
        },
        choose: function(t) {
            if ($.inArray(t, this.chosen) > -1) {
                this.chosen.splice(this.chosen.indexOf(t), 1);
            } else {
                this.chosen.push(t);
                this.cutChosen();
            };
        },
    },
    createEffectivityStr: function() {
        if (this.attacker.chosen.length && this.defender.chosen.length) {
            var atype = this.attacker.chosen[0];
            var type1 = this.defender.chosen[0];
            var type2 = this.defender.chosen.length > 1 ? this.defender.chosen[1] : '';
            var STAB = 1; // Who knows, I might implement a STAB button?
            var effectivity = attackEffectivity(atype, type1, type2, STAB);
            
            return effectivityStr = effectivity + "x<br>" + effectivityTexts[effectivity].toUpperCase() + "!"
        } else {
            return effectivityStr = $sminstructions;
        };
    },
    updateEffectivity: function(effectivityStr) {
        effectivityStr = typeof effectivityStr !== 'undefined' ? effectivityStr : this.createEffectivityStr();
        $('#effectivity').html(effectivityStr);
    },
    updateSummary: function() {
        $('#attacktype, #defendtype1, #defendtype2').removeClass('type ' + typeClasses);
        $('#attacktype, #defendtype1, #defendtype2').text('')
        if (this.attacker.chosen.length) {
            var attackType = this.attacker.chosen[0];
            $('#attacktype').addClass('type ' + attackType);
            $('#attacktype').text(attackType.toUpperCase());
        }
        if (this.defender.chosen.length) {
            for (var i = 0; i < this.defender.chosen.length; i++) {
                var defendType = this.defender.chosen[i];
                $('#defendtype' + (i + 1)).addClass('type ' + defendType);
                $('#defendtype' + (i + 1)).text(defendType.toUpperCase());
            }
        }
    },
    updatePressed: function() {
        this.attacker.updatePressed();
        this.defender.updatePressed();
    },
    updateAll: function() {
        this.updatePressed();
        this.updateSummary();
        var tempThis = this;
        if (this.prevUpdateValid || this.attacker.chosen.length && this.defender.chosen.length) {
            $('#effectivity').fadeOut(150, function() {
                tempThis.updateEffectivity();
                $('#effectivity').fadeIn(150);
            });
        } else {
            tempThis.updateEffectivity();
        }
        this.prevUpdateValid = this.attacker.chosen.length && this.defender.chosen.length ? true : false;
    },
    prevUpdateValid: true
};

$(document).ready(function() {
    $('.types .type').click(function() {
        if ($('#instructions').is(':visible')) {
            switchToResults();
        };
        /* In all type elements, the type-specific class is class 1 (starting with 0). */
        var curTable = parentNum(this, 3).classList[1];
        var curType = this.classList[1];
        choices[curTable].choose(curType);
        choices.updateAll();
    });
});
