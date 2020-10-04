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
    
    // Create new item based on 'inc' or 'exp' type
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

    // Public methods of budget controller
    return {
        addItem: function(type, des, val) {
            let newItem, ID;

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
            
        }
    }
    
})();

// UI CONTROLLER
let UIController = (function() {

    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }

    // Public methods of userinterface controller
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        addListItem: function(obj, type) {
            let html, newHtml, element;


            // Create HTML string with placeholder text
            if (type === 'inc'){
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>';
            } else if ( type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div>  <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }
            
            // Replace the placeholdeer text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function () {
            let fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            
            // Focus back to the inputfield
            fieldsArr[0].focus();
            
        },

        getDOMstring: function() {
            return DOMstrings;
        }
    };

})();

// GLOBAL APP CONTROLLER
let controller = (function(budgetCtrl, UICtrl) {

    let setupEventListeners = function() {
        let DOM = UICtrl.getDOMstring();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {

        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }

        });
    };


    

    let ctrlAddItem = function() {
        let input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();
    
        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        UIController.addListItem(newItem, input.type);

        // 4. Clear the fields
        UIController.clearFields();

        // 4. Calculate the budget

        // 5. Display the budget on the UI
    }

    // Public methods of global app controller
    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    }
    

})(budgetController, UIController);

controller.init();