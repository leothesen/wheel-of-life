# Wheel of Life
A simple app to track the energy you've put into different areas of your life.

## Local development

1. Create a [Clerk account](https://dashboard.clerk.dev/sign-up)
2. Copy `.env.example` and rename to `.env` and add your keys found in the dashboard.
3. Run `pnpm install`
4. Push the db schema`npx prisma db push`
4. Run `pnpm run dev`


# TODO next
- [ ] normalise the database - it's getting hard to work with
- [ ] check the other t3 repos and find out how they handle interfaces with the API? Should you not rather lean into the dynamic type of the API?
- [ ] values: fix the values creation page to update the new data model
- [ ] entries: handle the new values data - update the form
- [ ] entries: fix the way a new entry is created. And get it automatically populating the entries table
- [ ] upgrade prisma: https://www.prisma.io/docs/guides/upgrade-guides/upgrading-versions/upgrading-to-prisma-5

# Plan of attack
1. Build just an onboarding page that will be captured using the "over sign up" feature of Clerk. Or if you hit the entries page without having any values. Actually just within the isValuesLoading if nothing comes back then redirect
2. Build out the entries page with just those static values
3. Build out the ability to add new values at a later point