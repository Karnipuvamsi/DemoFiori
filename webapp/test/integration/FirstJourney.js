sap.ui.define([
    "sap/ui/test/opaQunit",
    "./pages/JourneyRunner"
], function (opaTest, runner) {
    "use strict";

    function journey() {
        QUnit.module("First journey");

        opaTest("Start application", function (Given, When, Then) {
            Given.iStartMyApp();

            Then.onTheBooksList.iSeeThisPage();
            Then.onTheBooksList.onFilterBar().iCheckFilterField("ID");
            Then.onTheBooksList.onFilterBar().iCheckFilterField("Price");
            Then.onTheBooksList.onFilterBar().iCheckFilterField("Currency");
            Then.onTheBooksList.onTable().iCheckColumns(5, {"ID":{"header":"Title"},"author":{"header":"Author"},"genre/name":{"header":"Genre"},"price":{"header":"Price"},"currency/symbol":{"header":"Currency"}});

        });


        opaTest("Navigate to ObjectPage", function (Given, When, Then) {
            // Note: this test will fail if the ListReport page doesn't show any data
            
            When.onTheBooksList.onFilterBar().iExecuteSearch();
            
            Then.onTheBooksList.onTable().iCheckRows();

            When.onTheBooksList.onTable().iPressRow(0);
            Then.onTheBooksObjectPage.iSeeThisPage();

        });

        opaTest("Teardown", function (Given, When, Then) { 
            // Cleanup
            Given.iTearDownMyApp();
        });
    }

    runner.run([journey]);
});