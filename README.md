# Of Note

A simple app to help you remember things.

## State Management

### Redux + dexie (indexedDB)

- Redux is obviously overkill for this app, but I wanted to show my confort level with some useful front end tools. This use takes advantage of async actions (redux-thunk) for interaction with the browser indexeddb API. I find that Redux, although it has a steep learning curve, significantly reduces the complexity of reasoning about state management once the app grows beyond a few hundred lines. It also bakes in a lot of perfance enhancements, as long as you follow the rules.
- Indexeddb is a more flexible version of client-side storage than localstorage for offline state management. The only other option is the filesystem API, which is not recommended by MDN. Dexie is a wrapper around indexeddb operations, allowing declarative interaction with the store.
- registering the React serviceworker allows the app to cache artifacts (just not in dev mode) for use when the client tries to access without a connection.

### Models

This app only has one model: Note. We keep content, an id, and some meta.

### Basic organization

- All components are in src/components
- initialState is the original value of the app state, before we hydrate with clientside storage
- IState is the type that corresponds to this
- one reducer handles all actions on state
- all actions are in src/actions/actions
- Async actions operatate on the indexeddb as well as syncronize out state.

## Other tools

- Draftjs. Also overkill for this app. If I had more time though, I would have implemented rich text editing for notes. This is easy to add to Draftjs and would not be hard to add to the state management. The only possibly tricky part would be how often we serialize it to save it locally, which could be expensive.
- Jest. Currently the app is above 80% coverage globally. There are components that dip below that. Unit tests will fail if coverage falls below 80%.
- Typescript. I find it very useful to have static type checking, especially during refactoring.
- Dayjs. This is a functional (immutable) version of the popular moment library. This avoids some of the weird bugs and pitfalls of working with mutable moments.
- Sonar: A rating at default settings.

## Future Improvements

- Talk to users! Prioritize the needs of users for future updates.
- The design. I'm not a designer, I don't love the UI, but I tried to make the UX reasonably simple and intuitive.
- End to end / integration tests. I've used Cypress and Nightwatch in the past. Especially with the use of client side storage, these tests would be valuable.
- Rich text editing.
- Other quality tooling like static analysis, mutation, audits, etc.
- A backend API. With a few more days, I could have stood up a basic API in Spring Boot with openAPIGenerator. It would really only require GET, POST, PUT and DELETE for Notes and Users. You may not even have to write any code.
- Add support of multiple users.
- Theming!
- Git hooks: precommit push and post merge npm install
- CI/CD!

## Testing

```bash
npm test
```

or

```bash
CI=true npm test -- --coverage
```

To get updated coverage reports to /coverage.

## Run the App

- First clone, install, test, build:

```bash
git clone https://github.com/andwilley/moncala.git
cd moncala
docker build -t moncala .
```

- Then:

```bash
docker run --rm -p 80:80 moncala
```

## Browser Support

- chrome: latest
- firefox: latest
