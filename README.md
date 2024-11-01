# Community

![](./assets/community-app-banner.png)

#### Video Demo: [here](https://youtu.be/5mePMF3P1Dk)

#### Description:

`Community` is an app designed to help communities organize themselves, it was made as my final project for `CS50 2024`. The app provides ways to create issues that community members see on their streets for example potholes, illegal trash dumps, broken lights, and much more. Community also allows users to create events that they want to host like markets, clean ups, fund raisers, and more. I originally wanted to include groups as well but as I started developing I realized that the scope was too large for my one person team. Originally groups were going to be spaces users could create and join that would focus on certain types of problems in a community, they would link to Whatsapp or signal groups to coordinate efforts but it was a little bit too much for me to do maybe in the future I will finish it.

Issues are created in the app with a multi-screen form. Each Issue is made up of a type to help people quickly decide if they are interested in it, a short description which is optional \*, and a location.

Events are created in the same way issues are but were much more work to get working. Events contain a type, title, description, age limit, dress code, ticket website \*, links \*, kit \*, days, and tags \*. Each day for every event has a start and end time, a date, and a location.

I chose to have the location and time tied to the day and not the event in order to support events that have different locations for each day. In my original plan, days were going to have a list of locations or a path instead of just one location, this was in order to accommodate events that move throughout the day like a march but sadly I couldn't get this in if I was to make the deadline.

Users can set interests and a community location to filter their feed page. I use the location to get all the events and issues that are within a 100km radius. Users can also view all the events and issues of any user, change their own usernames, and upload a profile picture.

> [!NOTE]
> An \* indicates values that are not required

There are two tabs one for your feed (Feed tab) and one for every event and issue near your community location displayed on a map (Map tab). On The map tab there are markers for every event and issue which you can tap on to take you to a detailed view of the issue or event.

The issue detail screen is simple giving you a pin on a map, a short description\*, a link to the user who created the issue, directions button, and a button to mark the issue as resolved or unresolved.

The event detail screen displays sections dynamically depending on what the event needs as in if the event as kit that people should bring it then renders that section at a certain point. One downside of this approach is that events that have only the required content can feel very empty.

#### Technologies

For this project I decided to learn some new tech so I used `React Native` and `Expo` for the app itself, `Supabase` for the backend, and `Resend` for the emails. If I were to start again I may use something else for the backend so the users do not have access to my database. Although React Native gave me problems I do not think I would have traded it for Flutter, what I normally use, because I found that the dependencies with React Native not to be as horrible as they can be with Flutter.

#### If I continue working on this

If I were to continue to work on Community I would want to implement

- dark mode,
- proper forgot password,
- secure email change,
- groups,
- platform safety and moderation, and
- sign in with Apple or Google

#### Know Issues

- Map modal does not work correctly on Android (Library problem)

### Notes For CS50 Team

- My backend may be down when you review this project I will try to keep it up until March 1st 2025 but if it is down I will include a backup of it in this repo so you can create your own instance of it, once you have created the instance you will probably need to change the `supabaseURL` and `supabaseKEY` in ~/src/utils/supabase.ts to your instance's url and key. If you cannot get it to work you have my email just email me and I will try to get my side to work.
- I don't have access to a mac and therefore cannot offer this app on the app store so I have decided not to publish to any store so I use Expo Go to test and develop.
