autoComplete(document.getElementById("bottle-filter"));

$(".dropdown-menu li a").click(function () {
    $(this).parents(".btn-group").find('.selection').text($(this).text());
    $(this).parents(".btn-group").find('.selection').val($(this).text());
});

const autoCompletedAction = async () => {
    filterBottles();
}

const filterBottles = async () => {
    document.getElementById("bottle-filter-listener").value = document.getElementById('bottle-filter').value;
    document.getElementById("bottle-filter-listener").dispatchEvent(new Event("change"));
}

//Get drink names from Realm Webhook
const getDrinks = async () => {
    //Calling new autocomplete function  -- to be used for autocomplete
    let webhook_url = "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/team4-uafre/service/mongodbar/incoming_webhook/autocomplete";
    let searchString = document.getElementById('bottle-filter').value;

    let webUrl = webhook_url + "?arg=" + searchString;
    const res = await fetch(webUrl);
    let drinks = await res.json();

    drinks = Object.keys(drinks).map(i => drinks[i]);

    //console.log ("LENGTH: " + drinks.length);

    return drinks;
};


function autoComplete(inp) {
    let currentFocus;

    inp.addEventListener("input", function (e) {

        let df = document.createDocumentFragment();
        let a = document.createElement("DIV");
        let b, i, line;
        closeAllLists();

        currentFocus = -1;

        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        a.setAttribute("id", this.id + "autocomplete-list");

        line = document.createElement("DIV");
        line.innerHTML = '<hr>';
        a.appendChild(line);
        /*append the DIV element as a child of the autocomplete container:*/
        //  df.appendChild(a);
        this.parentNode.appendChild(a);

        // document.getElementById('bottle-filter').addEventListener("input", function(e) {   
        let arr = getDrinks().then(function (arr) {

            for (i = 0; i < arr.length; i++) {
                b = document.createElement("DIV");
                b.setAttribute('style', 'padding-left: 20px; display:block;');                 //
                /*insert a input field that will hold the current array item's value:*/
                const drinkName = arr[i]['Brand Label Name'];
                b.innerHTML = drinkName;
                b.innerHTML += "<input type='hidden' value='" + String(drinkName) + "'>";
                b.value = drinkName;
                // console.log(i + " : " + drinkName);

                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/

                    document.getElementById('bottle-filter').value = this.getElementsByTagName("input")[0].value;

                    closeAllLists();
                    autoCompletedAction();
                });
                a.appendChild(b);
            }
        });
    });

    // let containerList = document.getElementById("searchBox");
    // containerList.appendChild(df);  
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}