# MyFlixAngularClient

<p>Angular frontend application for <a href="https://github.com/JBorchers/movie_api">myFlix API</a></p>

### Description

Angular app that represents the frontend of a restful API. Internet movie database that allows registered users to browse movies by Title, Genre, Director. Users can change their username, email address and birthday. While browsing the movies collection, users can add movies to their list of favorites.

### Features

<ul>
  <li>Display a welcome view where users will be able to login to an existing account or create a new one.</li>
<li>Once authenticated, the user can view all movies.</li>
<li>Upon clicking on "synopsis", "director" or "genre" a dialog will open, where additional movie details will be displayed.</li>
<li>Upon clicking on the "heart" icon, a movie will be added (red heart) or removed (outlined heart) from the list of favorite movies, which can be viewed in the profile page.</li>
<li>The user can also remove a movie from the list of favorite movies from the profile page by clicking the (red) heart icon</li>
<li>In the profile page, the user is given the option to either update or delete his/her account.</li>
</ul>

### Tools used

| Property          | Tool       |
| ----------------- | ---------- |
| Language          | TypeScript |
| Library           | Angular    |
| Route handling    | Angular Router      |
| Styling library   | Angular Material  |
| API               | REST       |

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


