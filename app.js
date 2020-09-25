// IIFI
let budgetController = (function(){
    let x = 23;
    let add = function(a) {
        return x + a;
    }

    return {
        publicTest: function(b) {
            console.log(add(b));
        }
    }
})();