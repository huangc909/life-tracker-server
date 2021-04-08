# Life Tracker - Server

## Links
- API: (Link Coming Soon)
- Client Application: (Link Coming Soon)
- Client Application Repository: (Link Coming Soon)

## Back-end Portion of the App

## Planning Story

## Technologies Used:
- Express
- Mongoose
- MongoDB
- Node.js

## API Endpoints
### LifeSections
| Verb   | URI Pattern                    | Controller#Action      |
|:-------|:-------------------------------|:-----------------------|
| GET    | `/lifeSections`                | `lifeSections#index`   |
| GET    | `/lifeSections/:lifeSectionId` | `lifeSections#show`    |
| POST   | `/lifeSections`                | `lifeSections#create`  |
| PATCH  | `/lifeSections/:lifeSectionId` | `lifeSections#update`  |
| DELETE | `/lifeSections/:lifeSectionId` | `lifeSections#destroy` |


### TrackingItems
| Verb   | URI Pattern                                      | Controller#Action       |
|:-------|:-------------------------------------------------|:------------------------|
| GET    | `/lifeSections/:lifeSectionId/trackingItems/:id` | `trackingItems#show`    |
| POST   | `/lifeSections/:lifeSectionId/trackingItems`     | `trackingItems#create`  |
| PATCH  | `/lifeSections/:lifeSectionId/trackingItems/:id` | `trackingItems#update`  |
| DELETE | `/lifeSections/:lifeSectionId/trackingItems/:id` | `trackingItems#destroy` |


## Images
### ERD:
