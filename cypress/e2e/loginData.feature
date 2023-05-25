Feature: Login Test

Scenario: login successful
Given correct login details are provided
Then homepage loads

Scenario: login fail
Given incorrect login details provided
Then homepage doesnt load
