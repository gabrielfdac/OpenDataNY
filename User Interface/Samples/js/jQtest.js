/* 
The javascript bellow contains the script used on the sample1.html for the mockups
Author: Gabriel Fernandes
Date: 6/25/2015
Last Update: 6/25/2015
*/

// Counter used to determine how many times a new selection box can be created
var counterType = 0;
var counterDomain = 0;
var counterPlan = 0;
var counterService = 0;

//The following arrays futurely have to come from a query.
//They hold all the itens for each category.
var typeArray = ["blank", "", 
                "HMO", "Comercial HMO",
                "PPO", "Comercial PPO",
                "AID", "Medicaid"];

var domainArray = ["blank", "", 
                "AdH", "Adult Health", 
                "BhH", "Behavioral Health", 
                "ChAdH", "Child and Adolescent Health",
                "PNet", "Provider Network",
                "SWC", "Satisfaction with Care",
                "WH", "Women's Health"];

var planArray = ["blank", "",  
                "AETNA", "Aetna", 
                "CDPHP", "CDPHP",
                "ECHPNY", "Easy Choice Health Plan of NY",
                "HIP", "HIP (Emblem Health)"];

var serviceArray = ["blank", "", 
                "ASP", "Aspirine",
                "FSAd", "Flu Shot (for adults)",
                "CCS", "Colon Cancer Screening",
                "DIA", "Diabetes"];

// These arrays will be populated with the itens that have not been selected, so
// that it can be used to create the other boxes without the past selections.
var typeNonSelectedArray = [];
var domainNonSelectedArray = [];
var planNonSelectedArray = [];
var serviceNonSelectedArray = [];

// Create all initial selection boxes
$(function(){
    initialize();
})

function initialize()
{
    counterType = 1;
    counterDomain = 1;
    counterPlan = 1;
    counterService = 1;

    typeNonSelectedArray = [];
    domainNonSelectedArray = [];
    planNonSelectedArray = [];
    serviceNonSelectedArray = [];

    GenerateSelectionBox(typeArray, "pType");
    GenerateSelectionBox(domainArray, "pDomain");
    GenerateSelectionBox(planArray, "pPlan");
    GenerateSelectionBox(serviceArray, "pService");
}

// Event Handlers section 
$(document).ready(function(){
    // Function fired when a selection is made.
    $('body').on('change', '.sBoxes', function(){
        // Get the value from the element who fired the event.
        var value = $(this).val();
        // if the value is not blank, generate another box.
        if(value != "blank")
        {
            // get the parents id, to know where the selection came from.
            var parentID = $(this).parent().attr('id');

            // The following if chain checks where the event has been fired.
            // The if inside checks the counter to limit how many boxes are created.
            // Then the NonSelectedArray is generated and used to created the next box.
            if(parentID == 'pType')
            {
                if (counterType <= 2) 
                {
                    // Generate the NonSelectedArray.
                    typeNonSelectedArray = getNonSelectedArray(typeArray, typeNonSelectedArray, value, counterType);
                    // Generate the next selection box.
                    GenerateSelectionBox(typeNonSelectedArray, parentID);
                    // Increment the counter
                    counterType++;
                }
            }
            else if (parentID == 'pDomain')
            {
                if (counterDomain <= 5) 
                {
                    // Generate the NonSelectedArray.
                    domainNonSelectedArray = getNonSelectedArray(domainArray, domainNonSelectedArray, value, counterDomain);
                    // Generate the next selection box.
                    GenerateSelectionBox(domainNonSelectedArray, parentID);
                    // Increment the counter
                    counterDomain++;
                }
            }
            else if (parentID == 'pPlan')
            {
                if (counterPlan < 4) 
                {
                    // Generate the NonSelectedArray.
                    planNonSelectedArray = getNonSelectedArray(planArray, planNonSelectedArray, value, counterPlan);
                    // Generate the next selection box.
                    GenerateSelectionBox(planNonSelectedArray, parentID);
                    // Increment the counter
                    counterPlan++;
                }
            }
            // Last case its a Service.
            else
            {
                if (counterService < 4) 
                {
                    // Generate the NonSelectedArray.
                    serviceNonSelectedArray = getNonSelectedArray(serviceArray, serviceNonSelectedArray, value, counterService);
                    // Generate the next selection box.
                    GenerateSelectionBox(serviceNonSelectedArray, parentID);
                    // Increment the counter
                    counterService++;
                }
            }
        }
    })
    
    // Resets the form
    $('button').click(function(){
        // Checks what was the button pressed
        if($(this).attr('id')=='sButton'){
            $('#StaticForm')[0].reset();
        }
        else{
            // Remove the selection boxes
            $('.sBoxes').remove();
            
            // Initialize the form
            initialize();

            // Reset the form
            $('#DynamicForm')[0].reset();
        }
    });
});


//Helper function that generates the selection elements.
function GenerateSelectionBox (sBoxElements, pID) 
{
    // Create the selection element.
    var sel = $('<select class="sBoxes"></select>');
    // loops through the array of options.
    for(index = 0; index < sBoxElements.length; index += 2)
    {
        // Append the option to the selection box.
        sel.append('<option value='+sBoxElements[index]+'>'+sBoxElements[index+1]+'</option>');
    }
    // Append the selection box to the correct paragraph
    $('#'+pID).append(sel);
}

// This is a helper class that creates an array without the values selected,
// That are then updated to the particular NonSelected array.
// This is used so when that after a selection is made the next box doesn't contain
// past selected element.
function getNonSelectedArray(pArray, NonSelectedArray, value, counter)
{
    // A temporary array will be used the data from the NonSelectedArray as a source.
    // hence you're creating a second box or beyond.
    var tempArray = [];
    // If this is not the first generated box, use the NonSelectedArray as a source.
    // This guarantee that the previsious selected itens also get eliminated from the new list
    if (counter > 1) 
    {
        // Create a copy of NonSelectedArray.
        for(index in NonSelectedArray)
        {
            tempArray.push(NonSelectedArray[index]);
        }
        // clear the NonSelectedArray.
        NonSelectedArray = [];
    }
    else
    {
        // Create a copy of the MainArray.
        for(index in pArray)
        {
            tempArray.push(pArray[index]);
        }
    }

    // loops through the source array (tempArray)
    for(index = 0; index < tempArray.length; index += 2)
    {
        // If the value collected from the selection is not equal to a value on the source
        // add it to the new NonSelectedArray. 
        if(value != tempArray[index])
        {
            NonSelectedArray.push(tempArray[index]);
            NonSelectedArray.push(tempArray[index+1]);
        }
    }

    return NonSelectedArray;
}