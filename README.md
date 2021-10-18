# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.
<p>Angular frontend application for <a href="https://github.com/JBorchers/movie_api">myFlix API</a></p>

## Description

Angular app that represents the frontend of a restful API. Internet movie database that allows registered users to browse movies by Title, Genre, Director. Users can change their username, email address and birthday. While browsing the movies collection, users can add movies to their list of favorites.

### Features

<ul>
  <li>Display a welcome view where users will be able to either log in or register an account.</li>
<li>Once authenticated, the user can view all movies.</li>
<li>Upon clicking on "synopsis", "director" or "genre" a dialog will open, where additional movie details will be displayed.</li>
<li>Upon clicking on the "heart" icon, a movie will be added (full heart) or removed (empty heart) from the list of favorite movies, which can be viewed in the profile page.</li>
<li>The user can also remove a movie from the list of favorite movies, from within the profile page. By hovering over a movie, the card will flip, revealing a delete icon.</li>
<li>In the profile page, the user is given the option to either update or delete his account.</li>
</ul>

### Tools used

| Property          | Tool       |
| ----------------- | ---------- |
| Language          | TypeScript |
| Library           | Angular    |
| Route handling    | Angular Router      |
| Styling library   | Angular Material  |
| API               | REST       |

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
