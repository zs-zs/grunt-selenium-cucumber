Feature: CucumberJS with Selenium

Scenario: Should run CucumberJS scenarios with Selenium
    When I visit the site 'http://google.com'

    Then the site should appear
