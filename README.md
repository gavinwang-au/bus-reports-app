# BusReportsApp
A simple bus report SPA for displaying bus routes.

## Requirement

- On a single page, make all the data from 'bus-services-data.json' available to the user.
- Data can be displayed in a list or a table, or a combination of both.
- Only the names of the organisation should be shown initially. When the user clicks on the name of the organisation, this should toggle the report showing the data for that organisation.
- The first three numbers of the route variant are most important, so they should be formatted as "bold".
- Display the following bus statuses based on its deviation from timetable - "On Time", "Late", "Early", or "Unknown".
- Use colors of your choice to signify the status of the buses (e.g. green text might mean that the bus was on-time)

## Implementation
1. Angular 8 is used as front-end framework.

2. Angular material is used as UI framework.

3. Jasmine & Karma are used as testing framework.

4. Heroku is used for cloud hosting for live demo.

5. TDD approach was used through development.

6. unit test cases code coverage is over 80%.


## Build & Test
Run `git clone https://github.com/gavinwang-au/bus-reports-app.git` clone the project to your local.

Run `npm install` to install dependencies.  

Run `npm start` to run for a dev server. Navigate to `http://localhost:4200/`.

Run `npm run test` to execute the unit tests via Karma.

## Live Demo
on Heroku https://gavinfilterservice.herokuapp.com


