# README

Welcome to the AT Restaurant Finder App. This repo uses a [React](https://reactjs.org/) front-end using a
[Ruby on Rails](https://guides.rubyonrails.org/) Server. It also makes use of the [Google Maps](https://developers.google.com/maps)
and [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview) in which you will need to
store a `REACT_APP_GOOGLE_MAPS_API_KEY` in your `.env` file.

##### Prerequisites

The setups steps expect following tools installed on the system.

- Github
- Ruby [2.6.3](https://github.com/cschucode/at-restaurant-finder/blob/main/.ruby-version#L1)
- Rails [6.1.3](https://github.com/cschucode/at-restaurant-finder/blob/main/Gemfile#L7)
- React [17.0.2](https://github.com/cschucode/at-restaurant-finder/blob/main/package.json#L15)

##### 1. Check out the repository

```bash
git clone git@github.com:cschucode/at-restaurant-finder.git
```

##### 2. Add Google Maps API Key to .env file

```bash
REACT_APP_GOOGLE_MAPS_API_KEY="<YOUR_API_KEY>"
```

##### 3. Start the Rails server

You can start the rails server using the command given below.

```ruby
bundle exec rails s
```

And now you can visit the site with the URL http://localhost:3000

##### 4. Jest Snapshot Testing

Run jest snapshot tests with the following command

```bash
yarn test
```

To update snapshots during development add the update modifier

```bash
yarn test -u
```