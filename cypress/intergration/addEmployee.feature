Feature: Add an employee

   
Background: login successful
Given bright hr is loaded and logged in


Scenario: Add Employee
Given an employee is added
And another employee is added
When navigate back to employee tab
Then both employees are displayed