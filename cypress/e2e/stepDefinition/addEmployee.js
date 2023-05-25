import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'
const employeeData = require('../../fixtures/addEmployee.json');


Given("bright hr is loaded and logged in", ()=> {
    cy.visit('https://sandbox-app.brighthr.com/lite');
    cy.get(".bg-white").click();
    cy.get('.p-5', {timeout: 20000}).should('be.visible');
    cy.get("#email").type('michealheeney@gmail.com'); 
    cy.get("#password").type("caleb*CARTWRIGHT*2020");
    cy.get(".bg-accent-500").click();
    cy.get(':nth-child(5) > .rounded', {timeout: 20000}).should('be.visible').then((displayed) =>{
            if (displayed){cy.get(':nth-child(5) > .rounded').click()
                    cy.wait(1000)
                    cy.get('.gap-x-8 > .bg-white').click()
                    cy.wait(1000)
                    cy.get('.gap-x-8 > .text-white').click()
                    cy.wait(1000)
            }
            else {
            cy.intercept('Get','https://sandbox-app.brighthr.com/dashboard').as('dashboard');
            cy.wait('@dashboard').its('response.statusCode').should('eq',200);
                   }

    })

    });

Given("an employee is added", (employeeData)=> {
    cy.get('.active > .h-16 > .relative').click();
    cy.get('.my-6 > .rounded', {timeout: 20000}).should('be.visible');
    cy.get('.my-6 > .rounded').click();
    cy.get('form > :nth-child(1)',{timeout: 20000}).should('be.visible');
    //employee details
    cy.get('#firstName').type("Helena");
    cy.get('#lastName').type("Jones");
    cy.get('#email').type("testing2@test.com");
    cy.get('#phoneNumber').type("0786999999");
    cy.get('#jobTitle').type("Test2");
    cy.get('.sc-kgoBCf').click();
       
    //datepicker
    cy.get('[data-testid="input-selector"]').click();
    cy.get('.DayPicker-Day--today > .DayPicker-Day-Date > .DayPicker-Day-Circle > .DayPicker-Day-Number').click()
    cy.get('.h-auto > .text-white',{timeout: 20000}).should('be.visible')
    cy.get('.h-auto > .text-white').click()
    cy.intercept('Post','https://sandbox-api.brighthr.com/v1/employee').as('employeeAdded');
    cy.wait('@employeeAdded').its('response.statusCode').should('eq',201);
    
});
When("another employee is added", (employeeData)=> {
    cy.get('.bg-gray-200 .bg-accent-500',{timeout: 100000}).should('be.visible');
    cy.get('.bg-gray-200 .bg-accent-500').click();
    cy.get('form > :nth-child(1)',{timeout: 20000}).should('be.visible');
    //employee details
    cy.get('#firstName').type("Joe");
    cy.get('#lastName').type("Bloggs");
    cy.get('#email').type("testing@test.com");
    cy.get('#phoneNumber').type("07812345678");
    cy.get('#jobTitle').type("test");

    //datepicker
    cy.get('[data-testid="input-selector"]').click();
    cy.get('.DayPicker-Day--today > .DayPicker-Day-Date > .DayPicker-Day-Circle > .DayPicker-Day-Number').click()
    cy.get('.h-auto > .text-white',{timeout: 20000}).should('be.visible')
    cy.get('.h-auto > .text-white').click()
    cy.intercept('Post','https://sandbox-api.brighthr.com/v1/employee').as('employeeAdded');
    cy.wait('@employeeAdded').its('response.statusCode').should('eq',201);
    cy.get('#close-modal').click()

    
});

When("navigate back to employee tab", (employeeData)=> {
    cy.get('.active > .h-16 > .relative').click();
    cy.get('.sc-LKuAh', {timeout: 20000}).should('be.visible');
    
});
Then("both employees are displayed", (employeeData)=> {
    cy.get("#app > div > div > div.side-nav > div > div.grid.grid-cols-1.gap-8.py-6.mt-6.xl\:grid-cols-3.md\:grid-cols-2").should('have.value',
    
        cy.contains(("Helena"+" "+"Jones"), {include: 'visible'}),
        cy.contains("Test2", {include: 'visible'}),
        cy.contains("HJ", {include: 'visible'}),
        cy.contains(("Joe"+" "+"Bloggs"), {include: 'visible'}),
        cy.contains("Test", {include: 'visible'}),
        cy.contains("JB", {include: 'visible'}),
    )
})
    
