# Customer Feedback Dashboard

A customer feedback dashboard that allows users to submit feedback and lets support agents view and filter submissions.

## Features

- User feedback form
- Support dashboard view with filtering and search


## Tech Stack

- React (with TypeScript)
- Tailwind CSS


## Getting Started
```bash
  # Clone the repo
  git clone https://github.com/Susu-spec/rise-customer-feedback.git
  cd rise-customer-feedback

  # Install dependencies
  npm install

  # Run the development server
  npm run dev

```

## Project Structure

```bash
  public/
    favicon-16x16.png
    favicon-32x32.png
  src/
    global.css
    app.tsx
    main.tsx
    assets/
      avatar-group-logo.png
      email-icon.svg
      phone-icon.svg
      report-icon.svg
      rise-logo.png
    dashboard-page/
      index.tsx
      components/
        feedback-form.tsx
        feedback-list.tsx
        feedback-card.tsx
        confirmation-overlay.tsx
        left-arrow.tsx
        right-arrow.ts
    hooks/
      useGet.hook.ts
      usePost.hook.ts
    types/
      assets.d.ts
      css.d.ts
```

## Part 2: Debug a broken component

### Original Code:

```javaScript
export default function FeedbackForm() {
  const handleSubmit = (e) => {
    e.preventDefault;
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="button">Submit Feedback</button>
    </form>
  );
}
```

### Fixed Code:

```javaScript
  export default function FeedbackForm() {
    const handleSubmit = (e) => {
      e.preventDefault();
    };

    return (
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit Feedback</button>
      </form>
  );
```

### Debug documentation
Clicking the button does nothing because the button inside of the form component is set to `type='button'`. Buttons associated with forms are set to `type='submit'` by default. An otherwise attribute overrides the default form submission behavior. I was able to figure this out by referring to the [MDN Docs on Buttons](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button). As seen here:

```bash
    The default behavior of the button. Possible values are:

        submit: The button submits the form data to the server. This is the default if the attribute is not specified for buttons associated with a <form>, or if the attribute is an empty or invalid value.
        reset: The button resets all the controls to their initial values, like <input type="reset">. (This behavior tends to annoy users.)
        button: The button has no default behavior, and does nothing when pressed by default. It can have client-side scripts listen to the element's events, which are triggered when the events occur.

```


## Author

- [@Susu-spec](https://github.com/Susu-spec)
