# Carpark Pricing SG - Where do I park?

In town and unsure where to park?

Find out here!

Demo link: https://carpark-pricing-sg.herokuapp.com/

## Technologies Used

Tech Stack: CSS, HTML, EJS, ExpressJS, Express-Sessions, MongoDB

JS Libraries:

-   expressJS, express-sessions
-   method-override
-   mongoose
-   joi
-   bcrypt
-   dotenv

API: Leaflet API

## Introduction

The plan was to make the app look like an exact copy of the SG Parking App with some features of the SG Bus App where

-   user can browse for carparks
-   check car park pricing & decide where to park
-   contribute carpark information

## Getting Started

After cloning the repository do the following:

-   `npm init` to install all the dependencies
-   specify your variables in `.env` file, refer to `.env.example`

## Features of the app

### 7 Restful Routes

| URL                  | HTTP Verb | Action        | Description                   |
| -------------------- | --------- | ------------- | ----------------------------- |
| /carparks            | GET       | index         | List all Carparks             |
| /carparks/new        | GET       | new           | Display Create Form           |
| /carparks/           | POST      | Create/Update | Create/Update Carpark pricing |
| /carparks/:id        | GET       | Show          | Show Individual Carpark       |
| /carparks/:id/edit   | GET       | Edit          | Display Edit Form             |
| /carparks/:id/delete | GET       | Destroy       | Delete Carpark Pricing        |

### Models

User, Carparks, Carpark_pricing

### MVC Structure

![Image](./public/img/mvc-structure.PNG)

### Interactive Map

Using Leaflet API - need to use code in <script></script>

Passing data from MongoDB -> Controller -> EjS -> script

Take note: Mongoose Object -> pass as object/props to EJS
EJS syntax might read it incorrectly
Had to convert to JSON string -> pass as a string to EJS, then JSON stringify back

### Conditional List

Filters by search

### Authentication

Standard authentication stuff. Learnt how to render content conditionally.
Next time can consider have different access levels for certain functions/buttons

## Future Works/Stretch Goals

1. Bus Stop Upvotes, Report functionality

2. Pricing Details onclick on Home Page

3. CSS stuf
