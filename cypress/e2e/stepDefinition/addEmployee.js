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
                    cy.get('.my-6 > .rounded').click()
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
    cy.get('#firstName').type(employeeData.employee1.firstname);
    cy.get('#lastName').type(employeeData.employee1.surname);
    cy.get('#email').type(employeeData.employee1.email);
    cy.get('#phoneNumber').type(employeeData.employee1.phonenumber);
    cy.get('#jobTitle').type(employeeData.employee1.jobtitle);
    cy.get('.sc-kgoBCf').click();
       
    //datepicker
    cy.get('[data-testid="input-selector"]').click();
    cy.get('.sc-uJMKN').contains('2022').click();
    cy.get('.sc-jqCOkK').contains('April').click();
    cy.get('.DayPicker-Month').contains('10').click();
    cy.get('.h-auto > .text-white',{timeout: 20000}).should('be.visible')
    cy.get('.h-auto > .text-white').click()
    cy.intercept('Post','https://sandbox-api.brighthr.com/v1/employee').as('employeeAdded');
    cy.wait('@employeeAdded').its('response.statusCode').should('eq',200);
    
});
When("another employee is added", (employeeData)=> {
    cy.get('.w-full > .disabled\:cursor-default').click();
    cy.get('form > :nth-child(1)',{timeout: 20000}).should('be.visible');
    //employee details
    cy.get('#firstName').type(employeeData.employee2.firstname);
    cy.get('#lastName').type(employeeData.employee2.surname);
    cy.get('#email').type(employeeData.employee2.email);
    cy.get('#phoneNumber').type(employeeData.employee2.phonenumber);
    cy.get('#jobTitle').type(employeeData.employee2.jobtitle);

    //datepicker
    cy.get('[data-testid="input-selector"]').click();
    cy.get('.sc-uJMKN').contains('2022').click();
    cy.get('.sc-jqCOkK').contains('April').click();
    cy.get('.DayPicker-Month').contains('10').click();
    cy.get('.h-auto > .text-white',{timeout: 20000}).should('be.visible')
    cy.get('.h-auto > .text-white').click()
    cy.intercept('Post','https://sandbox-api.brighthr.com/v1/employee').as('employeeAdded');
    cy.wait('@employeeAdded').its('response.statusCode').should('eq',200);
    cy.get('#close-modal').click()

    
});

When("navigate back to employee tab", (employeeData)=> {
    cy.get('.active > .h-16 > .relative').click();
    cy.get('.sc-LKuAh', {timeout: 20000}).should('be.visible');
    
});
Then("both employees are displayed", (employeeData)=> {
    cy.get('.grid').should.contains(
        cy.contains((employeeData.employee1.firstname+" "+record.surname), {include: 'visible'}),
        cy.contains(employeeData.employee1.jobtitle, {include: 'visible'}),
        cy.contains(employeeData.employee1.initials, {include: 'visible'}),
        cy.contains((employeeData.employee2.firstname+" "+record.surname), {include: 'visible'}),
        cy.contains(employeeData.employee2.jobtitle, {include: 'visible'}),
        cy.contains(employeeData.employee2.initials, {include: 'visible'})
    )
    
})