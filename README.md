# Wheel of Life
A simple app to track the energy you've put into different areas of your life.

## Local development

1. Create a [Clerk account](https://dashboard.clerk.dev/sign-up)
2. Copy `.env.example` and rename to `.env` and add your keys found in the dashboard.
3. Run `pnpm install`
4. Push the db schema`npx prisma db push`
4. Run `pnpm run dev`


BUG: when a new user signs up and is redirected from values to entires, no entries appear in the modal. But if you refresh the page they do appear. So it's a problem with the way the entries are being fetched.

# Further development

## TODO next
- [ ] change the radar to this: https://github.com/shauns/react-d3-radar
- [ ] change colour of link to be darker
- [ ] add form that allows for people to suggest changes or improvements.
- [ ] it's possible after signing up with username and password that the user is sent straight to the entries page. So there needs to be a check if no values are returned - the user should be pushed to the values page. 
- [ ] try use Neon to have a dedicated production database
- [ ] clean up types and interfaces
- [ ] just as you add your first values - either make sure that the values refresh. Or the wheel says something cute like now add your first entry. It's probably best to actually just show the cute message to help with the UX.
- [ ] entries: add table
- [ ] add themes
- [ ] fix for different mobile phones (especially the index page)
- [ ] manage values: edit and delete (maybe no delete neccessary)
- [ ] upgrade prisma: https://www.prisma.io/docs/guides/upgrade-guides/upgrading-versions/upgrading-to-prisma-5
- [ ] use https://www.youtube.com/watch?v=E4TH77SMOG8 to get state management working properly
- [ ] use animations: https://blog.openreplay.com/animations-and-transitions-with-tailwind-css/

## Other features
- [ ] use ChatGPT to generate values from a Q&A. It will be nice to play around with the API and Vercel. 
- [ ] as you enter values you see them appear on a wheel?