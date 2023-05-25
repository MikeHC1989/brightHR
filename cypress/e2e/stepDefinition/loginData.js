import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'
const testData = require('../../fixtures/loginDetails.json')

const endPointUrl = new Utility().getBaseUrl()

Given('bright hr is loaded and logged in', (testData)=> {
        cy.visit('');
        cy.get("#login-btn").click();
        cy.get("#username-input").type(testData.correctDetails.emailAddress); 
        cy.get("#password-input").type(testData.correctDetails.password);
        cy.get("#login-btn").click();
        cy.intercept('Get','https://sandbox-app.brighthr.com/dashboard').as('dashboard');
        cy.wait('@dashboard').its('response.statusCode').should('eq',200);
        })

Given('correct login details are provided', ()=> {
        cy.visit('');
        cy.get("#login-btn").click();
        cy.get("#username-input").type(testData.correctDetails.emailAddress); 
        cy.get("#password-input").type(testData.correctDetails.password);
        cy.get("#login-btn").click();
        cy.intercept('Get','https://sandbox-app.brighthr.com/dashboard').as('dashboard');
        cy.wait('@dashboard').its('response.statusCode').should('eq',200)
        })
Given ('incorrect details login details provided', ()=> {
        cy.visit('');
        cy.get("#login-btn").click();
        cy.get("#username-input").type(testData.correctDetails.emailAddress); 
        cy.get("#password-input").type(testData.correctDetails.password);
        cy.get("#login-btn").click()

})

Then ('homepage doesnt load', ()=> {
   cy.get("#text")
})

Then ('homepage loads', ()=>{
    cy.get('[data-testid="Dashboard"]')
})