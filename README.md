# Marketer Front-end Assignment

Hi there! Here are some notes I wanted to share.

---

### Task 1

> On [/bacon](http://localhost:3333/bacon) you should see a page with beautiful slices of fried bacon, that comes from external source.
>
> Create bacon cloning logic and attach it to **Yeah, I want more bacon!** button.

Solving a puzzle right from the start was fun :)

Initially I kept the count only in the script, but having to click the button several times after every change in css while working on the layout, made me want to persist the count somehow even after reloads. The most natural place to do this was URL, so I added the count there and also added proper support for Back and Forward buttons.

### Task 2

> Take a look at [design file](./design.png) and recreate it. Use any way of writing styles you are comfortable with and pick `Roboto` as the font family.
>
> By default Adonis support [PostCSS](https://docs.adonisjs.com/guides/assets-manager#setup-postcss), [SASS, Less and Stylus](https://docs.adonisjs.com/guides/assets-manager#setup-sass-less-and-stylus) you need to enable one of it, but it's just Webpack under the hood, so feel free to hook whatever you like the most.

I decided that I want to create this form completely from scratch, without relying on any component library. I only used `PostCSS` for `autoprefixer` and nested styles. Using css grid layout meant no IE11 support, but I hope in a few years we won't have to worry about it at all. Adding fallback using flex layout would not be a big problem, but I opted not to deal with it in this assignment.

Some other possible improvements:

- styling `select`'s dropdown list. Native look is not great, but creating a proper accessible replacement with keyboard navigation etc. is not a trivial task, as I found out a few years ago when I tried to do it.
- updating credit card's logo according to entered value.
- masking input also is not a trivial problem, so I used `IMask` library. I used `overwrite` mode, but it seems it requires some additional configuration. For production code I would take time to figure it out (or choose another library), as it probably would improve user experience.
- on Chrome everything looks fine (at least I hope so), but on Firefox there are 2 minor misalignments: text in Country select and shopping card icon inside the button. I would try to fix this in a real production code. I don't have a Mac, so I did not test it on Safari.

### Task 3

> Provide simple JS validation for checkout form created earlier.

Validating email addresses and credit card numbers also is tricky, so I used popular library `validator.js` to handle this. I created `Validator` class that uses provided configuration and handles calling validation and working with DOM nodes. As this class has enough logic, I used `Jest` and `DOM testing library` to test it.

### Task 4

> Send form data to the `POST /order` endpoint and show success / error message based on API response.
>
> Accepted data formats:
>
> - Postal code: 00000
> - Phone number: 000000000
> - Credit card: 0000000000000000
> - CVV: 000
> - Exp. date: 00/00

To test end-to-end functionality I decided to try out `Playwright`. Well, let's just say I missed `Cypress` and `Cypress testing library`. Again using css selectors in tests felt wrong. Of course it's possible I just don't know how to properly use Playwright yet, but every tutorial I found used css classes and IDs.

Possible improvement:

- improvised snackbar does not handle several rapid notifications and of course would not be in a production code.

---

**Thank you!**
