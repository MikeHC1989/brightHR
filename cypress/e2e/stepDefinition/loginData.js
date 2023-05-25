import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';
const testData = require('../../fixtures/loginDetails.json');


Given('correct login details are provided', ()=> {
        cy.visit('https://sandbox-app.brighthr.com/lite');
        cy.get(".bg-white").click();
        cy.get('.p-5', {timeout: 20000}).should('be.visible');
        cy.get("#email").type(testData.correctDetails.emailAddress); 
        cy.get("#password").type(testData.correctDetails.password);
        cy.get(".bg-accent-500").click();
        cy.intercept('Get','https://sandbox-app.brighthr.com/dashboard').as('dashboard');
        cy.wait('@dashboard').its('response.statusCode').should('eq',200)
        });

Given ("incorrect login details provided", ()=> {
        cy.visit('https://sandbox-app.brighthr.com/lite');
        cy.get(".bg-white").click();
        cy.get('.p-5', {timeout: 20000}).should('be.visible');
        cy.get("#email").type(testData.incorrectDetails.emailAddress); 
        cy.get("#password").type(testData.incorrectDetails.password);
        cy.get(".bg-accent-500").click()

})

Then ("homepage doesnt load", ()=> {
   cy.get(".text-error-700")
})

Then ("homepage loads", ()=>{
    cy.get('[data-testid="Dashboard"]')
})