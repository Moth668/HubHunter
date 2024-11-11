# 13_challenge: HubHunter

## Description

- an app for searching candidates

![Candidate Search screenshot example](Develop/src/assets/candidate_search_screenshot_example.png)
![Potential Candidate screenshot example](Develop/src/assets/potential_candidate_screenshot_example.png)

- Leave the search field empty to search for randomly generated GitHub profiles and display their information.
- Type a specific GitHub Username to reveal that profiles details.
- Click the green button to save the profile.
- Click the red button to ignore the profile.
- Click the Potential Candidates button to see the table of saved candiditates information.
- Narrow your choices using the red reject button.
- The list is stored in local storage to persist after page refresh.

## Table Of Contents

- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Tools](#tools)
- [Links](#links)

## User Story

- AS AN employer
- I WANT a candidate search application
- SO THAT I can hire the best candidates

## Acceptance Criteria

```
GIVEN a candidate search application
WHEN the candidate search page loads
THEN the information for one candidate should be displayed, including the candidate's name, username, location, avatar, email, html_url, and company
WHEN I click the "+" button
THEN the candidate should be saved to the list of potential candidates and the next candidate's information should be displayed
WHEN I click the "-" button
THEN the next candidate's information should be displayed without saving the current candidate
WHEN there are no candidates available to review
THEN an appropriate message should be shown indicating no more candidates are available
WHEN the potential candidates page loads
THEN the user should see a list of previously saved potential candidates with their name, username, location, avatar, email, html_url, and company
WHEN the page reloads
THEN the list of potential candidates should persist and be available for viewing
WHEN there are no potential candidates
THEN an appropriate message should be displayed indicating no candidates have been accepted
WHEN I click the "-" button
THEN the next candidate's information should be displayed without saving the current candidate
```

## Tools

These are the tools that I used to create this program.

- Visual Studio Code
- Insomnia
- GitHub
- GitHub REST API
- Typescript
- Vite
- ChatGPT
- Java
- bfg repo-cleaner
- npm
- React
- React Router
- ESLint
- .env
- JSX
- HTML
- CSS
- Render
- Git Bash
- Starter Files from bootcamp
- Copilot
- VS Code Extensions: (Prettier, ESLint)

## Links

- Here is the link to my GitHub Repository:

- Here is the link to my Deployed Application:
