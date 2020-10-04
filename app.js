// BUDGET CONTROLLER
// IIFI(Module pattern)
let budgetController = (function() {
    
    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        total:{
            exp: 0,
            inc: 0
        }
    };

    // Budget controller public methods
    return {
        addItem: function(type, des, val) {
            let newItem, ID;
            
            // Calculate next valid ID
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1];
            } else {
                ID = 0;
            }
            
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            // Store the new item 
            data.allItems[type].push(newItem);


            return newItem;
        }
    };
    
})();


// User interface  controller
let UIController = (function() {

    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    // User interface public methods
    return {

        // Get input data from user interface
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        clearField: function() {
            document.querySelectorAll
        },
        
        addListItem: function(obj, type) {
            let html;
            
            // Create HTML string with placeholder text
            '<div class="item clearfix" id="income-0"> <div class="item__description">Salary</div><div class="right clearfix"><div class="item__value">+ 2,100.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            // Replace the placeholder text with some actual data


            // Insert the HTML into the DOM


        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();


// Global app controller
let controller = (function(budgetCtrl, UICtrl) {

    let setupEventListeners = function() {
        let DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {

        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }

        });
    };


    

    let ctrlAddItem = function() {
        // 1. Get the field input data
        let input = UICtrl.getInput();
        console.log(input);
        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI
    }

    // Global controller public methods
    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    }
    

})(budgetController, UIController);

controller.init();